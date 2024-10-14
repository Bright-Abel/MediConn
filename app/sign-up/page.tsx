'use client';
import Logo from '@/components/Logo';
import SignupForm from './_components/SignupForm';
import Link from 'next/link';
const SignUp = () => {
  return (
    <div className="relative bg-[#000443d0] md:bg-black w-full min-h-screen max-h-screen remove-scrollbar">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full min-h-screen max-h-screen object-cover hidden  md:block opacity-45 z-0"
      >
        <source
          src="https://cdn.pixabay.com/video/2022/12/23/144034-784164371_large.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <div className="relative z-10 flex items-center max-h-screen m-auto justify-center w-full h-screen min-h-screen remove-scrollbar">
        <div className="w-full max-w-screen-sm  md:bg-none md:bg-transparent  h-full max-h-[90%] overflow-y-auto md:border-[2px] border-solid border-[#ffffff33] rounded-[10px] px-[30px] p-2 loginBlur remove-scrollbar">
          <div className="flex justify-center w-full">
            <Logo />
          </div>
          <SignupForm />
          <div className="w-full text-center">
            <h4 className="text-white">
              Don't have an account?{' '}
              <Link
                href="/login"
                className="hover:underline duration-500 font-bold text-[#ABB8C4] hover:text-[#5bbfd1]"
              >
                Login
              </Link>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
