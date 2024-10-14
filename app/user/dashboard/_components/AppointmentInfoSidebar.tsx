'use client';
import { appointmentInfoSideBar } from '@/constant/sliceFeature';
import { RootState } from '@/store/index';
import { MdClose } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import AppointmentDetails from './AppointmentDetails';
const AppointmentInfoSidebar = () => {
  const { isAppointmentInfoSidebar } = useSelector(
    (state: RootState) => state.dataSlice
  );


  const dispatch = useDispatch();
  return (
    <section
      className={
        isAppointmentInfoSidebar
          ? 'backdrop-sm fixed top-0 right-0 w-full h-full ease-in-out duration-1000  bg-[rgba(18,27,25,0.63)] z-[700]'
          : ''
      }
    >
      <div
        className={
          isAppointmentInfoSidebar
            ? 'aside !bg-[#f1f5f8] show-sidebar z-[1000]'
            : 'aside !bg-[#f1f5f8]'
        }
      >
        <div className="flex justify-end">
          <button
            type="button"
            aria-label="open sidebar"
            onClick={() => dispatch(appointmentInfoSideBar())}
            className=" block text-4xl outline-none text-[#496A8D] font-extrabold"
          >
            <MdClose className="" />
          </button>
        </div>

        <AppointmentDetails />
      </div>
    </section>
  );
};
export default AppointmentInfoSidebar;
