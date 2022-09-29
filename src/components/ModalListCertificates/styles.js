import styled from 'styled-components';

export const Container = styled.div`
  z-index: 5;
  position: absolute;
  background: #f3f3f3;
  top: 0;
  /* bottom: 0; */
  left: 0;
  right: 0;
  padding: 2rem;
  /* min-height: 100vh; */
  /* max-height: 100%; */

  animation: ${(props) => (props.showEffect ? 'slidein 3s ease' : '')};

  @keyframes slidein {
    0% {
      top: -100%;
      background: transparent;
    }
    100% {
      top: 0;
      background: #f3f3f3;
    }
  }

  .div__header {
    max-width: 1920px;
    margin: auto;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px dotted rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: space-between;

    .div__content_user {
      font-size: 1.2rem;
    }

    .btn__logout {
      font-size: 1.2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      border-radius: 5rem;
      border: 0;
      background: transparent;
      cursor: pointer;

      :hover {
        color: rgba(var(--primary-color));
        background: rgba(200, 200, 200, 0.1);
      }
    }
  }

  content {
    .div__deck {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      max-width: 1920px;
      margin: auto;

      .div__card {
        background: white;
        box-shadow: 0px 0px 50px rgba(00, 0, 0, 0.1);
        display: grid;
        grid-template-columns: 200px 1fr 200px;
        padding: 1rem;
        border-radius: 1rem;
        min-height: 100px;
        .div__image_field {
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            max-width: 180px;
            max-height: 180px;
            border-radius: 0.5rem;
          }
        }
        .div__content_details {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;

          h2 {
            color: rgba(var(--primary-color));
          }
          p {
            display: flex;
            align-items: center;
            gap: 0.25rem;
          }
          .div__content_contact {
            display: flex;
            align-items: center;
            /* gap: 0.5rem; */
            span {
              font-weight: 600;
              margin-right: 0.75rem;
            }
            button {
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
              border: 0;
              background: transparent;
              font-size: 1.5rem;
              width: 40px;
              height: 40px;
              cursor: pointer;
              transition: 0.3s;

              :hover {
                background: rgba(var(--primary-color));
                color: white;
              }
            }
            /* .btn__wpp:hover {
              background: rgba(var(--wpp-color));
              color: white;
            } */
            .btn__email {
              font-size: 1.75rem;
            }
          }
        }
        .div__menu_actions {
          display: flex;
          justify-content: center;
          align-items: center;

          button {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            border: 0;
            background: transparent;
            cursor: pointer;
            border-radius: 1rem;
            font-size: 1.2rem;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.8);

            svg {
              font-size: 4rem;
            }

            :hover {
              transition: 0.3s;
              background-color: rgba(150, 150, 150, 0.1);
              color: rgba(var(--primary-color));
              svg {
                color: rgba(var(--primary-color));
                transition: 0.3s;
              }
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 675px) {
    min-height: 100vh;
    bottom: auto;
    padding: 1rem;

    .div__header {
      flex-direction: column;
      align-items: center;
      gap: 1rem;

      .div__content_user {
        text-align: center;
      }
    }

    content {
      .div__deck {
        .div__card {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1.5rem;

          h2 {
            text-align: center;
            margin-bottom: 1rem;
          }

          .div__content_details {
            p {
              display: block;
              font-size: 0.9rem;
            }
          }

          .div__menu_actions {
            margin: 2rem 1rem;
            button {
              padding: 1rem;
            }
          }
        }
      }
    }
  }

  @media print {
    display: none;
  }
`;
