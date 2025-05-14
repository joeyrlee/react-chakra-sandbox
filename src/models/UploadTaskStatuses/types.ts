// re-export types from top-level schema for convenience
import { components, paths } from '../../../openapi-schema';
export type TaskStatuses = components['schemas']['TaskStatuses'];
type ApiPaths = keyof paths;
export const TASK_STATUSES_API_ENDPOINT: ApiPaths = '/uploads/{upload_id}/task-statuses';
export type TaskStatusesResponse = paths[typeof TASK_STATUSES_API_ENDPOINT]['get']['responses'][200]['content']['application/json'];
