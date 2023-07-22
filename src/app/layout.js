import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'UI_engine | Documentație',
  description: 'Găsește aici tot ce ai nevoie pentru a începe un proiect cu UI_engine.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
