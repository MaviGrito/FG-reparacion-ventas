import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { signIn } from '../../services/authService'

export default function LoginForm() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(email, password)
      navigate('/admin/dashboard')
    } catch (err: unknown) {
      setError(t((err as Error).message || 'errors.generic'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block font-inter text-sm font-medium text-textMain mb-1">{t('admin.email')}</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl border-2 border-border font-inter text-sm focus:outline-none focus:border-coral transition-colors"
        />
      </div>
      <div>
        <label className="block font-inter text-sm font-medium text-textMain mb-1">{t('admin.password')}</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl border-2 border-border font-inter text-sm focus:outline-none focus:border-coral transition-colors"
        />
      </div>
      {error && <p className="font-inter text-sm text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full font-poppins font-semibold py-3 rounded-xl bg-navy text-white hover:bg-navy/90 transition-colors disabled:opacity-60"
      >
        {loading ? t('admin.saving') : t('admin.login_btn')}
      </button>
    </form>
  )
}
