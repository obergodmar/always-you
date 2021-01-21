export class Byte {
  constructor(value) {
    this.value = 0
    if (!isNaN(Number(value))) {
      this.value = value
    }
  }

  toMb() {
    return (this.value / Math.pow(2, 20)).toFixed(2)
  }
}
