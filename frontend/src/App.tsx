import { Route, Routes } from 'react-router-dom'
import { ProtectedRoutes } from './components/ProtectedRoutes'
import Home from './pages/Home'

import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <Routes>
        <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default App
