import { Box, Table, Thead, Tbody, Tr, Th, Td, Badge, IconButton, Collapse } from '@chakra-ui/react'
import { useReactTable, getCoreRowModel, flexRender, ColumnDef, getExpandedRowModel } from '@tanstack/react-table'
import { Upload } from '@models/Uploads/types'
import { lazy, Suspense, useState } from 'react'
import { ChevronRightIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { LoadingSpinner } from '@components/LoadingSpinner'

const UploadTaskStatuses = lazy(() => import('./UploadTaskStatuses/UploadTaskStatuses'))

const uploads: Upload[] = [
  { status: 'in_progress', id: 'DS-003', start_time: '2025-04-17 09:30', copy_source: 'Local Disk', is_production: true },
  { status: 'completed', id: 'DS-002', start_time: '2025-04-16 10:00', copy_source: 'Local Disk', is_production: true },
  { status: 'completed', id: 'DS-001', start_time: '2025-04-15 14:20', copy_source: 'Local Disk', is_production: false },
]

const columns: ColumnDef<Upload>[] = [
  {
    id: 'expander',
    header: '',
    cell: ({ row }) => (
      <IconButton
        aria-label={row.getIsExpanded() ? 'Collapse row' : 'Expand row'}
        icon={row.getIsExpanded() ? <ChevronDownIcon /> : <ChevronRightIcon />}
        size="sm"
        variant="ghost"
        onClick={row.getToggleExpandedHandler()}
        tabIndex={0}
      />
    ),
    size: 32,
    enableSorting: false,
    enableResizing: false,
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: info => {
      const value = info.getValue() as string;
      let colorScheme: string;
      let label: string;
      if (value === 'completed') {
        colorScheme = 'green';
        label = 'Completed';
      } else if (value === 'error') {
        colorScheme = 'red';
        label = 'Error';
      } else {
        colorScheme = 'yellow';
        label = 'In Progress';
      }
      return <Badge colorScheme={colorScheme}>{label}</Badge>;
    },
  },
  {
    header: 'Dataset ID',
    accessorKey: 'id',
  },
  {
    header: 'Start Time',
    accessorKey: 'start_time',
  },
  {
    header: 'Copy Source',
    accessorKey: 'copy_source',
  },
  {
    header: 'Is Production',
    accessorKey: 'is_production',
    cell: info => (info.getValue() ? 'Yes' : 'No'),
  },
];

function UploadsTable() {
  const [expanded, setExpanded] = useState({});
  const table = useReactTable({
    data: uploads,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => true,
    state: { expanded },
    onExpandedChange: setExpanded,
  });

  return (
    <Table variant="simple">
      <Thead>
        {table.getHeaderGroups().map(headerGroup => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <Th key={header.id}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody>
        {table.getRowModel().rows.map(row => (
          <>
            <Tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
              <Tr key={row.id + '-expanded'}>
                <Td colSpan={row.getVisibleCells().length} p={0} border="none">
                  <Collapse in={row.getIsExpanded()} transition={{ exit: { duration: .4 }, enter: { duration: .4 } }}>
                    {/* Expanded content */}
                    {row.getIsExpanded() && (<Box bg="gray.50" p={4}>
                        <Suspense fallback={<LoadingSpinner />}>
                          <UploadTaskStatuses uploadId={row.original.id} />
                        </Suspense>
                      </Box>
                    )}
                  </Collapse>
                </Td>
              </Tr>
          </>
        ))}
      </Tbody>
    </Table>
  );
}

export default UploadsTable
