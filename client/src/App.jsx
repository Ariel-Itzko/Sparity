import React from 'react';
import { toast, Toaster } from 'sonner'
import AppRoute from './app.route';

export default function App() {
  return (
    <>
      <Toaster richColors />
      <AppRoute />
    </>

  )
}
