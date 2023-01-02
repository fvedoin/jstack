import { Link } from 'react-router-dom';
import {
  useEffect, useMemo, useState, useCallback,
} from 'react';
import {
  Card,
  Container,
  EmptyListContainer,
  ErrorContainer,
  Header,
  InputSearchContainer,
  ListContainer,
  SearchNotFoundContainer,
} from './styles';
import Button from '../../components/Button';

import arrowIcon from '../../assets/images/icons/arrow.svg';
import editIcon from '../../assets/images/icons/edit.svg';
import trashIcon from '../../assets/images/icons/trash.svg';
import sadIcon from '../../assets/images/icons/sad.svg';
import emptyBoxIcon from '../../assets/images/icons/empty-box.svg';
import magnifierQuestionIcon from '../../assets/images/icons/magnifier-question.svg';

import Loader from '../../components/Loader';
import Modal from '../../components/Modal';
import ContactsService from '../../services/ContactsService';

import toast from '../../utils/toast';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )), [searchTerm, contacts]);

  const loadContacts = useCallback(async () => {
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
  }, [orderBy]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  function handleTryAgain() {
    loadContacts();
  }

  function handleDeleteContact(contact) {
    setContactBeingDeleted(contact);
    setIsDeleteModalVisible(true);
  }

  function handleCloseDeleteModal() {
    setContactBeingDeleted(null);
    setIsDeleteModalVisible(false);
  }

  async function handleConfirmDeleteContact() {
    try {
      setIsLoadingDelete(true);

      await ContactsService.deleteContact(contactBeingDeleted.id);

      setContacts((prevState) => prevState.filter(
        (contact) => contact.id !== contactBeingDeleted.id,
      ));
      handleCloseDeleteModal();

      toast({
        type: 'success',
        text: 'Contato deletado com sucesso!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao deletar contato!',
      });
    } finally {
      setIsLoadingDelete(false);
    }
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />
      <Modal
        danger
        isLoading={isLoadingDelete}
        confirmLabel="Deletar"
        title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}"`}
        visible={isDeleteModalVisible}
        onCancel={() => handleCloseDeleteModal()}
        onConfirm={() => handleConfirmDeleteContact()}
      >
        <p>Esta ação não poderá ser desfeita</p>
      </Modal>

      {contacts.length > 0 && (
        <InputSearchContainer>
          <input
            value={searchTerm}
            type="text"
            placeholder="Pesquisar contato..."
            onChange={handleChangeSearchTerm}
          />
        </InputSearchContainer>
      )}
      <Header
        justifyContent={
            // eslint-disable-next-line no-nested-ternary
            hasError
              ? 'flex-end'
              : (contacts.length > 0
                ? 'space-between'
                : 'center')
        }
      >
        {(!hasError && contacts.length > 0) && (
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
        <>
          {(contacts.length < 1 && !isLoading) && (
            <EmptyListContainer>
              <img src={emptyBoxIcon} alt="Empty box" />
              <p>
                Você ainda não tem nenhum contato cadastrado!
                Clique no botão
                {' '}
                <strong>”Novo contato”</strong>
                {' '}
                à cima para cadastrar o seu primeiro!
              </p>
            </EmptyListContainer>
          )}
          <ListContainer orderBy={orderBy}>
            {filteredContacts.length > 0 && (
            <header>
              <button type="button" onClick={handleToggleOrderBy}>
                <span>Nome</span>
                <img src={arrowIcon} alt="" />
              </button>
            </header>
            )}

            {(contacts.length > 0 && filteredContacts.length < 1) && (
            <SearchNotFoundContainer>
              <img src={magnifierQuestionIcon} alt="Magnifier question" />
              <span>
                Nenhum resultado foi encontrado para
                {' '}
                <strong>
                  ”
                  {searchTerm}
                  ”
                </strong>
                .
              </span>
            </SearchNotFoundContainer>
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
                  <button type="button" onClick={() => handleDeleteContact(contact)}>
                    <img src={trashIcon} alt="" />
                  </button>
                </aside>
              </Card>
            ))}
          </ListContainer>
        </>
      )}
    </Container>
  );
}
