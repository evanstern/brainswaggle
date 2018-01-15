import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset, letter }) {
    const frame = getFrame(letter)

    super(game, x, y, asset, frame)

    this.height = 64
    this.width = 64
  }

  update () {
  }
}

const getFrame = (letter) => {
  switch (letter.toUpperCase()) {
    case 'A':
      return 15
    case 'B':
      return 11
    case 'C':
      return 7
    case 'D':
      return 3
    case 'E':
      return 26
    case 'F':
      return 22
    case 'G':
      return 18
    case 'H':
      return 14
    case 'I':
      return 10
    case 'J':
      return 6
    case 'K':
      return 2
    case 'L':
      return 23
    case 'M':
      return 21
    case 'N':
      return 17
    case 'O':
      return 13
    case 'P':
      return 9
    case 'Q':
      return 5
    case 'R':
      return 1
    case 'S':
      return 24
    case 'T':
      return 20
    case 'U':
      return 16
    case 'V':
      return 12
    case 'W':
      return 8
    case 'X':
      return 4
    case 'Y':
      return 0
    case 'Z':
      return 25
    default:
      return null
  }
}
