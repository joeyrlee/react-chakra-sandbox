import { useEffect, useState } from 'react';
import { 
  RadioGroup, 
  Radio, 
  Stack, 
  FormControl,
  Box,
  Button,
  Flex,
  Skeleton,
  FormErrorMessage
} from '@chakra-ui/react';
import { DataSource } from "../../../../models/DataSources/types";
import { useDataSourcesQuery } from '../../../../models/DataSources/api';

const RadioButtonTextStub = '30 char long placeholder text';
const DataSourceStubsForSkeletons = [
  { id: '1', name: RadioButtonTextStub },
  { id: '2', name: RadioButtonTextStub },
  { id: '3', name: RadioButtonTextStub },
  { id: '4', name: RadioButtonTextStub },
]

type DataSourceFormProps = {
  dataSource: DataSource['id'] | null;
  formStep: number;
  handleGoBack: () => void;
  handleSubmitDataSource: (dataSoure: DataSource['id']) => void;
}

export default function DataSourceForm({ dataSource, formStep, handleGoBack, handleSubmitDataSource }: DataSourceFormProps) {
  const [value, setValue] = useState(dataSource || '');
  const [hasSubmissionError, setHasSubmissionError] = useState(false);
  const { data: dataSources } = useDataSourcesQuery();

  // used to mock fetching (actual fetching and loading state would be handled via useQueryDataSources in a real app - see ./api.ts)
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simulate API call/loading and then resolution
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleSetValue = (newValue: string) => {
    setHasSubmissionError(false);
    setValue(newValue);
  }

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // prevent the click event bubbling up to the stepper
    if (value === '') {
      setHasSubmissionError(true);
    } else {
      handleSubmitDataSource(value);
    }
  }

  return (
    <FormControl as="fieldset" isInvalid={hasSubmissionError}>
      <Box mt={4} pl={1} minWidth="300px">
        <RadioGroup onChange={handleSetValue} value={value}>
          <Stack direction="column" spacing={1}>
            {isLoading && (
              <>
                {DataSourceStubsForSkeletons.map((stub) => (
                  <Flex key={stub.id} gap="8px">
                    <Skeleton borderRadius="50%" height="16px" width="16px" position="relative" top="4px"></Skeleton>
                    <Skeleton height="24px"><Radio value={stub.id}>{stub.name}</Radio></Skeleton>
                  </Flex>
                ))}
              </>
            )}
            {!isLoading && (
              <>
                {
                  dataSources?.map((dataSource) => (
                    <Radio key={dataSource.id} value={dataSource.id}>
                      {dataSource.id}
                    </Radio>
                  ))
                }
                {hasSubmissionError && <FormErrorMessage>Selection is required</FormErrorMessage>}
              </>
            )}
          </Stack>
        </RadioGroup>
        <Flex justifyContent="space-between" mt={4}>
          <Button
            colorScheme="gray"
            background="transparent"
            mr={4}
            disabled={formStep === 0}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              event.stopPropagation(); // prevent the click event bubbling up to the stepper
              handleGoBack()
            }}
          >
            Back
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Submit
          </Button>
        </Flex>
      </Box>
    </FormControl>
  )
}
