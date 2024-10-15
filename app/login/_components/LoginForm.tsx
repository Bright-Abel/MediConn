'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form } from '@/components/ui/form';
import CustomForm from '@/components/forms/CustomForm';
import { FormFieldType } from '@/components/forms/FormTypes';
import SubmitButton from '@/components/SubmitButton';
import { LoginFormValidation } from '@/lib/form-validation/index';
import { loginUser } from '@/lib/actions/patient.action';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { showToast } from '@/components/showToast';

const LoginForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginFormValidation>>({
    resolver: zodResolver(LoginFormValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 2. Define a submit handler.
  async function onSubmit({
    email,
    password,
  }: z.infer<typeof LoginFormValidation>) {
    setIsLoading(true);
    try {
      const data = { email, password };
      const validateUser = await loginUser(data);
      // console.log(validateUser, typeof validateUser);
      setIsLoading(false);

      if (validateUser && typeof validateUser === 'object') {
        showToast('success', <p>Login successful </p>, {
          icon: false,
          autoClose: 5000,
          style: { backgroundColor: '#f1f5f8', color: '#0d9488' },
        });
        if (validateUser.userRole === 'admin') {
          router.push('/admin');
        } else {
          router.push('/user/register');
        }
      } else {
        showToast('error', <p>{validateUser}</p>, {
          // icon: false,
          autoClose: 8000,

          style: { backgroundColor: '#fff', color: '#dc2626' },
        });
      }
    } catch {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <section className="mb-10 mt-6 space-y-1 text-white">
          <h1 className="header"> Hi there....,👋</h1>
          <p className="">Please login to schedule an appointment</p>
        </section>

        <CustomForm
          control={form.control}
          type={FormFieldType.INPUT}
          name="email"
          label="Enter your Email"
          iconSrc="/assets/icons/email.svg"
          iconAlt="image_logo"
        />
        <CustomForm
          control={form.control}
          type={FormFieldType.PASSWORD}
          name="password"
          label="Password"
        />
        {/* */}
        <SubmitButton
          isLoading={isLoading}
          className="!bg-white !text-[#5bbfd1] !h-11 !rounded-full !font-bold text-lg !w-full"
        >
          Login
        </SubmitButton>
      </form>
    </Form>
  );
};
export default LoginForm;
