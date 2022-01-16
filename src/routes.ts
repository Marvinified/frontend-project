import Chat from './containers/Chat';
import Dashboard from './pages/Dashboard';

export type Route = {
  path: string;
  component: React.FC;
};

const routes: Route[] = [
  {
    path: '/chats',
    component: Dashboard,
  },
  {
    path: '/chats/:userId?',
    component: Chat,
  },
];

export default routes;
