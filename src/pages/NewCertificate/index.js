import { ReactNode } from 'react';

import { Certificate, Container } from './styles';

export function NewCertificate() {
  return (
    <Container>
      <Certificate
        dataCertificate={
          '../files/images/bg_certificates/model_palesta_comp.png'
        }
        eventVerifyFirstTalkCircle={true}
        id="container"
      >
        <div className="div__name">
          <h1 className="h1--extra-title-style">
            Francisco Werlley Gonçalves Ponte
          </h1>
        </div>
        <div className="div__content_center_text">
          participou da palestra{' '}
          <strong>
            I Ciclo de Palestras - A relação entre o Problema "P vs Np" e a
            pergunta "Será que dá para fazer melhor?
          </strong>{' '}
          realizada no dia 22 de novembro de 2022, realizada e organizada pelo
          grupo PET-CEC, com carga horária de 2 horas.
          <br />
          <br />
          <br />
        </div>

        <img
          src={'../files/images/bg_certificates/model_palesta_comp.png'}
          className="img__bg"
        />
      </Certificate>
    </Container>
  );
}
