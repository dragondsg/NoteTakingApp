import { useEffect, useContext } from "react";
import { NotesContext } from "./provider";
import { NoteCard } from "./card";
import "./App.css";
import { Link } from "react-router-dom";

function App() {
  const { allNotes, noteFunctions, userData } = useContext(NotesContext);
  const loggedIn = userData.currentUser.id != 0;

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
              // Stuff HERE!!! Auto go to note.
            }}
          >
            +
          </button>
        </div>
      </div>
      <div className={"noteBody"}>
        {allNotes
          .filter((note) => note.user == userData.currentUser.id)
          .map((note) => (
            <NoteCard note={note} deleteNote={noteFunctions.deleteNote} />
          ))}
      </div>
    </>
  );
}

export default App;
