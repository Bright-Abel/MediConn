import {
  getPatient,
  getUser,
  getUserSession,
} from '@/lib/actions/patient.action';
import { redirect } from 'next/navigation';

import { getUserAppointments } from '@/lib/actions/appointment.action';
import StatCard from '@/components/StatCard';

const page = async () => {
  const userID = await getUserSession();

  const { userId } = userID;

  const user = await getUser(userId);

  if (user?.prefs?.role === 'admin') {
    redirect('/admin');
  }

  const patient = await getPatient(userId);
  if (!patient) {
    redirect('/user/register');
  }
  const appointmentCount = await getUserAppointments(userId);
  // console.log('APPOINTMENT', appointmentCount.appointments[0]?.patient);
  return (
    <div className="w-full bg-gray-300 h-full">
      <section className="w-full space-y-4 text-gray-500 px-2 xl:px-10 py-6 ">
        <h1 className="header">Appointment cards</h1>
        <p className="text-gray-600">Welcome to your appointment card.</p>
      </section>

      <section className="admin-stat px-4 pt-4 xl:pt-8 xl:px-20">
        <StatCard
          type="appointments"
          count={appointmentCount.scheduledCount}
          label="Scheduled appointments"
          icon="/assets/icons/appointments.svg"
        />
        <StatCard
          type="pending"
          count={appointmentCount.pendingCount}
          label="pending appointments"
          icon="/assets/icons/pending.svg"
        />
        <StatCard
          type="cancelled"
          count={appointmentCount.cancelledCount}
          label="cancelled appointments"
          icon="/assets/icons/cancelled.svg"
        />
      </section>
    </div>
  );
};
export default page;


