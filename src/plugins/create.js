let path = require('path');
let fs = require('fs');


function filePath(dirPath, name, ext) {
  return path.format({
    dir: dirPath,
    name,
    ext
  });
}

function createJsFile(dataJson, jsFile) {
  let txt = `module.exports = {\n  ${Object.entries(dataJson).map(item => `${item[0]}: ${typeof item[1] === 'number' ? item[1] : `'${item[1]}'`}`).join(',\n  ')}\n};\n`;

  fs.writeFileSync(jsFile, txt);
}


function createLessFile(dataJson, lessFile) {
  let txt = `${Object.entries(dataJson).map(item => `@${item[0]}: ${item[1]}`).join(';\n')};\n`;

  fs.writeFileSync(lessFile, txt);
}


function createFile({ jsonFile, jsPath, lessPath }) {
  let jsonFileInfo = path.parse(jsonFile);
  let fileName = jsonFileInfo.name;

  let dataStr = fs.readFileSync(jsonFile, 'utf8');

  let dataJson = JSON.parse(dataStr);

  createJsFile(dataJson, filePath(jsPath, fileName, '.js'));
  createLessFile(dataJson, filePath(lessPath, fileName, '.less'));
}

module.exports = {
  createFile
};
