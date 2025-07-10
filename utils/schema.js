import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

// Define the MockInterview table
export const MockInterview = pgTable('mockInterview', {
  id: serial('id').primaryKey(),
  jsonInterviewResponse: text('jsonInterviewResponse').notNull(),
  jobPosition: varchar('jobPosition').notNull(),
  jobDescription: text('jobDescription').notNull(),
  jobExperience: varchar('jobExperience').notNull(),
  createdBy: varchar('createdBy').notNull(),
  createdAt: varchar('createdAt').notNull(),
  mockID: varchar('mockID').notNull(),
});

// Define the userAnswerData table
export const userAnswerData = pgTable('userAnswerData', {
  id: serial('id').primaryKey(),
  mockID: varchar('mockID').notNull(),
  questionAsked: varchar('questionAsked').notNull(),
  correctAns: text('correctAns'),
  userAns: text('userAnswer'),
  rating: varchar('rating'),
  feedbackForAns: text('feedbackForAns'),
  createdAt: varchar('createdAt'),
  createdBy: varchar('createdBy'),
});
