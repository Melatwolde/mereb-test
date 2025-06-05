import express from "express";
import multer from "multer";
import path from "path";
import { uploadCSV, downloadCSV } from "./controllers/uploaddownloadController";
import cors from "cors";

const app = express();
const PORT = 4000;
const upload = multer({ dest: "uploads/" });

app.use(cors());

app.post("/upload", upload.single("file"), (req, res, next) => {
  uploadCSV(req, res).catch(next);
});
app.get("/download/:id", downloadCSV);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});