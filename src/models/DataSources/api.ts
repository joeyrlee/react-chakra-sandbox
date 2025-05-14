import { useQuery } from "@tanstack/react-query";
import { DATA_SOURCES_API_ENDPOINT, DataSource, DataSourcesResponse } from "./types";
import { z } from 'zod';

const DataSourcesSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      date: z.coerce.date(),
    })
  )
});

const validateDataSourceResponse = (dataSourcesResponse: DataSourcesResponse) => {
  // Zod used to validate/sanity-check the api response structure against the expect schema
  // (basically run-time type-checking to alert on API schema drift)
  const parsedData = DataSourcesSchema.safeParse(dataSourcesResponse);
  if (!parsedData.success) { console.error('API drift detected', parsedData.error); }
}

const stubbedDataSources: DataSource[] = [
  { id: 'Demo form radio btn one', date: '2023-10-01T00:00:00Z' },
  { id: 'Demo form radio btn two', date: '2023-10-02T00:00:00Z' },
  { id: 'Demo form radio btn three', date: '2023-10-03T00:00:00Z' },
  { id: 'Demo form radio btn four', date: '2023-10-04T00:00:00Z' },
]

export const fetchDataSources = async (): Promise<DataSourcesResponse> => {
  // real api call:
  // const response = await fetch(DATA_SOURCES_API_ENDPOINT);
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
  const json = { data: stubbedDataSources } as DataSourcesResponse;
  validateDataSourceResponse(json);
  return json;
}

export const DATA_SOURCES_QUERY_KEY = ['dataSources'];
export const useDataSourcesQuery = () => {
  return useQuery<DataSourcesResponse, Error, DataSource[]>({
    queryKey: DATA_SOURCES_QUERY_KEY,
    queryFn: fetchDataSources,
    select: (json) => json.data,
  })
}
