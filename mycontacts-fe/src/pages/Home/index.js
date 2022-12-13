import { Link } from 'react-router-dom';
import {
  Card, Container, Header, InputSearchContainer, ListContainer,
} from './styles';

import arrowIcon from '../../assets/images/icons/arrow.svg';
import editIcon from '../../assets/images/icons/edit.svg';
import trashIcon from '../../assets/images/icons/trash.svg';
import Modal from '../../components/Modal';

export default function Home() {
  return (
    <Container>
      <Modal />
      <InputSearchContainer>
        <input type="text" placeholder="Pesquisar contato..." />
      </InputSearchContainer>
      <Header>
        <strong>3 contatos</strong>
        <Link to="/new">Novo Contato</Link>
      </Header>

      <ListContainer>
        <header>
          <button type="button">
            <span>Nome</span>
            <img src={arrowIcon} alt="" />
          </button>
        </header>

        <Card>
          <main>
            <div className="contact-name">
              <strong>Nome</strong>
              <small>categoria</small>
            </div>
            <span>email</span>
            <span>telefone</span>
          </main>
          <aside>
            <Link to="/edit/123">
              <img src={editIcon} alt="" />
            </Link>
            <button type="button">
              <img src={trashIcon} alt="" />
            </button>
          </aside>
        </Card>
      </ListContainer>
    </Container>
  );
}
