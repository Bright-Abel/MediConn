'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form } from '@/components/ui/form';
import CustomForm from '@/components/forms/CustomForm';
import { FormFieldType } from '@/components/forms/FormTypes';
import SubmitButton from '@/components/SubmitButton';
import { useEffect, useState } from 'react';
import { RootState } from '@/store/index';
import { useSelector } from 'react-redux';
import { createUser } from '@/lib/actions/patient.action';
import { useRouter } from 'next/navigation';

import { SignUpFormValidation } from '@/lib/form-validation/index';

const SignupForm = () => {
  const router = useRouter();
  const { autoPassword } = useSelector((state: RootState) => state.dataSlice);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof SignUpFormValidation>>({
    resolver: zodResolver(SignUpFormValidation),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirm_password: '',
    },
  });

  useEffect(() => {
    if (autoPassword) {
      form.reset({
        ...form.getValues(),
        password: autoPassword,
        confirm_password: autoPassword,
      });
    }
  }, [autoPassword, form]);

  async function onSubmit({
    name,
    phone,
    password,
    email,
  }: z.infer<typeof SignUpFormValidation>) {
    setIsLoading(true);
    try {
      const data = { phone, password, email, name };

      const newUser = await createUser(data);
      if (newUser) {
        router.push('/login');
      }
      setIsLoading(false);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <section className="mb-6 mt-2 space-y-1 text-white">
          <h1 className="header"> Create an Account </h1>
          <p className="">Please input your credentials to create an account</p>
        </section>
        <CustomForm
          control={form.control}
          type={FormFieldType.INPUT}
          name="name"
          label="Enter your fullname"
          className="!h-11"
          autoPass={true}
          iconSrc="/assets/icons/user.svg"
          iconAlt="user_logo"
        />
        <div className='grid grid-cols-1  gap-2 xl:grid-cols-2'>
        <CustomForm
          control={form.control}
          type={FormFieldType.INPUT}
          name="email"
          label="Email"
          className="!h-11"
          autoPass={true}
          iconSrc="/assets/icons/email.svg"
          iconAlt="image_logo"
        />
        <CustomForm
          control={form.control}
          type={FormFieldType.PHONE_INPUT}
          name="phone"
          label="Phone number"
          className="!h-11"
        />
        </div>
        <div className='grid grid-cols-1  gap-2 xl:grid-cols-2'>
        <CustomForm
          control={form.control}
          type={FormFieldType.PASSWORD}
          name="password"
          label="Password"
          className="!h-11"
          autoPass={true}
          // contBorder="border-b border-0"
        />
        <CustomForm
          control={form.control}
          type={FormFieldType.PASSWORD}
          name="confirm_password"
          label="Confirm Password"
          className="!h-11"
          // contBorder="border-b border-0"
        />
        </div>
        {/* */}

        <SubmitButton
          isLoading={isLoading}
          className="!bg-white !text-[#5bbfd1] !h-11 !rounded-full !font-bold z-50 text-lg !w-full"
        >
          Sign up
        </SubmitButton>
      </form>
    </Form>
  );
};
export default SignupForm;
