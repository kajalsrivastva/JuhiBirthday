const ytdl = require('ytdl-core');
const fs = require('fs');

const url = 'https://www.youtube.com/watch?v=tq_K10b5gQk';
const output = 'public/romantic-music.mp4';

console.log('Starting download...');
ytdl(url, { filter: 'audioonly' })
  .pipe(fs.createWriteStream(output))
  .on('finish', () => console.log('Downloaded successfully!'))
  .on('error', (err) => console.error('Error:', err));
