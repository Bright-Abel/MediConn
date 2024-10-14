'use client';

import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { BsPatchCheckFill } from 'react-icons/bs';
import { openDashboardSidebar } from '@/constant/sliceFeature';
import { Divide as Hamburger } from 'hamburger-react';
import { RootState } from '@/store/index';
import Logo from '@/components/Logo';
import { useEffect, useState } from 'react';
import { getPatient, getUserSession } from '@/lib/actions/patient.action';
import { getUserInitials } from '../constant/action';

const DashboardNav = () => {
  const { dashboardSidebar } = useSelector(
    (state: RootState) => state.dataSlice
  );

  const [user, setUser] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleUser = async () => {
      const userID = await getUserSession();
      const { userId } = userID;
      const patient = await getPatient(userId);
      if (patient) {
        setUser(patient.name);
        setEmail(patient.email);
      } else {
        setUser(undefined);
      }
    };
    handleUser();
  }, []);

  return (
    <div>
      <div className="bg-white py-4 z-20 px-2 sm:px-5 lg:px-4">
        <div className="xl:hidden flex justify-between items-center">
          <Link href="/user/dashboard">
            <Logo />
          </Link>

          <button
            className="text-[2rem] z-[500]"
            onClick={() => dispatch(openDashboardSidebar())}
          >
            <Hamburger size={32} toggled={dashboardSidebar} rounded />
          </button>
        </div>

        <div className="hidden xl:flex gap-4 justify-end items-center pr-10">
          <div className="flex flex-col">
            <h2 className="flex justify-center items-center gap-2 text-black">
              {user}
              <BsPatchCheckFill className="text-teal-900" />
            </h2>
            <small className="text-[12px] text-right text-zinc-400">
              {email}
            </small>
          </div>

          <div className="grid rounded-[40px] capitalize h-[40px] w-[40px] bg-teal-700 place-content-center text-white font-bold">
            <h2>{user && getUserInitials(user)}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;
