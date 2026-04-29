import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface FormValues {
  name: string
  email: string
  phone: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values: FormValues, t: (k: string) => string): FormErrors {
  const errors: FormErrors = {}
  if (!values.name.trim()) errors.name = t('contact.required')
  if (!values.email.trim()) {
    errors.email = t('contact.required')
  } else if (!EMAIL_REGEX.test(values.email)) {
    errors.email = t('contact.invalid_email')
  }
  if (!values.message.trim()) errors.message = t('contact.required')
  return errors
}

export default function ContactForm() {
  const { t } = useTranslation()
  const [values, setValues] = useState<FormValues>({ name: '', email: '', phone: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const inputClass =
    'w-full px-4 py-3 rounded-xl border-2 border-border font-inter text-sm focus:outline-none focus:border-coral transition-colors'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate(values, t)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setStatus('loading')
    try {
      await new Promise<void>(resolve => setTimeout(resolve, 1000))
      setStatus('success')
      setValues({ name: '', email: '', phone: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-poppins font-bold text-xl text-dark mb-2">{t('contact.success_title')}</h3>
        <p className="font-inter text-textMain/70">{t('contact.success_msg')}</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 font-poppins font-semibold px-6 py-3 rounded-xl bg-navy text-white hover:bg-navy/90 transition-colors"
        >
          {t('contact.submit')}
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="font-poppins font-bold text-3xl text-dark">{t('contact.title')}</h2>
        <p className="font-inter text-textMain/70 mt-2">{t('contact.subtitle')}</p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div>
          <label className="block font-inter text-sm font-medium text-textMain mb-1">{t('contact.name')}</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            className={inputClass}
          />
          {errors.name && <p className="font-inter text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block font-inter text-sm font-medium text-textMain mb-1">{t('contact.email')}</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            className={inputClass}
          />
          {errors.email && <p className="font-inter text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block font-inter text-sm font-medium text-textMain mb-1">{t('contact.phone')}</label>
          <input
            type="tel"
            name="phone"
            value={values.phone}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block font-inter text-sm font-medium text-textMain mb-1">{t('contact.message')}</label>
          <textarea
            name="message"
            value={values.message}
            onChange={handleChange}
            rows={5}
            className={inputClass}
          />
          {errors.message && <p className="font-inter text-xs text-red-500 mt-1">{errors.message}</p>}
        </div>

        {status === 'error' && (
          <p className="font-inter text-sm text-red-500">{t('contact.error_msg')}</p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full font-poppins font-semibold py-3 rounded-xl bg-coral text-white hover:bg-coral/90 transition-colors disabled:opacity-60"
        >
          {status === 'loading' ? t('contact.sending') : t('contact.submit')}
        </button>
      </form>
    </div>
  )
}
