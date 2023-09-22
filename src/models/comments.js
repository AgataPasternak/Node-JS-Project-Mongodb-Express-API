const { ObjectId } = require("mongodb");
const db = require("../../db");

exports.all = () => {
  return db.get().collection("comments").find().toArray();
};

exports.create = async (comment) => {
  const result = await db
    .get()
    .collection("comments")
    .insertOne({ ...comment, createdAt: new Date() });
  return db.get().collection("comments").findOne({ _id: result.insertedId });
};
// findOne() w MongoDB jest metodą służącą do wyszukiwania jednego dokumentu w kolekcji, który pasuje do podanych kryteriów wyszukiwania. Metoda ta zwraca pierwszy napotkany dokument pasujący do kryteriów zapytania

exports.update = async (id, newData) => {
  await db
    .get()
    .collection("comments")
    .updateOne({ _id: new ObjectId(id) }, { $set: newData });
  return db
    .get()
    .collection("comments")
    .findOne({ _id: new ObjectId(id) });
};
// w trakcie updatu ten komentarz jest już w bazie danych, więc nie musimy zwracać go jako result; nie potrzebne nam nigdzie te dane
//  id jest stringiem, a w bazie danych jest jako ObjectId

exports.remove = (id) => {
  return db // nie robie asyn await, bo nie czekam na żadną odpowiedz z serwera
    .get()
    .collection("comments")
    .deleteOne({ _id: new ObjectId(id) });
};
