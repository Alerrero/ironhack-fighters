const ironhackFighters = {
    name: 'Ironhack Fighters',
    author: 'Alex*2 y Barbara',
    version: '0.0.1',
    license: undefined,
    canvasDOM: undefined,
    /** @type {CanvasRenderingContext2D} */
    ctx: undefined,
    canvasSize: { w: 0, h: 0 },
    lifeBars: [],
    players: [],
    keys: {
        moveLeft: 'ArrowLeft',
        moveRight: 'ArrowRight',
        punch: 'a',
        kick: 'd'
    },
    intervalId: undefined,

    init(canvasID) {
        this.canvasDom = document.getElementById(`${canvasID}`)
        this.ctx = this.canvasDom.getContext('2d')
    },

    render() {

    },

    // setDimensions() {
    //     this.canvasSize = {
    //         w: window.innerWidth,
    //         h: window.innerHeight,
    //     }
    //     this.canvasDom.width = this.canvasSize.w
    //     this.canvasDom.height = this.canvasSize.h
    // },

    setEventListener() {

    },

    drawBackground() {

    },

    createPlayer() {

    },

    createLifeBar() {

    },

    detectCollision() {

    },

    dictateEndGame() {

    },

    restart() {

    },
}