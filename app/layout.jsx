import '@styles/globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@components/Navbar'
import Providers from '@components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Todo',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}