import StatCard from '@/components/StatCard';

const SecondHero = ({
  scheduledCount,
  pendingCount,
  cancelledCount,
}: {
  scheduledCount: number;
  pendingCount: number;
  cancelledCount: number;
}) => {
  return (
    <div className="w-full ">
      <p className="text-[#65696b] font-bold text-[1rem] mb-[0.5rem]">
        Appointment cards
      </p>

      <section className="admin-stat">
        <StatCard
          type="appointments"
          count={scheduledCount}
          label="Scheduled appointments"
          icon="/assets/icons/appointments.svg"
        />
        <StatCard
          type="pending"
          count={pendingCount}
          label="pending appointments"
          icon="/assets/icons/pending.svg"
        />
        <StatCard
          type="cancelled"
          count={cancelledCount}
          label="cancelled appointments"
          icon="/assets/icons/cancelled.svg"
        />
      </section>
    </div>
  );
};
export default SecondHero;
