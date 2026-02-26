import './globals.css'
import Image from 'next/image'
import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Recipe Collection',
  description: 'A collection of delicious recipes',
}

async function getUser() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })
  return user
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser()
  const payloadConfig = await config
  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <div className="wrapper py-8">
          <header className="mb-12 text-center">
            <picture>
              <source srcSet="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg" />
              {/* <Image
                alt="Recipe Collection Logo"
                height={65}
                src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg"
                width={65}
                className="mx-auto mb-6"
              /> */}
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
