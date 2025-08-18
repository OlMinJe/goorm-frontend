export default function Header({ children }) {
  return (
    <header className="w-full p-3 bg-green-500 text-lg flex">
      {children}
      <h1 className="white f-">사이트명</h1>
    </header>
  )
}
