import { Geist, Geist_Mono } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';

export const metadata = {
  title: 'ShopNow E-Commerce',
  description: 'Your one-stop shop for all your needs',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children })
{
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navigation />
          <main>
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
