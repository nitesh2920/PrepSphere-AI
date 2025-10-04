import {pgTable,serial, varchar, boolean} from "drizzle-orm/pg-core";

export const USER_TABLE = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }).notNull(),
  isMember: boolean('isMember').default(false).notNull(),
});