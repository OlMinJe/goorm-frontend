import { NavLink } from 'react-router'

import { ROUTES } from '@/lib/routes'

export default function Header({ children }) {
  return (
    <header className="w-full p-3 text-lg sticky top-0">
      <div className="p-3 border-1 border-gray-300 rounded-xl bg-white flex justify-between">
        <div className="flex items-center">
          {children}
          <h1 className="ml-3 font-bold">MyApp</h1>
        </div>
        <nav>
          <NavLink
            to={ROUTES.AUTH.LOGIN}
            className="mr-1 py-2 px-4 rounded-md bg-blue-200 text-gray-600"
          >
            Login
          </NavLink>
          <NavLink
            to={ROUTES.AUTH.REGISTER}
            className="py-2 px-4 rounded-md bg-blue-200  text-gray-600"
          >
            Join
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
