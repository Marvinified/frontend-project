import Dashboard from './pages/Dashboard';

export type Route = {
  path: string;
  component: React.FC;
};

const routes: Route[] = [
  {
    path: '/chats/:userId?',
    component: Dashboard,
  },
];

export default routes;
