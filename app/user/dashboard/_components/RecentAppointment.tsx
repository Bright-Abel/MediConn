'use client';
import { RootState } from '@/store/index';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'antd';
import clsx from 'clsx';
import { formatDateTime } from '@/lib/utils';
import Image from 'next/image';

import { IoCalendarNumberOutline } from 'react-icons/io5';
import { IoMdArrowRoundForward } from 'react-icons/io';
import { Appointment } from '@/types/appwrite.type';
import {
  appointmentInfoSideBar,
  appointmentInfo,
} from '@/constant/sliceFeature';
import { useEffect, useState } from 'react';
import { DoctorParams } from '@/types';
import { getDoctors } from '@/lib/actions/doctor.action';

const RecentAppointment = () => {
  const { userAppointment } = useSelector(
    (state: RootState) => state.dataSlice
  );

  const dispatch = useDispatch();
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

  const displayedAppointments = userAppointment.slice(0, 5);
  const columns = [
    {
      title: 'Status',
      dataIndex: 'status',

      render: (text: string) => (
        <div className="flex gap-2 items-center">
          <div
            className={clsx(
              'md:flex w-10 items-center justify-center text-lg text-white hidden  uppercase h-10 rounded-full',
              {
                'bg-blue-600 ': text === 'pending',
                'bg-green-600': text === 'scheduled',
                'bg-red-600': text === 'cancelled',
              }
            )}
          >
            <IoCalendarNumberOutline />
          </div>
          <p
            className={clsx('text-12-semibold uppercase font-medium', {
              'text-blue-500': text === 'pending',
              'text-green-500': text === 'scheduled',
              'text-red-500': text === 'cancelled',
            })}
          >
            {text}
          </p>
        </div>
      ),
    },
    {
      title: 'DATE',
      dataIndex: 'appointment_date',
      render: (text: string) => <p>{formatDateTime(text).dateTime}</p>,
      sorter: {
        compare: (a: Appointment, b: Appointment) =>
          new Date(a.appointment_date).getTime() -
          new Date(b.appointment_date).getTime(),
      },
    },
    {
      title: 'Doctor',
      dataIndex: 'primary_physician',

      render: (text: string) => {
        const doctor = doctors.find((item) => item.name === text);
        return (
          <div className="flex flex-nowrap items-center gap-3">
            <Image
              src={doctor?.doc_img_url || '/default-doctor-image.png'}
              alt={doctor?.name || 'doc_img'}
              width={32}
              height={32}
              className="rounded-full h-8 w-8 object-cover"
            />
            <p>Dr. {doctor?.name}</p>
          </div>
        );
      },

      sorter: (a: Appointment, b: Appointment) => {
        return a.primary_physician.localeCompare(b.primary_physician);
      },
    },
    {
      title: '',
      dataIndex: '',
      render: () => {
        return <IoMdArrowRoundForward />;
      },
    },
  ];

  const handleRowClick = (id: string) => {
    const singleAppointment = userAppointment.filter((item) => item.$id === id);

    dispatch(appointmentInfo(singleAppointment));
    dispatch(appointmentInfoSideBar());
  };

  return (
    <div className="block">
      <Table
        className="font-semibold text-teal-900 cursor-pointer !rounded-b-[12px]"
        columns={columns}
        dataSource={displayedAppointments ?? ''}
        pagination={false}
        onRow={(record) => ({
          onClick: () => handleRowClick(record.$id),
        })}
      />
    </div>
  );
};

export default RecentAppointment;
