import Typewriter from 'typewriter-effect';
import clsx from 'clsx';

interface FormHeroProps {
  className?: string;
  text: string;
  pText: string;
}
const FormHero: React.FC<FormHeroProps> = ({ className, text, pText }) => {
  return (
    <section>
        <h1 className=""></h1>
      {/* <div className={clsx('', className)}>
        <Typewriter
          onInit={(typewriter) => {
            typewriter.typeString(`${text}`).start();
          }}
        />
      </div> */}

    </section>
  );
};
export default FormHero;
