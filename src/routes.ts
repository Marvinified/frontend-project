import { Chat, Chats } from './pages';

export type Route = {
  path: string;
  component: React.FC;
};

const routes: Route[] = [
  {
    path: '/chats',
    component: Chats,
  },
  {
    path: '/chat/:userID',
    component: Chat,
  },
];

export default routes;
