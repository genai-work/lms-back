import type { Schema, Struct } from '@strapi/strapi';

export interface UserRole extends Struct.ComponentSchema {
  collectionName: 'components_user_roles';
  info: {
    displayName: 'Role';
    icon: 'alien';
  };
  attributes: {
    role: Schema.Attribute.String;
    years: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'user.role': UserRole;
    }
  }
}
