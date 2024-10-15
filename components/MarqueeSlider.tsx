import Marquee from 'react-fast-marquee';

import { testimonials } from '@/constant/data-json';
import TestimonialCard from './TestimonialCard';
const MarqueeSlider = () => {
  return (
    <div className="w-full bg-[#e6f2f8] overflow-hidden p-2 md:p-5 lg:p-10">
      <div className="px-6 py-4 md:px-0 bg-white">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          What Our Patients Are Saying
        </h2>
        <Marquee gradient={false} speed={50} pauseOnHover={true} className="">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="mx-3 h-[16rem] ">
              <TestimonialCard
                name={testimonial.name}
                rating={testimonial.rating}
                text={testimonial.text}
                role={testimonial.role}
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};
export default MarqueeSlider;
