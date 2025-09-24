
import { z } from 'zod';

export const setRoleSchema = z.object({
  uid: z.string().min(1, { message: 'User ID (uid) is required.' }),
  role: z.string().min(1, { message: 'Role is required.' }),
});
