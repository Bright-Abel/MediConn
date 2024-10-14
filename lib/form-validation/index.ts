import { z, ZodSchema } from 'zod';

export const LoginFormValidation = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain at least one special character'
    ),
});

export const SignUpFormValidation = z
  .object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be at most 50 characters'),
    phone: z
      .string()
      .refine((phone) => /^\+\d{10,15}$/.test(phone), 'Invalid phone number'),
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Password must contain at least one special character'
      ),
    confirm_password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Password must contain at least one special character'
      ),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Password and Confirm Password must be the same',
    path: ['confirm_password'],
  });

export const PatientFormValidation = z
  .object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be at most 50 characters'),
    email: z.string().email('Invalid email address'),
    phone: z
      .string()
      .refine((phone) => /^\+\d{10,15}$/.test(phone), 'Invalid phone number'),
    birth_date: z.coerce.date(),
    gender: z.enum(['male', 'female', 'other']),
    address: z
      .string()
      .min(5, 'Address must be at least 5 characters')
      .max(500, 'Address must be at most 500 characters'),
    occupation: z
      .string()
      .min(2, 'Occupation must be at least 2 characters')
      .max(500, 'Occupation must be at most 500 characters'),
    emergency_contact_name: z
      .string()
      .min(2, 'Contact name must be at least 2 characters')
      .max(50, 'Contact name must be at most 50 characters'),
    emergency_contact_number: z
      .string()
      .refine(
        (emergencyContactNumber) =>
          /^\+\d{10,15}$/.test(emergencyContactNumber),
        'Invalid phone number'
      ),
    primary_physician: z.string().min(2, 'Select at least one doctor'),
    insurance_provider: z
      .string()
      .min(2, 'Insurance name must be at least 2 characters')
      .max(50, 'Insurance name must be at most 50 characters'),
    insurance_policy_number: z
      .string()
      .min(2, 'Policy number must be at least 2 characters')
      .max(50, 'Policy number must be at most 50 characters'),
    allergies: z.string().optional(),
    current_medication: z.string().optional(),
    family_medical_history: z.string().optional(),
    past_medical_history: z.string().optional(),
    identification_type: z.string().optional(),
    identification_number: z.string().optional(),
    identification_document: z.custom<File[]>().optional(),
    treatment_consent: z
      .boolean()
      .default(false)
      .refine((value) => value === true, {
        message: 'You must consent to treatment in order to proceed',
      }),
    disclosure_content: z
      .boolean()
      .default(false)
      .refine((value) => value === true, {
        message: 'You must consent to disclosure in order to proceed',
      }),
    privacy_consent: z
      .boolean()
      .default(false)
      .refine((value) => value === true, {
        message: 'You must consent to privacy in order to proceed',
      }),
  })
  .refine((data) => data.phone !== data.emergency_contact_number, {
    message: 'Phone number and emergency contact number must be different',
    path: ['emergency_contact_number'],
  });

export const CreateAppointmentSchema = z.object({
  primary_physician: z.string().min(2, 'Select at least one doctor ooooooooo'),
  appointment_date: z.coerce.date(),
  appointment_reason: z
    .string()
    .min(2, 'Reason must be at least 2 characters')
    .max(500, 'Reason must be at most 500 characters'),
  additional_comment: z.string().optional(),
  cancellation_reason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
  primary_physician: z.string().min(2, 'Select at least one doctor'),
  appointment_date: z.coerce.date(),
  appointment_reason: z.string().optional(),
  additional_comment: z.string().optional(),
  cancellation_reason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
  primary_physician: z.string().min(2, 'Select at least one doctor'),
  appointment_date: z.coerce.date(),
  appointment_reason: z.string().optional(),
  additional_comment: z.string().optional(),
  cancellation_reason: z
    .string()
    .min(10, 'Reason must be at least 10 characters')
    .max(500, 'Reason must be at most 500 characters'),
});

export function getAppointmentSchema(type: string) {
  switch (type) {
    case 'create':
      return CreateAppointmentSchema;
    case 'cancel':
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}

export const createDoctor = z.object({
  name: z.string().min(4, 'Doctor name must be at least 4 characters'),
  profession: z.string().min(5, 'Kindly select the physician profession'),
  physician_img: z
    .custom<File[]>()
    .refine((files) => files && files.length > 0, {
      message: 'Please upload at least one image',
    }),
  gender: z.enum(['male', 'female', 'other']),
});

// export const imageSchema = z.object({
//   image: validateImageFile(),
// });
// function validateImageFile() {
//   const maxUploadSize = 1024 * 1024;
//   const acceptedFileTypes = ['image/'];
//   return z
//     .instanceof(File)
//     .refine((file) => {
//       return !file || file.size <= maxUploadSize;
//     }, 'File size must be less than 1MB')
//     .refine((file) => {
//       return (
//         !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
//       );
//     }, 'File must be an image');
// }

export function validateWithZodSchema<T>(
  schema: ZodSchema<T>,
  data: unknown
): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);
    throw new Error(errors.join(','));
  }
  return result.data;
}
//     identification_document: z.custom<File[]>().optional(),

// .union([z.instanceof(File), z.undefined()])
// .refine((file) => file !== undefined, {
//   message: 'Please provide physician picture',
// })
// .refine(
//   (file) => file === undefined || file.size <= maxUploadSize,
//   'File size must be less than 1MB'
// )
// .refine(
//   (file) =>
//     file === undefined ||
//     acceptedFileTypes.some((type) => file.type.startsWith(type)),
//   'File must be an image'
// );
