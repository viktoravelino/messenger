import { useState } from 'react';
import {
  Button,
  Modal,
  Nav,
  NavItem,
  NavLink,
  TabContainer,
  TabContent,
  TabPane,
} from 'react-bootstrap';

import { useAuth } from '../context/AuthContext';

import { Contacts } from './Contacts';
import { Conversations } from './Conversations';
import { NewContactModal } from './NewContactModal';
import { NewConversationModal } from './NewConversationModal';

const CONVERSATIONS_KEY = 'conversations';
const CONTACTS_KEY = 'contacts';

export function Sidebar() {
  const { id } = useAuth();
  const [activeKey, setActiveKey] = useState<string | null>(CONVERSATIONS_KEY);
  const [modalOpen, setModalOpen] = useState(false);
  const conversationOpen = activeKey === CONVERSATIONS_KEY;

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <div style={{ width: '250px' }} className="d-flex flex-column">
      <TabContainer activeKey={activeKey!} onSelect={setActiveKey}>
        <Nav variant="tabs" className="justify-content-center">
          <NavItem>
            <NavLink eventKey={CONVERSATIONS_KEY} style={{ cursor: 'pointer' }}>
              Conversations
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink eventKey={CONTACTS_KEY} style={{ cursor: 'pointer' }}>
              Contacts
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent className="border-end overflow-auto flex-grow-1">
          <TabPane eventKey={CONVERSATIONS_KEY}>
            <Conversations />
          </TabPane>
          <TabPane eventKey={CONTACTS_KEY}>
            <Contacts />
          </TabPane>
        </TabContent>

        <div className="p-2 border-top border-end small">
          Your Id: <span className="text-muted">{id}</span>
        </div>

        <Button onClick={() => setModalOpen(true)} className="rounded-0">
          New {conversationOpen ? 'Conversation' : 'Contact'}
        </Button>
      </TabContainer>

      <Modal show={modalOpen} onHide={closeModal}>
        {conversationOpen ? (
          <NewConversationModal onCloseModal={closeModal} />
        ) : (
          <NewContactModal onCloseModal={closeModal} />
        )}
      </Modal>
    </div>
  );
}
