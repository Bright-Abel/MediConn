'use client';
import { zodResolver } from '@hookform/resolvers/zod';
// import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Doctors,
  genderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from '@/constant/data-json';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl } from '@/components/ui/form';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { PatientFormValidation } from '@/lib/form-validation/index';
import { cn } from '@/lib/utils';

import Image from 'next/image';
import CustomForm from '@/components/forms/CustomForm';
import { FormFieldType } from '@/components/forms/FormTypes';
import { SelectItem } from '@/components/ui/select';
import SubmitButton from '@/components/SubmitButton';
import FileUploader from '@/components/FileUploader';
import { DoctorParams, User } from '@/types/index';
import { registerPatient } from '@/lib/actions/patient.action';

interface RegisterParams {
  user: User;
  doctors: DoctorParams[];
}
const RegisterForm: React.FC<RegisterParams> = ({ user, doctors }) => {
  const { name, email, $id, phone } = user;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: name,
      email: email,
      phone: phone,
    },
  });

  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    setIsLoading(true);
    let formData;
    if (
      values.identification_document &&
      values.identification_document.length > 0
    ) {
      const blobFile = new Blob([values.identification_document[0]], {
        type: values.identification_document[0].type,
      });
      formData = new FormData();
      formData.append('blobFile', blobFile);
      formData.append('fileName', values.identification_document[0].name);
    }
    try {
      const patientData = {
        ...values,
        identification_document: formData,
        userId: $id,
        birth_date: new Date(values.birth_date),
      };

      const patient = await registerPatient(patientData);
      if (patient) router.push('/user/dashboard');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log('register error', error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 space-y-6 "
      >
        <section className="mb-6 mt-2 space-y-1 text-white">
          <h1 className="header"> Account Registration </h1>
          <p className="">
            Please input your credentials to register your account
          </p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header"> Personal Information</h2>
          </div>
          <CustomForm
            control={form.control}
            type={FormFieldType.INPUT}
            name="name"
            placeholder="Enter your name"
            iconSrc="/assets/icons/user.svg"
            label="Full name"
            iconAlt="user_logo"
          />
          <div className="grid grid-cols-1  gap-6 xl:grid-cols-2">
            {/* Email */}
            <CustomForm
              control={form.control}
              type={FormFieldType.INPUT}
              name="email"
              placeholder="annasmith@gmail.com"
              iconSrc="/assets/icons/email.svg"
              label="Email address"
              iconAlt="email_logo"
            />
            <CustomForm
              control={form.control}
              type={FormFieldType.PHONE_INPUT}
              name="phone"
              placeholder="(213) 373-4253"
              label="Phone number"
            />
          </div>
          <div className="grid grid-cols-1  gap-6 xl:grid-cols-2">
            <CustomForm
              control={form.control}
              type={FormFieldType.DATE_PICKER}
              name="birth_date"
              placeholder="Select your date of birth"
              iconSrc="/assets/icons/calendar.svg"
              label="Date of Birth"
              iconAlt="calender"
            />
            <CustomForm
              control={form.control}
              type={FormFieldType.SKELETON}
              name="gender"
              label="Gender"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {genderOptions.map((item, index) => (
                      <div
                        key={index}
                        className="flex radio-group items-center space-x-2"
                      >
                        <RadioGroupItem
                          value={item}
                          id={item}
                          className={cn(
                            'peer',
                            field.value === item
                              ? 'radio-item'
                              : 'border bg-[#1A1D21] border-solid border-[#363A3D]'
                          )}
                        />

                        <Label
                          htmlFor={item}
                          className="capitalize cursor-pointer"
                        >
                          {item}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>

          {/* ADDRESS AND OCCUPATION */}
          <div className="grid grid-cols-1  gap-6 xl:grid-cols-2">
            <CustomForm
              control={form.control}
              type={FormFieldType.INPUT}
              name="address"
              placeholder="ex: 14 street, New York, NY - 5101"
              label="Address"
            />
            <CustomForm
              control={form.control}
              type={FormFieldType.INPUT}
              name="occupation"
              placeholder="Software Engineer"
              label="Occupation"
            />
          </div>
          {/* Emergency and contact phone number */}

          <div className="grid grid-cols-1  gap-6 xl:grid-cols-2">
            <CustomForm
              control={form.control}
              type={FormFieldType.INPUT}
              name="emergency_contact_name"
              placeholder="Guardian's name"
              label="Emergency contact name"
            />
            <CustomForm
              control={form.control}
              type={FormFieldType.PHONE_INPUT}
              name="emergency_contact_number"
              placeholder="+234 814 3724 562"
              label="Emergency contact number"
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header"> Medical Information</h2>
          </div>
          {/* DOCTORS SELECT */}
          <CustomForm
            control={form.control}
            type={FormFieldType.SELECT}
            name="primary_physician"
            placeholder="Select a physician"
            label="Primary care physician"
          >
            {doctors.map((item, index) => {
              const { doc_img_url, name } = item;
              return (
                <SelectItem
                  key={index}
                  value={item.name}
                  className="py-1 cursor-pointer hover:!bg-gray-400 duration-200"
                >
                  <div className="flex gap-2 cursor-pointer items-center">
                    <Image
                      src={doc_img_url}
                      alt={name}
                      width={32}
                      height={32}
                      className="rounded-full h-8 w-8 object-cover border border-dark-500 border-solid"
                    />
                    <p className="text-white">Dr. {name}</p>
                  </div>
                </SelectItem>
              );
            })}
          </CustomForm>

          {/* Insurance */}
          <div className="grid grid-cols-1  gap-6 xl:grid-cols-2">
            <CustomForm
              control={form.control}
              type={FormFieldType.INPUT}
              name="insurance_provider"
              placeholder="ex: BlueCross"
              label="Insurance provider"
            />
            <CustomForm
              control={form.control}
              type={FormFieldType.INPUT}
              name="insurance_policy_number"
              placeholder="ex: ABC1234567"
              label="Insurance policy number"
            />
          </div>

          {/* ALLERGIES */}
          <div className="grid grid-cols-1  gap-6 xl:grid-cols-2">
            <CustomForm
              control={form.control}
              type={FormFieldType.TEXTAREA}
              name="allergies"
              placeholder="ex: Peanuts, Penicillin, Pollen"
              label="Allergies (if any)"
            />
            <CustomForm
              control={form.control}
              type={FormFieldType.TEXTAREA}
              name="current_medication"
              placeholder="ex: Ibuprofen 200mg, Levothyroxine 50mcg"
              label="Current medication"
            />
          </div>

          {/* MEDICAL HISTORY */}
          <div className="grid grid-cols-1  gap-6 xl:grid-cols-2">
            <CustomForm
              control={form.control}
              type={FormFieldType.TEXTAREA}
              name="family_medical_history"
              placeholder="ex: Mother had breast cancer"
              label="Family medical history (if relevant)"
            />
            <CustomForm
              control={form.control}
              type={FormFieldType.TEXTAREA}
              name="past_medical_history"
              placeholder="ex: Asthma diagnosis in childhood"
              label="Past medical history"
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header"> Identification and Verification</h2>
          </div>
          {/* IDENTIFICATION TYPE */}
          <CustomForm
            control={form.control}
            type={FormFieldType.SELECT}
            name="identification_type"
            placeholder="Select a means of identification"
            label="Identification type"
          >
            {IdentificationTypes.map((item, index) => (
              <SelectItem
                key={index}
                value={item}
                className="py-1 cursor-pointer hover:!bg-[#363a3d] text-white duration-200"
              >
                {item}
              </SelectItem>
            ))}
          </CustomForm>

          <CustomForm
            control={form.control}
            type={FormFieldType.INPUT}
            name="identification_number"
            placeholder="ex 1234567"
            label="Identification number"
          />
          <CustomForm
            control={form.control}
            type={FormFieldType.SKELETON}
            name="identification_document"
            label="Scanned Copy of Identification Document"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />
        </section>

        {/* CONSENT AND PROVACY */}
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
          </div>
          <CustomForm
            control={form.control}
            type={FormFieldType.CHECKBOX}
            name="treatment_consent"
            label="I consent to receive treatment for my health condition."
          />
          <CustomForm
            control={form.control}
            type={FormFieldType.CHECKBOX}
            name="disclosure_content"
            label="I consent to the use and disclosure of my health information for treatment purposes."
          />
          <CustomForm
            control={form.control}
            type={FormFieldType.CHECKBOX}
            name="privacy_consent"
            label="I acknowledge that I have reviewed and agree to the privacy policy"
          />
        </section>
        {/* !text-[#5bbfd1] */}
        <SubmitButton
          isLoading={isLoading}
          className="!bg-white !text-black !h-11 !rounded-full !font-bold z-50 text-lg !w-full"
        >
          Get Started
        </SubmitButton>
      </form>
    </Form>
  );
};
export default RegisterForm;
