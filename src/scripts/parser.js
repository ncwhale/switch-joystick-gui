const Promise = require('bluebird')
const fs = require('fs')
const vm = require('vm')
const path = require('path')
const fs_promise = Promise.promisifyAll(fs)

export async function Parser(filename) {
  // Get the file info and return a Script object.
  let state;
  try {
    state = await fs_promise.statAsync(filename)
  } catch (err) {
    return undefined
  }

  // Process folders.
  if(state.isDirectory()) {
    return {
      name: path.basename(filename),
      type: 'folder',
      desc: '',
      path: filename,
    }
  }

  // Process js files.
  if(/\.js$/i.test(filename)) {
    let script, sandbox = {};
    try {
      let code = fs.readFileSync(filename)
      script = new vm.Script(code, {
        filename,
      })
      script.runInNewContext(sandbox, {
        timeout : 500
      })
    } catch (err) {
      console.warn(err)
      return undefined
    }

    return {
      name: sandbox.name || path.basename(filename, '.js'),
      desc: sandbox.desc || 'A javascript script',
      type: 'javascript',
      script,
    }
  }

  // or return undefined
  return undefined
}

export default Parser