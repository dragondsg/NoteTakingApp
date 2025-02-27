import { useEffect, useContext } from "react";
import { NotesContext } from "./provider";
import { NoteCard } from "./card";
import "./App.css";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  const { allNotes, noteFunctions, userData } = useContext(NotesContext);
  const loggedIn = userData.currentUser.id != "0";

  const navigate = useNavigate();

  useEffect(() => {
    noteFunctions.refetch();
    userData.refetchUsers();
  }, []);

  return (
    <>
      <div className={"header"}>
        <h2>{userData.currentUser.username}</h2>
        <div>
          {!loggedIn && (
            <Link to="/Login">
              <button>Log In</button>
            </Link>
          )}
          {loggedIn && <button onClick={userData.logOutUser}>Log Out</button>}
          <button
            onClick={() => {
              noteFunctions.addNote("", "", userData.currentUser.id);
              navigate(`/Note/?note=${Math.max(...allNotes.map((n)=>parseInt(n.id)))+1}ID`); // SAME HERE!!!
            }}
          >
            +
          </button>
        </div>
      </div>
      <div className={"noteBody"}>
        {allNotes
          .filter((note) => note.user === userData.currentUser.id)
          .map((note) => (
            <NoteCard note={note} deleteNote={noteFunctions.deleteNote} />
          ))}
      </div>
      <Toaster />
    </>
  );
}

export default App;
