import { StatusIcon } from '@/constant/data-json';
import { Status } from '@/types';
import clsx from 'clsx';
import Image from 'next/image';
const StatusBadge: React.FC<{ status: Status }> = ({ status }) => {
  // const {pending, scheduled, cancelled} = status
  return (
    <div
      className={clsx('flex w-fit items-center gap-2 rounded-full px-4 py-2', {
        'bg-blue-600': status === 'pending',
        'bg-green-600': status === 'scheduled',
        'bg-red-600': status === 'cancelled',
      })}
    >
      <Image
        src={StatusIcon[status]}
        alt={status}
        width={24}
        height={24}
        className="h-fit w-3"
      />
      <p
        className={clsx('text-12-semibold capitalize', {
          'text-blue-500': status === 'pending',
          'text-green-500': status === 'scheduled',
          'text-red-500': status === 'cancelled',
        })}
      >
        {status}
      </p>
    </div>
  );
};
export default StatusBadge;
