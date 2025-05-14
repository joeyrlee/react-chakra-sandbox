import { useQuery, useQueryClient } from "@tanstack/react-query";
import { TASK_STATUSES_API_ENDPOINT, TaskStatuses, TaskStatusesResponse } from "./types";
import { set, z } from 'zod';
import { useCallback, useEffect, useRef, useState } from "react";

/* zod schema for TaskStatuses */ 
// const TaskStatusesSchema = z.object({
//   data: z.object({})
// });

const stubbedTaskStatuses: TaskStatuses = {
  upload_start: 'completed',
  copy_start: 'completed',
  upload_step_one: 'completed',
  upload_step_two: 'completed',
  upload_step_three: 'in_progress',
  copy_step_one: 'completed',
  copy_step_two: 'completed',
  copy_step_three: 'completed',
  upload_final_step: 'pending',
}

export const fetchTaskStatuses = async (uploadId: string, signal: AbortSignal): Promise<TaskStatusesResponse> => {
  // real api call:
  // const response = await fetch(TASK_STATUSES_API_ENDPOINT.replace('{upload_id}', uploadId), { signal });
  // if (!response.ok) {
  //   throw new Error('Failed to fetch data sources');
  // }
  // const json = await response.json();

  // stubbed api call for development:
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, 500);
  });
  const json = { data: stubbedTaskStatuses };
  // validateDataSourceResponse(json);
  return json;
}

export const getDataSourcesQueryKey = (uploadId: string) => ['uploads', uploadId, 'task-statuses'] as const;

// written for reference but not used for the sake of long polling with the fetch API as a preferred mechanism
// export const useTaskStatusesQuery = (uploadId: string) => {
//   return useQuery<TaskStatusesResponse, Error, TaskStatuses>({
//     queryKey: getDataSourcesQueryKey(uploadId),
//     queryFn: ({ queryKey }) => {
//       const [, id] = queryKey as ReturnType<typeof getDataSourcesQueryKey>;
//       return fetchTaskStatuses(id);
//     },
//     select: (json) => json.data,
//   })
// }

// hook that uses long polling to fetch the task statuses for a given upload id
// with support for aborting requests (eg on component unmount)
// data is cached/saved in the react query cache for fast recall in the event of component unmounting and remounting
export const useFetchTaskStatuses = (uploadId: string) => {
  // derive default state using query cache
  const queryClient = useQueryClient();
  const defaultTaskStatuses = queryClient.getQueryData<TaskStatuses | undefined>(getDataSourcesQueryKey(uploadId));
  const [taskStatuses, setTaskStatuses] = useState<TaskStatuses | undefined>(defaultTaskStatuses);
  const [error, setError] = useState<Error | null>(null);
  const abortControllerRef = useRef(new AbortController());

  // preserve referential integrity of the signal function for the purpose of canceling fetch requests
  // this is necessary because of the signal reference isn't stable across renders
  const getSignal = useCallback(() => {
    if (!abortControllerRef.current) {
      abortControllerRef.current = new AbortController();
    }
    return abortControllerRef.current.signal;
  }, []);
  
  useEffect(() => {
    async function getTaskStatuses() {
      try {
        const json = await fetchTaskStatuses(uploadId, getSignal());
        const taskStatuses = json.data;
        setTaskStatuses(taskStatuses);
        setError(null);
        // set the query data in the cache
        queryClient.setQueryData(getDataSourcesQueryKey(uploadId), taskStatuses);

        // set up long polling
        getTaskStatuses();
      } catch (error) {
        setError(error instanceof Error ? error : new Error(String(error)));
        setTaskStatuses(undefined);
      }
    }

    getTaskStatuses();
    
    return () => {
      abortControllerRef.current?.abort();
    };
  }, [getSignal, uploadId]);

  const abort = () => {
    abortControllerRef.current?.abort();
  };

  return { abort, taskStatuses, error, isLoading: !error && !taskStatuses };
}
