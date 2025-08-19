import { Button } from '@/components/ui/button'

export default function Header({ children }) {
  return (
    <header className="w-full p-3 text-lg sticky top-0">
      <div className="p-3 border-1 border-gray-300 rounded-xl bg-white flex justify-between">
        <div className="flex items-center">
          {children}
          <h1 className="ml-3 font-bold">MyApp</h1>
        </div>
        <nav>
          <Button className="mr-1">Login</Button>
          <Button>Join</Button>
        </nav>
      </div>
    </header>
  )
}
