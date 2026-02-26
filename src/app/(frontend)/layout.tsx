import React from 'react'
import '../globals.css'

export const metadata = {
  description: 'generic recipe app',
  title: 'Recipe App',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <div className="wrapper py-8">
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
