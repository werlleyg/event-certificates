import styled from 'styled-components';

export const Container = styled.div`
  background: url(${(props) => props.imageBg});
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .div__bg_gradient {
    z-index: 1;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background-image: linear-gradient(
      to top,
      rgba(0, 0, 0, 1),
      ${(props) => 'rgba(' + props.averageColor?.terc_color + ', 0.8)'}
    );
    /* rgba(0, 0, 0, 0.6) */
  }

  .div__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    z-index: 5;
    /* width: 100%; */
    padding-top: 3rem;
    padding-bottom: 3rem;
    margin: 0;

    h1 {
      color: white;
      max-width: 400px;
      text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
      font-size: 3rem;
      border-bottom: 2px dotted white;
      margin: auto 1rem;
    }

    form {
      margin: auto;
      display: flex;
      flex-direction: column;
      label {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.25rem;
        background-color: white;
        padding: 0.25rem 1rem;
        border: 0;
        border-radius: 5rem;
        margin: auto 1rem;

        input[type='text'] {
          font-size: 1.5rem;
          padding: 0.5rem 0.25rem;
          border: 0;
          outline: none;
          width: 100%;
        }
        button {
          padding: 0;
          background: transparent;
          border: 0;

          svg {
            transition: 0.3s;
            color: ${(props) =>
              props.dadoInscrito.length === 11
                ? 'rgba(' + props.averageColor?.terc_color + ', 1)'
                : 'rgba(0, 0, 0, 0.3)'};
            font-size: 1.5rem;
          }

          &:not([disabled]) {
            cursor: pointer;
          }
        }
      }
      .div__list_logos {
        margin-top: 3rem;
        flex-direction: column;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        h4 {
          color: white;
          margin-bottom: 0rem;
          padding-bottom: 0rem;
          font-size: 1rem;
          font-weight: 200;
        }
        img {
          max-width: 300px;
        }
      }
    }
  }
  @media print {
    display: none;
  }
`;
export const Contentout = styled.div`
  @media print {
    display: none;
  }
`;
export const Certificate = styled.div`
  @media print {
    display: flex;
    z-index: 500;
    visibility: visible;
    position: initial;
  }

  display: flex; // alterar para produção com flex:none
  background: white;
  width: 29.7cm;
  height: 20.75cm;
  z-index: -1;
  visibility: hidden;

  position: absolute;
  top: -500%;
  left: -500%;

  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(${(props) => props.dataCertificate.backgroundImage});
  background-position: center;
  background-size: auto 100%;

  .div__name {
    z-index: 5;
    margin-top: 1cm;
    max-width: 900px;
    height: 4.233cm;
    display: flex;
    align-items: center;
    justify-content: center;
    h1 {
      font-size: 60px;
      text-align: center;
    }
  }

  .div__content_center_text {
    max-width: 650px;
    font-size: 19px;
    text-align: center;
    font-weight: 600;
    z-index: 5;
  }

  .div__date_field {
    width: 100%;
    text-align: right;
    margin-top: 0.5cm;
    margin-right: 5cm;
    z-index: 5;
  }

  .div__footer {
    display: flex;
    justify-content: space-around;
    font-size: 10.64px;
    max-width: 900px;
    width: 100%;
    z-index: 5;

    div {
      margin-top: 1.5cm;
      text-align: center;
      border-top: 1px solid rgba(0, 0, 0);
      width: 300px;
      padding-top: 0.25cm;
    }
    .div__teacher {
      position: relative;
      z-index: 5;

      img {
        position: absolute;
        right: 0.8cm;
        top: -2.2cm;
        max-width: 200px;
      }
    }
  }
  .img__bg {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    object-fit: cover;
    z-index: 1;
    width: 29.7cm;
    height: 20.75cm;
  }
`;
