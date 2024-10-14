import { openSidebar } from '@/constant/sliceFeature';
import { RootState } from '@/store/index';
import { useDispatch, useSelector } from 'react-redux';
import { MdClose } from 'react-icons/md';
import clsx from 'clsx';
import Logo from './Logo';
import navList from '@/constant/data-json';
import Link from 'next/link';
import { Button } from './ui/button';
import ToggleComp from './ToggleComp';

const Sidebar = () => {
  const { isSidebarOpen } = useSelector((state: RootState) => state.dataSlice);
  const dispatch = useDispatch();
  return (
    <section
      className={clsx(
        ``,
        isSidebarOpen
          ? 'fixed top-0 right-0 w-full h-full ease-in-out duration-1000  bg-[rgba(18,27,25,0.63)] z-20'
          : ''
      )}
    >
      <div className={isSidebarOpen ? 'aside show-sidebar' : 'aside'}>
        <div className="flex items-center justify-between">
          <Logo />

          <button
            type="button"
            aria-label="open sidebar"
            onClick={() => dispatch(openSidebar())}
            className="xl:hidden block text-4xl text-[#496A8D] font-extrabold"
          >
            <MdClose />
          </button>
        </div>

        <ul className="flex flex-col  gap-6 mt-20 ">
          {navList.map((item, index) => {
            return (
              <li className="animate-pulse" key={index}>
                <Link
                  href="*"
                  className="outline-none capitalize  text-xl underline  font-bold hover:text-[#14b8a5cb] duration-500 text-[#14b8a5cb]"
                >
                  {item}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center justify-center gap-12 mt-20 w-full">
          <Button
            className="font-bold text-[#5694C3] text-xl hover:text-[#5694c3ce] duration-500"
            variant="ghost"
            asChild
          >
            <Link href="/login" className="font-bold underline text-[#5694C3]">
              Login
            </Link>
          </Button>

          <ToggleComp notActive="sign up" type="Navbar" link="/sign-up" />
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
