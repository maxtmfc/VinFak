import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../features/redux/hooks';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

export default function ContactsPage(): JSX.Element {
  const navigate = useNavigate();
  const clickHandler = (): void => {
    navigate('/');
  };

  const styles = {
    backgroundColor: '#283b27',
    margin: '30px',
    fontSize: '1.5rem',
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const mapStyle = {
    width: '750px',
    height: '460px',
    borderRadius: '10px',
  };

  const imageStyle = {
    width: '600px',
    height: '460px',
    marginLeft: '-25px',
    margin: '0 0 0 100px',
    borderRadius: '10px',
  };

  const textStyle = {
    fontSize: '30px',
    width: '700px',
    margin: 25,
  };

  const mapState = {
    center: [55.755077, 37.645605],
    zoom: 17,
  };
  const placemarkCoords = [55.755077, 37.645605];

  return (
    <div className="contact">
      <span className="bonuspageText" style={textStyle}>
        <h3>КАК НАС НАЙТИ?</h3>
        <ul>
          <li>Москва, Большой Трехсвятительский переулок, 1</li>
          <li>Телефон: +7 925 645-73-95</li>
        </ul>
      </span>
      <div className="mainpageText" style={containerStyle}>
        <YMaps query={{ apikey: '17d3b358-1fdc-42dd-8818-00c8b17e577e' }}>
          <Map state={mapState} style={mapStyle}>
            <Placemark geometry={placemarkCoords} balloonContent="Центр карты" />
          </Map>
        </YMaps>
        <img src="/images/contact.jpeg" alt="placeholder" style={imageStyle} />
      </div>
      <Button
        className="mainpagebutton"
        onClick={clickHandler}
        style={styles}
        variant="contained"
        size="large"
      >
        На главную
      </Button>
    </div>
  );
}
