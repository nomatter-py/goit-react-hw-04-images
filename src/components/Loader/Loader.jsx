import { ThreeDots } from 'react-loader-spinner';
import { LoaderContainer } from './Loader.styled';

export const Loader = () => {
  return (
    <LoaderContainer>
      {' '}
      <ThreeDots height="100" width="100" color="#3f51b5" ariaLabel="loading" />
    </LoaderContainer>
  );
};
