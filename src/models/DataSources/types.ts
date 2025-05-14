// re-export types from top-level schema for convenience
import { components, paths } from '../../../openapi-schema';
export type DataSource = components['schemas']['DataSource'];
type ApiPaths = keyof paths;
export const DATA_SOURCES_API_ENDPOINT: ApiPaths = '/data-sources';
export type DataSourcesResponse = paths[typeof DATA_SOURCES_API_ENDPOINT]['get']['responses'][200]['content']['application/json'];
