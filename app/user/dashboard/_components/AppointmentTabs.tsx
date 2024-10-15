'use client';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchAppointmentType } from '@/constant/sliceFeature';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';

const arr = ['scheduled', 'pending', 'cancelled'];

const AppointmentTabs = () => {
  const dispatch = useDispatch();
  return (
    <Tabs
      defaultValue="scheduled"
      className="w-fit px-2 rounded-full bg-gray-200 "
    >
      <TabsList>
        {arr.map((item, index) => {
          return (
            <TabsTrigger
              key={index}
              onClick={() => dispatch(fetchAppointmentType(item))}
              value={item}
              className={clsx('!capitalize data-[state=active]:!bg-[#f1f5f8]', {
                '!text-blue-500': item === 'pending',
                '!text-green-500': item === 'scheduled',
                '!text-red-500': item === 'cancelled',
              })}
            >
              {item}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
};
export default AppointmentTabs;
