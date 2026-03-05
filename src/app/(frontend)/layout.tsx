import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import { Button } from '@/components/ui/button'
import '../globals.css'

async function getUser() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })
  return user
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser()
  const payloadConfig = await config
  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <div className="py-8 wrapper">
          <header className="mb-12 text-center">
            <picture>
              <source srcSet="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg" />
            </picture>
            {!user && (
              <h1 className="mb-4 text-4xl font-bold text-gray-900">
                Welcome to this test generic app
              </h1>
            )}
            {user && (
              <h1 className="mb-4 text-4xl font-bold text-gray-900">Welcome back, {user.email}</h1>
            )}

            <div className="flex flex-col gap-4 justify-center items-center sm:flex-row">
              <Button asChild variant="outline">
                <a href={payloadConfig.routes.admin} rel="noopener noreferrer" target="_blank">
                  Go to admin panel
                </a>
              </Button>
            </div>
          </header>

          <main>{children}</main>

          <footer className="pt-8 mt-12 text-center border-t border-gray-200">
            <div className="text-sm text-gray-500">
              <p>remember to set a footer</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
