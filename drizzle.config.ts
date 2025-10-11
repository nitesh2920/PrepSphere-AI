import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.ts",
//   out: "./drizzle",
dbCredentials:{
    url:'postgresql://neondb_owner:npg_0xVlN9BHomeb@ep-divine-bonus-adc9ni58-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
}
});
