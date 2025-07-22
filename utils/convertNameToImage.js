const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');



 function getInitialName(name) {
  let initials;
  const nameSplit = name.split(" ");
  const nameLength = nameSplit.length;
  if (nameLength > 1) {
      initials =
          nameSplit[0].substring(0, 1) +
          nameSplit[nameLength - 1].substring(0, 1);
  } else if (nameLength === 1) {
      initials = nameSplit[0].substring(0, 1);
  } else return;
  return initials.toUpperCase();
};
 function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
const generateImageFromName = (name) => {

  const size = 500;
  // const height = 500;
  const initials = getInitialName(name)
  const outputDir = 'public/Images';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  const bgColor = getRandomColor();

  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = "#ffffff"
  ctx.fillRect(0, 0, size, size)
  ctx.fillStyle = `${bgColor}50`
  ctx.fillRect(0, 0, size, size)
  ctx.fillStyle = bgColor;
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'
  ctx.font = `${size / 2}px Roboto`
  ctx.fillText(initials, (size / 2), (size / 2))


  const outputPath = path.join(outputDir, `${Date.now()}_${name}.png`);
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);
  const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
  return `${baseUrl}/${outputPath}`;
};

const getBaseUrl = (req, imagePath) => {
  const protocol = req.protocol;
  const host = req.get('host');
  const baseUrl = `${protocol}://${host}/`;
  return `${baseUrl}${imagePath}`;
};

module.exports = {
  getBaseUrl,
  generateImageFromName
};
