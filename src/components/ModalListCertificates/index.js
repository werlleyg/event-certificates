import { ReactNode } from 'react';

import { Container } from './styles';

// icons
import { GrFormSchedule } from 'react-icons/gr';
import { BsClock, BsWhatsapp } from 'react-icons/bs';
import {
  MdLocationOn,
  MdLocalPrintshop,
  MdOutlineMail,
  MdLogout,
} from 'react-icons/md';
import { useCallback } from 'react';
import { useState } from 'react';

export function ModalListCertificates(props) {
  const [subscriberData, setSubscriberData] = useState(props.subscriberData);
  const [showEffect, setShowEffect] = useState(true);
  const handleOpenContact = useCallback((typeContact) => {
    switch (typeContact) {
      case 'whatsApp':
        return window.open('https://wa.me/5588993528826', '_blank');
      case 'email':
        return window.open('mailto:engenheiroalanaraujo@gmail.com', '_blank');
      default:
        return '';
    }
  }, []);

  const utilFormatedDateShow = useCallback((startDate, endDate) => {
    // Realizado nos dias 02 e 03 de Setembro de 2022
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
        return `Realizado no dia ${firstDay} de ${firstMonth} de ${eventYear}`;
      if (firstDay !== lastDay) {
        if ('' + new Date(startDate) === '' + dataAux)
          return `Realizado nos dias ${firstDay} e ${lastDay} de ${firstMonth} de ${eventYear}`;
        if ('' + new Date(startDate) !== '' + dataAux)
          return `Realizado entre os dias ${firstDay} e ${lastDay} de ${firstMonth} de ${eventYear}`;
      }
    } else {
      if (firstDay !== lastDay)
        if ('' + new Date(startDate) === '' + dataAux)
          return `Realizado nos dias ${firstDay} de ${firstMonth} e ${lastDay} de ${lastMonth} de ${eventYear}`;
      if ('' + new Date(startDate) !== '' + dataAux)
        return `Realizado entre os dias ${firstDay} de ${firstMonth} e ${lastDay} de ${lastMonth} de ${eventYear}`;
    }

    return 'error';
  }, []);

  const setPrintCertificate = useCallback((eventData) => {
    setShowEffect(false);
    props.setPrintCertificate({
      ...subscriberData,
      certificate_type: selectTypeEvent(eventData.type),
      userSelectedEvent: eventData,
    });
  }, []);

  const selectTypeEvent = useCallback((typeEvent) => {
    switch (typeEvent) {
      case 'formulario de inscricao':
        return 'event_ufc';
      case 'treinamento':
        return 'treinamento';
      default:
        return 'event_ufc';
    }
  }, []);

  return (
    <Container showEffect={showEffect}>
      <div className="div__header">
        <div className="div__left">
          <h1>Meus Certificados</h1>
          <div className="div__content_user">
            <span>Seja bem vindo, </span>
            <b>{subscriberData?.name}</b>
          </div>
        </div>
        <div className="div__right">
          <button className="btn__logout" onClick={() => props.logout()}>
            <MdLogout /> Sair
          </button>
        </div>
      </div>
      <content>
        <div className="div__deck">
          {subscriberData &&
            subscriberData?.events.map((eventData) => (
              <div className="div__card" key={eventData?.id}>
                <div className="div__image_field">
                  <img src={eventData?.image_url} alt={eventData?.title} />
                </div>
                <div className="div__content_details">
                  <h2>{eventData?.title}</h2>
                  <p>
                    <GrFormSchedule />{' '}
                    {utilFormatedDateShow(
                      eventData?.start_date,
                      eventData?.end_date,
                    )}{' '}
                  </p>
                  <p>
                    <BsClock /> {eventData?.duration}
                  </p>
                  <p>
                    <MdLocationOn /> {eventData?.location}
                  </p>
                  <div className="div__content_contact">
                    <span>Contato:</span>
                    <button
                      onClick={() => handleOpenContact('whatsApp')}
                      className="btn__wpp"
                    >
                      {' '}
                      <BsWhatsapp />{' '}
                    </button>
                    <button
                      onClick={() => handleOpenContact('email')}
                      className="btn__email"
                    >
                      {' '}
                      <MdOutlineMail />{' '}
                    </button>
                  </div>
                </div>
                <div className="div__menu_actions">
                  <button onClick={() => setPrintCertificate(eventData)}>
                    <MdLocalPrintshop /> Emitir certificado
                  </button>
                </div>
              </div>
            ))}
        </div>
      </content>
    </Container>
  );
}
