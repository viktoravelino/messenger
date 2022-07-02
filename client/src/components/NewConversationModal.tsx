import React, { FormEvent, useState } from 'react';
import {
  Button,
  Form,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
  ModalBody,
  ModalHeader,
} from 'react-bootstrap';
import { useContacts } from '../context/ContactsContext';
import { useConversations } from '../context/ConversationsContext';

interface NewConversationModalProps {
  onCloseModal: () => void;
}

export function NewConversationModal({
  onCloseModal,
}: NewConversationModalProps) {
  const { contacts } = useContacts();
  const { createConversation } = useConversations();

  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    createConversation(selectedContactIds);

    onCloseModal();
  }

  function handleCheckboxChange(contactId: string) {
    setSelectedContactIds((prevSelectedContactIds) => {
      if (prevSelectedContactIds.includes(contactId)) {
        return prevSelectedContactIds.filter((prevId) => {
          return contactId !== prevId;
        });
      } else {
        return [...prevSelectedContactIds, contactId];
      }
    });
  }

  return (
    <>
      <ModalHeader closeButton>Create Conversation</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          {contacts.map((contact) => (
            <FormGroup controlId={contact.id} key={contact.id}>
              <FormCheck
                type="checkbox"
                // value={selectedContactIds.includes(contact.id)}
                label={contact.name}
                onChange={() => handleCheckboxChange(contact.id)}
              />
            </FormGroup>
          ))}
          <FormGroup className="justify-content-end d-flex">
            <Button type="submit">Create</Button>
          </FormGroup>
        </Form>
      </ModalBody>
    </>
  );
}
