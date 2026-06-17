const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public', 'songs');
const batch2Dir = path.join(publicDir, 'batch2');
const batch3Dir = path.join(publicDir, 'batch3');
const ytMusicDir = path.join(publicDir, 'yt_music');

let playlist = [];

if (fs.existsSync(publicDir)) {
  const files = fs.readdirSync(publicDir);
  files.forEach(f => {
    if (f.endsWith('.webm') || f.endsWith('.mp3') || f.endsWith('.m4a')) {
      playlist.push('/songs/' + f);
    }
  });
}

if (fs.existsSync(batch2Dir)) {
  const files = fs.readdirSync(batch2Dir);
  files.forEach(f => {
    if (f.endsWith('.webm') || f.endsWith('.mp3') || f.endsWith('.m4a')) {
      playlist.push('/songs/batch2/' + f);
    }
  });
}

if (fs.existsSync(batch3Dir)) {
  const files = fs.readdirSync(batch3Dir);
  files.forEach(f => {
    if (f.endsWith('.webm') || f.endsWith('.mp3') || f.endsWith('.m4a')) {
      playlist.push('/songs/batch3/' + f);
    }
  });
}

if (fs.existsSync(ytMusicDir)) {
  const files = fs.readdirSync(ytMusicDir);
  // Sort files by number to keep order
  files.sort((a, b) => {
    const numA = parseInt(a.match(/\d+/)?.[0] || '0');
    const numB = parseInt(b.match(/\d+/)?.[0] || '0');
    return numA - numB;
  });
  files.forEach(f => {
    if (f.endsWith('.webm') || f.endsWith('.mp3') || f.endsWith('.m4a')) {
      playlist.push('/songs/yt_music/' + f);
    }
  });
}

fs.writeFileSync(path.join(__dirname, 'src', 'playlist.json'), JSON.stringify(playlist, null, 2));
console.log('Playlist generated with ' + playlist.length + ' songs');
