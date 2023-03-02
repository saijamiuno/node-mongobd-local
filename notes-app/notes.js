import fs from "fs";
import chalk from "chalk";

export async function loadNotes() {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJson = dataBuffer.toString();
    return JSON.parse(dataJson);
  } catch (error) {
    return [];
  }
}

// const loadNotes = () => {
//   try {
//     const dataBuffer = fs.readFileSync("notes.json");
//     const dataJson = dataBuffer.toString();
//     return JSON.parse(dataJson);
//   } catch (error) {
//     return [];
//   }
// };

const addNote = async (title, body) => {
  const notes = await loadNotes();

  const duplicateNotes = notes.filter((item) => {
    return (
      item.title === title ||
      item.title.toLowerCase() === title.toLowerCase() ||
      item.title.toUpperCase() === title.toUpperCase()
    );
  });

  if (duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body,
    });
    saveNote(notes);
    console.log("New Note Added ");
  } else {
    console.log("Note Title Already Exits");
  }
};

const saveNote = (notes) => {
  const dataJson = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJson);
};

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKepp = notes.filter((note) => {
    return note.title !== title;
  });
  saveNote(notesToKepp);
  if (notes.length > notesToKepp.length) {
    console.log(chalk.inverse.green("Note removed"));
    saveNote(notesToKepp);
  } else {
    console.log(chalk.inverse.red("No Note Found"));
  }
};

// export default {
//   addNote: addNote,
//   removeNote: removeNote,
// };
