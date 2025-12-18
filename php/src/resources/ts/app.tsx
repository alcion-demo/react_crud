import './bootstrap';
import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import React from 'react';  

createInertiaApp({
  resolve: name => import(`./Pages/${name}.tsx`),
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})
