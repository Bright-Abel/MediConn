'use client';
import { useState } from 'react';
import { Eye, EyeOff, LockKeyhole } from 'lucide-react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '../ui/textarea';
import { Input } from '@/components/ui/input';
import { Control } from 'react-hook-form';
import { FormFieldType } from './FormTypes';
import Image from 'next/image';
import clsx from 'clsx';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

import DatePicker from 'react-datepicker';
import { E164Number } from 'libphonenumber-js/core';

import 'react-datepicker/dist/react-datepicker.css';

import { useDispatch } from 'react-redux';

import { autoPasswordGenerate } from '@/constant/sliceFeature';

interface CustomProperties {
  control: Control<any>;
  type: FormFieldType;
  name: string;
  label?: string;
  iconSrc?: string;
  iconAlt?: string;
  placeholder?: string;
  className?: string;
  autoPass?: boolean;
  contBorder?: string;
  dateFormat?: string;
  showTimeSelect?: boolean;
  labelClass?: string;
  children?: React.ReactNode;
  renderSkeleton?: (fields: any) => React.ReactNode;
  selectDefaultValue?: string;
  date?: Date;
}

const RenderField = ({
  field,
  props,
}: {
  field: any;
  props: CustomProperties;
}) => {
  const {
    type,
    iconSrc,
    iconAlt,
    placeholder,
    className,
    autoPass,
    contBorder,
    dateFormat,
    showTimeSelect,
    renderSkeleton,
    label,
    selectDefaultValue,
    children,
    name,
    date,
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  switch (type) {
    case FormFieldType.INPUT:
      return (
        <div
          className={clsx(
            `flex w-full items-center rounded-[12px] border-solid border-white  focus-within:border-[#5bbfd1]`,
            contBorder ?? 'border'
          )}
        >
          {iconSrc && (
            <Image
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt || 'icon'}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className={clsx(
                `shad-input !outline-none !border-none`,
                className ?? '!h-11'
              )}
            />
          </FormControl>
        </div>
      );

    case FormFieldType.PASSWORD:
      return (
        <>
          {/* border-b border-0 */}
          <div
            className={clsx(
              `flex w-full px-2 items-center rounded-[12px] border-solid border-white  focus-within:border-[#5bbfd1]`,
              contBorder ?? 'border'
            )}
          >
            <LockKeyhole strokeWidth={1.5} color="#ffffff" className="" />
            <FormControl>
              <Input
                placeholder={placeholder}
                {...field}
                type={showPassword ? 'text' : 'password'}
                className={clsx(
                  `shad-input !outline-none border-0`,
                  className ?? '!h-11'
                )}
              />
            </FormControl>
            <button
              type="button"
              className="!outline-none"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <EyeOff strokeWidth={1.5} color="#ffffff" />
              ) : (
                <Eye strokeWidth={1.5} color="#ffffff" />
              )}
            </button>
          </div>
          {autoPass && (
            <button
              type="button"
              className="text-green-400 font-semibold !outline-none underline hover:text-green-500 text-sm italic"
              onClick={() => dispatch(autoPasswordGenerate())}
            >
              Auto generate password
            </button>
          )}
        </>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="NG"
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className={clsx(
              `!outline-none !rounded-[12px]  !border !pl-2 !border-solid !border-white !text-white focus-within:!border-[#5bbfd1]`,
              className ?? '!h-11'
            )}
          />
        </FormControl>
      );
    case FormFieldType.DATE_PICKER:
      return (
        <div
          className={clsx(
            `flex w-full items-center rounded-[12px] border-solid border-white   focus-within:border-[#5bbfd1]`,
            contBorder ?? 'border'
          )}
        >
          {iconSrc && (
            <Image
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt || 'icon'}
              className="ml-2"
            />
          )}
          <DatePicker
            selected={field.value}
            onChange={(date) => field.onChange(date)}
            dateFormat={dateFormat ?? 'dd/MM/yyyy'}
            showTimeSelect={showTimeSelect ?? false}
            timeInputLabel="Time:"
            minDate={date ? date : undefined}
            maxTime={new Date(0, 0, 0, 23, 59, 59)}
            minTime={
              field.value &&
              field.value.toDateString() === new Date().toDateString()
                ? new Date()
                : new Date(0, 0, 0, 0, 0, 0)
            }
            wrapperClassName="date-picker"
          />
        </div>
      );
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select
            onValueChange={field.onChange}
            defaultValue={selectDefaultValue || field.value}
          >
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue
                  placeholder={placeholder}
                  className="!text-white"
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content !min-w-full">
              {children}
            </SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              checked={field.value}
              id={name}
              onCheckedChange={field.onChange}
              className={cn(
                `checkbox-input text-[#0C1132] font-extrabold rounded-md`,
                field.value && 'checkbox-item'
              )}
            />
            <label htmlFor={name} className="checkbox-label">
              {label}
            </label>
          </div>
        </FormControl>
      );
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            className="shad-textArea resize-none"
            {...field}
          />
        </FormControl>
      );
    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;
  }
};

const CustomForm = (props: CustomProperties) => {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          {/* <FormLabel>Username</FormLabel>
          <FormControl>
            <Input placeholder="shadcn" {...field} />
          </FormControl>
          <FormDescription>This is your public display name.</FormDescription>
          <FormMessage /> */}

          {props.type !== FormFieldType.CHECKBOX && props.label && (
            <FormLabel
              className={clsx(
                `text-lg`,
                props.labelClass ?? 'text-[#ABB8C4]'
              )}
            >
              {props.label}
            </FormLabel>
          )}
          <RenderField field={field} props={props} />

          <FormMessage className="text-red-400 -mt-4" />
        </FormItem>
      )}
    />
  );
};
export default CustomForm;
