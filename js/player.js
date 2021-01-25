class Player {
    constructor(ctx, canvasSize, playerType, imageName) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.playerType = playerType
        this.imageName = imageName
        this.playerSize = { w: 90, h: 150 }
        this.playerPos = { x: 80, y: 350 }
        this.health = 410
        this.status = 'rest'
        this.imageInstance = new Image()
        this.imageInstance.src = `img/${this.imageName}.jpg`
        this.playerValidAttack = false

    }

    movePlayer(direction) {
        if (!this.hasPlayerReachBorder(direction)) {
            direction === 'right' ? this.playerPos.x += 5 : this.playerPos.x -= 5
        }
    }

    drawPlayer() {
        this.ctx.drawImage(this.imageInstance, this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)
    }

    receiveDamage(attackType) {
        attackType === 'kick' ? this.health -= 10 : this.health -= 5
    }

    hasPlayerReachBorder(direction) {
        if (direction === 'right') {
            return (this.playerPos.x + 10 + this.playerSize.w > this.canvasSize.w)
        } else { return this.playerPos.x - 5 <= 0 }
    }

    playerAttack(playerObj, validAttack) {
        if (!this.playerValidAttack) {
            if (this.getStatus() != 'rest' && !validAttack) {
                playerObj.receiveDamage(this.getStatus())
                this.playerValidAttack = true
                if (this.playerType === 'player1') {
                    for (let i = 0; i < 3; i++) {
                        playerObj.movePlayer('right')
                    }
                } else {
                    for (let i = 0; i < 3; i++) {
                        playerObj.movePlayer('left')
                    }
                }
                setTimeout(() => this.playerValidAttack = false, 1000)
            }
        }
    }

    getPlayerType() {
        return this.playerType
    }

    setPlayerType(value) {
        this.playerType = value
    }

    getPosition() {
        return this.playerPos
    }

    getPlayerHealth() {
        return this.health
    }

    getStatus() {
        return this.status
    }

    setStatus(newStatus) {
        this.status = newStatus
    }

    getPlayerSize() {
        return this.playerSize
    }

    setPlayerInitialPos() {
        // this.playerType === 'player1' ? this.playerPos.x = 10 : this.playerPos.x = this.canvasSize.w - 10 - this.playerSize.w
        this.playerType === 'player1' ? this.playerPos.x = 10 : this.playerPos.x = this.canvasSize.w - 100 - this.playerSize.w
    }
}