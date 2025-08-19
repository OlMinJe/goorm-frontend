import { createBrowserRouter, RouterProvider } from 'react-router'

import DefaultLayout from './layouts/Default'
import MyApp from './pages/MyApp'
import Rate from './pages/Rate'
import Todo from './pages/Todo'
import User from './pages/User'

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        path: '',
        element: <MyApp />,
      },
      {
        path: 'user',
        element: <User />,
      },
      {
        path: 'todo',
        element: <Todo />,
      },
      {
        path: 'rate',
        element: <Rate />,
      },
    ],
  },
])

export default function Router() {
  return <RouterProvider router={router} />
}
