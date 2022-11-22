const path = require('path');

const folder = process.argv[2];
if(!folder) {
  console.log('Please enter folder name in Pictures');
}

const workingDir = path.join(os.homedir(), 'Pictures', folder);
console.log(workingDir);