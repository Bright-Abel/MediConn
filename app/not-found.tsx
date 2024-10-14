'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
const NotFoundPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      // easing: 'ease-in-sine',
      anchorPlacement: 'center-bottom',
    });
  }, []);

  return (
    <main className="grid place-items-center min-h-[100vh] px-8">
      <div className="text-center">
        <img
          src="/assets/svgs/error.svg"
          alt=""
          className="w-1/2 mx-auto"
          data-aos="zoom-in"
          data-aos-delay="400"
        />
        <h1
          className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl"
          data-aos="zoom-in-right"
          data-aos-delay="400"
        >
          Page not found
        </h1>
        <p
          className="mt-6 text-lg leading-7 "
          data-aos="zoom-in-left"
          data-aos-delay="400"
        >
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 ">
          <Link
            href="/"
            className="border border-solid border-teal-500 px-4 py-2 rounded-lg text-emerald-500 buttonNew"
          >
            Go back home
          </Link>
        </div>
        <Link
          href="https://segun-snake-xenxia-game.netlify.app"
          className="italic font-semibold text-lg md:text-xl lg:text-2xl mt-6 hidden xl:block text-[#00B0FF] hover:underline duration-500"
        >
          Play a game
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;
