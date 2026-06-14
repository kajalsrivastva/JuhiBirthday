const fs = require('fs');
const path = require('path');

const mediaDir = path.join(__dirname, 'public', 'juhi_media');
const outputFile = path.join(__dirname, 'src', 'mediaList.json');

const files = fs.readdirSync(mediaDir);

const mediaList = files.map((file, index) => {
  const ext = path.extname(file).toLowerCase();
  const isVideo = ['.mp4', '.webm', '.mov'].includes(ext);
  return {
    id: index + 100, // to avoid clashing with the initial 5
    title: `Memory ${index + 1} ✨`,
    src: `/juhi_media/${file}`,
    isVideo: isVideo
  };
}).filter(item => ['.jpg', '.jpeg', '.png', '.mp4', '.webm', '.webp'].includes(path.extname(item.src).toLowerCase()));

// Shuffle array to make it random and fun
for (let i = mediaList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [mediaList[i], mediaList[j]] = [mediaList[j], mediaList[i]];
}

fs.writeFileSync(outputFile, JSON.stringify(mediaList, null, 2));
console.log(`Generated ${mediaList.length} media items!`);
