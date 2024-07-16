import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  AddCourse,
  ChangePassword,
  CourseDetail,
  Dashboard,
  FacultyDashboard,
  Home,
  Leaves,
  Login,
  Signup,
  TaLeaves,
  TaList,
  TaPublicView,
  ToBeApprovedFor,
} from "./components/index.js";
import { Provider } from "react-redux";
import AuthLayout from "./components/AuthLayout.jsx";
import store from "./store/store.js";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/changePassword",
        element: (
          <AuthLayout authentication={true}>
            <ChangePassword />
          </AuthLayout>
        ),
      },
      {
        path: "/leaves",
        element: (
          <AuthLayout authentication={true}>
            <Leaves />
          </AuthLayout>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/addCourse",
        element: (
          <AuthLayout authentication={true}>
            <AddCourse />
          </AuthLayout>
        ),
      },
      {
        path: "/ta-list",
        element: (
          <AuthLayout authentication={true}>
            <TaList />
          </AuthLayout>
        ),
      },
      {
        path: "/course-detail/:courseId",
        element: (
          <AuthLayout authentication={true}>
            <CourseDetail />
          </AuthLayout>
        ),
      },
      {
        path: "/faculty-dashboard",
        element: (
          <AuthLayout authentication={true}>
            <FacultyDashboard />
          </AuthLayout>
        ),
      },
      {
        path: "/taPublicView/:taId",
        element: <TaPublicView />,
      },
      {
        path: "/taLeaves",
        element: (
          <AuthLayout authentication={true}>
            <TaLeaves />
          </AuthLayout>
        ),
      },
      {
        path: "/approveTa/:taId",
        element: (
          <AuthLayout authentication={true}>
            <ToBeApprovedFor />
          </AuthLayout>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);
