import { AuthContext } from './context/ThemeContext'

import AppRoutes from '@/router'

function App() {
  const currentUser = { name: 'MinJe' }

  return (
    <AuthContext value={currentUser}>
      <AppRoutes />
    </AuthContext>
  )
}

export default App
