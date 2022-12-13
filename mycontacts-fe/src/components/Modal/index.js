import Button from '../Button';
import { Container, Overlay, Footer } from './styles';

export default function Modal() {
  return (
    <Overlay>
      <Container>
        <h1>Titulo</h1>
        <p>
          Corpo
        </p>
        <Footer>
          <button type="button" className="cancel-button">
            Cancelar
          </button>
          <Button type="button">
            Deletar
          </Button>
        </Footer>
      </Container>
    </Overlay>
  );
}
