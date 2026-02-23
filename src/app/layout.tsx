import './globals.css'

export const metadata = {
  title: 'Recipe Collection',
  description: 'A collection of delicious recipes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
