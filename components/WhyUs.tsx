import { whyUs } from '@/constant/data-json';

const WhyUs = () => {
  return (
    <section className="bg-[#496A8D] p-2 md:p-5 lg:p-10 w-full">
      <div className="bg-[#e6f2f8] px-6 md:px-0">
        <div className="max-w-screen-lg mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#496A8D] mb-10 mt-2">
            Why Choose Us
          </h2>
          {/* text-[#5694C3] */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-2">
            {whyUs.map((item) => {
              const { id, title, desc, icon } = item;
              return (
                <div
                  key={id}
                  className="bg-white py-6 px-4 mb-6 rounded-[12px] shadow-lg"
                >
                  <div className="mb-2 text-4xl flex justify-center w-full">
                    {icon}
                  </div>
                  <h3 className="text-xl font-semibold text-[#4A4A4A]">
                    {title}
                  </h3>
                  <p className="mt-4 text-gray-600">{desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
export default WhyUs;
