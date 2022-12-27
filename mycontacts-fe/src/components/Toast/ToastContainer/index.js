import ToastMessage from '../ToastMessage';
import { Container } from './styles';

export default function ToastContainer() {
  return (
    <Container>
      <ToastMessage text="oioi" />
      <ToastMessage text="oioi" type="danger" />
      <ToastMessage text="oioi" type="success" />
    </Container>
  );
}
