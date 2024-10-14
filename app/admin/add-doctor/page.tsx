import Logo from '@/components/Logo';
import Link from 'next/link';
import DoctorForm from '../_components/DoctorForm';
import Image from 'next/image';
import { getUserSession, getUser } from '@/lib/actions/patient.action';
import { redirect } from 'next/navigation';

const page = async () => {
  const userID = await getUserSession();

  const { userId } = userID;

  const user = await getUser(userId);

  if (user.prefs.role !== 'admin') {
    redirect('/user/dashboard');
  }
  return (
    <section className="bg-dark-300 w-full h-screen max-h-screen remove-scrollbar">
      <div className="flex justify-between h-full">
        <div className="flex-1 overflow-auto admin-scroll mx-4 lg:mx-0 lg:mt-4 lg:ml-4">
          <Link href="/admin" className="">
            <Logo className="text-teal-500" />
          </Link>
          <div className="sub-container h-full max-w-screen-sm w-full  mb-10 lg:mb-20">
            <DoctorForm />
          </div>
        </div>

        <Image
          src="/assets/images/onboarding-img.png"
          height={1000}
          width={1000}
          alt="Nurse_Image"
          className="hidden h-full object-cover md:block max-w-[40%]"
        />
      </div>
    </section>
  );
};
export default page;
