const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('<h1>The server is working</h1>');
});

app.get('/video', (req, res) => {
  const path = './data/video/sample.mp4';
  const stat = fs.statSync(path);
  const fileSize = stat.size;
  const range = req.headers.range;
  const splittedPath = path.split('.');
  const fileExtension = splittedPath[splittedPath.length - 1];

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize - 1;

    if (start >= fileSize) {
      return res.status(416).json({
        error: `Requested range not satisfiable, ${ start } >= ${ fileSize }`
      });
    }

    const chunkSize = (end - start) + 1;
    const file = fs.createReadStream(path, { start, end });
    const head = {
      'Content-Range': `bytes ${ start }-${ end }/${ fileSize }`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': `video/${fileExtension}`,
    };

    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': `video/${fileExtension}`,
    };
    res.writeHead(200, head);
    fs.createReadStream(path).pipe(res);
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server started on port ${ PORT }`);
});
