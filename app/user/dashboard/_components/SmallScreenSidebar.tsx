'use client';

import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';

import { LiaPowerOffSolid } from 'react-icons/lia';
import { openDashboardSidebar } from '@/constant/sliceFeature';
import { RootState } from '@/store';
import DashboardLink from './DashboardLink';
import Logo from '@/components/Logo';
import clsx from 'clsx';
import {signOutUser} from '@/lib/actions/patient.action'
import {useRouter} from 'next/navigation'

const SmallScreenSideBar = () => {
  const { dashboardSidebar } = useSelector(
    (state: RootState) => state.dataSlice
  );
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(openDashboardSidebar());
  };
    const router = useRouter()
  const handleSignout = () => {
  signOutUser()
  router.push('/')
}
  return (
    <main
      className={clsx(
        'xl:hidden'
        // dashboardSidebar
        //   ? 'modal fixed top-0 left-0 w-full h-full block ease-in-out duration-1000 bg-[rgba(18,27,25,0.63)] z-[500]'
        //   : ''
      )}
    >
      <div
        className={clsx(
          ` fixed top-0 left-0 xl:hidden bottom-0 w-[85%] sm:w-[300px] z-[800] bg-stone-50 h-screen max-h-screen ease-in-out duration-300 -translate-x-full`,
          dashboardSidebar && 'show-sidebar z-[800]'
        )}
      >
        <div className="flex flex-col justify-between max-h-screen min-h-screen">
          <Link
            href="/user/dashboard"
            className="ml-6 mt-6"
            onClick={() => dispatch(openDashboardSidebar())}
          >
            <Logo />
          </Link>
          <DashboardLink handleClick={handleClick} />

          <div className="">
            <hr className="bg-[#EAECF0]  "></hr>
           <button type='button' onClick={handleSignout} className="nav-link bg-gray-200 w-full outline-none">
            <span className="icon">
              <LiaPowerOffSolid />
            </span>
            <p className='hover:!text-teal-400'>Logout</p>
          </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SmallScreenSideBar;
