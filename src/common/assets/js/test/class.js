function Point(x, y) {
  this.x = x
  this.y = y
}
Point.prototype.say = function() {
  // this 指向对象本身
  return `x is ${this.x}, y is ${this.y}`
}
