'use client';
import { signOutUser } from '@/lib/actions/patient.action';
import { useRouter } from 'next/navigation';
import { LiaPowerOffSolid } from 'react-icons/lia';
import Link from 'next/link';

const AdminNav = () => {
  const router = useRouter();
  const handleSignout = async () => {
    await signOutUser();
    router.push('/');
    window.location.reload();
  };
  return (
    <header className="admin-header">
      <Link
        href="/admin/add-doctor"
        className="cursor-pointer text-teal-500 font-bold text-2xl"
      >
        Add a physician
      </Link>
      <button
        type="button"
        onClick={handleSignout}
        className="outline-none hover:!text-teal-400 duration-500 flex items-center gap-2 bg-[#f1f5f8] px-4 py-2 rounded-sm"
      >
        <span className="icon">
          <LiaPowerOffSolid />
        </span>
        <p className="">Logout</p>
      </button>
    </header>
  );
};
export default AdminNav;
