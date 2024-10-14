import Image from 'next/image';
import { Button } from './ui/button';

interface ButtonProperties {
  isLoading?: boolean;
  className?: string;
  children?: React.ReactNode;
}
const SubmitButton: React.FC<ButtonProperties> = ({
  isLoading,
  className,
  children,
}) => {
  return (
    <Button
      disabled={isLoading}
      type="submit"
      className={
        className ??
        'shad-primary-btn hover:!bg-[#24ae7bc0] duration-500 w-full'
      }
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Image
            src="/assets/icons/loader.svg"
            alt="loader"
            width={24}
            height={24}
            className="animate-spin"
          />
          Loading...
        </div>
      ) : (
        children
      )}
    </Button>
  );
};
export default SubmitButton;
