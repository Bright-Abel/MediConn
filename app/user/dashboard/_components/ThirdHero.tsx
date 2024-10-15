'use client';
import { AppointmentTabs } from '.';
import RecentAppointment from './RecentAppointment';
import { Appointment } from '@/types/appwrite.type';
import { useEffect, useState } from 'react';
import { appointmentType } from '@/constant/sliceFeature';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/index';
import TableSkeleton from './TableSkeleton';
import { getUserAppointments } from '@/lib/actions/appointment.action';
import AppointmentInfoSidebar from './AppointmentInfoSidebar';

interface ThirdHeroProps {
  appointments: Appointment[];
  userId: string;
}

const ThirdHero = ({ appointments, userId }: ThirdHeroProps) => {
  const { getAppointmentType } = useSelector(
    (state: RootState) => state.dataSlice
  );

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    const fetchAppointment = async () => {
      setIsLoading(true);

      try {
        console.log('LOADING', isLoading);
        const appointment = await getUserAppointments(userId);
        if (appointment) {
          setIsLoading(false);
        }
      } catch {
        setIsLoading(false);
      }
    };
    fetchAppointment();
  }, [userId]);

  useEffect(() => {
    dispatch(appointmentType(appointments));
  }, [getAppointmentType, dispatch, appointments]);

  return (
    <div className="w-full">
      <p className="text-[#65696b] font-bold text-[1rem] mb-[0.5rem]">
        Recent Appointment
      </p>
      <div className="shadow-lg rounded-xl bg-[#f1f5f8] px-4 py-4 flex flex-col gap-8">
        <AppointmentTabs />
        {isLoading ? <TableSkeleton /> : <RecentAppointment />}
      </div>
      <AppointmentInfoSidebar />
    </div>
  );
};
export default ThirdHero;
