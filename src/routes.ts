import Chat from './pages/Chat';
import Home from './pages/Home';

export type Route = {
  path: string;
  component: React.FC;
};

const routes: Route[] = [
  {
    path: '/chats',
    component: Home,
  },
  {
    path: '/chats/:userId?',
    component: Chat,
  },
];

export default routes;
