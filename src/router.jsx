import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginLayout from './components/LoginLayout';
import MainLayout from './components/MainLayout';
//import Conductor from './views/Conductor';
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import NotFound from './views/NotFound';
import Signup from './views/Signup';
import Users from './views/Users';
import UserForm from './views/UserForm';
import ProtectedRoute from './components/ProtectedRoute';  // Import ProtectedRoute

const router = createBrowserRouter([
  {
    path: '/',  // Main application path
    element: <MainLayout />,
    children: [
      { path: '', element: <Navigate to='/dashboard' /> },  // Redirect to /dashboard
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute roles={['admin', 'users']}>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'users',
        element: (
          <ProtectedRoute roles={['admin']}>
            <Users />
          </ProtectedRoute>
        ),
      },
      {
        path: 'users/new',
        element: (
          <ProtectedRoute roles={['admin']}>
            <UserForm key='userCreate' />
          </ProtectedRoute>
        ),
      },
      {
        path: 'users/:id',
        element: (
          <ProtectedRoute roles={['admin']}>
            <UserForm key='userUpdate' />
          </ProtectedRoute>
        ),
      },
     /* {
        path: 'conductor',
        element: (
          <ProtectedRoute roles={['admin']}>
            <Conductor />
          </ProtectedRoute>
        )
      },*/
    ],
  },
  {
    path: '/auth',  // Auth path for login/signup
    element: <LoginLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
