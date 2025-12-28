import { usePage } from '@inertiajs/react'

export default function Header() {
// usePage() → 今表示している Inertia ページ
// .props → Laravel から渡されたデータ
// auth.user → ログインユーザー情報
  const { auth } = usePage().props as any

  return (
    <header className="p-4 bg-gray-100 flex justify-between">
      <div>My App</div>
      <div>
        {auth?.user ? `Hello, ${auth.user.name}` : 'Guest'}
      </div>
    </header>
  )
}
