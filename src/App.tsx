import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ViewUploads from './pages/ViewUploads/ViewUploads'
import NotFound from './pages/NotFound'
import { Suspense, lazy } from 'react'
import { Layout, LoadingSpinner } from './components'

const NewUpload = lazy(() => import('./pages/NewUpload/NewUpload'))

const router = createBrowserRouter([
  {
    element: (
      <Layout />
    ),
    children: [
      { path: '/', element: <ViewUploads /> },
      { 
        path: '/new-upload', 
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <NewUpload />
          </Suspense>
        ),
      },
      { path: '*', element: <NotFound /> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
