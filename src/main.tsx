import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { NotesProvider } from "./provider";
import { NoteApp } from "./NotesPages/Notes.tsx";
import { LoginApp } from "./Login.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/Note",
    element: <NoteApp />,
  },
  {
    path: "/Login",
    element: <LoginApp />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NotesProvider>
      <RouterProvider router={router} />
    </NotesProvider>
  </React.StrictMode>
);
