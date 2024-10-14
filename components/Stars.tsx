import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import styled from 'styled-components';

const Stars = ({ stars }: { stars: number }) => {
  const myStars = Array.from({ length: 5 }, (__, index) => {
    const realNumbers = index + 1;
    const floatingNumbers = index + 0.5;

    return (
      <span key={index}>
        {stars >= realNumbers ? (
          <BsStarFill />
        ) : stars >= floatingNumbers ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
    );
  });
  return (
    <Wrapper>
      <div className="flex">{myStars}</div>
    </Wrapper>
  );
};
export default Stars;

const Wrapper = styled.section`
  display: flex;
  align-items: flex-start;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
`;
