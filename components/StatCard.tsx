import clsx from 'clsx';
import Image from 'next/image';

interface StatCardProperties {
  type: 'appointments' | 'pending' | 'cancelled';
  count: number;
  label: string;
  icon: string;
}
const StatCard: React.FC<StatCardProperties> = ({
  type,
  count = 0,
  label,
  icon,
}) => {
  return (
    <div
      className={clsx(
        `stat-card bg-[#f1f5f8c7] hover:scale-105 duration-500 cursor-pointer`,
        {
          'bg-appointments': type === 'appointments',
          'bg-pending': type === 'pending',
          'bg-cancelled': type === 'cancelled',
        }
      )}
    >
      <div className="flex items-center gap-4">
        <Image
          src={icon}
          alt={label}
          width={32}
          height={32}
          className="size-8 w-fit"
        />
        <h2 className="text-32-bold">{count}</h2>
      </div>
      <p className="text-14-regular capitalize font-semibold">{label}</p>
    </div>
  );
};
export default StatCard;
