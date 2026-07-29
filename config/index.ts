import dotenv from "dotenv";
import path from "path";
import type { StringValue } from "ms";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {};
