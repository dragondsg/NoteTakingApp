import "./notes.css";
import { useContext, useState, useEffect } from "react";
import { NotesContext } from "../provider";
import { Link, useSearchParams, useNavigate } from "react-router-dom";

const usePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchPrimitive, setSearchPrimitive] = useState(
    searchParams.get("note") as string
  );
  const setPage = (id: string) => {
    searchParams.set("note", `${id}`);
    setSearchPrimitive(id);
    setSearchParams();
  };
  return [searchPrimitive, setPage] as const;
};

export function NoteApp() {
  const { allNotes, noteFunctions } = useContext(NotesContext);

  const [id, setId] = usePage();
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  useEffect(() => {
    noteFunctions.refetch().then(() => {
      setTitle(allNotes.filter((n) => n.id == id)[0].title);
      setBody(allNotes.filter((n) => n.id == id)[0].text);
    });
  }, []);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          noteFunctions.updateNote(title, body, id);
          navigate('/');
        }}
      >
        <input
          className="headerInput"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <textarea
          className="bodyInput"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
          rows={40}
        />
        <div className="buttonArea">
          <Link to="/">
            <button className="closeButton">X</button>
          </Link>
          <button className="saveButton" type="submit">
            Save
          </button>
        </div>
      </form>
    </>
  );
}
