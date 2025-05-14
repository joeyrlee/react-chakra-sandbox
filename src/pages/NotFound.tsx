import { Heading, Text, Link, VStack, Icon } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { FiAlertTriangle } from 'react-icons/fi'

function NotFound() {
  return (
    <VStack spacing={6} align="center" py={10}>
      <Icon as={FiAlertTriangle} boxSize={12} color="orange.400" />
      <Heading as="h1" size="xl">404 - Page Not Found</Heading>
      <Text fontSize="lg">The page you are looking for doesn't exist or has been moved.</Text>
      <Link as={RouterLink} to="/" color="blue.500" fontWeight="bold">
        Return to View Uploads
      </Link>
    </VStack>
  )
}

export default NotFound
