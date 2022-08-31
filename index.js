const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const http = require("http");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const socket = require("socket.io");
const server = require("http").createServer(app);
const userRoutes = require("./routes/api/api");

const { get_messages, send_message } = require("./utils/messages");
// const server = require('https').createServer(options, app);
var io = socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: false,
    transports: ["websocket", "polling"],
    allowEIO3: true,
  },
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
dotenv.config();

//Multer file upload
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT;

//MongoDB Connect
mongoose
  .connect(process.env.DB_CONNECT, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    // useCreateIndex: true,
  })
  .then((data) =>
    console.log(`MongoDB connected with server: ${data.connection.host}`)
  )
  .catch((err) => {
    console.log(err);
  });

//Route Middlewares
const apiRoutes = require("./routes/api/api");
const Content = require("./models/Content");
app.use("/api", apiRoutes);

/** Content seeder */
const contentSeeder = [
  {
    title: "Privacy Policy",
    content:
      "Lorem ipsum dolor sit amet.Ea iste consectetur qui harum libero exercitationem harum et quam earum At cupiditate perferendis qui aspernatur vero!",
    type: "privacy_policy",
  },
  {
    title: "Terms and Conditions",
    content:
      "Lorem ipsum dolor sit amet.Ea iste consectetur qui harum libero exercitationem harum et quam earum At cupiditate perferendis qui aspernatur vero!",
    type: "terms_and_conditions",
  },
  {
    title: "Help and Support",
    content:
      "Lorem ipsum dolor sit amet.Ea iste consectetur qui harum libero exercitationem harum et quam earum At cupiditate perferendis qui aspernatur vero!",
    type: "help_and_support",
  },
];
const dbSeed = async () => {
  await Content.deleteMany({});
  await Content.insertMany(contentSeeder);
};
dbSeed().then(() => {
  // mongoose.connection.close();
});

// Run when client connects
io.on("connection", (socket) => {
  console.log("socket connection " + socket.id);
  socket.on("get_messages", function (object) {
    var user_room = "user_" + object.sender_id;
    socket.join(user_room);
    get_messages(object, function (response) {
      if (response.length > 0) {
        console.log("get_messages has been successfully executed...");
        io.to(user_room).emit("response", {
          object_type: "get_messages",
          data: response,
        });
      } else {
        console.log("get_messages has been failed...");
        io.to(user_room).emit("error", {
          object_type: "get_messages",
          message: "There is some problem in get_messages...",
        });
      }
    });
  });
  // SEND MESSAGE EMIT
  socket.on("send_message", function (object) {
    var sender_room = "user_" + object.sender_id;
    var receiver_room = "user_" + object.receiver_id;
    send_message(object, function (response_obj) {
      if (response_obj) {
        console.log("send_message has been successfully executed...");
        io.to(sender_room)
          .to(receiver_room)
          .emit("response", { object_type: "get_message", data: response_obj });
      } else {
        console.log("send_message has been failed...");
        io.to(sender_room).to(receiver_room).emit("error", {
          object_type: "get_message",
          message: "There is some problem in get_message...",
        });
      }
    });
  });
});

app.listen(PORT, () => console.log(`Server Up and Running on Port ${PORT}`));
