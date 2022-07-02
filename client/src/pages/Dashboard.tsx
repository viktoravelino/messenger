import { OpenConversation } from '../components/OpenConversation';
import { Sidebar } from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { useConversations } from '../context/ConversationsContext';

export function Dashboard() {
  const { selectedConversation } = useConversations();

  return (
    <div className="d-flex" style={{ height: '100vh' }}>
      <Sidebar />
      {selectedConversation && <OpenConversation />}
    </div>
  );
}
