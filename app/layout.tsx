import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import ReduxProvider from '@/provider/redux-provider';
import ToastProvider from '@/components/ReactToast';
import NProgressProvider from '@/components/NProgress';

const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'MediConn - Book Appointments with Doctors',
  description:
    'MediConn allows users to easily book appointments with doctors of their choice and receive SMS notifications for appointment details and reminders. Simplify your healthcare experience with convenient scheduling and instant updates.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontSans.className}`}>
        <div
          className={
            'antialiased relative  font-sans max-h-screen min-h-screen max-w-[90rem] w-full mx-auto'
          }
        >
          {/* <Image
            src="https://makecards.co/static/media/bg.5d37529d9c1911edd3df9b274733cd95.svg"
            alt="background_Image"
            height={1000}
            width={1000}
            className="absolute top-0 left-0 w-full  min-h-screen object-cover  z-[-20]"
          /> */}
          <ToastProvider>
            <NProgressProvider>
              <ReduxProvider>{children}</ReduxProvider>
            </NProgressProvider>
          </ToastProvider>
        </div>
      </body>
    </html>
  );
}
// px-5 lg:px-8 py-4 xl:px-16
