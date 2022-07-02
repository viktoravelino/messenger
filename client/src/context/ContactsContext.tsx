import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export interface Contact {
  id: string;
  name: string;
}

interface ContactContextProps {
  contacts: Contact[];
  createContact: (contact: Contact) => void;
}

const ContactsContext = createContext<ContactContextProps>({
  contacts: [],
  createContact: () => {},
});

export function ContactsProvider({ children }: any) {
  const [contacts, setContacts] = useLocalStorage<Contact[]>('contacts', []);

  function createContact({ id, name }: Contact) {
    setContacts((prevContacts) => {
      return [...prevContacts, { id, name }];
    });
  }

  return (
    <ContactsContext.Provider value={{ contacts, createContact }}>
      {children}
    </ContactsContext.Provider>
  );
}

export function useContacts() {
  return useContext(ContactsContext);
}
