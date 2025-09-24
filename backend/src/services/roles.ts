
import admin from 'firebase-admin';

// Define the roles available in the system
export enum UserRole {
  STUDENT = 'student',
  PARENT = 'parent',
  TEACHER = 'teacher',
  ADMIN = 'admin',
}

// Type guard to check if a string is a valid UserRole
function isValidUserRole(role: string): role is UserRole {
  return Object.values(UserRole).includes(role as UserRole);
}

/**
 * Sets a custom role claim for a given user.
 * This is used for role-based access control (RBAC).
 * @param uid The user's unique ID (from Firebase Auth).
 * @param role The role to assign to the user.
 */
export async function setUserRole(uid: string, role: string): Promise<void> {
  if (!isValidUserRole(role)) {
    throw new Error(`Invalid role: ${role}. Valid roles are: ${Object.values(UserRole).join(', ')}`);
  }

  try {
    // Set the custom claim 'role' on the user's account
    await admin.auth().setCustomUserClaims(uid, { role });
    console.log(`Successfully set role '${role}' for user ${uid}`);
  } catch (error) {
    console.error(`Error setting custom claims for user ${uid}:`, error);
    throw new Error('Could not set user role.');
  }
}
