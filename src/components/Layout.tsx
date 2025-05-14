import {
  Box, 
  Flex,
  Heading,
  HStack,
  Spacer
} from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query';
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { DATA_SOURCES_QUERY_KEY, fetchDataSources } from '../models/DataSources/api';

export const Layout = () => {
  const queryClient = useQueryClient();
  const location = useLocation();

  const handleNewUploadNavigation = () => {
    // cut hundreds of ms off the initial load time of the new upload page
    // by prefetching the data sources query and warming the query cache
    queryClient.prefetchQuery({
      queryKey: DATA_SOURCES_QUERY_KEY,
      queryFn: fetchDataSources, // Replace with your actual fetch function if named differently
    });
  }

  // Determine heading text based on route
  let headingText = "Not found";
  if (location.pathname === "/") {
    headingText = "View Uploads";
  } else if (location.pathname === "/new-upload") {
    headingText = "New Upload";
  }

  return (
    <Box py="6">
      {/* Header navigation */}
      <Flex width="100%" alignItems="center" mb={10} px={[4, 4, 4, 12, /*32, 48, 64*/]}>
        <Box flex="1" display="flex" justifyContent="center" position="absolute" left={0} right={0} pointerEvents="none">
          <Heading
            as="h1"
            size="lg"
            textAlign="center"
            mb="2px"
            pointerEvents="auto"
          >
            {headingText}
          </Heading>
        </Box>
        <Spacer />
        <HStack spacing={4} align="flex-end" ml="auto" zIndex={1}>
          <NavLink
            to="/"
            style={({ isActive }) => ({
              color: '#1a202c', // changed to gray.900
              marginRight: '16px',
              paddingLeft: '4px',
              paddingRight: '4px',
              borderBottom: isActive ? '2px solid #1a202c' : undefined, // changed border color
              fontWeight: isActive ? 'bold' : undefined,
              textDecoration: 'none',
            })}
          >
            View Uploads
          </NavLink>
          <NavLink
            onClick={handleNewUploadNavigation}
            to="/new-upload"
            style={({ isActive }) => ({
              color: '#1a202c', // changed to gray.900
              paddingLeft: '4px',
              paddingRight: '4px',
              borderBottom: isActive ? '2px solid #1a202c' : undefined, // changed border color
              fontWeight: isActive ? 'bold' : undefined,
              textDecoration: 'none',
            })}
          >
            New Upload
          </NavLink>
        </HStack>
      </Flex>

      {/* Content area with Outlet for nested routes */}
      <Box p="5px">
        <Outlet />
      </Box>
    </Box>
  )
}
