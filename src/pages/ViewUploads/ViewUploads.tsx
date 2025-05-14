import { Suspense, lazy } from 'react'
import { VStack, Heading, Box } from '@chakra-ui/react'
import UploadsTable from './UploadsTable/UploadsTable'
import { LoadingSpinner } from '@components/LoadingSpinner'

const Logs = lazy(() => import('./Logs/Logs'))

function ViewUploads() {
  return (
    <Box px={[0, 0, 0, 12, /*32, 48, 64*/]}>
      <VStack spacing={4} align="stretch">
        <UploadsTable />
        <Heading as="h2" size="lg" textAlign="center" my={4}>Logs</Heading>
        <Suspense fallback={<LoadingSpinner />}>
          <Logs />
        </Suspense>
      </VStack>
    </Box>
  )
}

export default ViewUploads
