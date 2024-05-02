import { useState, useContext, useEffect } from "react";
import { NotesContext } from "./provider";
import { Link } from "react-router-dom";
import "./Login.css";

export function LoginApp() {
  const { userData } = useContext(NotesContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    userData.refetchUsers();
  }, []);

  return (
    <div>
      <Link to="/" className="closeButton">
        <button>X</button>
      </Link>
      <form
        className="loginForm"
        onSubmit={(e) => {
          e.preventDefault();
          userData.logInUser(username, password);
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
          <button
            onClick={() => {
              userData.addUser(username, password);
              userData.logInUser(username, password);
            }}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
