import type { Metadata } from 'next'
import '../../style/globals.css'

export const metadata: Metadata = {
  title: 'Auth screen admin panel',
  description: 'Welcome to the store admin panel',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
  <div className="h-[100vh] flex justify-center items-center">
    {children}
  </div>
  )
}
