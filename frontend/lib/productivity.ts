import { api } from './api';
export const productivityApi = {
  analytics: () => api.get('/analytics/dashboard').then(r=>r.data.data),
  jobs: (params?: Record<string,string>) => api.get('/productivity/jobs',{params}).then(r=>r.data.data),
  createJob: (data: unknown) => api.post('/productivity/jobs',data).then(r=>r.data.data),
  goals: () => api.get('/productivity/goals').then(r=>r.data.data),
  createGoal: (data: unknown) => api.post('/productivity/goals',data).then(r=>r.data.data),
  resources: () => api.get('/productivity/resources').then(r=>r.data.data),
  notifications: () => api.get('/productivity/notifications').then(r=>r.data.data),
};
