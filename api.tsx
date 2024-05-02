const baseUrl = "http://localhost:3000";
const notesUrl = baseUrl + '/notes';
const userUrl = baseUrl + '/users';

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

  postNote: (title: string, text: string, user: number) => {
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

  updateNote: (title: string, text: string, id: number) => {
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

  deleteNote: (id: number) => {
    return fetch(notesUrl + "/" + id, {
      method: "DELETE",
    });
  },
};
