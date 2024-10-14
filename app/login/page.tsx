import Logo from '@/components/Logo';
import LoginForm from './_components/LoginForm';
import Link from 'next/link';
const Login = () => {
  return (
    <div className="relative bg-[#000443d0] md:bg-black w-full min-h-screen max-h-screen remove-scrollbar">
      <div className="md:hidden block pt-4 pl-4 w-full">
        <Logo />
      </div>

      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-screen max-h-screen hidden md:block object-cover opacity-45 z-0"
      >
        <source
          src="https://cdn.pixabay.com/video/2022/12/23/144001-784164306_large.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <div className="z-10 flex  items-center h-full justify-center w-full md:min-h-screen ">
        <div className="w-full max-w-screen-sm  mt-14 md:mt-0 md:mx-0 md:bg-transparent md:border-[2px] border-solid border-[#ffffff33]  rounded-[10px] px-[30px] py-5 loginBlur">
          <div className="hidden md:flex justify-center w-full">
            <Logo />
          </div>
          <LoginForm />
          <div className="w-full text-center">
            <h4 className="text-white">
              Don't have an account?{' '}
              <Link
                href="/sign-up"
                className="hover:underline duration-500 font-bold text-[#ABB8C4] hover:text-[#5bbfd1]"
              >
                Register
              </Link>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
