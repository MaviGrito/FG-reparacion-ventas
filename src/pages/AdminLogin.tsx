import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import LoginForm from '../components/admin/LoginForm'
import Spinner from '../components/common/Spinner'

export default function AdminLogin() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && user) navigate('/admin/dashboard', { replace: true })
  }, [user, loading, navigate])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-dark">
      <Spinner />
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark to-navy flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="font-poppins font-bold text-2xl text-navy">F&amp;G</h1>
          <p className="font-inter text-sm text-textMain/60 mt-1">Panel de Administración</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
