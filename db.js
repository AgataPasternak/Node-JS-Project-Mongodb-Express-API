const { MongoClient } = require("mongodb");

const state = {
  // tu będzie nasza instacja bazy widoczna w całej aplikacji
  db: null,
}; // obiekt w pamięci RAM, który będzie przechowywał naszą bazę danych; czy na pewno w RAMie? odp: tak, bo jest to zmienna globalna

exports.connect = async (url, dbname) => {
  try {
    if (state.db) return; // jeśli już jest połączenie to nie rób nic, bo nie chcemy tworzyć wielu instancji bazy danych
    const client = new MongoClient(url); // tworzymy nowego klienta, który będzie naszym pośrednikiem z bazą danych, ponieważ nie możemy się bezpośrednio połączyć z bazą danych
    await client.connect(); // łączymy się z bazą danych
    state.db = client.db(dbname); // przypisujemy bazę danych do naszego stanu - to będzie referencja do bazy danych
  } catch (err) {
    console.log(err);
  }
};

exports.get = () => state.db; // zwracamy bazę danych, aby móc z niej korzystać w innych plikach;
