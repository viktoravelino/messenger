import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { useConversations } from '../context/ConversationsContext';

export function Conversations() {
  const { conversations, selectConversationIndex } = useConversations();

  return (
    <ListGroup variant="flush">
      {conversations.map((conversation, index) => (
        <ListGroupItem
          key={index}
          action
          active={conversation.selected}
          onClick={() => selectConversationIndex(index)}
        >
          {conversation.recipients.map((r) => r.name).join(', ')}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}
