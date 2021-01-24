class LifeBar {
    constructor(ctx, canvasSize, playerHealth, playerType) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.playerHealth = playerHealth
        this.playerType = playerType
        this.healthBarPos = { x: 0, y: 0 }
        this.initialWidth = 0
        this.healthBarSize = { w: 0, h: 0 }
        this.frameworkWidth = 200
        this.frameworkPosition = {
            x = 0,
            y = 0
        }
    }

    setHealthBarInitialPos() {
        this.playerType === 'player1' ? this.healthBarPos.x = this.frameworkPosition + this.frameworkWidth - this.healthBarSize.w : this.frameworkPosition
    }

    drawFramework() {
        this.ctx.draw()
    }

    fillHealthBar() {
        this.playerType === 'player1' ? this.ctx.fillRect(this.healthBarPos.x, this.healthBarPos.y, this.healthBarSize.w, this.healthBarSize.h) : this.ctx.fillRect(this.healthBarPos.x + this.initialWidth - this.healthBarSize.w, this.healthBarPos.y, this.healthBarSize.w, this.healthBarSize.h)
    }

    setHealthBarWidth() {
        this.healthBarSize.w = this.playerHealth
    }
}