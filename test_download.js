import ytdl from '@distube/ytdl-core';
import fs from 'fs';

const url = 'https://youtu.be/J_d_Q3pTYcc';
ytdl(url, { filter: 'audioonly' })
  .pipe(fs.createWriteStream('test_audio.webm'))
  .on('finish', () => console.log('Downloaded!'))
  .on('error', (err) => console.error('Error:', err));
