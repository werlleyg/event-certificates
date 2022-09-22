import { ReactNode } from 'react';

import { Container } from './styles';

export function Loader() {
  const checkQueryParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('evento');

    if (!courseId) {
      return <h1>Parâmetro de curso não informado</h1>;
    } else {
      return;
    }
  };

  return (
    <Container>
      {checkQueryParams()}
      <span class="loader"></span>
    </Container>
  );
}
