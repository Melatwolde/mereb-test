# mereb-test

This project consists of a **frontend** (React/Next.js) and a **backend** (Node.js/Express) for uploading CSV files, processing them, and downloading the results.


## How to Run the App

### Backend

1. **Install dependencies:**
   ```sh
   cd backend
   npm install
   ```
2. **Start the backend**
   ```sh
   npm run dev
   ```
   The backend will run on http://localhost:4000.
3. **Navigate to the Frontend and install dependancies then start the frontend using npm run dev**
   ```sh
   cd frontend
   npm install
   npm run dev
   ```
   The frontend will run on http://localhost:3000.
**How it works**
1. Open the frontend in your browser: http://localhost:3000
2. Upload a CSV file using the upload box.
3. Wait for the progress bar to reach 100%.
4. Download the processed CSV using the provided download button/icon.
5. Verify the downloaded file contains the expected results (city and summed sales).

**Algorithm Explanation**

It parses the file line by line using a stream (csv-parser), so it does not load the entire file into memory.
For each row, it:
  Extracts the city and sales.
  Sums sales for each city.
  After parsing, it writes the results (city,total_sales) to a new CSV file.
  The processed file is saved with a unique ID and can be downloaded via a link.

**Memory Efficiency Strategy**
*Streaming*: It uses fs.createReadStream and csv-parser to process the CSV file as a stream, which is memory efficient and suitable for large files.

*Hash Map*: Sales are accumulated in a hash map (salesByCity), which only stores unique city names and their totals, minimizing memory usage.

*Temporary Files*: The uploaded file is deleted after processing to save disk space.

Estimated Big O Complexity
*Time Complexity*: O(n), where n is the number of rows in the CSV file. Each row is processed once.

*Space Complexity*: O(m), where m is the number of unique cities (since only city totals are stored in memory, not all rows).


![image](https://github.com/user-attachments/assets/9f4a73b6-8ad6-4a79-af09-39718eb344bc)

