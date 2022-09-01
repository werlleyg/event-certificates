import styled from 'styled-components';

export const Container = styled.div`
  background: url('../files/images/ufc_event.png');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .div__content {
    z-index: 5;
    /* width: 100%; */
    padding: 3rem 1rem;
    margin: 0;

    .div__oneRow{
      width: 100%;
      max-width: 1920px;
      margin:auto;
      display:flex;
      justify-content: space-around;
      align-items:center;
      gap: 4rem;
      .div__content_image{
        max-width: 450px;
        position: relative;
        img{
          max-width: 100%;
          border-radius: 8px;
          box-shadow: 0px 0px 20px rgba(0,0,0,0.4);
        }
        .div__degrade_img{
          z-index:: 1;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          /* background-image: linear-gradient(
            to top,
            #020202,
            transparent
          ); */
        }
      }
      
      @media only screen and (max-width: 811px){
          flex-direction: column-reverse;
      }
    }
    form {
      max-width: 450px;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      p{
        color: white;
        font-size: 1.5rem;
        font-weight: 800;
        text-transform: uppercase;
        text-shadow: 0px 0px 20px rgba(0,0,0);
      }
      input{
        font-size: 1.5rem;
        padding: 0.5rem  1.2rem;
        outline-color: transparent;
        border: 0;
        border-radius: 8px;
      }
      button{
        cursor: pointer;
        width: 100%;
        font-size: 1.5rem;
        padding: 0.5rem  1.2rem;
        background-image: linear-gradient(to top, #00FE7A, #03C58C);
        border: 0;
        border-radius: 5rem;
        color: #2f2f2;
        font-weight: 400;
        text-transform: uppercase;
        margin-top: 1rem;
        /* outline-color: #00FE7A; */
        outline-offset: 2px;
        transition: 0.3s;

        :hover{
          transform: scale(1.01);
          opacity: 0.8;
        }
      }

      .div__list_logos{
        
        margin-top: 3rem;
        flex-direction: column;
        display: flex;
        align-items:center;
        justify-content:center;
        gap: 0.5rem;
        h4{
          color: white;
          margin-bottom: 0rem;
          padding-bottom: 0rem;
          font-size: 1rem;
          font-weight: 200;
        }
        img{
          max-width: 300px;
        }
      }
    }
  }
  .div__bg_gradient {
    z-index:: 1;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background-image: linear-gradient(
      to top,
      rgba(0, 0, 0, 1),
      rgba(3,197,140,0.8)
      );
      /* rgba(0, 0, 0, 0.6) */
  }
 
`;

export const Contentout = styled.div`
  .etiqueta2 {
    display: none;
  }
`;
