import styled from 'styled-components';

export const Container = styled.div``;
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
  /* visibility: hidden; */

  /* position: absolute; */
  /* top: -500%; */
  /* left: -500%; */

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

    .h1--extra-title-style {
      font-size: 2rem;
      margin-bottom: -2rem;
    }
    h1 {
      font-size: ${(props) =>
        props.eventVerifyFirstTalkCircle ? '22px' : '60px'};
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
