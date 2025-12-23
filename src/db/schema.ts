import { pgTable, serial, text, timestamp, boolean, integer } from 'drizzle-orm/pg-core';

export const positions = pgTable('positions', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  department: text('department').notNull(),
  workType: text('work_type').notNull(),
  location: text('location').notNull(),
  description: text('description').notNull(),
  whatWeDo: text('what_we_do'),
  yourMission: text('your_mission'),
  yourProfile: text('your_profile'),
  techStack: text('tech_stack'),
  whatWeOffer: text('what_we_offer'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const applications = pgTable('applications', {
  id: serial('id').primaryKey(),
  fullName: text('full_name').notNull(),
  email: text('email').notNull(),
  positionId: integer('position_id').references(() => positions.id),
  resumePath: text('resume_path').notNull(),
  isSpontaneous: boolean('is_spontaneous').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type Position = typeof positions.$inferSelect;
export type NewPosition = typeof positions.$inferInsert;
export type Application = typeof applications.$inferSelect;
export type NewApplication = typeof applications.$inferInsert;
