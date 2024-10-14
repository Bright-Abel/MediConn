import React from 'react';

const testimonials = [
  {
    name: 'John D.',
    rating: 5,
    text: 'Booking an appointment has never been easier! I found a specialist in seconds and received an SMS confirmation right away. The reminder texts before my appointment were super helpful. Highly recommend!',
    role: 'Verified Patient',
  },
  {
    name: 'Sarah M.',
    rating: 5,
    text: 'MediConn saved me so much time. I was able to schedule an appointment with a top doctor near me, and the whole process took less than 5 minutes. The SMS updates kept me informed every step of the way.',
    role: 'First-time User',
  },
  {
    name: 'Michael R.',
    rating: 5,
    text: 'I love how easy and convenient it is to use this app! As someone with a hectic schedule, being able to book appointments anytime and get reminders via SMS is a game-changer.',
    role: 'Busy Professional',
  },
  {
    name: 'Linda K.',
    rating: 5,
    text: 'I’ve been using MediConn for over 6 months now, and the experience has always been smooth. The doctors are top-notch, and the SMS notifications ensure I never miss an appointment!',
    role: 'Long-time Patient',
  },
  {
    name: 'Anthony G.',
    rating: 5,
    text: 'I’m often on the road, so booking appointments in new cities used to be a hassle. With MediConn, I can easily find a doctor wherever I am, and the SMS notifications make sure I never miss my appointments.',
    role: 'Frequent Traveler',
  },
];

const TestimonialCard = ({ name, role, rating, text }: any) => (
  <div className="bg-white shadow-lg rounded-lg p-6">
    <div className="flex items-center mb-4">
      <div className="flex-1">
        <h4 className="text-lg font-semibold">{name}</h4>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
      <div className="flex">
        {Array(rating)
          .fill(0)
          .map((_, index) => (
            <svg
              key={index}
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.973a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.366 2.453a1 1 0 00-.364 1.118l1.287 3.973c.3.921-.755 1.688-1.54 1.118l-3.366-2.454a1 1 0 00-1.175 0l-3.366 2.454c-.784.57-1.84-.197-1.54-1.118l1.287-3.973a1 1 0 00-.364-1.118L2.49 9.4c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.973z" />
            </svg>
          ))}
      </div>
    </div>
    <p className="text-gray-700">{text}</p>
  </div>
);

const Testimonials = () => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          What Our Patients Are Saying
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
        <div className="text-center mt-10">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700">
            Book Your Appointment Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
