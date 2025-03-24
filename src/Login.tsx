import { useState, useContext, useEffect } from "react";
import { NotesContext } from "./provider";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export function LoginApp() {
  const { userData } = useContext(NotesContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    userData.refetchUsers();
  }, []);

  return (
    <div>
      <Link to="/" className="closeButton">
        <button>X</button>
      </Link>
      <img src="./img/stickyNoteJokes.png" className="stickys" />
      <form
        className="loginForm"
        onSubmit={(e) => {
          console.log("submit");
          e.preventDefault();
          userData.logInUser(username, password);
          navigate("/");
        }}
      >
        <label>Username:</label>
        <input
          className="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label>Password:</label>
        <input
          className="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div>
          <button type="submit">Log In</button>
          <button type="button"
            onClick={() => {
              userData.addUser(username, password);
              //.then(() => userData.logInUser(username, password));
              //navigate("/");
            }}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
