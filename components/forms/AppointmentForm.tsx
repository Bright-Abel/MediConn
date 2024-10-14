'use client';
import { DoctorParams, GetPatient, Status } from '@/types';
import { Form } from '../ui/form';
import CustomForm from './CustomForm';
import { FormFieldType } from './FormTypes';
import { Doctors } from '@/constant/data-json';
import { useForm } from 'react-hook-form';
import { SelectItem } from '@/components/ui/select';
import Image from 'next/image';
import { useState } from 'react';
import { getAppointmentSchema } from '@/lib/form-validation';
import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';
import SubmitButton from '../SubmitButton';
import {
  createAppointment,
  updateAppointment,
} from '@/lib/actions/appointment.action';
import { showToast } from '../showToast';
import { Appointment } from '@/types/appwrite.type';
import clsx from 'clsx';

const AppointmentForm = ({
  patient,
  setOpen,
  type,
  appointment,
  doctors,
}: {
  patient: GetPatient;
  type: 'create' | 'cancel' | 'schedule';
  setOpen?: (value: boolean) => void;
  appointment?: Appointment;
  doctors?: DoctorParams[];
}) => {
  const { name, userId, $id } = patient;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const AppointmentValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentValidation>>({
    resolver: zodResolver(AppointmentValidation),
    defaultValues: {
      appointment_date: appointment
        ? new Date(appointment.appointment_date)
        : new Date(Date.now()),
      appointment_reason: appointment?.appointment_reason || '',
      additional_comment: appointment?.additional_comment || '',
      cancellation_reason: appointment?.cancellation_reason || '',
      primary_physician: appointment?.primary_physician || '',
    },
  });

  async function onSubmit(values: z.infer<typeof AppointmentValidation>) {
    setIsLoading(true);
    let status;
    switch (type) {
      case 'cancel':
        status = 'cancelled';
        break;
      case 'schedule':
        status = 'scheduled';
        break;
      default:
        status = 'pending';
        break;
    }
    try {
      if (type === 'create' && $id) {
        const appointmentData = {
          userId,
          patient: $id,
          primary_physician: values.primary_physician,
          appointment_date: values.appointment_date,
          appointment_reason: values.appointment_reason!,
          additional_comment: values.additional_comment,
          status: status as Status,
        };
        const appointment = await createAppointment(appointmentData);
        console.log(appointment);
        if (appointment) {
          showToast('success', <p>Your appointment has been booked</p>, {
            // icon: false,
            style: { backgroundColor: '#f1f5f8', color: '#0d9488' },
          });
          form.reset();
        }
      } else {
        const appointmentToUpdate = {
          userId,
          appointmentId: appointment?.$id!,
          appointment: {
            primary_physician: values?.primary_physician,
            appointment_date: new Date(values?.appointment_date),
            status: status as Status,
            cancellation_reason: values?.cancellation_reason,
          },
          link: '/user/dashboard/manage-appointment',
          type,
        };

        const updatedAppointment = await updateAppointment(appointmentToUpdate);

        if (updatedAppointment) {
          setOpen && setOpen(false);
          if (status === 'scheduled') {
            showToast(
              'success',
              <p>Appointment has been successfully scheduled </p>,
              {
                icon: false,
                autoClose: 5000,
                style: { backgroundColor: '#0d9488', color: '#f1f5f8' },
              }
            );
          } else if (status === 'cancelled') {
            showToast('success', <p>Appointment has been cancelled</p>, {
              icon: false,
              autoClose: 5000,
              style: { backgroundColor: '#ef4444', color: '#f1f5f8' },
            });
          }
          form.reset();
        }
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      return error;
    }
  }
  return (
    <Form {...form}>
      {/*  {...form} */}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 space-y-6 "
      >
        {type === 'create' && (
          <section className=" space-y-4 text-white">
            <h1 className="header capitalize">Hey {name}</h1>
            <p className="">Request a new appointment in 10 seconds</p>
          </section>
        )}

        {type !== 'cancel' && (
          <>
            <CustomForm
              control={form.control}
              type={FormFieldType.SELECT}
              name="primary_physician"
              placeholder="Select a physician"
              label="Doctor"
              labelClass="text-white"
            >
              {doctors &&
                doctors.map((item, index) => {
                  const { doc_img_url, name } = item;
                  return (
                    <SelectItem
                      key={index}
                      value={name}
                      className="py-1 cursor-pointer hover:!bg-gray-400 duration-200"
                    >
                      <div className="flex gap-2 cursor-pointer  items-center">
                        <Image
                          src={doc_img_url}
                          alt={name}
                          width={32}
                          height={32}
                          className="rounded-full border h-8 w-8 border-dark-500 border-solid object-cover"
                        />
                        <p className="text-white">Dr. {name}</p>
                      </div>
                    </SelectItem>
                  );
                })}
            </CustomForm>

            <div className="grid grid-cols-1  gap-6 xl:grid-cols-2">
              <CustomForm
                control={form.control}
                type={FormFieldType.TEXTAREA}
                name="appointment_reason"
                placeholder="ex: Annual montly check-up"
                label="Reason for appointment"
                labelClass="text-white"
              />
              <CustomForm
                control={form.control}
                type={FormFieldType.TEXTAREA}
                name="additional_comment"
                placeholder="ex: Prefer afternoon appointments, if possible"
                label="Additional comments"
                labelClass="text-white"
              />
            </div>

            <CustomForm
              control={form.control}
              type={FormFieldType.DATE_PICKER}
              name="appointment_date"
              placeholder="Select your appointment date"
              iconSrc="/assets/icons/calendar.svg"
              showTimeSelect
              dateFormat="dd/MM/yyyy - h:mm aa"
              label="Expected appointment date"
              date={new Date()}
              labelClass="text-white"
              iconAlt="calender"
            />
          </>
        )}
        {type === 'cancel' && (
          <CustomForm
            control={form.control}
            type={FormFieldType.TEXTAREA}
            name="cancellation_reason"
            placeholder="ex: I can't meet up with my appointment"
            label="Reason for cancellation"
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          className={clsx(
            `w-full`,
            type === 'cancel'
              ? '!bg-red-700 !text-white '
              : '!bg-white !text-black !h-11 !rounded-full !font-bold z-50 text-lg !w-full'
          )}
        >
          {type === 'cancel'
            ? 'Cancel appointment'
            : type === 'create'
            ? 'Request appointment'
            : 'Schedule appointment'}
        </SubmitButton>
      </form>
    </Form>
  );
};
export default AppointmentForm;
