const Comments = require("../models/comments");

const normalizeComment = (doc) => {
  const comment = { ...doc }; // używając spread operator możemy skopiować obiekt, a następnie zmodyfikować jego wartości - twórzymy nową referencję, zmieniając dane w comment nie zmieniamy danych w doc
  comment.id = comment._id;
  delete comment._id;
  return comment;
};

exports.all = async (req, res, next) => {
  try {
    const doc = await Comments.all();
    const response = doc.map((comment) => normalizeComment(comment));
    res.send(response); // Metoda send jest używana w twoim kodzie do wysłania odpowiedzi HTTP z serwera do klienta. W tym przypadku wysyłamy tablicę z komentarzami do przeglądarki.
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const comment = {
      body: req.body.text,
      user_id: "1212",
    };
    const doc = await Comments.create(comment);
    const response = normalizeComment(doc);
    res.send(response);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    // const newData = {
    //   body: req.body.text,
    //   id: req.params.id,
    // };
    const doc = await Comments.update(req.params.id, { body: req.body.text });
    const response = normalizeComment(doc);
    res.send(response);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await Comments.remove(req.params.id);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};
