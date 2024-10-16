'use client';

import NavBar from '@/components/NavBar';
import Sidebar from '@/components/Sidebar';
import ToggleComp from '@/components/ToggleComp';

import Image from 'next/image';


const Landing = () => {
 
  return (
    <div className="min-h-screen max-h-screen relative overflow-hidden">
      <Sidebar />
      <header className="section-header min-h-screen max-h-screen relative">
        <NavBar />
        <div className="px-8 lg:px-14 pt-4 xl:px-28 flex flex-col justify-between lg:justify-normal lg:flex-row items-center lg:items-start">
          <div className="w-full max-w-[550px] text-[#496A8D] flex flex-col gap-4 items-center lg:items-start text-center lg:text-left text-pretty">
            <h1 className="text-xl md:text-3xl xl:text-5xl font-bold">
              Book Appointments with Top Doctors Anytime, Anywhere!
            </h1>
            <div className="relative glass-background pt-4 pb-2 px-2 flex flex-col gap-5">
              <p className=" text-sm font-medium md:text-lg  xl:text-xl">
                Find the right doctor for you and schedule appointments with
                ease through our user-friendly platform.
              </p>

              <ToggleComp
                notActive="get appointment"
                type="Hero"
                className="xl:ml-16 self-end"
                link="/login"
              />
            </div>
          </div>

          <div className="flex relative h-full ">
            <Image
              src="/assets/images/landing-doc.png"
              alt="image"
              width={1000}
              height={1000}
              className="w-[28rem] lg:h-[35rem] h-[50%] mt-0 lg:mt-20  object-contain relative z-10"
            />
         
            <Image
              src="/assets/svgs/doc.svg"
              alt="image"
              width={100}
              height={100}
              className="absolute top-6 left-[5rem] md:left-[8rem] xl:left-[15rem] block  xl:inset-0  w-[18rem] h-[18rem] object-contain"
            />
          </div>
        </div>
      </header>
      {/* <WhyUs />
      <MarqueeSlider /> */}
    </div>
  );
};
export default Landing;
