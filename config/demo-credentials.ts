const rootPassword = "12345678";

export const demoCredentials = {
  admin: {
    email: "admin@renttnest.com",
    password: rootPassword,
  },
  landlord: {
    email: "landlord@renttnest.com",
    password: rootPassword,
  },
  tenant: {
    email: "tenant@renttnest.com",
    password: rootPassword,
  },
} as const;

export type DemoRole = keyof typeof demoCredentials;
