'use server';

import { databases, messaging } from '../appwrite.config';
import { ID, Query } from 'node-appwrite';

import { revalidatePath } from 'next/cache';
// import { formatDateTime } from '../utils';
import { CreateAppointmentParams, UpdateAppointmentParams } from '@/types';
import { Appointment } from '@/types/appwrite.type';
import { formatDateTime } from '../utils';

export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const newAppointment = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID!,
      ID.unique(),

      appointment
    );

    const message = `Hi, it's MediConn. Your appointment has been successfully booked. You'll hear from us shortly.`;

    await sendSMSNotification(appointment.userId, message);

    revalidatePath('/user/dashboard/manage-appointment');
    return JSON.parse(JSON.stringify(newAppointment));
  } catch (error) {
    console.log('patient error', error);
  }
};

export const getUserAppointments = async (userId: string) => {
  try {
    const appointment = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID!,
      [Query.equal('userId', userId)]
    );
    const appointmentData = {
      scheduledCount: 0,
      cancelledCount: 0,
      pendingCount: 0,
    };
    const counts = (appointment.documents as Appointment[]).reduce(
      (count, document) => {
        if (document.status === 'scheduled') {
          count.scheduledCount++;
        } else if (document.status === 'cancelled') {
          count.cancelledCount++;
        } else {
          count.pendingCount++;
        }
        return count;
      },
      appointmentData
    );

    const data = {
      totalCount: appointment.total, // BOTH total and doc are coming from appwrite
      ...counts,
      appointments: appointment.documents,
    };
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

export const updateAppointment = async ({
  appointmentId,
  appointment,
  userId,
  type,
  link,
}: UpdateAppointmentParams) => {
  try {
    const updateAppointment = await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment
    );
    if (!updateAppointment) {
      throw new Error('Appointment not found');
    }
    const message = `Hi, it's MediConn.
    ${
      type === 'schedule'
        ? `Your appointment has been scheduled for ${
            formatDateTime(appointment.appointment_date!).dateTime
          } with Dr ${appointment.primary_physician!}`
        : `We regret to inform you that your appointment has been cancelled. Reason because ${appointment.cancellation_reason!}`
    }
    `;

    await sendSMSNotification(userId, message);
    revalidatePath(`${link}`);
    return JSON.parse(JSON.stringify(updateAppointment));
  } catch (error) {
    console.log(error);
  }
};

export const getRecentAppointments = async () => {
  try {
    const appointment = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc('$createdAt')]
    );
    const appointmentData = {
      scheduledCount: 0,
      cancelledCount: 0,
      pendingCount: 0,
    };
    const counts = (appointment.documents as Appointment[]).reduce(
      (count, document) => {
        if (document.status === 'scheduled') {
          count.scheduledCount++;
        } else if (document.status === 'cancelled') {
          count.cancelledCount++;
        } else {
          count.pendingCount++;
        }
        return count;
      },
      appointmentData
    );

    const data = {
      totalCount: appointment.total, // BOTH total and doc are coming from appwrite
      ...counts,
      appointments: appointment.documents,
    };
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

export const sendSMSNotification = async (userId: string, content: string) => {
  try {
    const message = await messaging.createSms(
      ID.unique(),
      content,
      [],
      [userId]
    );
    return JSON.parse(JSON.stringify(message));
  } catch (error) {
    console.log(error);
  }
};
