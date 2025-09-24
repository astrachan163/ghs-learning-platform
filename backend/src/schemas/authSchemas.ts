
import { z } from 'zod';

export const setRoleSchema = z.object({
  uid: z.string({ required_error: 'User ID (uid) is required.' }).min(1, { message: 'User ID (uid) cannot be empty.' }),
  role: z.string({ required_error: 'Role is required.' }).min(1, { message: 'Role cannot be empty.' }),
});
