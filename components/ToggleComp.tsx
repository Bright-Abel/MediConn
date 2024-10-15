'use client';
import * as Toggle from '@radix-ui/react-toggle';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { UserRound } from 'lucide-react';
import { useEffect, useState } from 'react';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface ToggleProps {
  className?: string;
  isActive?: string;
  notActive: string;
  type: 'Navbar' | 'Hero';
  link: string;
}

const ToggleComp: React.FC<ToggleProps> = ({
  className,
  notActive,
  type,
  link,
}) => {
  const [active, setActive] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (active) {
      router.push(link);
    }
  }, [active, link, router]);

  // const linkTo = () => {
  //   if (active) {
  //     router.push(`${link}`);
  //   }
  //   setActive((prev) => {
  //     return !prev;
  //   });
  // };
  return (
    <Toggle.Root
      pressed={active}
      onPressedChange={setActive}
      className={clsx(
        `relative  h-12 flex items-center outline-none px-1 py-2 rounded-full transition duration-300`,
        // ${active && className ? className : 'bg-gray-200'
        // ? 'bg-[#5694C3]'
        // : 'bg-gray-200'
        // }`
        active && type === 'Navbar'
          ? 'w-40 bg-[#5694C3]'
          : !active && type === 'Navbar'
          ? 'w-40 bg-gray-200'
          : '',
        active && type === 'Hero'
          ? 'w-60 bg-gray-300'
          : !active && type === 'Hero'
          ? 'w-60 bg-[#5694C3]'
          : '',
        className
      )}
    >
      <span
        className={clsx(
          `absolute  w-10 h-10 flex items-center justify-center bg-white rounded-full transition-all duration-300 transform`,
          active && type === 'Navbar'
            ? 'translate-x-[112px]'
            : !active && type === 'Navbar'
            ? 'translate-x-0'
            : '',
          active && type === 'Hero'
            ? 'translate-x-[192px]'
            : !active && type === 'Hero'
            ? 'translate-x-0'
            : ''
        )}
      >
        {type === 'Navbar' ? (
          <UserRound size={20} color={active ? '#a855f7' : '#6b7280'} />
        ) : (
          <ArrowRightIcon
            className={`w-4 h-4 ${
              active ? 'text-purple-500' : 'text-gray-500'
            }`}
          />
        )}
      </span>
      <span
        className={` text-white w-full flex justify-center items-center font-bold text-center transition duration-300`}
      >
        {active ? (
          type === 'Navbar' ? (
            // <Check size={38} strokeWidth={3} />
            <div className="flex items-center gap-2 text-white">
              <Image
                src="/assets/icons/loader.svg"
                alt="loader"
                width={24}
                height={24}
                className="animate-spin"
              />
              Loading...
            </div>
          ) : (
            <div className="flex items-center gap-2 text-[#5694C3]">
              <Image
                src="/assets/icons/loader.svg"
                alt="loader"
                width={24}
                height={24}
                className="animate-spin"
              />
              Loading...
            </div>
          )
        ) : (
          <span
            className={clsx(
              `text-[#5694C3] capitalize`,
              type === 'Hero' && 'text-white'
            )}
          >
            {notActive}
          </span>
        )}
      </span>
    </Toggle.Root>
  );
};
export default ToggleComp;
