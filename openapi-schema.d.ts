/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/data-sources": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Retrieve a list of data sources */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A JSON array of DataSource objects */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["DataSourcesResponse"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/uploads": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Retrieve a list of uploads and the active upload progress */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A JSON object with a list of Upload objects and an optional active upload progress value */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["UploadsResponse"];
                    };
                };
            };
        };
        put?: never;
        /** Submit an upload request */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            /** @description Upload request with a data_source string value */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["UploadsPostBody"];
                };
            };
            responses: {
                /** @description Resource created */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/uploads/{upload_id}/task-statuses": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Retrieve task statuses for a specific upload */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description The upload identifier */
                    upload_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A JSON object containing the task statuses */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["TaskStatusesResponse"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        DataSource: {
            id: string;
            /**
             * Format: date-time
             * @description ISO-8601 formatted date and time
             */
            date: string;
        };
        DataSourcesResponse: {
            data: components["schemas"]["DataSource"][];
        };
        UploadsPostBody: {
            data_source: string;
        };
        Upload: {
            id: string;
            /** Format: date-time */
            start_time: string;
            copy_source: string;
            /** @description Flag indicating production status; provided as a string */
            is_production: boolean;
            status: components["schemas"]["Status"];
            /** @description Optional error message associated with the upload */
            error_message?: string | null;
        };
        UploadsResponse: {
            data: components["schemas"]["Upload"][];
            /**
             * Format: float
             * @description A float representing percent complete between 0 and 100; may be omitted or null
             */
            active_upload_progress?: number | null;
        };
        TaskStatuses: {
            upload_start?: components["schemas"]["Status"];
            copy_start?: components["schemas"]["Status"];
            upload_step_one?: components["schemas"]["Status"];
            upload_step_two?: components["schemas"]["Status"];
            upload_step_three?: components["schemas"]["Status"];
            copy_step_one?: components["schemas"]["Status"];
            copy_step_two?: components["schemas"]["Status"];
            copy_step_three?: components["schemas"]["Status"];
            upload_final_step?: components["schemas"]["Status"];
        };
        TaskStatusesResponse: {
            data: components["schemas"]["TaskStatuses"];
        };
        /** @enum {string} */
        Status: "completed" | "error" | "pending" | "in_progress";
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
