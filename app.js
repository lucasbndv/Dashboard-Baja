// server
let express = require("express");
let app = require("express")();
let http = require("http").createServer(app);
let io = require("socket.io")(http);
const path = require("path");

// Serial
const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");

const s = new SerialPort("COM5", { baudRate: 9600 });
let parser = s.pipe(new Readline({ delimiter: "\n" }));
parser.on("data", async (data) => {
  try {
    let newData = data.trim().replace(/, */g, ",").split(","); //  lendo porta serial
    console.log(newData);

    // Data checking

    let data_obj = {
      vel: newData[0],
      rpm: newData[1],
      comb: newData[2],
      temp_cvt: newData[3],
      lat: newData[4],
      lon: newData[5],
    };

    io.emit("data", data_obj);
  } catch {
    console.log("Error on getting serial data");
  }
});

app.use("/", express.static(path.join(__dirname, "public")));

http.listen(3000, () => {
  console.log("Listening on port 3000...");
});

io.on("connection", (socket) => {
  console.log("Novo usuário conectado: ", socket.id);
});
