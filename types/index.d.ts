import { Gender } from '@/constant/data-json';
import { Appointment } from './appwrite.type';

export interface CreateUserParams {
  phone?: string;
  password: string;
  email: string;
  name?: string;
}

export type Status = 'pending' | 'cancelled' | 'scheduled';
export type Gender = 'male' | 'female' | 'other';

export interface User extends CreateUserParams {
  $id: string;
}

export interface GetPatient
  extends Pick<User, 'phone' | 'email' | 'name' | '$id'> {
  primary_physician: string | undefined;
  userId: string;
}

export interface DoctorParams {
  name: string;
  gender: string;
  profession: string;
  doc_img_url: string;
}

interface RegisterUserParams
  extends Pick<CreateUserParams, 'phone' | 'email' | 'name'> {
  userId?: string;
  birth_date?: Date;
  gender?: Gender;
  address?: string;
  occupation?: string;
  emergency_contact_name?: string;
  emergency_contact_number?: string;
  primary_physician?: string;
  insurance_provider?: string;
  insurance_policy_number?: string;
  allergies?: string | undefined;
  current_medication?: string | undefined;
  family_medical_history?: string | undefined;
  past_medical_history?: string | undefined;
  identification_type?: string | undefined;
  identification_number?: string | undefined;
  identification_document?: FormData | undefined;
  privacy_consent?: boolean;
}

export type CreateAppointmentParams = {
  userId: string;
  patient: string;
  primary_physician: string;
  appointment_date: Date;
  appointment_reason: string;
  additional_comment: string | undefined;
  status: Status;
};

declare type UpdateAppointmentParams = {
  appointmentId: string;
  userId: string;
  link: string;
  appointment: Pick<
    Appointment,
    primary_physician | appointment_date | status | cancellation_reason
  >;
  type: 'create' | 'cancel' | 'schedule';
};
