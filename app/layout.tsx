import Navbar from '@/components/navbar/Navbar'
import './globals.css'
import { Nunito } from 'next/font/google'
import ClientOnly from '@/components/ClientOnly'

const font = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone using nextjs13',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        {/* client only to protect from hydration errors  */}
        <ClientOnly>
        <Navbar/>
        </ClientOnly>
       
        {children}
        </body>
    </html>
  )
}
