import Image from 'next/image';

import StatCard from '@/components/StatCard';
import AdminNav from './_components/AdminNav'

import { getRecentAppointments } from '@/lib/actions/appointment.action';
import { AdminTable } from '@/components/table/AdminTable';
import { columns } from '@/components/table/columns';
import { getUserSession, getUser } from '@/lib/actions/patient.action';
import { redirect } from 'next/navigation';
const AdminLanding = async () => {
  const userID = await getUserSession();
  
  const { userId } = userID;

  const user = await getUser(userId);

  if (user.prefs.role !== 'admin') {
    redirect('/user/dashboard'); 
  }

  const appointmentCount = await getRecentAppointments()
  return(
    <div className="mx-auto flex max-w-[90rem] flex-col space-y-14 w-full h-full bg-dark-300">
      <AdminNav/>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header text-[#f1f5f8]">Welcome 👋</h1>
          <p className="text-dark-700">
            Start the day with managing new appointments
          </p>
        </section>

        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={appointmentCount.scheduledCount}
            label="Scheduled appointments"
            icon='/assets/icons/appointments.svg'
          />
          <StatCard
            type="pending"
            count={appointmentCount.pendingCount}
            label="pending appointments"
            icon='/assets/icons/pending.svg'
          />
          <StatCard
            type="cancelled"
            count={appointmentCount.cancelledCount}
            label="cancelled appointments"
            icon='/assets/icons/cancelled.svg'
          />
        </section>

        <AdminTable columns={columns} data={appointmentCount.appointments} />
      </main>
    </div>
  )
};
export default AdminLanding;
