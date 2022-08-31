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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function App() {
  const [habimp, setHabimp] = React.useState(false);
  const [dadoInscrito, setDadoInscrito] = useState('');
  const [dados, setDados] = React.useState();
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

    if (dadoInscrito.length === 9 || dadoInscrito.length === 10) {
      let response = await getApi(dadoInscrito, 'code');
      if (response) {
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
    }
  }

  const novaImpressao = (e) => {
    window.print();
    setHabimp(true);
    setDadoInscrito('');
    setTimeout(() => setHabimp(false), 5000);
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

        auxResponse = false;
      });
    return auxResponse;
  }
  return (
    <>
      <div className="App">
        <Contentout>
          <Container>
            <div className="div__content">
              <div className="div__oneRow">
                <div className="div__content_image">
                  <img src="../files/images/ufc_event.png" />
                  <div className="div__degrade_img" alt="Banner Alan Araújo" />
                </div>

                <form className="etiqueta" action="" onSubmit={handleSubmit}>
                  <p>Nº de Inscrição ou CPF</p>
                  <input
                    type="text"
                    placeholder=""
                    value={dadoInscrito}
                    onChange={handleChange}
                    autoFocus
                  />
                  <div className="containerButton">
                    <button type="submit">Buscar</button>
                  </div>
                  <div className="div__list_logos">
                    <h4>Organização</h4>
                    <img
                      src="../files/images/list-logos.png"
                      alt="Logo Ágil Engenharia"
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
                    novaImpressao();
                    setTimeout(() => {
                      setDados('');
                      setDadoInscrito('');
                    }, 50);
                  }}
                  cancelar={() => setDados('')}
                />
              )}
            </div>

            <div className="div__bg_gradient" />
          </Container>
          {dados && (
            <div
              className="etiqueta etiqueta2"
              id="printable"
              style={{
                width: '9.8cm',
                height: '2.5cm',
              }}
            >
              <div className="informacoes" id="sua_div">
                <span className="nomeCredencial">
                  {verificarNome(dados.credential_name)}
                </span>
                <span className="demaisCredencial">
                  {dados.credential_role}
                </span>
                <span className="demaisCredencial2">
                  {dados.credential_company}
                </span>
                <div className="div__cod_barra">
                  {dados.id_code}
                  {/* <svg id="barcode1"></svg> */}
                </div>
              </div>
            </div>
          )}
        </Contentout>
      </div>
      {dados && (
        <div
          className="etiqueta etiqueta2"
          id="printable"
          style={{
            width: '10cm',
            height: '5cm',
          }}
        >
          <div className="informacoes" id="sua_div">
            <span className="nomeCredencial">
              {verificarNome(dados?.credential_name)}
            </span>
            <span className="demaisCredencial">{dados?.credential_role}</span>
            <span className="demaisCredencial2">
              {dados?.credential_company}
            </span>
            <div className="div__cod_barra">
              <svg id="barcode1"></svg>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;