module.exports = {
  async customUpload(ctx) {
    try {
      const { files, body } = ctx.request;
      if (!files || !files.files) {
        return ctx.badRequest("No files uploaded");
      }

      const { ref, refId, field, fileInfo = {} } = body;
      const uploadService = strapi.plugin("upload").service("upload");

      const filesArray = Array.isArray(files.files)
        ? files.files
        : [files.files];

      for (const file of filesArray) {
        if (!file.name) {
          file.name = `file-${Date.now()}-${Math.random().toString(36).substring(7)}`;
        }

        const sanitizedFileName = file.name
          .replace(/[^a-zA-Z0-9.\-_]/g, "")
          .trim();
        if (!sanitizedFileName) {
          console.log("Sanitized file name is invalid:", file.name);
        }

        file.name = sanitizedFileName;
      }

      const uploadedFiles = await uploadService.upload({
        files: filesArray,
        data: { fileInfo },
      });

      if (ref && refId && field) {
        const publishedEntity = await strapi.query(ref).findOne({
          documentId: refId,
          status: "published",
        });
        for (const uploadedFile of uploadedFiles) {
          await strapi.documents(ref).update({
            documentId: refId,
            data: { [field]: uploadedFile.id },
            status: publishedEntity ? "published" : "draft",
          });
        }
      }

      const response = uploadedFiles.map((file) => ({
        id: file.id,
        name: file.name,
        alternativeText: file.alternativeText || null,
        caption: file.caption || null,
        width: file.width,
        height: file.height,
        ext: file.ext,
        formats: file.formats || null,
        hash: file.hash,
        mime: file.mime,
        size: file.size,
        url: file.url,
        provider: file.provider || "local",
        createdAt: file.createdAt,
        updatedAt: file.updatedAt,
      }));

      return ctx.send(response);
    } catch (error) {
      console.error("Upload error:", error);
      return ctx.internalServerError("An error occurred during the upload");
    }
  },
};
