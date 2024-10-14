'use client';

import StatusBadge from '@/components/StatusBadge';
import { formatDateTime } from '@/lib/utils';
import { RootState } from '@/store/index';
import { Appointment } from '@/types/appwrite.type';

import { useSelector } from 'react-redux';

const AppointmentDetails = () => {
  const { singleAppointment } = useSelector(
    (state: RootState) => state.dataSlice
  );
  return (
    <div className="">
      {singleAppointment.map((item: Appointment) => {
        const {
          $id,
          $updatedAt,
          appointment_date,
          appointment_reason,
          additional_comment,
          primary_physician,
          cancellation_reason,
          status,
        } = item;
        return (
          <div key={$id} className="flex flex-col gap-16">
            <StatusBadge status={status} />
            <div className="flex flex-col gap-6">
              {/* Booked date */}
              <div className="text-sm flex justify-between items-center">
                <h1 className="text-gray-500">Date booked</h1>
                <p className=" font-extrabold">
                  {formatDateTime($updatedAt).dateTime}
                </p>
              </div>
              {/* Appointment Date */}
              <div className="text-sm flex justify-between items-center">
                <h1 className="text-gray-500">Appointment Date</h1>
                <p className=" font-extrabold">
                  {formatDateTime(appointment_date).dateTime}
                </p>
              </div>
              {/* Primary physician */}
              <div className="text-sm flex justify-between items-center">
                <h1 className="text-gray-500">Primary physician</h1>
                <p className=" font-extrabold">Dr. {primary_physician}</p>
              </div>
              {/* Reason for appointment */}
              <div className="text-sm flex justify-between items-center">
                <h1 className="text-gray-500">Reason for appointment</h1>
                <p className=" font-extrabold">{appointment_reason}</p>
              </div>
              {/* additional comment */}
              <div className="text-sm flex justify-between items-center">
                <h1 className="text-gray-500">Comment</h1>
                <p className=" font-extrabold">{additional_comment || 'N/B'}</p>
              </div>
              {/* Cancellation reason */}
              {status === 'cancelled' && (
                <div className="text-sm flex justify-between items-center">
                  <h1 className="text-gray-500">Reason for cancellation</h1>
                  <p className=" font-extrabold">
                    {cancellation_reason || 'N/B'}
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default AppointmentDetails;
