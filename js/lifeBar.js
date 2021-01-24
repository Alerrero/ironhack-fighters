class LifeBar {
    constructor(ctx, canvasSize, playerHealth, playerType) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.playerHealth = playerHealth
        this.playerType = playerType
        this.healthBarPos = { x: 0, y: 200 }
        this.initialWidth = 0
        this.healthBarSize = { w: this.playerHealth, h: 50 }
        this.frameworkWidth = 200
        this.frameworkPosition = {
            x: 220,
            y: 220
        }
    }

    setHealthBarPos() {
        this.playerType === 'player1' ? this.healthBarPos.x = this.frameworkPosition.x + this.frameworkWidth - this.healthBarSize.w : this.frameworkPosition.x
    }

    drawFramework() {
        this.ctx.draw()
    }

    fillHealthBar() {
        // this.playerType === 'player1' ? this.ctx.fillRect(this.healthBarPos.x, this.healthBarPos.y, this.healthBarSize.w, this.healthBarSize.h) : this.ctx.fillRect(this.healthBarPos.x + this.initialWidth - this.healthBarSize.w, this.healthBarPos.y, this.healthBarSize.w, this.healthBarSize.h)
        this.ctx.fillStyle = 'green'
            //this.ctx.fillRect(this.posX, this.posY, this.healthBarSize.w, this.healthBarSize.h)
        this.ctx.fillRect(0, 0, 300, 200)
    }

    setHealthBarWidth() {
        this.healthBarSize.w = this.playerHealth
    }
}