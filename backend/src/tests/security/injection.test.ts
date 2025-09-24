import request from 'supertest';
import app from '../../index'; // Import the Express app

// Mock the auth and rbac middlewares to isolate the validation logic
jest.mock('../../middleware/auth', () => ({
  requireAuth: (req: any, res: any, next: any) => {
    // Mock a user to satisfy the route handler
    req.user = { uid: 'mock-admin-uid', role: 'admin' };
    next();
  },
}));

jest.mock('../../middleware/rbac', () => ({
  hasRole: (roles: string[]) => (req: any, res: any, next: any) => next(),
}));

// Mock the orchestration registry to prevent writes during tests
jest.mock('../../services/orchestrationRegistry', () => ({
  recordExecution: jest.fn(),
}));

describe('POST /auth/set-role - Input Validation & Injection Resistance', () => {

  it('should return 400 if uid is missing', async () => {
    const response = await request(app)
      .post('/auth/set-role')
      .send({ role: 'student' }); // Missing uid

    expect(response.status).toBe(400);
    expect(response.body.errors[0].message).toBe('User ID (uid) is required.');
  });

  it('should return 400 if role is missing', async () => {
    const response = await request(app)
      .post('/auth/set-role')
      .send({ uid: 'test-user-123' }); // Missing role

    expect(response.status).toBe(400);
    expect(response.body.errors[0].message).toBe('Role is required.');
  });

  it('should return 400 for non-string uid (potential injection)', async () => {
    const response = await request(app)
      .post('/auth/set-role')
      .send({ uid: { '$ne': null }, role: 'student' }); // NoSQL injection attempt

    expect(response.status).toBe(400);
    expect(response.body.errors[0].code).toBe('invalid_type');
  });

  it('should return 400 for non-string role (potential injection)', async () => {
    const response = await request(app)
      .post('/auth/set-role')
      .send({ uid: 'test-user-123', role: { '$ne': 'admin' } }); // NoSQL injection attempt

    expect(response.status).toBe(400);
    expect(response.body.errors[0].code).toBe('invalid_type');
  });

});