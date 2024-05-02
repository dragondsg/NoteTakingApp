import { writeFileSync } from "fs";

const db = {
    users: [{
        username: 'Guest',
        password: '',
        id: 0,
    }],
    notes: [{
        title: 'Base Note',
        text: 'This is a sample note.',
        user: 0,
        id: 1,
    }]
};

writeFileSync("db.json", JSON.stringify(db), { encoding: "utf-8" });
