import Stars from './Stars';

interface TestimonialCardProps {
  name: string;
  rating: number;
  text: string;
  role: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  rating,
  text,
  role,
}) => {
  return (
    <div className="bg-[#f1f5f8] shadow-lg rounded-lg p-6 w-80 h-full flex flex-col justify-between">
      <div>
        <h4 className="text-lg font-semibold">{name}</h4>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
      <Stars stars={rating} />
      <p className="text-gray-700 mt-4 flex-grow italics">{text}</p>{' '}
    </div>
  );
};

export default TestimonialCard;
