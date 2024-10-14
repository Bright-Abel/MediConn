"use client"
import Link from 'next/link';
import { LiaPowerOffSolid } from 'react-icons/lia';
import Logo from '@/components/Logo';
import DashboardLink from './DashboardLink';
import {signOutUser} from '@/lib/actions/patient.action'
import {useRouter} from 'next/navigation'




const DashboardAside = () => {
  const router = useRouter()
  const handleSignout = () => {
  signOutUser()
  router.push('/')
}
  return (
    <div className="w-[290px] hidden xl:block  bg-stone-50 max-h-screen sticky top-0  text-sm font-medium">
      <div
        className="flex flex-col justify-between h-full w-full pt-4"
        id="content"
      >
        <Link href="/user/dashboard" className="ml-6 ">
          <Logo />
        </Link>

        <DashboardLink />

        <div className="">
          <hr className="bg-[#EAECF0]"></hr>
          
          <button type='button' onClick={handleSignout} className="nav-link bg-gray-200 w-full outline-none">
            <span className="icon">
              <LiaPowerOffSolid />
            </span>
            <p className='hover:!text-teal-400'>Logout</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardAside;
