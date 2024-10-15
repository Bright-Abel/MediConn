import { nanoid } from 'nanoid';
import { MdOutlineSpaceDashboard } from 'react-icons/md';

import { AiOutlineSchedule } from 'react-icons/ai';
import { MdOutlineWorkHistory } from 'react-icons/md';
import { MdManageHistory } from 'react-icons/md';

const dashboardLinks = [
  {
    id: nanoid(),
    url: '/user/dashboard',
    text: 'DashBoard',
    icon: <MdOutlineSpaceDashboard />,
  },

  {
    id: nanoid(),
    url: '/user/dashboard/appointment',
    text: 'Appointment',
    icon: <AiOutlineSchedule />,
  },
  {
    id: nanoid(),
    url: '/user/dashboard/appointment-history',
    text: 'Appointment card',
    icon: <MdOutlineWorkHistory />,
  },
  {
    id: nanoid(),
    url: '/user/dashboard/manage-appointment',
    text: 'Manage Appointment',
    icon: <MdManageHistory />,
  },
  // {
  //   id: nanoid(),
  //   url: '/user/dashboard/setting',
  //   text: 'settings',
  //   icon: <IoSettingsOutline />,
  // },
];

export default dashboardLinks;
