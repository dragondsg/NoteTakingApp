import { Character } from "./types";
import { Link } from "react-router-dom";

export function CharCard({
  char,
  deleteChar,
}: {
  char: Character;
  deleteChar: (id: string) => Promise<void>;
}) {
  return (
    <div className={"noteCard"}>
      <div className={"cardHeader"}>
        <h3>{char.name}</h3>
        <div>
          <Link to={`/Character/?character=${char.id}`}>
            <button>Edit</button>
          </Link>
          <button
            onClick={() => {
              deleteChar(char.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
      <p>-{char.race}</p>
      <p>-{char.occupation}</p>
      <p>{char.description}</p>
    </div>
  );
}
