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
  return children
}
