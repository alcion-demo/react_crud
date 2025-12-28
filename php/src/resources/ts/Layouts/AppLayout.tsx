import { ReactNode } from 'react'
import Header from '@/Components/Header'

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  )
}
