import { Request, Response } from "express";
import csvParser from "csv-parser";
import fs from "fs-extra";
import { v4 as uuidv4 } from "uuid";
import path from "path";

const resultsDir = path.join(__dirname, "../../results");
fs.ensureDirSync(resultsDir);

export const uploadCSV = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const salesByCity: Record<string, number> = {}; //used this hash just to store sales for each city since it cost o(1) to access and insert and a city not to be duplicated
  const filePath = req.file.path;

  try {
    await new Promise<void>((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csvParser({ headers: false }))
        .on("data", (row: any) => {
          //city,date,sales
          const city = String(row[0]).trim();
          const sales = parseInt(row[2], 10) || 0;
          //here if the city is already in the hash it just add the sales to it otherwise it creates a new entry
          if (city) {
            salesByCity[city] = (salesByCity[city] || 0) + sales;
          }
        })
        .on("end", () => resolve())
        .on("error", (err) => reject(err));
    });

    const outputId = uuidv4(); //helps with generating a new name for the files since I cant use same name like output.csv in the same folder each time user uplods
    const outputFile = path.join(resultsDir, `${outputId}.csv`);
    const result = fs.createWriteStream(outputFile);

    // Output: city,summed_sales (no header)
    for (const [city, total] of Object.entries(salesByCity)) {
      result.write(`${city},${total}\n`);
    }
    result.end();

    fs.unlink(filePath);//deletes the uploaded file after processing

    res.json({
      downloadUrl: `/download/${outputId}`,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to process file" });
  }
};

export const downloadCSV = (req: Request, res: Response) => {
  const file = path.join(resultsDir, `${req.params.id}.csv`);
  if (fs.existsSync(file)) {
    res.download(file);
  } else {
    res.status(404).json({ error: "File not found" });
  }
};