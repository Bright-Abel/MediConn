import AppointmentForm from '@/components/forms/AppointmentForm';
import { getDoctors } from '@/lib/actions/doctor.action';
import {
  getPatient,
  getUser,
  getUserSession,
} from '@/lib/actions/patient.action';
import Image from 'next/image';
import { redirect } from 'next/navigation';

const Appointment = async () => {
  const userID = await getUserSession();

  const { userId } = userID;

  const user = await getUser(userId);

  const doctors = await getDoctors();

  if (user?.prefs?.role === 'admin') {
    redirect('/admin');
  }

  const patient = await getPatient(userId);
  if (!patient) {
    redirect('/user/register');
  }

  return (
    <div className="flex md:max-h-[90vh] max-h-screen   w-full bg-[#000443b0]">
      <section className=" flex-1 mx-8  mt-8 mb-20 md:mb-0">
        <div className="max-w-[860px] w-full flex-1">
          <AppointmentForm patient={patient} doctors={doctors} type="create" />
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        alt="Nurse_Image"
        className="hidden  object-cover md:block bg-bottom max-h-full max-w-[390px]"
      />
    </div>
  );
};
export default Appointment;
