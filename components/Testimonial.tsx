
import TestimonialCard from './TestimonialCard';
import { testimonials } from '@/constant/data-json';
const Testimonial = () => {
  return (
    <div className="bg-[#e6f2f8]  w-">
      <div className=" px-6 md:px-0 grid grid-cols-5 gap-8">
        {testimonials.map((item, index) => {
          return <TestimonialCard key={index} {...item} />;
        })}
      </div>
    </div>
  );
};
export default Testimonial;
