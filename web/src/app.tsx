import { Toaster } from 'sonner'
import { Room } from './pages/room'
import { queryClient } from './lib/react-query'
import { CreateRoom } from './pages/create-rrom'
import { QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <CreateRoom />
  },
  {
    path: '/room/:roomId',
    element: <Room />
  }
])

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster invert richColors/>
    </QueryClientProvider>
  )
}