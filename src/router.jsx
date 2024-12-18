import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginLayout from './components/LoginLayout';
import MainLayout from './components/MainLayout';
import Conductor from './views/Conductor';
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import NotFound from './views/NotFound';
import Signup from './views/Signup';
import Users from './views/SubAdmin';
import UserForm from './views/UserForm';
import ForgotPassword from './views/ForgotPassword';
import ResetPassword from './views/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute';  // Import ProtectedRoute
import Loader from './app/Loader.jsx/Loader';
import FareLocation from './views/FareLocation';
import Income from './views/Income';

const router = createBrowserRouter([
  {
    path: '/',  // Main application path
    element: <MainLayout />,
    children: [
      { path: '', element: <Navigate to='/dashboard' /> },  // Redirect to /dashboard
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute roles={['admin', 'subadmin']}>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'users',
        element: (
          <ProtectedRoute roles={['admin',]}>
            <Users />
          </ProtectedRoute>
        ),
      },
      {
        path: 'users/new',
        element: (
          <ProtectedRoute roles={['admin', 'subadmin']}>
            <UserForm key='userCreate' />
          </ProtectedRoute>
        ),
      },
      {
        path: 'users/:id',
        element: (
          <ProtectedRoute roles={['admin', 'subadmin']}>
            <UserForm key='userUpdate' />
          </ProtectedRoute>
        ),
      },
      {
        path: 'conductor',
        element: (
          <ProtectedRoute roles={['admin', 'subadmin']}>
            <Conductor />
          </ProtectedRoute>
        )
      },  
      {
        path: 'fare-location',
        element: (
          <ProtectedRoute roles={['admin', 'subadmin']}>
            <FareLocation />
          </ProtectedRoute>
        )
      }, 
      {
        path: 'income',
        element: (
          <ProtectedRoute roles={['admin', 'subadmin']}>
            <Income />
          </ProtectedRoute>
        )
      }, 
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
