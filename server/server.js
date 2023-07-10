// const express = require("express");
// const mongoose = require("mongoose");
// const app = express();
// const postRoute = require("./routes/posts");
// const bodyParser = require("body-parser");

// app.use(bodyParser.json());

// const uri =
//   "mongodb+srv://nabdulrub16:30QmOcbeFdd3hOnF@cluster0.nmm4knq.mongodb.net/?retryWrites=true&w=majority&ssl=true";

// const options = {
//   bufferCommands: false, // Disable command buffering
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

// mongoose
//   .connect(uri, options)
//   .then(() => {
//     app.listen(3000, () => {
//       console.log("Server started on port 3000");
//     });
//   })
//   .catch((err) => {
//     console.error("Error connecting to MongoDB:", err);
//   });

// app.use("/posts", postRoute);

// app.get("/", (req, res) => {
//   res.send("home");
// });

const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection URL
const url = 'mongodb://localhost:27017';
const dbName = 'yourDatabaseName';

// Route for handling form submission
app.post('/subscribe', (req, res) => {
  const email = req.body.email;

  // Connect to MongoDB
  MongoClient.connect(url, (err, client) => {
    if (err) {
      console.error('Error connecting to MongoDB:', err);
      res.sendStatus(500);
      return;
    }

    // Get the database instance
    const db = client.db(dbName);

    // Insert the email address into the collection
    const collection = db.collection('subscriptions');
    collection.insertOne({ email }, (err, result) => {
      if (err) {
        console.error('Error inserting email:', err);
        res.sendStatus(500);
        return;
      }

      res.sendStatus(200);
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(Server listening on port ${port});
});
