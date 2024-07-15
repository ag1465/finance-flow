import '@/app/globals.css'; // Import your global CSS here
import Navbar from '@/components/NavBar';
import ReduxProvider from './providers/ReduxProvider';

export const metadata = {
  title: 'Finance-Flow',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Navbar />  
          <main>{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}