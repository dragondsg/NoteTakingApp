import { Note } from "./types";
import { Link } from "react-router-dom";

export function NoteCard({
  note,
  deleteNote,
}: {
  note: Note;
  deleteNote: (id: number) => Promise<void>;
}) {
  return (
    <div className={"noteCard"}>
      <div className={"cardHeader"}>
        <h3>{note.title}</h3>
        <div>
          <Link to={"/Note/?note=" + `${note.id}`}>
            <button>Edit</button>
          </Link>
          <button
            onClick={() => {
              deleteNote(note.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
      <p>{note.text}</p>
    </div>
  );
}
