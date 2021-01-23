export class Timer {
  constructor(callback, delay) {
    this.id = null
    this.remaining = delay
    this.callback = callback
  }

  start() {
    this.started = new Date()
    this.id = setTimeout(this.callback, this.remaining)
  }

  pause() {
    this.clear()
    this.remaining -= new Date() - this.started
  }

  clear() {
    clearTimeout(this.id)
  }
}
