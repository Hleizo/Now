import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  // Check admin role
  const { data: userRoles } = await supabase
    .from('user_roles')
    .select(`
      roles (name)
    `)
    .eq('user_id', user.id)
    .eq('is_active', true)

  const isAdmin = userRoles?.some(
    (ur: any) => ur.roles?.name === 'admin' || ur.roles?.name === 'super_admin'
  )

  if (!isAdmin) {
    redirect('/admin/login')
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-gray-100" dir="rtl">
      <AdminSidebar />
      <div className="mr-64">
        <AdminHeader user={user} profile={profile} />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
