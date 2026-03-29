'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-browser'
import { Eye, EyeOff, Lock, Mail, Loader2 } from 'lucide-react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        setError('البريد الإلكتروني أو كلمة المرور غير صحيحة')
        setLoading(false)
        return
      }

      if (data.user) {
        // Check if user has admin role
        const { data: userRoles } = await supabase
          .from('user_roles')
          .select(`
            roles (name)
          `)
          .eq('user_id', data.user.id)
          .eq('is_active', true)

        const isAdmin = userRoles?.some(
          (ur: any) => ur.roles?.name === 'admin' || ur.roles?.name === 'super_admin'
        )

        if (!isAdmin) {
          await supabase.auth.signOut()
          setError('ليس لديك صلاحية الوصول للوحة التحكم')
          setLoading(false)
          return
        }

        router.push('/admin')
        router.refresh()
      }
    } catch (err) {
      setError('حدث خطأ. حاول مرة أخرى.')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-yellow-400">Now</h1>
          <p className="text-gray-400 mt-2">لوحة تحكم المسؤول</p>
        </div>

        {/* Login Card */}
        <div className="bg-gray-800 rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            تسجيل الدخول
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-gray-300 text-sm mb-2">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-700 text-white rounded-lg pr-10 pl-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="admin@now.jo"
                  required
                  dir="ltr"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-300 text-sm mb-2">
                كلمة المرور
              </label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-700 text-white rounded-lg pr-10 pl-12 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="••••••••"
                  required
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  جاري الدخول...
                </>
              ) : (
                'دخول'
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          © 2024 Now Marketplace. جميع الحقوق محفوظة.
        </p>
      </div>
    </div>
  )
}
