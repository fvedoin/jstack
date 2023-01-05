import { useEffect, useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';
import useIsMounted from '../../hooks/useIsMounted';
import Presentation from './Presentation';

export default function Container() {
  const { id } = useParams();
  const history = useHistory();
  const isMounted = useIsMounted();

  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');

  const contactFormRef = useRef(null);

  useEffect(() => {
    async function loadContact() {
      try {
        const contact = await ContactsService.getContactById(id);

        if (isMounted) {
          contactFormRef.current.setFieldsValues(contact);
          setContactName(contact.name);
          setIsLoading(false);
        }
      } catch {
        if (isMounted) {
          history.push('/');
          toast({
            type: 'danger',
            text: 'Contato não encontrado',
          });
        }
      }
    }
    loadContact();
  }, [id, history, isMounted]);

  async function handleSubmit(contact) {
    try {
      const updatedContactData = await ContactsService.updateContact(id, contact);

      setContactName(updatedContactData.name);
      toast({
        type: 'success',
        text: 'Contato editado com sucesso!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar o contato',
      });
    }
  }

  return (
    <Presentation
      contactName={contactName}
      isLoading={isLoading}
      contactFormRef={contactFormRef}
      onSubmit={() => handleSubmit()}
    />
  );
}
