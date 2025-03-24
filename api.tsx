const baseUrl = "http://localhost:3001";
const notesUrl = baseUrl + '/notes';
const userUrl = baseUrl + '/users';
const charUrl = baseUrl + '/characters';

export const Request = {
  getAllUsers: () => fetch(userUrl).then((response) => response.json()),
  
  postUser: (username: string, password: string) => {
    return fetch(userUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
      redirect: "follow",
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Unable to create user.");
      }
    });
  },

  getAllNotes: () => fetch(notesUrl).then((response) => response.json()),

  postNote: (title: string, text: string, user: string) => {
    return fetch(notesUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        text,
        user,
      }),
      redirect: "follow",
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Unable to find note.");
      }
    });
  },

  updateNote: (title: string, text: string, id: string) => {
    return fetch(notesUrl + "/" + id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          text,
        }),
        redirect: "follow",
      });
  },

  deleteNote: (id: string) => {
    return fetch(notesUrl + "/" + id, {
      method: "DELETE",
    });
  },

  getAllCharacters: () => fetch(charUrl).then((response) => response.json()),

  postChar: (name: string, race: string, occupation: string, description: string, user: string) => {
    return fetch(charUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        race,
        occupation,
        description,
        user,
      }),
      redirect: "follow",
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Unable to find note.");
      }
    });
  },

  updateChar: (name: string, race: string, occupation: string, description: string, id: string) => {
    return fetch(charUrl + "/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        race,
        occupation,
        description,
      }),
      redirect: "follow",
    });
  },

  deleteChar: (id: string) => {
    return fetch(charUrl + "/" + id, {
      method: "DELETE",
    });
  },
};
