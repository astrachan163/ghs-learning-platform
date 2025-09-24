
import { z } from 'zod';

// Base schema for a Georgia Standard of Excellence (GSE)
export const GSEStandardSchema = z.object({
  id: z.string().min(1, "GSE ID is required"),
  description: z.string(),
});

// Schema for different types of lesson activities
export const ActivitySchema = z.union([
  z.object({
    type: z.literal('digital'),
    url: z.string().url(),
    description: z.string(),
  }),
  z.object({
    type: z.literal('unplugged'),
    materials: z.array(z.string()),
    instructions: z.string(),
  }),
]);

// Schema for a single lesson
export const LessonSchema = z.object({
  id: z.string().cuid2(),
  title: z.string(),
  objective: z.string(),
  standards: z.array(GSEStandardSchema),
  activities: z.array(ActivitySchema),
});

// Schema for a thematic unit, which contains multiple lessons
export const UnitSchema = z.object({
  id: z.string().cuid2(),
  title: z.string(),
  description: z.string(),
  lessons: z.array(LessonSchema),
});

// Enum for the core subjects
export const SubjectEnum = z.enum(['ELA', 'Mathematics', 'Science', 'Social Studies']);

// Schema for a subject curriculum for a specific grade level
export const CurriculumSchema = z.object({
  id: z.string().cuid2(),
  subject: SubjectEnum,
  gradeLevel: z.number().int().min(0).max(12), // K=0
  units: z.array(UnitSchema),
});
