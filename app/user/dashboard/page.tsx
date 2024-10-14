import {
  getUserSession,
  getUser,
  getPatient,
} from '@/lib/actions/patient.action';
import { redirect } from 'next/navigation';
import { FirstHero, SecondHero, ThirdHero } from './_components';
import { getUserAppointments } from '@/lib/actions/appointment.action';
const Dashboard = async () => {
  const userID = await getUserSession();

  const { userId } = userID;

  const user = await getUser(userId);

  const patient = await getPatient(userId);

  if (!patient) {
    redirect('/user/register');
  }

  const appointment = await getUserAppointments(userId);

  return (
    <div className="w-full h-full bg-gray-200 flex flex-col gap-12 pt-4 px-5 lg:px-10">
      <FirstHero
        pendingCount={appointment?.pendingCount}
        scheduledCount={appointment?.scheduledCount}
        name={patient.name}
      />
      <SecondHero
        pendingCount={appointment?.pendingCount}
        scheduledCount={appointment?.scheduledCount}
        cancelledCount={appointment.cancelledCount}
      />

      <ThirdHero userId={userId} appointments={appointment?.appointments} />
    </div>
  );
};
export default Dashboard;
