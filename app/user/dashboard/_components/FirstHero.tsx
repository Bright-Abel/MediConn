'use client';

import Link from 'next/link';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { GoCreditCard } from 'react-icons/go';
import { GrTransaction } from 'react-icons/gr';

const FirstHero = ({
  pendingCount,
  scheduledCount,
  name,
}: {
  pendingCount: number;
  scheduledCount: number;
  name: string;
}) => {
  return (
    <div className=" relative">
      <section>
        <p className="text-[#65696b] font-bold text-[1rem] mb-[0.5rem]">
          Overview
        </p>

        <div className="bg-[#f1f5f8] rounded-[12px] shadow-lg grid gap-y-4 grid-cols-1 lg:grid-cols-5 py-6 px-8 lg:place-items-center">
          <div className="flex justify-between items-center flex-row lg:flex-col lg:items-start w-full gap-y-2 gap-x-8 md:my-2 lg:my-0 flex-wrap">
            <h3>
              Welcome, <span className="font-bold">{name.split(' ')[0]}</span>
            </h3>
            <Link
              href="/user/dashboard/appointment"
              className="flex gap-2 items-center duration-500 justify-center text-teal-500 text-sm text-primary hover:opacity-70 cursor-pointer font-medium"
            >
              Make an appointment
              <IoIosArrowRoundForward className="text-[1.6rem] text-current" />
            </Link>
          </div>
          <div className="h-full border-gray-200 border-l border-solid"></div>

          <div className="py-5 lg:py-0 border-y lg:border-y-0 flex items-center gap-6">
            <div className="grid rounded-full text-teal-500 bg-[#F1FFFD] p-4">
              <GoCreditCard />
            </div>

            <div className="">
              <h4 className="font-bold text-lg">{scheduledCount}</h4>
              <p>Scheduled appointment</p>
            </div>
          </div>
          <div className="h-full  border-gray-200 border-l border-solid"></div>

          <div className=" py-0 flex items-center gap-6">
            <div className="rounded-full text-teal-500 bg-[#F1FFFD] p-4">
              <GrTransaction />
            </div>
            <div className="">
              <h4 className="font-bold text-lg">{pendingCount}</h4>
              <p>Pending appointment</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default FirstHero;
