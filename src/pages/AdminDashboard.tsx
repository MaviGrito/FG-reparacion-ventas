import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../hooks/useAuth'
import { useProducts } from '../hooks/useProducts'
import { signOut } from '../services/authService'
import { deleteProduct } from '../services/firestoreService'
import ProductForm from '../components/admin/ProductForm'
import SettingsForm from '../components/admin/SettingsForm'
import Spinner from '../components/common/Spinner'
import type { Product } from '../types'

type Tab = 'products' | 'settings'

export default function AdminDashboard() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { products, loading, retry } = useProducts()
  const [tab, setTab] = useState<Tab>('products')
  const [showForm, setShowForm] = useState(false)
  const [editProduct, setEditProduct] = useState<Product | undefined>(undefined)

  if (!user) {
    navigate('/admin', { replace: true })
    return null
  }

  const handleLogout = async () => {
    await signOut()
    navigate('/admin')
  }

  const handleDelete = async (product: Product) => {
    if (!window.confirm(t('admin.delete_confirm'))) return
    try {
      await deleteProduct(product.id)
      retry()
    } catch {
      alert(t('errors.generic'))
    }
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditProduct(undefined)
    retry()
  }

  const handleEdit = (product: Product) => {
    setEditProduct(product)
    setShowForm(true)
  }

  const handleAdd = () => {
    setEditProduct(undefined)
    setShowForm(true)
  }

  const tabClass = (active: boolean) =>
    `font-poppins font-semibold px-6 py-3 text-sm transition-colors border-b-2 ${
      active ? 'border-coral text-coral' : 'border-transparent text-textMain/60 hover:text-textMain'
    }`

  return (
    <div className="min-h-screen bg-light">
      {/* Header */}
      <header className="bg-white border-b border-border px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <h1 className="font-poppins font-bold text-xl text-navy">F&amp;G Admin</h1>
        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-inter text-sm px-4 py-2 rounded-xl border-2 border-border hover:border-navy transition-colors"
          >
            {t('admin.view_site')}
          </a>
          <button
            onClick={handleLogout}
            className="font-inter text-sm px-4 py-2 rounded-xl bg-dark text-white hover:bg-dark/80 transition-colors"
          >
            {t('admin.logout_btn')}
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-border px-4 sm:px-6 lg:px-8 flex gap-2">
        <button className={tabClass(tab === 'products')} onClick={() => setTab('products')}>
          {t('admin.products_title')}
        </button>
        <button className={tabClass(tab === 'settings')} onClick={() => setTab('settings')}>
          {t('admin.settings_title')}
        </button>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Products Tab */}
        {tab === 'products' && (
          <div>
            {showForm ? (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="font-poppins font-bold text-lg text-dark mb-6">
                  {editProduct ? t('admin.edit_product') : t('admin.add_product')}
                </h2>
                <ProductForm
                  product={editProduct}
                  onSuccess={handleFormSuccess}
                  onCancel={() => { setShowForm(false); setEditProduct(undefined) }}
                />
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-poppins font-bold text-xl text-dark">{t('admin.products_title')}</h2>
                  <button
                    onClick={handleAdd}
                    className="font-poppins font-semibold px-5 py-2.5 rounded-xl bg-coral text-white hover:bg-coral/90 transition-colors text-sm"
                  >
                    + {t('admin.add_product')}
                  </button>
                </div>

                {loading ? (
                  <div className="flex justify-center py-16"><Spinner size="lg" /></div>
                ) : products.length === 0 ? (
                  <div className="text-center py-16 font-inter text-textMain/60">{t('products.empty_title')}</div>
                ) : (
                  <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-light border-b border-border">
                        <tr>
                          <th className="text-left font-poppins font-semibold text-textMain px-4 py-3 w-16"></th>
                          <th className="text-left font-poppins font-semibold text-textMain px-4 py-3">{t('admin.name_es')}</th>
                          <th className="text-left font-poppins font-semibold text-textMain px-4 py-3 hidden sm:table-cell">{t('admin.price')}</th>
                          <th className="text-left font-poppins font-semibold text-textMain px-4 py-3 hidden md:table-cell">{t('admin.category')}</th>
                          <th className="text-left font-poppins font-semibold text-textMain px-4 py-3 hidden md:table-cell">{t('admin.status')}</th>
                          <th className="px-4 py-3"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {products.map(p => (
                          <tr key={p.id} className="hover:bg-light/50 transition-colors">
                            <td className="px-4 py-3">
                              {p.imageUrl ? (
                                <img src={p.imageUrl} alt={p.name.es} className="w-10 h-10 object-cover rounded-lg" />
                              ) : (
                                <div className="w-10 h-10 bg-border rounded-lg" />
                              )}
                            </td>
                            <td className="px-4 py-3 font-inter text-textMain">{p.name.es}</td>
                            <td className="px-4 py-3 font-inter text-textMain hidden sm:table-cell">${p.price}</td>
                            <td className="px-4 py-3 font-inter text-textMain hidden md:table-cell capitalize">{p.category}</td>
                            <td className="px-4 py-3 hidden md:table-cell">
                              <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-inter font-medium ${
                                p.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                              }`}>
                                {p.status === 'available' ? t('products.available') : t('products.out_of_stock')}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2 justify-end">
                                <button
                                  onClick={() => handleEdit(p)}
                                  className="font-inter text-xs px-3 py-1.5 rounded-lg border border-border hover:border-navy transition-colors"
                                >
                                  {t('admin.edit_product')}
                                </button>
                                <button
                                  onClick={() => handleDelete(p)}
                                  className="font-inter text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                                >
                                  {t('admin.delete_product')}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {tab === 'settings' && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-poppins font-bold text-lg text-dark mb-6">{t('admin.settings_title')}</h2>
            <SettingsForm />
          </div>
        )}
      </main>
    </div>
  )
}
