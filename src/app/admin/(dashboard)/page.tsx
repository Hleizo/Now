import { createClient } from '@/lib/supabase-server'
import { 
  ShoppingBag, 
  Store, 
  Package, 
  Users, 
  MapPin,
  TrendingUp,
  AlertCircle
} from 'lucide-react'

async function getStats() {
  const supabase = await createClient()
  
  const [
    { count: ordersCount },
    { count: storesCount },
    { count: productsCount },
    { count: pendingStores },
    { count: pendingProducts },
    { count: clustersCount }
  ] = await Promise.all([
    supabase.from('orders').select('*', { count: 'exact', head: true }),
    supabase.from('stores').select('*', { count: 'exact', head: true }).eq('status', 'approved'),
    supabase.from('products').select('*', { count: 'exact', head: true }).eq('status', 'approved'),
    supabase.from('stores').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('products').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('clusters').select('*', { count: 'exact', head: true }).eq('is_active', true),
  ])

  return {
    orders: ordersCount || 0,
    stores: storesCount || 0,
    products: productsCount || 0,
    pendingStores: pendingStores || 0,
    pendingProducts: pendingProducts || 0,
    clusters: clustersCount || 0,
  }
}

export default async function AdminDashboardPage() {
  const stats = await getStats()

  const statCards = [
    {
      title: 'الطلبات',
      value: stats.orders,
      icon: ShoppingBag,
      color: 'bg-blue-500',
      href: '/admin/orders'
    },
    {
      title: 'المتاجر النشطة',
      value: stats.stores,
      icon: Store,
      color: 'bg-green-500',
      href: '/admin/stores'
    },
    {
      title: 'المنتجات',
      value: stats.products,
      icon: Package,
      color: 'bg-purple-500',
      href: '/admin/products'
    },
    {
      title: 'الكلسترات',
      value: stats.clusters,
      icon: MapPin,
      color: 'bg-yellow-500',
      href: '/admin/clusters'
    },
  ]

  const pendingCards = [
    {
      title: 'متاجر بانتظار الموافقة',
      value: stats.pendingStores,
      icon: Store,
      href: '/admin/stores?status=pending'
    },
    {
      title: 'منتجات بانتظار الموافقة',
      value: stats.pendingProducts,
      icon: Package,
      href: '/admin/products?status=pending'
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">لوحة التحكم</h1>
        <p className="text-gray-500 mt-1">مرحباً بك في لوحة تحكم Now</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <a
            key={card.title}
            href={card.href}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{card.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{card.value}</p>
              </div>
              <div className={`${card.color} p-3 rounded-lg`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Pending Approvals */}
      {(stats.pendingStores > 0 || stats.pendingProducts > 0) && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            <h2 className="text-lg font-semibold text-yellow-800">بانتظار الموافقة</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingCards.map((card) => (
              card.value > 0 && (
                <a
                  key={card.title}
                  href={card.href}
                  className="flex items-center justify-between bg-white rounded-lg p-4 hover:bg-yellow-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <card.icon className="w-5 h-5 text-yellow-600" />
                    <span className="text-gray-700">{card.title}</span>
                  </div>
                  <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold">
                    {card.value}
                  </span>
                </a>
              )
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">إجراءات سريعة</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a
            href="/admin/clusters"
            className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-gray-200 hover:border-yellow-400 hover:bg-yellow-50 transition-colors"
          >
            <MapPin className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-600">إضافة كلستر</span>
          </a>
          <a
            href="/admin/stores?status=pending"
            className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-gray-200 hover:border-yellow-400 hover:bg-yellow-50 transition-colors"
          >
            <Store className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-600">مراجعة المتاجر</span>
          </a>
          <a
            href="/admin/products?status=pending"
            className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-gray-200 hover:border-yellow-400 hover:bg-yellow-50 transition-colors"
          >
            <Package className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-600">مراجعة المنتجات</span>
          </a>
          <a
            href="/admin/settings"
            className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-gray-200 hover:border-yellow-400 hover:bg-yellow-50 transition-colors"
          >
            <TrendingUp className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-600">الإعدادات</span>
          </a>
        </div>
      </div>
    </div>
  )
}
