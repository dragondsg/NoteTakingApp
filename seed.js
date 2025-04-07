import { writeFileSync } from "fs";

const db = {
    users: [{
        username: 'Guest',
        password: '',
        id: '0ID',
    }],
    notes: [{
        title: 'Base Note',
        text: 'This is a sample note.',
        user: '0ID',
        id: 'ID1234',
    }],
    characters: [
    {
      name: "Joe",
      race: "Human",
      occupation: "Fighter",
      description: "Joe is just a basic human fighter.",
      user: "0ID",
      id: "ID4321"
    }
  ]
};

writeFileSync("db.json", JSON.stringify(db), { encoding: "utf-8" });
