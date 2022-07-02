import { FormEvent, useRef } from 'react';
import {
  Button,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from 'react-bootstrap';
import { v4 as uuidV4 } from 'uuid';

import { useAuth } from '../context/AuthContext';

export function Login() {
  const { onIdSubmit } = useAuth();
  const idRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    onIdSubmit(idRef.current!.value);
  }

  function handleCreateNewId() {
    onIdSubmit(uuidV4());
  }

  return (
    <Container
      className="d-flex align-items-center"
      style={{ height: '100vh' }}
    >
      <Form onSubmit={handleSubmit} className="w-100">
        <FormGroup>
          <FormLabel>Enter your id</FormLabel>
          <FormControl type="text" ref={idRef} required />
        </FormGroup>

        <FormGroup className="mt-3">
          <Button type="submit" className="me-2">
            Login
          </Button>
          <Button onClick={handleCreateNewId} variant="secondary">
            Create New Id
          </Button>
        </FormGroup>
      </Form>
    </Container>
  );
}
