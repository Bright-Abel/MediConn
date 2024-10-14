'use client';
import { Form, FormControl } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import CustomForm from '@/components/forms/CustomForm';
import { FormFieldType } from '@/components/forms/FormTypes';
import SubmitButton from '@/components/SubmitButton';
import { createDoctor } from '@/lib/form-validation';
import { useState, useEffect } from 'react';
import { professionTypes } from './data.json';
import { SelectItem } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { genderOptions } from '@/constant/data-json';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import FileUploader from '@/components/FileUploader';
import {
  createDoctorDetail,
  getDoctors,
  uploadImage,
} from '@/lib/actions/doctor.action';
import { showToast } from '@/components/showToast';

const DoctorForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   const fetchDoctors = async () => {
  //     const doc = await getDoctors();
  //     console.log(doc);
  //   };
  //   fetchDoctors();
  // }, []);

  const form = useForm<z.infer<typeof createDoctor>>({
    resolver: zodResolver(createDoctor),
    defaultValues: {
      name: '',
      profession: '',
      physician_img: undefined,
      gender: 'male',
    },
  });
  async function onSubmit(values: z.infer<typeof createDoctor>) {
    setIsLoading(true);
    let formData;
    if (values.physician_img && values.physician_img.length > 0) {
      const blobFile = new Blob([values.physician_img[0]], {
        type: values.physician_img[0].type,
      });
      formData = new FormData();
      formData.append('blobFile', blobFile);
      formData.append('fileName', values.physician_img[0].name);
    }
    let uploadImgUrl = await uploadImage(formData);

    try {
      const doctorData = {
        name: values.name,
        gender: values.gender,
        profession: values.profession,
        doc_img_url: uploadImgUrl,
      };
      const uploadDoctor = await createDoctorDetail(doctorData);
      if (uploadDoctor) {
        form.reset();
        showToast('success', <p>Physician has been successfully added</p>, {
          icon: false,
          autoClose: 5000,
          style: { backgroundColor: '#0d9488', color: '#f1f5f8' },
        });
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
        <section className="mb-6 mt-2 space-y-1 text-white">
          <h1 className="header"> Add a physician </h1>
          <p className="">Please provide the physician details</p>
        </section>

        <CustomForm
          control={form.control}
          type={FormFieldType.INPUT}
          name="name"
          label="Enter physician full name"
          className="!h-11"
          autoPass={true}
          iconSrc="/assets/icons/user.svg"
          iconAlt="user_logo"
        />
        {/* GENDER */}
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
                      className="capitalize cursor-pointer text-[#f1f5f8]"
                    >
                      {item}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
          )}
        />

        {/* PHYSICIAN PROFESSION */}
        <CustomForm
          control={form.control}
          type={FormFieldType.SELECT}
          name="profession"
          placeholder="Select physician specialist"
          label="Physician specialist"
        >
          {professionTypes.map((item, index) => (
            <SelectItem
              key={index}
              value={item}
              className="py-1 cursor-pointer hover:!bg-[#363a3d] text-white duration-200"
            >
              {item}
            </SelectItem>
          ))}
        </CustomForm>

        {/* PHYSICIAN IMAGE */}
        <CustomForm
          control={form.control}
          type={FormFieldType.SKELETON}
          name="physician_img"
          label="Upload an image of the physician"
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader
                files={field.value}
                onChange={field.onChange}
                className="text-teal-500"
                label="SVG, PNG, JPG or Gif (max 800x400)"
              />
            </FormControl>
          )}
        />
        <SubmitButton isLoading={isLoading}> Add Physician </SubmitButton>
      </form>
    </Form>
  );
};
export default DoctorForm;
