import '../css/app.css'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { router } from '@inertiajs/react'

createInertiaApp({
  resolve: name =>
    resolvePageComponent(
      `./Pages/${name}.tsx`,
      import.meta.glob('./Pages/**/*.tsx')
    ),
  setup({ el, App, props }) {
    // props:ページ情報
    createRoot(el).render(<App {...props} />)
  },
  progress: {
    color: '#4B5563',
  },
})

function redirectToLogin(message?: string) {
  if (message) alert(message)
  router.visit('/auth/login', { replace: true })
}

router.on('error', (error) => {
  const status = (error as any)?.response?.status
  // Laravel 419 は body が空で status だけ返る
  if (status === 419) {
    redirectToLogin('セッションが切れました。再ログインしてください')
  }

  if (status === 401 || status === 403) {
    redirectToLogin()
  }
})
