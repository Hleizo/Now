import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { Plus, Search, Filter, MoreVertical, MapPin, Clock, Users } from 'lucide-react'
import Link from 'next/link'

async function getClusters() {
  const supabase = await createClient()
  
  const { data: clusters } = await supabase
    .from('clusters')
    .select(`
      *,
      cluster_delivery_config (*)
    `)
    .order('sort_order')

  // Get store counts per cluster
  const { data: storeCounts } = await supabase
    .from('stores')
    .select('cluster_id')
    .eq('status', 'approved')

  const storeCountMap: Record<string, number> = {}
  storeCounts?.forEach((s) => {
    storeCountMap[s.cluster_id] = (storeCountMap[s.cluster_id] || 0) + 1
  })

  return clusters?.map(c => ({
    ...c,
    storeCount: storeCountMap[c.id] || 0
  })) || []
}

export default async function ClustersPage() {
  const clusters = await getClusters()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">الكلسترات</h1>
          <p className="text-gray-500 mt-1">إدارة مناطق التوصيل</p>
        </div>
        <Link
          href="/admin/clusters/new"
          className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium px-4 py-2.5 rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          إضافة كلستر
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="بحث في الكلسترات..."
            className="w-full bg-gray-100 rounded-lg pr-10 pl-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50">
          <Filter className="w-4 h-4" />
          فلتر
        </button>
      </div>

      {/* Clusters Grid */}
      {clusters.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
          <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد كلسترات</h3>
          <p className="text-gray-500 mb-4">ابدأ بإضافة أول منطقة توصيل</p>
          <Link
            href="/admin/clusters/new"
            className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium px-4 py-2.5 rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            إضافة كلستر
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clusters.map((cluster) => (
            <Link
              key={cluster.id}
              href={`/admin/clusters/${cluster.id}`}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: cluster.color_hex || '#FBBF24' }}
                  >
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{cluster.name_ar || cluster.name}</h3>
                    <p className="text-sm text-gray-500">{cluster.city}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  cluster.is_active 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {cluster.is_active ? 'نشط' : 'غير نشط'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{cluster.storeCount} متجر</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{cluster.cluster_delivery_config?.[0]?.standard_delivery_minutes || 90} دقيقة</span>
                </div>
              </div>

              {cluster.areas && cluster.areas.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1">
                  {cluster.areas.slice(0, 3).map((area: string) => (
                    <span key={area} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {area}
                    </span>
                  ))}
                  {cluster.areas.length > 3 && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      +{cluster.areas.length - 3}
                    </span>
                  )}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
