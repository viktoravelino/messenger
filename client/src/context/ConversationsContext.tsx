import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useAuth } from './AuthContext';
import { Contact, useContacts } from './ContactsContext';
import { useSocket } from './SocketContext';

interface Message {
  sender: any;
  senderName?: any;
  text: string;
  fromMe?: boolean;
}

interface ConversationRaw {
  recipients: string[];
  messages: Message[];
  selected?: boolean;
}

interface Conversation {
  recipients: Contact[];
  messages: Message[];
  selected?: boolean;
}

interface ConversationsContextProps {
  conversations: Conversation[];
  createConversation: (recipientsIds: string[]) => void;
  selectConversationIndex: (state: number) => void;
  selectedConversation: Conversation | null;
  sendMessage: (recipients: any[], text: string) => void;
}

const ConversationsContext = createContext<ConversationsContextProps>({
  conversations: [],
  createConversation: () => {},
  selectConversationIndex: () => {},
  sendMessage: () => {},
  selectedConversation: null,
});

export function ConversationsProvider({ children }: any) {
  const [conversations, setConversations] = useLocalStorage<ConversationRaw[]>(
    'conversations',
    []
  );
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);

  const { contacts } = useContacts();
  const { id } = useAuth();
  const socket = useSocket();

  function createConversation(recipients: string[]) {
    setConversations((prevConversations) => {
      const newConvos = [...prevConversations, { recipients, messages: [] }];
      setSelectedConversationIndex(newConvos.length - 1);
      return newConvos;
    });
  }

  const formattedConversations: Conversation[] = conversations.map(
    (conversation, index) => {
      const recipients = conversation.recipients.map((recipient) => {
        const contact = contacts.find((contact) => {
          return contact.id === recipient;
        });
        const name = (contact && contact.name) || recipient;
        return { id: recipient, name } as Contact;
      });

      const messages: Message[] = conversation.messages.map((message) => {
        const contact = contacts.find((contact) => {
          return contact.id === message.sender;
        });
        const name = (contact && contact.name) || message.sender;
        const fromMe = id === message.sender;
        return { ...message, senderName: name, fromMe };
      });

      const selected = index === selectedConversationIndex;
      return { ...conversation, messages, recipients, selected };
    }
  );

  const addMessageToConvo = useCallback(
    ({ recipients, text, sender }: any) => {
      setConversations((prevConvos) => {
        let madeChange = false;
        const newMessage = { sender, text };

        const newConvos = prevConvos.map((convo) => {
          if (arrayEquality(convo.recipients, recipients)) {
            madeChange = true;
            return { ...convo, messages: [...convo.messages!, newMessage] };
          }

          return convo;
        });

        if (madeChange) {
          return newConvos;
        } else {
          return [...prevConvos, { recipients, messages: [newMessage] }];
        }
      });
    },
    [setConversations]
  );

  function sendMessage(recipients: any[], text: string) {
    socket.emit('send-message', { recipients, text });

    addMessageToConvo({ recipients, text, sender: id });
  }

  useEffect(() => {
    if (socket == null) return;

    socket.on('receive-message', addMessageToConvo);

    return () => {
      socket.off('receive-message');
    };
  }, [socket, addMessageToConvo]);

  return (
    <ConversationsContext.Provider
      value={{
        conversations: formattedConversations,
        createConversation,
        selectConversationIndex: setSelectedConversationIndex,
        selectedConversation: formattedConversations[selectedConversationIndex],
        sendMessage,
      }}
    >
      {children}
    </ConversationsContext.Provider>
  );
}

export function useConversations() {
  return useContext(ConversationsContext);
}

function arrayEquality(a: any[], b: any[]) {
  if (a.length !== b.length) {
    return false;
  }

  a.sort();
  b.sort();

  return a.every((element, index) => {
    return element === b[index];
  });
}
