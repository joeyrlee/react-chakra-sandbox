import React, { useEffect } from 'react';
import { useFetchTaskStatuses } from '../../../../models/UploadTaskStatuses/api';
import { LoadingSpinner } from '@components/LoadingSpinner';
import { TaskStatuses } from '@models/UploadTaskStatuses/types';
import { Background, ReactFlow, useEdgesState, useNodesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { AnimatedSVGEdge } from './AnimatedSVGEdge/AnimatedSVGEdge';

const getInitialNodes = (taskStatuses: TaskStatuses) => [
  { id: 'upload_start', position: { x: 0, y: 0 }, data: { label: 'Upload start' }, sourcePosition: 'right', targetPosition: 'left' },
  { id: 'copy_start_1', position: { x: 200, y: 0 }, data: { label: 'Copy start' }, sourcePosition: 'right', targetPosition: 'left' },
  { id: 'copy_start_2', position: { x: 200, y: 0 }, data: { label: 'Copy start' }, sourcePosition: 'bottom', targetPosition: 'top' },
  { id: 'upload_step_one', position: { x: 400, y: 0 }, data: { label: 'Upload step one' }, sourcePosition: 'right', targetPosition: 'left' },
  { id: 'upload_step_two', position: { x: 600, y: 0 }, data: { label: 'Upload step two' }, sourcePosition: 'right', targetPosition: 'left' },
  { id: 'upload_step_three_1', position: { x: 800, y: 0 }, data: { label: 'Upload step three' }, sourcePosition: 'right', targetPosition: 'left' },
  { id: 'upload_step_three_2', position: { x: 800, y: 0 }, data: { label: 'Upload step three' }, sourcePosition: 'bottom', targetPosition: 'top' },
  { id: 'copy_step_one', position: { x: 200, y: 100 }, data: { label: 'Copy step one' }, sourcePosition: 'right', targetPosition: 'top' },
  { id: 'copy_step_two', position: { x: 400, y: 100 }, data: { label: 'Copy step two' }, sourcePosition: 'right', targetPosition: 'left' },
  { id: 'upload_final_step_1', position: { x: 800, y: 100 }, data: { label: 'Upload final step' }, sourcePosition: 'left', targetPosition: 'left' },
  { id: 'upload_final_step_2', position: { x: 800, y: 100 }, data: { label: 'Upload final step' }, sourcePosition: 'top', targetPosition: 'top' },
];
const edgeTypes = {
  animatedSvg: AnimatedSVGEdge,
}
const getInitialEdges = (taskStatuses: TaskStatuses) => [
  { id: 'upload-copy-start', source: 'upload_start', target: 'copy_start_1' },
  { id: 'copy-upload-step-one', source: 'copy_start_1', target: 'upload_step_one' },
  { id: 'copy-e1-2', source: 'copy_start_2', target: 'copy_step_one' },
  { id: 'copy-e2-3', source: 'copy_step_one', target: 'copy_step_two' },
  { id: 'copy-e3-upload-final-step', source: 'copy_step_two', target: 'upload_final_step_1' },
  { id: 'upload-step-one-step-two', source: 'upload_step_one', target: 'upload_step_two' },
  { id: 'upload-step-two-step-three', source: 'upload_step_two', target: 'upload_step_three_1', type: 'animatedSvg' },
  { id: 'upload-step-three-final-step', source: 'upload_step_three_2', target: 'upload_final_step_2' },
];

const UploadTaskStatuses = ({ uploadId }: { uploadId: string }) => {
  const { abort, taskStatuses, error, isLoading } = useFetchTaskStatuses(uploadId);
  const [nodes, , onNodesChange] = useNodesState(getInitialNodes(taskStatuses));
  const [edges, , onEdgesChange] = useEdgesState(getInitialEdges(taskStatuses));
  console.log('isLoading', isLoading);

  useEffect(() => {
    /* update node/edges (for purposes of displayed task status and any animations) on task status changes */
  }, [taskStatuses]);

  // cancel any pending polling requests on unmount
  // to prevent unnecessary network requests / back-end work
  useEffect(() => {
    return () => {
      abort();
    };
  }, [abort])

  if (isLoading) {
    return <LoadingSpinner />;
  } else if (error) {
    return (
      <div>
        <h3>Error loading task statuses</h3>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <h3>Simplified demo for upload {uploadId} task statuses (just missing status indicators)</h3>
      <div style={{ width: '100%', height: '20vh', marginTop: '40px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        style={{ backgroundColor: "#F7F9FB" }}
        fitView
      >
        <Background />
      </ReactFlow>
      </div>
    </div>
  );
}

export default UploadTaskStatuses;
