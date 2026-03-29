'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-browser'
import { ArrowRight, Loader2, MapPin } from 'lucide-react'
import Link from 'next/link'

export default function NewClusterPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const [formData, setFormData] = useState({
    name: '',
    name_ar: '',
    slug: '',
    city: 'Amman',
    areas: '',
    is_active: false,
    color_hex: '#FBBF24',
    // Delivery config
    base_delivery_fee: '1.50',
    free_delivery_threshold: '15.00',
    standard_delivery_minutes: '90',
    min_order_amount: '3.00',
  })

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Create cluster
      const { data: cluster, error: clusterError } = await supabase
        .from('clusters')
        .insert({
          name: formData.name,
          name_ar: formData.name_ar,
          slug: formData.slug || generateSlug(formData.name),
          city: formData.city,
          areas: formData.areas.split(',').map(a => a.trim()).filter(Boolean),
          is_active: formData.is_active,
          color_hex: formData.color_hex,
        })
        .select()
        .single()

      if (clusterError) throw clusterError

      // Create delivery config
      const { error: configError } = await supabase
        .from('cluster_delivery_config')
        .insert({
          cluster_id: cluster.id,
          base_delivery_fee: parseFloat(formData.base_delivery_fee),
          free_delivery_threshold: parseFloat(formData.free_delivery_threshold),
          standard_delivery_minutes: parseInt(formData.standard_delivery_minutes),
          min_order_amount: parseFloat(formData.min_order_amount),
        })

      if (configError) throw configError

      router.push('/admin/clusters')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء الحفظ')
    }

    setLoading(false)
  }

  return (
    <div className="max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/clusters"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowRight className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">إضافة كلستر جديد</h1>
          <p className="text-gray-500 mt-1">أنشئ منطقة توصيل جديدة</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-sm space-y-5">
          <h2 className="font-semibold text-gray-900 border-b pb-3">معلومات الكلستر</h2>

          {/* Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الاسم (English)
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value, slug: generateSlug(e.target.value) })}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Abdoun"
                required
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الاسم (عربي)
              </label>
              <input
                type="text"
                value={formData.name_ar}
                onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="عبدون"
                required
              />
            </div>
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug (URL)
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="abdoun"
              dir="ltr"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              المدينة
            </label>
            <select
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="Amman">عمّان</option>
              <option value="Irbid">إربد</option>
              <option value="Zarqa">الزرقاء</option>
            </select>
          </div>

          {/* Areas */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الأحياء (مفصولة بفاصلة)
            </label>
            <textarea
              value={formData.areas}
              onChange={(e) => setFormData({ ...formData, areas: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="عبدون، أم أذينة، الصويفية"
              rows={2}
            />
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              اللون
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={formData.color_hex}
                onChange={(e) => setFormData({ ...formData, color_hex: e.target.value })}
                className="w-12 h-12 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={formData.color_hex}
                onChange={(e) => setFormData({ ...formData, color_hex: e.target.value })}
                className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                dir="ltr"
              />
            </div>
          </div>

          {/* Active */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="is_active"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="w-5 h-5 rounded border-gray-300 text-yellow-400 focus:ring-yellow-400"
            />
            <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
              نشط (يظهر للعملاء)
            </label>
          </div>
        </div>

        {/* Delivery Config */}
        <div className="bg-white rounded-xl p-6 shadow-sm space-y-5">
          <h2 className="font-semibold text-gray-900 border-b pb-3">إعدادات التوصيل</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                رسوم التوصيل (JD)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.base_delivery_fee}
                onChange={(e) => setFormData({ ...formData, base_delivery_fee: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                التوصيل مجاني فوق (JD)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.free_delivery_threshold}
                onChange={(e) => setFormData({ ...formData, free_delivery_threshold: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                وقت التوصيل (دقيقة)
              </label>
              <input
                type="number"
                value={formData.standard_delivery_minutes}
                onChange={(e) => setFormData({ ...formData, standard_delivery_minutes: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الحد الأدنى للطلب (JD)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.min_order_amount}
                onChange={(e) => setFormData({ ...formData, min_order_amount: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                dir="ltr"
              />
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4 text-sm">
            {error}
          </div>
        )}

        {/* Submit */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-3 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                جاري الحفظ...
              </>
            ) : (
              <>
                <MapPin className="w-5 h-5" />
                حفظ الكلستر
              </>
            )}
          </button>
          <Link
            href="/admin/clusters"
            className="px-6 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            إلغاء
          </Link>
        </div>
      </form>
    </div>
  )
}
