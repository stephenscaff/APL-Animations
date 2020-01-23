const path = require('path')
const fs = require('fs')

/**
 * Save the resultant concatenated json file.
 * @param {String} filepath - The filepath to save the resultant json file.
 * @param {String} content - The json content to save to file.
 */
function saveFile(filePath, content) {
  fs.writeFile(filePath, content, 'utf8', function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.")
      return console.log(err)
    }
    console.log("JSON file has been saved.")
  })
}

/**
 * Get list of files in a specified directory
 * Should also supported nested directories
 * @param {String} dir - Parent directory
 * @param {Array} fileList
 */
var fileList = function (dir, filelist) {
  var files = fs.readdirSync(dir)
  filelist = filelist || []

  files.forEach(function (file) {
    if (fs.statSync(dir + file).isDirectory()) {
        filelist = fileList(dir + file + '/', filelist)
    }
    else {
      filelist.push(dir + file)
    }
  })
  return filelist;
}


// Project directory
module.exports = path.dirname(path.dirname(__filename))

// layout.command for APL package
let layout = {
  commands: {}
}

// Array of src files
let srcDir = `${module.exports}/src/`
let files = fileList(srcDir);

// Loop over files to construct
// layouts.commands with animation commands
files.forEach(file => {
  let json = fs.readFileSync(file).toString()
  let fileName = path.basename(file).replace('.json', '')

  layout.commands[fileName] = JSON.parse(json)
})

// APL Json doc.
let aplDoc = `${module.exports}/dist/apl-animations.json`

// APL Json content (all our animations)
let aplContent = JSON.stringify(layout, null, 4)

// Save Merged APL JSON Doc
saveFile(aplDoc, aplContent)
