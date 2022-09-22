import React, { useState } from 'react';
import { Container, Contentout } from './styles';
import './App.css';

// ticket preview
import Previaetiqueta from './components/Previaetiqueta';

// api
import api from './servicos/api';
// alertas
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
// mask
import { mask, unMask } from 'remask';
import Backdrop from './components/Backdrop';
import { useEffect } from 'react';

// get img color
import ColorThief from '../node_modules/colorthief/dist/color-thief.mjs';
import Color, { Palette, usePalette } from 'color-thief-react';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}
function App() {
  const [habimp, setHabimp] = React.useState(false);
  const [dadoInscrito, setDadoInscrito] = useState('');

  const [dados, setDados] = React.useState();
  const [dadosImpre, setDadosImpre] = React.useState();
  const [showinput, setShowinput] = useState(true);
  const [averageColor, setAverageColor] = useState();
  const [selectedEvent, setSelectedEvent] = useState();

  const handleChange = (e) => {
    setDadoInscrito(
      mask(unMask(e.target.value), [
        '999-99999',
        '999-999999',
        '999.999.999-99',
      ]),
    );
  };
  const [alertas, setAlertas] = React.useState({
    status: false,
    type: '',
    message: '',
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setShowinput(false);

    if (dadoInscrito.length === 9 || dadoInscrito.length === 10) {
      let response = await getApi(dadoInscrito, 'code');
      if (response) {
        setDadosImpre({
          show: true,
          id_code: response?.code,
          credential_name: response?.name,
          credential_company: response?.company,
          credential_role: response?.note,
        });
        setDados({
          show: true,
          id_code: response?.code,
          credential_name: response?.name,
          credential_company: response?.company,
          credential_role: response?.note,
        });
      }
    } else if (dadoInscrito.length === 14) {
      let response = await getApi(dadoInscrito, 'cpf');
      console.log('[response]=> ', response);
      if (response) {
        setDadosImpre({
          show: true,
          id_code: response?.code,
          credential_name: response?.name,
          credential_company: response?.company,
          credential_role: response?.note,
        });
        setDados({
          show: true,
          id_code: response?.code,
          credential_name: response?.name,
          credential_company: response?.company,
          credential_role: response?.note,
        });
      }
    } else {
      setAlertas({
        ...alertas,
        status: true,
        type: 'warning',
        message: 'Preencha a inscrição corretamente',
      });
      setShowinput(true);
    }
  }

  const novaImpressao = (e) => {
    window.print();
    setHabimp(true);
    setDadoInscrito('');
    setTimeout(() => {
      setShowinput(true);
      setHabimp(false);
      document.querySelector('#input_cpf').focus();
    }, 5000);
  };

  const verificarNome = (e) => {
    let name;
    let aux;

    if (e.length > 17) {
      aux = e.split(' ');
      name = aux[0] + ' ' + aux[aux.length - 1];
      if (name.length > 17) {
        name = name.slice(0, 17) + '.';
      }
    } else {
      name = e;
    }
    return name;
  };

  // clear button actions
  function keyPressed(evt) {
    evt = evt || window.event;
    var key = evt.keyCode || evt.which;
    return String.fromCharCode(key);
  }

  document.onkeypress = function (evt) {
    var str = keyPressed(evt);
    if (str == '2' || str == '1') {
      return;
    }
  };

  async function getApi(code, type) {
    let auxURL =
      type === 'cpf'
        ? `/v2/subscriptions/show?cpf=${code}`
        : `/v2/subscriptions/show?code=${code}`;

    let auxResponse = false;
    await api
      .get(auxURL)
      .then((response) => {
        auxResponse = response.data;
      })
      .catch((error) => {
        console.log('[ERROR]=> ', error.response);
        setAlertas({
          ...alertas,
          status: true,
          type: 'error',
          message: 'Erro ao comunicar com sistema',
        });
        setShowinput(true);
        auxResponse = false;
      });
    return auxResponse;
  }

  async function getEvents() {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('evento');
    console.log('[ID DO EVENTO] =>', myParam);

    if (myParam) {
      await api
        .get('/events')
        .then((response) => {
          let result = response.data.find(
            (dataValue) => dataValue.id === Number(myParam),
          );
          if (result) {
            setSelectedEvent(result);
          }
          if (result) console.log('[result]', result);
        })
        .catch((error) => {
          console.log('[error]=> ', error.data);
        });
    }
  }

  useEffect(() => {
    getEvents();
  }, []);

  useEffect(() => {
    // const colorThief = new ColorThief();
    // const img = new Image();
    // img.addEventListener('load', function () {
    //   let resultColor = colorThief.getColor(img);
    //   console.log('[cor resultante]=> ', resultColor);
    // });
    // img.crossOrigin = 'Anonymous';
    // img.src =
    //   'https://agil-eng.s3.amazonaws.com/alanaraujo/04ed10756630-Post_AlanAraujo_AgilEngenharia_1900x1054px_SegurancadoTrabalho_UrucuiPi.png';
  }, [selectedEvent]);

  return (
    <>
      <div className='App'>
        <Contentout>
          <Container
            imageBg={selectedEvent?.image_url}
            averageColor={averageColor}
          >
            <div className='div__content'>
              <div className='div__oneRow'>
                <div className='div__content_image'>
                  <img src={selectedEvent?.image_url} id='event_image' />
                  <div className='div__degrade_img' alt='Banner Alan Araújo' />
                </div>

                <form className='etiqueta' action='' onSubmit={handleSubmit}>
                  <p>Nº de Inscrição ou CPF</p>
                  {showinput && (
                    <input
                      type='text'
                      placeholder=''
                      id='input_cpf'
                      value={dadoInscrito}
                      onChange={handleChange}
                      autoFocus
                    />
                  )}
                  <div className='containerButton'>
                    <button type='submit'>Buscar</button>
                  </div>
                  <div className='div__list_logos'>
                    <h4>Empresas do grupo</h4>
                    <img
                      src='../files/images/list-logos.png'
                      alt='Logo Ágil Engenharia'
                    />
                  </div>
                </form>
              </div>

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
              {dados?.show && (
                <Previaetiqueta
                  dados={dados}
                  confirmar={() => {
                    setDados({ ...dados, show: false });
                    setTimeout(() => {
                      novaImpressao();
                    }, 25);

                    setTimeout(() => {
                      setDados('');
                      setDadoInscrito('');
                    }, 50);
                  }}
                  cancelar={() => {
                    setDados('');
                    setShowinput(true);
                    document.querySelector('#input_cpf').focus();
                  }}
                />
              )}
            </div>

            <div className='div__bg_gradient' />
          </Container>
          {dados && (
            <div
              className='etiqueta etiqueta2'
              id='printable'
              style={{
                width: '9.8cm',
                height: '2.5cm',
              }}
            >
              <div className='informacoes' id='sua_div'>
                <span className='nomeCredencial'>
                  {verificarNome(dados.credential_name)}
                </span>
                <span className='demaisCredencial'>
                  {dados.credential_role}
                </span>
                <span className='demaisCredencial2'>
                  {dados.credential_company}
                </span>
                <div className='div__cod_barra'>
                  {dados.id_code}
                  {/* <svg id="barcode1"></svg> */}
                </div>
              </div>
            </div>
          )}
          {!showinput && !dados?.show && <Backdrop />}
        </Contentout>
      </div>
      {dadosImpre && (
        <div
          className='etiqueta etiqueta2'
          id='printable'
          style={{
            width: '10cm',
            height: '4cm',
          }}
        >
          <div className='informacoes' id='sua_div'>
            <span className='nomeCredencial'>
              {verificarNome(dadosImpre?.credential_name)}
            </span>
            <span className='demaisCredencial'>
              {dadosImpre?.credential_role}
            </span>
            <span className='demaisCredencial2'>
              {dadosImpre?.credential_company}
            </span>
            <div className='div__cod_barra'>
              <svg id='barcode1'></svg>
            </div>
          </div>
        </div>
      )}
      {/* <Color
        src={selectedEvent?.image_url}
        crossOrigin='anonymous'
        format='rgbArray'
      >
        {({ data, loading, error }) => {
          if (data) {
            let auxColor = data[0] + ',' + data[1] + ',' + data[2];
            setAverageColor(auxColor);
            console.log('[cor predominante]=> ', auxColor);
          }
        }}
      </Color> */}
      <Palette
        src={selectedEvent?.image_url}
        colorCount={3}
        crossOrigin='anonymous'
        format='rgbArray'
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
    </>
  );
}

export default App;
