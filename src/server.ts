// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import routes from "./routes";
// import swagger from "./utils/swagger";

// const app = express();
// app.use(express.json());
// app.use(cors());
// dotenv.config();

// app.use("/api", routes);
// swagger(app);

// // SWAGGER API ENDPOINT FOR API DOCUMENTATION
// app.get("/", (req, res) => {
//     return res.redirect("/docs");
// });

// const port = process.env.PORT;

// app.listen(port, () => {
//     console.log(`SERVER IS RUNNING ON PORT ${port}`);
// });

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes";
import swagger from "./utils/swagger";

import http from "http";
import { Server } from "socket.io";
import { SerialPort, ReadlineParser } from "serialport";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use("/api", routes);
swagger(app);

app.get("/", (req, res) => {
    return res.redirect("/docs");
});

const port = process.env.PORT || 8080;

// SET UPT SerialPort (ADJUST "COM3" BASED ON YOU ARDUINO PORT)
const serialPort = new SerialPort({ path: "COM3", baudRate: 9600 });
const parser = serialPort.pipe(new ReadlineParser({ delimiter: "\n" }));

// READ RFID UID AND SEND TO REACT VIA WEBSOCKETS
parser.on("data", (data: any) => {
    const cleanedData = data.trim().replace(/^UID:\s*/, ""); // Remove "UID: "
    console.log("Scanned RFID UID:", cleanedData);
    io.emit("rfidData", cleanedData); // Send cleaned UID to frontend
});

// START THE SERVER CORRECTLY
server.listen(port, () => {
    console.log(`SERVER IS RUNNING ON PORT ${port}`);
});