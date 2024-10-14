'use client';
import Link from 'next/link';
import dashboardLinks from '../constant/data-json';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

interface DashboardProperties {
  handleClick?: () => void;
}
const DashboardLink: React.FC<DashboardProperties> = ({ handleClick }) => {
  const pathname = usePathname();
  return (
    <div className="nav-links">
      {dashboardLinks.map((link) => {
        const { id, url, text, icon } = link;

        return (
          <Link
            key={id}
            href={url}
            onClick={handleClick}
            className={clsx(
              'nav-link',
              pathname === url && 'active bg-gray-200'
            )}
          >
            <span className="icon">{icon}</span> {text}
          </Link>
        );
      })}
    </div>
  );
};
export default DashboardLink;
