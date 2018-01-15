/* globals __DEV__ */
import Phaser from 'phaser'
import each from 'lodash/each'
import includes from 'lodash/includes'
import Letter from '../sprites/Letter'
// import Mushroom from '../sprites/Mushroom'

const VALID_KEYS = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
  'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'BACKSPACE'
]

const MAX_LETTERS = 8

class Player {
  constructor ({ name }) {
    this.name = name
  }
}

class PlayersStore {
  constructor () {
    this.player1 = new Player({ name: 'Player 1' }),
    this.player2 = new Player({ name: 'Player 2' }),
    this.currentPlayer = this.player1
  }

  isCurrent (player) {
    return this.currentPlayer === player
  }

  next () {
    if (this.isCurrent(this.player1)) {
      this.currentPlayer = this.player2
    } else {
      this.currentPlayer = this.player1
    }
  }
}

class LetterStore {
  constructor ({ game, world }) {
    this.game = game
    this.world = world
    this.data = []
  }

  push (letter) {
    const idx = this.length()
    if (idx < MAX_LETTERS) {
      const spriteData = {
        letter: letter,
        sprite: new Letter({
          game: this.game,
          x: 100 + (idx * 64) + (10 * idx),
          y: this.world.centerY - 32,
          asset: 'letters',
          letter,
        })
      }
      this.data.push(spriteData)
      return spriteData
    }
    return undefined
  }

  pop () {
    if (this.length()) {
      const spriteData = this.data.pop()
      return spriteData
    }
    return undefined
  }

  length () {
    return this.data.length
  }
}

const isBackspace = (keyCode) => {
  return keyCode.toUpperCase() === 'BACKSPACE'
}

const isValidKey = (keyCode) => {
  return includes(VALID_KEYS, keyCode)
}

export default class extends Phaser.State {
  init () {
    this.keyPressed = null
    this.letterStore = new LetterStore({
      game: this.game,
      world: this.world
    })
    this.playersStore = new PlayersStore()
  }

  preload () {}

  create () {
    const bannerText = 'Brainswaggle'

    let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText, {
      font: '40px Bangers',
      fill: '#77BFA3',
      smoothed: false
    })

    banner.padding.set(10, 16)
    banner.anchor.setTo(0.5)

    this.playerText = this.add.text(10, 10, this.playersStore.currentPlayer.name, {
      font: '40px Bangers',
      fill: '#77BFA3',
      smoothed: false
    })

    this.game.input.keyboard.addCallbacks(
      this,
      this.onKeyDown
    )
  }

  doClick (sprite) {
    console.log('clicked', sprite)
  }

  onKeyDown (keyObj) {
    if (isValidKey.call(this, keyObj.key.toUpperCase())) {
      this.keyPressed = keyObj
    }
  }

  update () {
    if (this.keyPressed && isBackspace.call(this, this.keyPressed.key)) {
      const spriteData = this.letterStore.pop()
      spriteData && spriteData.sprite.destroy()
      this.playersStore.next()
      this.playerText.setText(this.playersStore.currentPlayer.name)
      this.keyPressed = null
    } else if (this.keyPressed) {
      const letter = this.keyPressed.key.toUpperCase()
      const spriteData = this.letterStore.push(letter)
      spriteData && this.game.add.existing(spriteData.sprite)
      this.playersStore.next()
      this.playerText.setText(this.playersStore.currentPlayer.name)
      this.keyPressed = null
    }
  }

  render () {
    if (__DEV__) {
      // this.game.debug.spriteInfo(this.letter, 32, 32)
      // this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }
}
