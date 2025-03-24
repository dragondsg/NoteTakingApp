import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { NotesProvider } from "./provider";
import { NoteApp } from "./NotesPages/Notes.tsx";
import { CharApp } from "./NotesPages/Characters.tsx";
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
    path: "/Character",
    element: <CharApp />
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
