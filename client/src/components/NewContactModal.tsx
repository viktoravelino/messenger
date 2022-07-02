import React, { FormEvent, useRef } from 'react';
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  ModalBody,
  ModalHeader,
} from 'react-bootstrap';
import { useContacts } from '../context/ContactsContext';

interface NewContactModalProps {
  onCloseModal: () => void;
}

export function NewContactModal({ onCloseModal }: NewContactModalProps) {
  const idRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const { createContact } = useContacts();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    createContact({
      id: idRef.current?.value!,
      name: nameRef.current?.value!,
    });

    onCloseModal();
  }
  return (
    <>
      <ModalHeader closeButton>Create Contact</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <FormGroup>
            <FormLabel>Id</FormLabel>
            <FormControl type="text" ref={idRef} required />
          </FormGroup>
          <FormGroup>
            <FormLabel>Name</FormLabel>
            <FormControl type="text" ref={nameRef} required />
          </FormGroup>
          <FormGroup className="justify-content-end d-flex">
            <Button type="submit">Create</Button>
          </FormGroup>
        </Form>
      </ModalBody>
    </>
  );
}
