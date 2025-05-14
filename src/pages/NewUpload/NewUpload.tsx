import { 
  Box,
  VStack
} from '@chakra-ui/react'
import NewUploadWizard from './NewUploadWizard/NewUploadWizard'

export default function NewUpload() {
  return (
    <VStack spacing={4} align="stretch">
      <Box p={5}>
        <NewUploadWizard />
      </Box>
    </VStack>
  )
}
