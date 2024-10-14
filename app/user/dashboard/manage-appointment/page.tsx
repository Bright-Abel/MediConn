import {
  getPatient,
  getUser,
  getUserSession,
} from '@/lib/actions/patient.action';
import { redirect } from 'next/navigation';
import { columns } from '@/components/table/userColumns';
import { DataTable } from '@/components/table/DataTable';

import { getUserAppointments } from '@/lib/actions/appointment.action';
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
  return (
    <div className="w-full h-full ">
      <section className="w-full space-y-4 px-2 xl:px-10 py-6 text-white">
        <h1 className="header">Manage Appointments</h1>
        <p className="text-[#f1f5f8]">
          Check the status of your appointment and cancel them
        </p>
      </section>

      <section className=" md:px-4 md:pt-4 xl:pt-8 xl:px-4">
        <DataTable columns={columns} data={appointmentCount.appointments} />
      </section>
    </div>
  );
};
export default page;
