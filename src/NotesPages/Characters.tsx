import "./characters.css";
import { useContext, useState, useEffect } from "react";
import { NotesContext } from "../provider";
import { Link, useSearchParams, useNavigate } from "react-router-dom";

const usePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchPrimitive, setSearchPrimitive] = useState(
    searchParams.get("character") as string
  );
  const setPage = (id: string) => {
    searchParams.set("character", `${id}`);
    setSearchPrimitive(id);
    setSearchParams();
  };
  return [searchPrimitive, setPage] as const;
};

export function CharApp() {
    const { allChars, charFunctions } = useContext(NotesContext);

    const [id, setId] = usePage();
    const navigate = useNavigate();

    const [name, setName] = useState<string>("");
    const [race, setRace] = useState<string>("");
    const [occupation, setOccupation] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    useEffect(() => {
        charFunctions.refetchChars().then(() => {
            setName(allChars.filter((n) => n.id == id)[0].name);
            setRace(allChars.filter((n) => n.id == id)[0].race);
            setOccupation(allChars.filter((n) => n.id == id)[0].occupation);
            setDescription(allChars.filter((n) => n.id == id)[0].description);
        });
    }, []);

    return (
        <>
            <form onSubmit={(e) => {
              e.preventDefault();
              charFunctions.updateChar(name, race, occupation, description, id);
              navigate('/');
            }}
            >
                <div className="block">
                    <label htmlFor="name">Name:</label>
                    <input
                        id="name"
                        className="input"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                </div>
                <div className="block">
                    <label htmlFor="race">Race:</label>
                    <input
                        id="race"
                        className="input"
                        value={race}
                        onChange={(e) => {
                            setRace(e.target.value);
                        }}
                    />
                </div>
                <div className="block">
                    <label htmlFor="occupation">Occupation:</label>
                    <input
                        id="occupation"
                        className="input"
                        value={occupation}
                        onChange={(e) => {
                            setOccupation(e.target.value);
                        }}
                    />
                </div>
                <textarea
                  className="input"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  rows={3}
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
