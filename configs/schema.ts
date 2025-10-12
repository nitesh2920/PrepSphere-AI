import { pgTable, serial, varchar, boolean, integer, text, json, timestamp } from "drizzle-orm/pg-core";

export const USER_TABLE = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }).notNull(),
  isMember: boolean('isMember').default(false).notNull(),
  customerId: varchar(),
  credits: integer('credits').default(5).notNull(), // Default 5 credits for new users
  createdAt: timestamp('createdAt').defaultNow(),
});


export const STUDY_MATERIAL_TABLE = pgTable('studyMaterial', {
  id: serial('id').primaryKey(),
  courseId: varchar('courseId', { length: 256 }).notNull(),
  courseType: varchar('courseType', { length: 256 }),
  topic: varchar('topic', { length: 256 }).notNull(),
  difficultyLevel: varchar('difficultyLevel', { length: 50 }).default('Easy').notNull(),

  // The 'json' type is ideal for storing flexible, nested data like a lesson plan or UI layout.
  courseLayout: json('courseLayout'),

  createdBy: varchar('createdBy', { length: 256 }).notNull(),
  status: varchar('status').default('Generating'),


  createdAt: timestamp('createdAt').defaultNow(),


});

export const CHAPTER_NOTES_TABLE = pgTable('chapterNotes', {
  id: serial().primaryKey(),
  courseId: varchar().notNull(),
  chapterId: integer().notNull(),
  notes: text()
})

export const STUDY_TYPE_CONTENT_TABLE = pgTable('studyTypeContent', {
  id: serial().primaryKey(),
  courseId: varchar().notNull(),
  content: json(),
  type: varchar().notNull(),
  status: varchar().default('Generating')
})

export const PAYMENT_RECORD_TABLE = pgTable('paymentRecord', {
  id: serial('id').primaryKey(),
  customerId: varchar('customerId', { length: 256 }),
  sessionId: varchar('sessionId', { length: 256 }),

});

export const USER_PROGRESS_TABLE = pgTable('userProgress', {
  id: serial('id').primaryKey(),
  userId: varchar('userId', { length: 256 }).notNull(),
  courseId: varchar('courseId', { length: 256 }).notNull(),
  materialType: varchar('materialType', { length: 50 }).notNull(), // 'notes', 'flashcards', 'quiz', 'qa'
  itemId: varchar('itemId', { length: 256 }).notNull(), // chapter id, flashcard id, quiz question id, etc.
  completed: boolean('completed').default(false).notNull(),
  completedAt: timestamp('completedAt'),
  createdAt: timestamp('createdAt').defaultNow(),
});
