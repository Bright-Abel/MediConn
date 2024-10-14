'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Appointment } from '@/types/appwrite.type';
import StatusBadge from '../StatusBadge';
import { formatDateTime } from '@/lib/utils';
import Image from 'next/image';
import AppointModal from '../AppointModal';
import clsx from 'clsx';
import { getUserInitials } from '@/app/user/dashboard/constant/action';
import { useEffect, useState } from 'react';
import { DoctorParams } from '@/types';
import { getDoctors } from '@/lib/actions/doctor.action';

export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

export const columns: ColumnDef<Appointment>[] = [
  {
    header: 'ID',
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: 'patient',
    header: () => <p className="hidden md:block">Patient</p>,
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <div
          className={clsx(
            'flex w-10 items-center justify-center uppercase h-10 rounded-full ',
            {
              'bg-blue-600': appointment.status === 'pending',
              'bg-green-600': appointment.status === 'scheduled',
              'bg-red-600': appointment.status === 'cancelled',
            }
          )}
        >
          <p
            className={clsx('text-12-semibold uppercase font-medium', {
              'text-blue-500': appointment.status === 'pending',
              'text-green-500': appointment.status === 'scheduled',
              'text-red-500': appointment.status === 'cancelled',
            })}
          >
            {getUserInitials(appointment.patient.name)}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <div className="min-w-[115px]">
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    accessorKey: 'schedule',
    header: 'Schedule',
    cell: ({ row }) => (
      <div className="text-14-regular min-w-[100px]">
        {formatDateTime(row.original.appointment_date).dateTime}
      </div>
    ),
  },
  {
    accessorKey: 'primary_physician',
    header: 'Doctor',
    cell: ({ row }) => {
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
      const doctor = doctors.find(
        (item) => item.name === row.original.primary_physician
      );
      return (
        <div className="flex items-center gap-3">
          <Image
            src={doctor?.doc_img_url || ''}
            alt={doctor?.name || 'doc_img'}
            width={32}
            height={32}
            className="rounded-full h-8 w-8 object-cover hidden md:block"
          />
          <p className="">Dr. {doctor?.name}</p>
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row: { original: data } }) => (
      <AppointModal
        type="cancel"
        patient={data.patient}
        //   userId={data.userId}
        appointmentId={data}
        title="Cancel Appointment"
        description="Are you sure you want to cancel this appointment?"
      />
    ),
  },
];
