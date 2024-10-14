'use client';
import Link from 'next/link';
import Logo from './Logo';
import navList from '@/constant/data-json';
import ToggleComp from './ToggleComp';
import { Button } from './ui/button';
import { LuMenu } from 'react-icons/lu';
import { openSidebar } from '@/constant/sliceFeature';
import { RootState } from '@/store/index';
import { useDispatch, useSelector } from 'react-redux';

const NavBar = () => {
  const { isSidebarOpen } = useSelector((state: RootState) => state.dataSlice);

  const dispatch = useDispatch();
  return (
    <div className="flex justify-between items-center px-5 lg:px-8 py-4 xl:px-16">
      <Logo />
      <ul className="lg:flex items-center gap-6 hidden">
        {navList.map((item, index) => {
          return (
            <li className="" key={index}>
              <Link
                href="*"
                className="outline-none capitalize text-lg font-bold hover:text-[#14b8a5cb] duration-500 text-[#000443]"
              >
                {item}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="lg:flex items-center gap-4 hidden">
        <Button
          className="font-bold text-[#5694C3] text-lg hover:text-[#5694c3ce] duration-500"
          variant="ghost"
          asChild
        >
          <Link href="/login" className="font-bold text-[#5694C3]">
            Login
          </Link>
        </Button>

        <ToggleComp notActive="sign up" type="Navbar" link="/sign-up" />
      </div>
      {!isSidebarOpen && (
        <button
          type="button"
          aria-label="open sidebar"
          onClick={() => dispatch(openSidebar())}
          className="lg:hidden block text-4xl text-[#496A8D] font-extrabold"
        >
          <LuMenu />
        </button>
      )}
    </div>
  );
};
export default NavBar;
