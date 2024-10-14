import Image from 'next/image';
import clsx from 'clsx';

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className="flex items-center ">
      <Image
        src="/assets/icons/logo-icon.svg"
        alt="logo"
        height={1000}
        width={1000}
        className="w-fit h-12 object-contain"
      />

      <h1 className="text-[#5694C3] text-4xl font-bold">
        Medi<span className={clsx(className ?? 'text-[#22c55ec4]')}>Conn</span>
      </h1>
    </div>
  );
};
export default Logo;
