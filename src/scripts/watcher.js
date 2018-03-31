const fs = require('fs')
const { EventEmitter } = require('events')

export class Watcher extends EventEmitter {
  constructor(watch_dir = '.') {
    super()
    this.watch_dir = watch_dir
  }

  start(change_name) {
    if (change_name && this.watch_dir != change_name) {
      // Close last watch
      this.stop()
      this.watch_dir = change_name
    }

    let state = fs.statSync(this.watch_dir)
    if (state.isDirectory()) {
      // Yes, let's do it.
      this.watcher = fs.watch(this.watch_dir, {
        encoding: 'utf8',
        persistent: false,
        recursive: false,
      }, (event, filename) => {
        console.log(`Watch event ${event}@${filename}`)
        this.emit(event, filename)
      })

      return fs.readdirSync(this.watch_dir)
    } else {
      throw new Error('Not a folder')
    }
  }

  stop() {
    if (this.watcher) { this.watcher.close() }
    delete this.watcher
  }
}

export default Watcher