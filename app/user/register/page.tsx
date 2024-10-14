import Image from 'next/image';
import RegisterForm from './_components/RegisterForm';
import {
  getUserSession,
  getUser,
  getPatient,
} from '@/lib/actions/patient.action';
import { redirect } from 'next/navigation';
import Logo from '@/components/Logo';
import { getDoctors } from '@/lib/actions/doctor.action';

const Register = async () => {
  const userID = await getUserSession();

  const { userId } = userID;

  const doctors = await getDoctors();

  const user = await getUser(userId);

  if (user?.prefs?.role === 'admin') {
    redirect('/admin');
  }
  const patient = await getPatient(userId);
  if (patient) {
    redirect('/user/dashboard');
  }

  return (
    <div className=" flex bg-[#000443b0] remove-scrollbar h-screen max-h-screen w-full max-w-full">
      <section className="remove-scrollbar container ">
        <Logo />
        <div className="sub-container  max-w-[890px] ">
          {/* logo */}
          <RegisterForm user={user} doctors={doctors} />
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="Nurse_Image"
        className="hidden h-full object-cover md:block max-w-[390px]"
      />
    </div>
  );
};
export default Register;
