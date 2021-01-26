class LifeBar {
    constructor(ctx, canvasSize, playerHealth, playerType) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.playerHealth = playerHealth
        this.playerType = playerType
        this.healthBarPos = { x: 0, y: 20 }
        this.initialWidth = 0
        this.healthBarSize = { w: this.playerHealth, h: 50 }
        this.frameworkWidth = 330
        this.frameworkPosition = {
            x: 0,
            y: 20
        }
        this.imageInstance1 = new Image()
        this.imageInstance1.src = 'img/healthBar1.png'
        this.imageInstance2 = new Image()
        this.imageInstance2.src = 'img/healthBar2.png'
    }

    setHealthBarPos() {
        this.playerType === 'player1' ? this.healthBarPos.x = this.frameworkPosition.x + this.frameworkWidth - this.healthBarSize.w : this.healthBarPos.x = this.frameworkPosition.x


    }

    drawBottomFramework() {
        this.ctx.fillStyle = 'red'
        if (this.playerType === 'player1') {
            this.frameworkPosition.x = 50
        } else {
            this.frameworkPosition.x = this.canvasSize.w / 2 + 50
        }
        this.ctx.fillRect(this.frameworkPosition.x, this.frameworkPosition.y, this.frameworkWidth, 50)
    }

    drawTopFramework() {
        let instance
        this.playerType === 'player1' ? instance = this.imageInstance1 : instance = this.imageInstance2
        this.ctx.drawImage(
            instance,
            this.frameworkPosition.x - 20,
            this.frameworkPosition.y,
            this.frameworkWidth + 35,
            100
        )
    }

    fillHealthBar() {

        if (this.healthBarSize.w > 0) {
            this.ctx.fillStyle = 'green'
            this.ctx.fillRect(this.healthBarPos.x, this.healthBarPos.y, this.healthBarSize.w, this.healthBarSize.h)
        }
    }

    setHealthBarWidth(health) {
        this.healthBarSize.w = health
    }
}