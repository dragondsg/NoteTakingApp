import { useEffect, useContext } from "react";
import { NotesContext } from "./provider";
import { NoteCard } from "./card";
import { CharCard } from "./charCard";
import "./App.css";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  const { allNotes, noteFunctions, userData, charFunctions, allChars } = useContext(NotesContext);
  const loggedIn = userData.currentUser.id != "0ID";

  const navigate = useNavigate();

  useEffect(() => {
    noteFunctions.refetch();
    userData.refetchUsers();
    charFunctions.refetchChars();
  }, []);

  return (
    <>
      <div className={"header"}>
        <h2>{userData.currentUser.username}'s Notes</h2>
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
              //navigate(`/Note/?note=${Math.max(...allNotes.map((n)=>parseInt(n.id)))+1}ID`); // SAME HERE!!!
            }}
          >
            New Note
          </button>
          <button
            onClick={() => {
              charFunctions.addChar('', '', '', '', userData.currentUser.id);
            }}
          >
            New Character
          </button>
        </div>
      </div>
      <div className={"noteBody"}>
        {allNotes
          .filter((note) => note.user === userData.currentUser.id)
          .map((note) => (
            <NoteCard note={note} deleteNote={noteFunctions.deleteNote} />
          ))}
        {allChars
          .filter((char) => char.user === userData.currentUser.id)
          .map((char) => (
            <CharCard char={char} deleteChar={charFunctions.deleteChar} />
          ))
        }
      </div>
      <Toaster />
    </>
  );
}

export default App;
