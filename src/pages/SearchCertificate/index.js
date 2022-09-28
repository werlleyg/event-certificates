import { Palette } from 'color-thief-react';
import { useCallback, useEffect, useState } from 'react';
import { ReactNode } from 'react';
import { mask, unMask } from 'remask';
import { Loader } from '../../components/Loader';
import api from '../../servicos/api';

import { Contentout, Container, Certificate } from './styles';

// icons
import { IoSend } from 'react-icons/io5';
import { ModalListCertificates } from '../../components/ModalListCertificates';

// alertas
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function SearchCertificate() {
  const [averageColor, setAverageColor] = useState();
  const [selectedEvent, setSelectedEvent] = useState();
  const [showLoader, setShowLoader] = useState(true);
  const [showMyListCertificates, setShowMyListCertificates] = useState(false);
  const [subscriberData, setSubscriberData] = useState();
  const [alertas, setAlertas] = useState({
    status: false,
    type: '',
    message: '',
  });

  const [dataToPrint, setDataToPrint] = useState({
    certificate_type: 'event_ufc',
    name: 'Francisco Werlley Gonçalves',
    cpf: '063.459.103-76',
    location: 'UFC Campus Sobral',
    title: 'Me formei e agora?',
    end_date: '2022-09-01T21:55:00.000Z',
    start_date: '2022-08-31T21:55:00.000Z',
    duration: '3 horas',
  });

  const [cpfInscrito, setCpfInscrito] = useState('');

  const [listDataCertificate, setListDataCertificate] = useState([
    {
      type: 'event_ufc',
      backgroundImage: '../files/images/bg_certificates/model_01.png',
    },
    {
      type: 'treinamento',
      backgroundImage: '../files/images/bg_certificates/model_02.png',
    },
  ]);

  const handleChange = (e) => {
    setCpfInscrito(mask(unMask(e.target.value), ['999.999.999-99']));
  };

  async function getEvents() {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('evento');
    console.log('[ID DO EVENTO] =>', myParam);

    await api
      .get('/events')
      .then((response) => {
        let result;
        if (myParam) {
          result = response.data.find(
            (dataValue) => dataValue.id === Number(myParam),
          );
        } else {
          result = response.data.find(
            (dataValue) => dataValue.id === Number(100),
          );
        }
        if (result) {
          setSelectedEvent(result);
          setTimeout(() => setShowLoader(false), 3000);
        }
      })
      .catch((error) => {
        console.log('[error]=> ', error.response.data);
      });
  }

  async function getCertificates(event) {
    event.preventDefault();
    console.log('[submetendo evento]');

    await api
      .get(`/subscriptions/done_events/${cpfInscrito}`)
      .then((response) => {
        let res = response.data;
        console.log('[resposta]=> ', res);
        setSubscriberData(res);
        setShowMyListCertificates(true);
      })
      .catch((error) => {
        setAlertas({
          ...alertas,
          status: true,
          type: 'warning',
          message: error.response.data.error,
        });
        console.log('[error]=> ', error.response.data.error);
      });
  }

  const clearData = useCallback(() => {
    setCpfInscrito('');
    setDataToPrint('');
    setShowMyListCertificates(false);
  }, []);

  const utilFormatedDate = useCallback((startDate, endDate) => {
    // realizado nos dias 02 e 03 de Setembro de 2022
    let firstDay = new Date(startDate).toLocaleDateString('pt-BR', {
      day: '2-digit',
    });
    let lastDay = new Date(endDate).toLocaleDateString('pt-BR', {
      day: '2-digit',
    });
    let firstMonth = new Date(startDate).toLocaleDateString('pt-BR', {
      month: 'long',
    });
    let lastMonth = new Date(endDate).toLocaleDateString('pt-BR', {
      month: 'long',
    });
    let eventYear = new Date(startDate).toLocaleDateString('pt-BR', {
      year: 'numeric',
    });

    let dataAux = new Date(endDate);
    dataAux.setDate(dataAux.getDate() - 1);

    if (firstMonth === lastMonth) {
      if (firstDay === lastDay)
        return `realizado no dia ${firstDay} de ${firstMonth} de ${eventYear}`;
      if (firstDay !== lastDay) {
        if ('' + new Date(startDate) === '' + dataAux)
          return `realizado nos dias ${firstDay} e ${lastDay} de ${firstMonth} de ${eventYear}`;
        if ('' + new Date(startDate) !== '' + dataAux)
          return `realizado entre os dias ${firstDay} e ${lastDay} de ${firstMonth} de ${eventYear}`;
      }
    } else {
      if (firstDay !== lastDay)
        if ('' + new Date(startDate) === '' + dataAux)
          return `realizado nos dias ${firstDay} de ${firstMonth} e ${lastDay} de ${lastMonth} de ${eventYear}`;
      if ('' + new Date(startDate) !== '' + dataAux)
        return `realizado entre os dias ${firstDay} de ${firstMonth} e ${lastDay} de ${lastMonth} de ${eventYear}`;
    }

    return 'error';
  }, []);

  const setPrintCertificate = useCallback((userDataPrint) => {
    setDataToPrint({
      certificate_type: userDataPrint?.certificate_type,
      name: userDataPrint?.name,
      cpf: userDataPrint?.cpf,
      location: userDataPrint?.userSelectedEvent?.location,
      title: userDataPrint?.userSelectedEvent?.title,
      start_date: userDataPrint?.userSelectedEvent?.start_date,
      end_date: userDataPrint?.userSelectedEvent?.end_date,
      duration: userDataPrint?.userSelectedEvent?.duration,
    });

    setTimeout(() => {
      window.print();
    }, 500);
  }, []);

  const selectBackgroundImage = useCallback(
    (certificate_type = 'event_ufc') => {
      let bgImageSelected = listDataCertificate.find(
        (dataBg) => dataBg.type === certificate_type,
      );
      return bgImageSelected;
    },
    [],
  );

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      <Contentout>
        <Container
          imageBg={selectedEvent?.image_url}
          averageColor={averageColor}
          dadoInscrito={unMask(cpfInscrito)}
        >
          <div className="div__content">
            <h1>Buscar Certificados</h1>

            <form
              className="etiqueta"
              onSubmit={getCertificates}
              // onSubmit={handleSubmit}
              autoComplete="off"
            >
              <label>
                <input
                  type="text"
                  placeholder="Seu CPF"
                  id="input_cpf"
                  value={cpfInscrito}
                  onChange={handleChange}
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={unMask(cpfInscrito).length !== 11}
                >
                  <IoSend />
                </button>
              </label>

              <div className="div__list_logos">
                <h4>Empresas do grupo</h4>
                <img
                  src="../files/images/list-logos.png"
                  alt="Logo Ágil Engenharia"
                />
              </div>
            </form>

            {alertas.status && (
              <Snackbar
                open={true}
                autoHideDuration={6000}
                onClose={() =>
                  setAlertas({
                    ...alertas,
                    status: false,
                    type: '',
                    message: '',
                  })
                }
              >
                <Alert
                  onClose={() =>
                    setAlertas({
                      ...alertas,
                      status: false,
                      type: '',
                      message: '',
                    })
                  }
                  severity={alertas.type}
                >
                  {alertas.message}
                </Alert>
              </Snackbar>
            )}
          </div>
          <div className="div__bg_gradient" />
          {showMyListCertificates && (
            <ModalListCertificates
              logout={clearData}
              subscriberData={subscriberData}
              setPrintCertificate={setPrintCertificate}
            />
          )}
        </Container>
        <Palette
          src={selectedEvent?.image_url}
          colorCount={3}
          crossOrigin="anonymous"
          format="rgbArray"
        >
          {({ data, loading, error }) => {
            if (data && !averageColor) {
              let auxColors = {
                first_color: data[0][0] + ',' + data[0][1] + ',' + data[0][2],
                second_color: data[1][0] + ',' + data[1][1] + ',' + data[1][2],
                terc_color: data[2][0] + ',' + data[2][1] + ',' + data[2][2],
              };
              setAverageColor(auxColors);
              console.log('[cores predominantes]=> ', auxColors);
            }
          }}
        </Palette>
        {showLoader && <Loader showMsg={false} />}
      </Contentout>
      {/* depois mudar de lugar  */}
      <Certificate
        dataCertificate={selectBackgroundImage(dataToPrint.certificate_type)}
      >
        <div className="div__name">
          <h1>{dataToPrint.name}</h1>
        </div>
        <div className="div__content_center_text">
          O <strong>Eng. Alan Araújo, M.Sc</strong> confere ao referido aluno o
          certificado de participação no{' '}
          {dataToPrint.certificate_type === 'treinamento' ? 'curso' : 'evento'}{' '}
          <strong>{dataToPrint.title}</strong>,{' '}
          {utilFormatedDate(dataToPrint.start_date, dataToPrint.end_date)}, com
          total de <strong>{dataToPrint.duration}</strong>.
        </div>
        <div className="div__date_field">
          <strong>
            {new Date(dataToPrint.end_date).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
            , {dataToPrint.location}
          </strong>
        </div>
        <div className="div__footer">
          <div className="div__teacher">
            <img
              src="../files/images/comprovante/rubrica_azul.png"
              alt="rubrica"
            />
            <strong>Antonio Alan Rodrigues de Araújo</strong>
            <br />
            Engenheiro de Computação
            <br />
            Engenheiro de Segurança do Trabalho
            <br />
            Especialista em Engenharia Elétrica
            <br />
            Mestre em Engenharia Elétrica e de Computação
            <br />
            CREA-CE: 51905-D
            <br />
          </div>
          <div className="div__student">
            <strong>{dataToPrint.name}</strong>
            <br />
            CPF: {dataToPrint.cpf}
          </div>
        </div>
      </Certificate>
      {/* depois mudar de lugar  */}
    </>
  );
}