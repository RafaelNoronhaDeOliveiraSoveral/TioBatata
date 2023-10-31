import "./globals.css"

export const metadata = {
  title: 'Tio Batata',
  description: 'Criado por Rafael Noronha',
}

export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
