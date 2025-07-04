module.exports = {
  routes: [
    {
      method: "POST",
      path: "/files/upload",
      handler: "upload.customUpload",
      config: { policies: [], auth: false },
    },
  ],
};
