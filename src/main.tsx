import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { ProfilePage } from '@/pages/ProfilePage';
import { RepositoryPage } from '@/pages/RepositoryPage';
import { CommitsPage } from '@/pages/CommitsPage';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import { MOCK_USER } from '../shared/mock-data';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,
        element: <Navigate to={`/${MOCK_USER.username}`} replace />,
      },
      {
        path: "/:username",
        element: <ProfilePage />,
      },
      {
        path: "/:username/:repoName",
        element: <RepositoryPage />,
      },
      {
        path: "/:username/:repoName/tree/:path*",
        element: <RepositoryPage />,
      },
      {
        path: "/:username/:repoName/commits",
        element: <CommitsPage />,
      },
    ],
  },
]);
// Do not touch this code
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>,
)