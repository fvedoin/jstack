import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import {
  Card,
  Container,
  ErrorContainer,
  Header,
  InputSearchContainer,
  ListContainer,
} from './styles';
import Button from '../../components/Button';

import arrowIcon from '../../assets/images/icons/arrow.svg';
import editIcon from '../../assets/images/icons/edit.svg';
import trashIcon from '../../assets/images/icons/trash.svg';
import sadIcon from '../../assets/images/icons/sad.svg';

import Loader from '../../components/Loader';
import ContactsService from '../../services/ContactsService';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )), [searchTerm, contacts]);

  async function loadContacts() {
    try {
      setIsLoading(true);

      const contactsList = await ContactsService.listContacts(orderBy);

      setHasError(false);
      setContacts(contactsList);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadContacts();
  }, [orderBy]);

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  function handleTryAgain() {
    loadContacts();
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />
      <InputSearchContainer>
        <input
          value={searchTerm}
          type="text"
          placeholder="Pesquisar contato..."
          onChange={handleChangeSearchTerm}
        />
      </InputSearchContainer>
      <Header hasError={hasError}>
        {!hasError && (
          <strong>
            {filteredContacts.length}
            {' '}
            {filteredContacts.length === 1 ? 'contatos' : 'contato'}
          </strong>
        )}
        <Link to="/new">Novo Contato</Link>
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={sadIcon} alt="Sad" />
          <div className="details">
            <strong>Ocorreu um erro ao obter seus contatos!</strong>
            <Button onClick={() => handleTryAgain()}>
              Tentar novamente
            </Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && (
        <ListContainer orderBy={orderBy}>
            {filteredContacts.length > 0 && (
            <header>
              <button type="button" onClick={handleToggleOrderBy}>
                <span>Nome</span>
                <img src={arrowIcon} alt="" />
              </button>
            </header>
            )}

            {filteredContacts.map((contact) => (
              <Card key={contact.id}>
                <main>
                  <div className="contact-name">
                    <strong>{contact.name}</strong>
                    {contact.category_name && (
                    <small>{contact.category_name}</small>
                    )}
                  </div>
                  <span>{contact.email}</span>
                  <span>{contact.phone}</span>
                </main>
                <aside>
                  <Link to={`/edit/${contact.id}`}>
                    <img src={editIcon} alt="" />
                  </Link>
                  <button type="button">
                    <img src={trashIcon} alt="" />
                  </button>
                </aside>
              </Card>
            ))}
        </ListContainer>
      )}
    </Container>
  );
}
