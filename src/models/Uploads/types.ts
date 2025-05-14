// re-export types from top-level schema for convenience
import { components, paths } from '../../../openapi-schema';
export type Upload = components['schemas']['Upload'];
type ApiPaths = keyof paths;
export const UPLOADS_API_ENDPOINT: ApiPaths = '/uploads';
export type UploadsResponse = paths[typeof UPLOADS_API_ENDPOINT]['get']['responses'][200]['content']['application/json'];
