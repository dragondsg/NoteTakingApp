import { createContext, ReactNode, useState } from "react";
import { toast } from "react-hot-toast";
import { Note, User } from "./types";
import { Request } from "../api";

type Tnotes = {
  allNotes: Note[];
  noteFunctions: {
    refetch: () => Promise<void>;
    addNote: (title: string, text: string, user: string) => Promise<void>;
    updateNote: (title: string, text: string, id: string) => Promise<void>;
    deleteNote: (id: string) => Promise<void>;
  };
  userData: {
    currentUser: User;
    refetchUsers: () => Promise<void>;
    addUser: (username: string, password: string) => Promise<void>;
    logInUser: (username: string, password: string) => void;
    logOutUser: () => void;
  };
};

const guest = {
  username: "Guest",
  password: "",
  id: "0",
};

export const NotesContext = createContext<Tnotes>({} as Tnotes);

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User>(guest);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [allNotes, setAllNotes] = useState<Note[]>([]);

  const refetch = () => Request.getAllNotes().then(setAllNotes);

  const refetchUsers = () =>
    Request.getAllUsers()
      .then(setAllUsers)
      .then(() => {
        const maybeUser = localStorage.getItem("user");
        if (maybeUser) {
          setCurrentUser(JSON.parse(maybeUser));
        }
      });
  const logInUser = (username: string, password: string) => {
    let filteredUsers = allUsers.filter(
      (user) => user.username == username && user.password == password
    );
    console.log("login: ", username, password, allUsers);
    if (filteredUsers.length > 0) {
      setCurrentUser(filteredUsers[0]);
      localStorage.setItem("user", JSON.stringify(filteredUsers[0]));
    } else {
      toast.error("No account matching username and password.");
    }
  };
  const logOutUser = () => {
    setCurrentUser(guest);
    localStorage.removeItem("user");
  };
  const addUser = (username: string, password: string) => {
    return Request.postUser(username, password)
      .then(() => {
        console.log("Account added");
        toast.success("Account added.");
        refetchUsers();
      })
      .catch(() => {
        toast.error("Account failed to add.");
      });
  };

  const addNote = (title: string, text: string, user: string) => {
    const tempNote = {
      title,
      text,
      user,
      id: (Math.max(...allNotes.map((note) => parseInt(note.id))) + 1) + "ID", // HERE!!!!!!!!!!!!!!!!!!!!!!!!!
    };
    setAllNotes(allNotes.concat(tempNote));
    return Request.postNote(title, text, user)
      .then(() => {
        toast.success("Note added.");
      })
      .catch(() => {
        toast.error("Note failed to add.");
        refetch();
      });
  };

  const updateNote = (title: string, text: string, id: string) => {
    setAllNotes(
      allNotes.map((note) => {
        if (id == note.id) {
          let tempNote = note;
          tempNote.title = title;
          tempNote.text = text;
          return tempNote;
        } else {
          return note;
        }
      })
    );
    return Request.updateNote(title, text, id)
      .then(() => {
        toast.success("Note saved.");
      })
      .catch(() => {
        toast.error("Note failed to save.");
        refetch();
      });
  };

  const deleteNote = (id: string) => {
    setAllNotes(allNotes.filter((note) => note.id != id));
    return Request.deleteNote(id)
      .then(() => {
        toast.success("Note deleted.");
      })
      .catch(() => {
        toast.error("Note failed to delete.");
        refetch();
      });
  };

  const noteFunctions = {
    refetch,
    addNote,
    updateNote,
    deleteNote,
  };

  const userData = {
    currentUser,
    refetchUsers,
    addUser,
    logInUser,
    logOutUser,
  };

  return (
    <NotesContext.Provider value={{ allNotes, noteFunctions, userData }}>
      {children}
    </NotesContext.Provider>
  );
};
