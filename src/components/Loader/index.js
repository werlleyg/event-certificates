import { ReactNode, useState } from 'react';

import { Container } from './styles';

export function Loader(props) {
  const [showBlur, setShowBlur] = useState(props?.showBlur | false);
  const checkQueryParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('evento');

    if (!courseId && props?.showMsg) {
      return <h1>Parâmetro de curso não informado</h1>;
    } else {
      return;
    }
  };

  return (
    <Container showBlur={showBlur}>
      {checkQueryParams()}
      <span class="loader"></span>
    </Container>
  );
}
