import { Suspense } from 'react';
import './style.css';

import clsx from 'clsx';

import DashboardNav from './_components/DashboardNav';
import DashboardAside from './_components/DashboardAside';
import SmallScreenSideBar from './_components/SmallScreenSidebar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" h-screen max-w-[90rem] w-full mx-auto">
      <Suspense>
        <SmallScreenSideBar />
        <div className="grid  xl:grid-cols-[auto_1fr] relative">
          <DashboardAside />
          <div className="w-full flex flex-col  min-h-screen ">
            <DashboardNav />
            <div className="bg-[#131619a6] flex-1  ">{children}</div>
          </div>
        </div>
      </Suspense>
    </div>
  );
}
// bg-[#000000bb]
