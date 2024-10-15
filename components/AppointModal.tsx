import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import clsx from 'clsx';
import { Appointment } from '@/types/appwrite.type';
import AppointmentForm from './forms/AppointmentForm';
import { GetPatient } from '@/types';
import { DoctorParams } from '@/types';
import { getDoctors } from '@/lib/actions/doctor.action';
interface AppointmentMaodalProps {
  type: 'schedule' | 'cancel';
  patient: GetPatient;
  //   userId: string;
  appointmentId?: Appointment;
  title: string;
  description: string;
}

const AppointModal: React.FC<AppointmentMaodalProps> = ({
  type,
  patient,
  //   userId,
  appointmentId,
  // title,
  // description,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [doctors, setDoctors] = useState<DoctorParams[]>([]);

  // Fetch doctors using useEffect
  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const doctorList = await getDoctors();
        setDoctors(doctorList);
      } catch (error) {
        console.error('Error fetching doctors', error);
      }
    };

    loadDoctors();
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          disabled={appointmentId?.status === 'cancelled'}
          className={clsx(
            `capitalize`,
            type === 'schedule' && 'text-green-500',
            appointmentId?.status === 'cancelled' && 'cursor-not-allowed'
          )}
        >
          {type}
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize text-[#f1f5f8]">
            {' '}
            <span
              className={clsx({
                'text-teal-400': type === 'schedule',
                'text-red-400': type === 'cancel',
              })}
            >
              {type}
            </span>{' '}
            Appointment
          </DialogTitle>
          <DialogDescription className="text-[#f1f5f8]">
            Please fill in the following details to{' '}
            <span
              className={clsx('font-bold', {
                'text-teal-400': type === 'schedule',
                'text-red-300': type === 'cancel',
              })}
            >
              {type}
            </span>{' '}
            an appointment.
          </DialogDescription>
        </DialogHeader>
        <AppointmentForm
          patient={patient}
          type={type}
          setOpen={setOpen}
          appointment={appointmentId}
          doctors={doctors}
        />
      </DialogContent>
    </Dialog>
  );
};
export default AppointModal;
