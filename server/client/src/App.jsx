import React from 'react';
import { toast, Toaster } from 'sonner'
import AppRoute from './App.Route';

export default function App() {
  return (
    <>
      <Toaster richColors />
      <AppRoute />
    </>

  )
}
