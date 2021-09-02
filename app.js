const mongoose = require("mongoose");

// mongoose provides something called a Schema -> blueprint for the database document
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  pages: Number,
  releaseDate: Date,
  isAvailable: Boolean,
  genre: String,
});

const multipleBooks = [
  {
    title: "Hunger Games",
    author: "SOmeone",
    pages: 49,
    releaseDate: new Date(),
    isAvailable: false,
    genre: "fantasy",
  },
  {
    title: "Fight Club",
    author: "Chuck Something",
    pages: 0,
    isAvailable: false,
    genre: "unknown",
  },
  {
    title: "Lord of the Rings",
    author: "JRR Tolkien",
    pages: 500,
    isAvailable: true,
    genre:
      "the history of the world, without skipping or adding anything. true story",
  },
];

const Book = mongoose.model("book", bookSchema);

// API
// C reate
// R ead
// U pdate
// D elete

// PRE CALLBACK HELL SCARE
// mongoose
//   .connect("mongodb://localhost:27017/book-factory-of-our-dreams")
//   .then(() => {
//     console.log("Yay connecting to the database");
//     Book.create({
//       title: "Harry Potter",
//       author: "JKidding Rowling",
//       pages: 99999,
//       releaseDate: new Date(),
//       isAvailable: true,
//       genre: "fantasy",
//     })
//       .then((createdBook) => {
//         console.log("We created a book 📚:", createdBook);
//         mongoose.connection
//           .dropDatabase()
//           .then(() => {
//             mongoose.disconnect();
//           })
//           .catch((err) => {
//             console.error("Oopsie dropping the database");
//           });
//       })
//       .catch((err) => {
//         console.error("Oopsie creating a book", err);
//       });
//   })
//   .catch((err) => {
//     console.error("Oppsie connecting to the database");
//   });

mongoose
  .connect("mongodb://localhost:27017/book-factory-of-our-dreams") // please connect to the database
  .then(() => {
    // then, when youre done create a book
    console.log(`Connected... Yay`);
    return Book.create({
      title: "Harry Potter",
      author: "JKidding Rowling",
      pages: 99999,
      releaseDate: new Date(),
      isAvailable: true,
      genre: "fantasy",
    });
  })
  .then((createdBook) => {
    //   👆 this value is the created book (or whatever was returned from the previous function)
    // then, when youre done show me all of the books in the collection
    return Book.find({});
  })
  .then((allBooks) => {
    //   👆 this value is all of the books (or whatever was returned from the previous function)
    // console.log("ALL BOOKS FROM DB", allBooks);
    const theHarryPotterBook = allBooks[0];
    return Book.findById(theHarryPotterBook._id);
  })
  .then((singleBook) => {
    //   👆 this value is the one book you were looking by id (or whatever was returned from the previous function)
    return Book.findByIdAndUpdate(
      singleBook._id,
      { pages: 300 },
      { new: true }
    );
  })
  .then((updatedBook) => {
    console.log("updatedBook:", updatedBook);
    return updatedBook;
  })
  .then((singleBook) => {
    return Book.findByIdAndDelete(singleBook._id);
  })
  .then((deleted) => {
    return Book.insertMany(multipleBooks);
  })
  .then((allAddedBooks) => {
    console.log("allAddedBooks:", allAddedBooks);

    return mongoose.connection.dropDatabase();
  })
  .catch((err) => {
    // in case i screw up, do this
    console.error("Overall Oopsie", err);
  })
  .finally(() => {
    return mongoose.disconnect();
  });

//   MORE CALLBACK JELLY
// mongoose
//   .connect("mongodb://localhost:27017/book-factory-of-our-dreams")
//   .then(() => {
//     Book.create({
//       title: "Harry Potter",
//       author: "JKidding Rowling",
//       pages: 99999,
//       releaseDate: new Date(),
//       isAvailable: true,
//       genre: "fantasy",
//     }).then((createdBook) => {
//       Book.find({}).then((allBooks) => {
//         const theHarryPotterBook = allBooks[0];
//         Book.findById(theHarryPotterBook._id).then((singleBook) => {
//           Book.findByIdAndUpdate(
//             singleBook._id,
//             { pages: 300 },
//             { new: true }
//           ).then((updatedBook) => {
//             Book.findByIdAndDelete(updatedBook._id).then(() => {
//               mongoose.connection.dropDatabase().then(() => {
//                 console.log("FINITO");
//               });
//             });
//           });
//         });
//       });
//     });
//   });

// Book.create({
//   title: "Harry Potter",
//   author: "JKidding Rowling",
//   pages: 99999,
//   releaseDate: new Date(),
//   isAvailable: true,
//   genre: "fantasy",
// })
//   .then((createdBook) => {
//     console.log("We created a book 📚:", createdBook);
//   })
//   .catch((err) => {
//     console.error("Oopsie", err);
//   });

// Promises
// then and catch
// then -> is the code that will be executed whenever our async code works wonderfully
// catch -> is the code that will be executed whenever our async code crashes, burns and rips out childrens hearts
