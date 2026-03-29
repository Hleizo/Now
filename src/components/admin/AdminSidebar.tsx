'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  MapPin,
  Store,
  Package,
  ShoppingBag,
  Tag,
  Settings,
  Palette,
  DollarSign,
  Users,
  FileText,
  Bell,
  BarChart3,
  LogOut,
} from 'lucide-react'

const menuItems = [
  {
    title: 'الرئيسية',
    items: [
      { name: 'لوحة التحكم', href: '/admin', icon: LayoutDashboard },
    ]
  },
  {
    title: 'إدارة المتجر',
    items: [
      { name: 'الكلسترات', href: '/admin/clusters', icon: MapPin },
      { name: 'المتاجر', href: '/admin/stores', icon: Store },
      { name: 'المنتجات', href: '/admin/products', icon: Package },
      { name: 'الطلبات', href: '/admin/orders', icon: ShoppingBag },
      { name: 'التصنيفات', href: '/admin/categories', icon: Tag },
    ]
  },
  {
    title: 'المحتوى',
    items: [
      { name: 'الصفحة الرئيسية', href: '/admin/homepage', icon: Palette },
      { name: 'الصفحات', href: '/admin/pages', icon: FileText },
    ]
  },
  {
    title: 'الإعدادات',
    items: [
      { name: 'التسعير', href: '/admin/pricing', icon: DollarSign },
      { name: 'المستخدمين', href: '/admin/users', icon: Users },
      { name: 'الإعدادات', href: '/admin/settings', icon: Settings },
    ]
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed right-0 top-0 h-screen w-64 bg-gray-900 text-white overflow-y-auto">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center">
            <span className="text-gray-900 font-bold text-xl">N</span>
          </div>
          <div>
            <h1 className="font-bold text-lg">Now Admin</h1>
            <p className="text-xs text-gray-400">لوحة التحكم</p>
          </div>
        </Link>
      </div>

      {/* Menu */}
      <nav className="p-4 space-y-6">
        {menuItems.map((section) => (
          <div key={section.title}>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== '/admin' && pathname.startsWith(item.href))
                
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-yellow-400 text-gray-900'
                          : 'text-gray-300 hover:bg-gray-800'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
        <form action="/api/auth/logout" method="POST">
          <button
            type="submit"
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">تسجيل الخروج</span>
          </button>
        </form>
      </div>
    </aside>
  )
}
