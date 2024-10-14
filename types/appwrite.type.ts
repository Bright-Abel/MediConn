import { Models } from 'node-appwrite';
import { Gender, Status } from '.';

export interface Patient extends Models.Document {
  userId: string;
  name: string;
  email: string;
  phone: string;
  birth_date: Date;
  gender: Gender;
  address: string;
  occupation: string;
  emergency_contact_name: string;
  emergency_contact_number: string;
  primary_physician: string;
  insurance_provider: string;
  insurance_policy_number: string;
  allergies: string | undefined;
  current_medication: string | undefined;
  family_medical_history: string | undefined;
  past_medical_history: string | undefined;
  identification_type: string | undefined;
  identification_number: string | undefined;
  identification_document: FormData | undefined;
  privacy_consent: boolean;
}

export interface Appointment extends Models.Document {
  patient: Patient;
  appointment_date: Date;
  appointment_reason: string;
  additional_comment: string | undefined;
  status: Status;
  primary_physician: string;
  userId?: string;
  cancellation_reason: string | undefined;
}

