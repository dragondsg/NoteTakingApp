const baseUrl = "http://localhost:3000";
const notesUrl = baseUrl + '/notes';
const userUrl = baseUrl + '/users';

export const Request = {
  getAllUsers: () => fetch(userUrl).then((response) => response.json()),
  
  postUser: (username: string, password: string) => {
    console.log("postUser");
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
    console.log("postNote");
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
    console.log("updateNote");
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
    console.log("deletenote");
    return fetch(notesUrl + "/" + id, {
      method: "DELETE",
    });
  },
};
