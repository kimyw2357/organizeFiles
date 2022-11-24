const fs = require('fs');
const os = require('os');
const path = require('path');

const folder = process.argv[2];
const workingDir = path.join(os.homedir(), 'Pictures', folder);
if(!folder || !fs.existsSync(workingDir)) {
  console.log('Please enter folder name in Pictures');
  return;
}

const videoDir = path.join(workingDir, 'video');
const capturedDir = path.join(workingDir, 'captured');
const duplicatedDir = path.join(workingDir, 'duplicated');

!fs.existsSync(videoDir) && fs.mkdirSync(videoDir);
!fs.existsSync(capturedDir) && fs.mkdirSync(capturedDir);
!fs.existsSync(duplicatedDir) && fs.mkdirSync(duplicatedDir);

fs.promises
  .readdir(workingDir)
  .then(processFiles)
  .catch(console.log);

  function processFiles(files) {  
    files.forEach(file => {
      if(isVideoFile(file)) {
        console.log('video', file);          
      } else if (isCapturedFile(file)) {
        console.log('captured', file);          
      } else if (isDuplicatedFile(files, file)) {
        console.log('duplicated', file);          
      }
    }); 
  }
function isVideoFile(file) {
  const regExp = /(mp4|mov)$/gm;
  const match = file.match(regExp);
  return !!match  
}
function isCapturedFile(file) {
  const regExp = /(png|aae)$/gm;
  const match = file.match(regExp);
  return !!match  
}
function isDuplicatedFile(files, file) {
  if (!file.startsWith('IMG_') || file.startsWith('IMG_E')) {
    return false;
  }
  const edited = `IMG_E${file.split('_')[1]}`;
  const found = files.find(f => f.includes(edited))
  return !!found;
}