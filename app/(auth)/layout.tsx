import React from 'react'
import Logo from '@/components/Logo'

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen gap-4 flex flex-col items-center justify-center">
      <Logo />
      {children}
    </div>
  )
}

export default layout
