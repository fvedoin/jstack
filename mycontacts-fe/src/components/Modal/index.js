import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Button from '../Button';
import { Container, Overlay, Footer } from './styles';

export default function Modal({ danger }) {
  return ReactDOM.createPortal(
    <Overlay>
      <Container danger={danger}>
        <h1>Titulo</h1>
        <p>
          Corpo
        </p>
        <Footer>
          <button type="button" className="cancel-button">
            Cancelar
          </button>
          <Button type="button" danger={danger}>
            Deletar
          </Button>
        </Footer>
      </Container>
    </Overlay>,
    document.getElementById('fullscreen-root'),
  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
};

Modal.defaultProps = {
  danger: false,
};
