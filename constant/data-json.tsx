import { nanoid } from 'nanoid';
import { FaUserDoctor } from 'react-icons/fa6';
import { IoCalendarNumber } from 'react-icons/io5';
import { MdOutlineSecurity } from 'react-icons/md';

const navList: string[] = ['about', `reviews`, 'blog'];

export const whyUs = [
  {
    id: nanoid(),
    title: 'Expert Doctors at Your Fingertips',
    desc: ' Our platform connects you with the best doctors in various specialties, ensuring you get top-notch care wherever you are.',
    icon: <FaUserDoctor className="text-[#496A8D] " />,
    alt: 'doctor_icon',
  },
  {
    id: nanoid(),
    title: 'Convenient Online Appointments',
    desc: 'Book appointments anytime, from anywhere. Choose your preferred doctor and time, and confirm in minutes.',
    icon: <IoCalendarNumber className="text-[#496A8D] " />,
    alt: 'calendar_icon',
  },
  {
    id: nanoid(),
    title: 'Seamless Patient Experience',
    desc: 'Access your health records, book follow-ups, and even consult with doctors via video calls—all in one secure platform.',
    icon: <MdOutlineSecurity className="text-[#496A8D] " />,
    alt: 'security_icon',
  },
];

export type Gender = 'male' | 'female' | 'other';

export const genderOptions = ['male', 'female', 'other'];
export const Doctors = [
  {
    image: '/assets/images/dr-green.png',
    name: 'John Green',
  },
  {
    image: '/assets/images/dr-cameron.png',
    name: 'Leila Cameron',
  },
  {
    image: '/assets/images/dr-livingston.png',
    name: 'David Livingston',
  },
  {
    image: '/assets/images/dr-peter.png',
    name: 'Evan Peter',
  },
  {
    image: '/assets/images/dr-powell.png',
    name: 'Jane Powell',
  },
  {
    image: '/assets/images/dr-remirez.png',
    name: 'Alex Ramirez',
  },
  {
    image: '/assets/images/dr-lee.png',
    name: 'Jasmine Lee',
  },
  {
    image: '/assets/images/dr-cruz.png',
    name: 'Alyana Cruz',
  },
  {
    image: '/assets/images/dr-sharma.png',
    name: 'Hardik Sharma',
  },
];

export const IdentificationTypes = [
  'Birth Certificate',
  "Driver's License",
  'Medical Insurance Card/Policy',
  'Military ID Card',
  'National Identity Card',
  'Passport',
  'Resident Alien Card (Green Card)',
  'Social Security Card',
  'State ID Card',
  'Student ID Card',
  'Voter ID Card',
];

export const PatientFormDefaultValues = {
  name: '',
  // lastName: '',
  email: '',
  phone: '',
  birth_date: new Date(Date.now()),
  gender: 'male' as Gender,
  address: '',
  occupation: '',
  emergency_contact_name: '',
  emergency_contact_number: '',
  primary_physician: '',
  insurance_provider: '',
  insurance_policy_number: '',
  allergies: '',
  current_medication: '',
  family_medical_history: '',
  past_medical_history: '',
  identification_type: 'Birth Certificate',
  identification_number: '',
  identification_document: [],
  treatment_consent: false,
  disclosure_consent: false,
  privacy_consent: false,
};

export const StatusIcon = {
  scheduled: '/assets/icons/check.svg',
  pending: '/assets/icons/pending.svg',
  cancelled: '/assets/icons/cancelled.svg',
};

export const testimonials = [
  {
    name: 'John D.',
    rating: 4.5,
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
    rating: 4,
    text: 'I love how easy and convenient it is to use this app! As someone with a hectic schedule, being able to book appointments anytime and get reminders via SMS is a game-changer.',
    role: 'Busy Professional',
  },
  {
    name: 'Linda K.',
    rating: 3.5,
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

export default navList;
