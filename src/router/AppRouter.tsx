import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Spinner from '../components/common/Spinner'
import ProtectedRoute from './ProtectedRoute'

const Home = lazy(() => import('../pages/Home'))
const Servicios = lazy(() => import('../pages/Servicios'))
const Productos = lazy(() => import('../pages/Productos'))
const Contacto = lazy(() => import('../pages/Contacto'))
const AdminLogin = lazy(() => import('../pages/AdminLogin'))
const AdminDashboard = lazy(() => import('../pages/AdminDashboard'))

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-dark"><Spinner /></div>}>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </Suspense>
    </BrowserRouter>
  )
}
