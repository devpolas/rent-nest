import "server-only";
import type { StringValue } from "ms";

export default {
  app_name: "Rent Nest",
  website: process.env.WEBSITE as StringValue,
  base_url: process.env.API as StringValue,
  nodemailer_user: process.env.NODEMAILER_USER as StringValue,
  nodemailer_app_password: process.env.NODEMAILER_APP_PASSWORD as StringValue,
  nodemailer_service: process.env.NODEMAILER_SERVICE as StringValue,
  nodemailer_smtp_host: process.env.SMTP_HOST,
  nodemailer_smtp_port: process.env.SMTP_PORT,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET as StringValue,
};
