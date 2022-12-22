import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import {
  Card, Container, Header, InputSearchContainer, ListContainer,
} from './styles';

import arrowIcon from '../../assets/images/icons/arrow.svg';
import editIcon from '../../assets/images/icons/edit.svg';
import trashIcon from '../../assets/images/icons/trash.svg';

import Loader from '../../components/Loader';
import ContactsService from '../../services/ContactsService';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )), [searchTerm, contacts]);

  useEffect(() => {
    async function loadContacts() {
      try {
        setIsLoading(true);

        const contactsList = await ContactsService.listContacts(orderBy);

        setContacts(contactsList);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    loadContacts();
  }, [orderBy]);

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
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
      <Header>
        <strong>
          {filteredContacts.length}
          {' '}
          {filteredContacts.length === 1 ? 'contatos' : 'contato'}
        </strong>
        <Link to="/new">Novo Contato</Link>
      </Header>

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
    </Container>
  );
}
