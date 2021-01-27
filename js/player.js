class Player {
    constructor(ctx, canvasSize, playerType, imageName) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.playerType = playerType
        this.imageName = imageName
        this.playerSize = { w: 200, h: 134 }
        this.playerPos = {
            x: this.playerType === 'player1' ? 80 : 500,
            y: 350
        }
        this.health = 300
        this.status = 'rest'
        this.playerValidAttack = false

        this.imageInstanceRun = new Image()
        this.imageInstanceRun.src = `animation/${this.imageName}Run.png`
        this.imageInstanceRun.frames = 6
        this.imageInstanceRun.framesIndex = 0

        this.imageInstancePunch = new Image()
        this.imageInstancePunch.src = `animation/${this.imageName}Punch.png`
        this.imageInstancePunch.frames = 5
        this.imageInstancePunch.framesIndex = 0

        this.imageInstanceKick = new Image()
        this.imageInstanceKick.src = `animation/${this.imageName}Kick.png`
        this.imageInstanceKick.frames = 6
        this.imageInstanceKick.framesIndex = 0

        this.imageInstanceRest = new Image()
        this.imageInstanceRest.src = `animation/${this.imageName}Rest.png`
        this.imageInstanceRest.frames = 4
        this.imageInstanceRest.framesIndex = 0

        this.audioKick = document.querySelector("#audio-kick")
        this.audioKick.volume = 0.7
        this.audioPunch= document.querySelector("#audio-punch")
        this.audioPunch.volume = 0.7


    }

    movePlayer(direction) {
        if (!this.hasPlayerReachBorder(direction)) {
            direction === 'right' ? this.playerPos.x += 5 : this.playerPos.x -= 5
        }
    }

    drawPlayer(frames) {
        let instance

        switch (this.status) {
            case 'rest':
                instance = this.imageInstanceRest
                break;

            case 'move':
                instance = this.imageInstanceRun
                break;

            case 'punch':
                console.log(this.status)
                instance = this.imageInstancePunch
                break;

            default:
                instance = this.imageInstanceKick
                break;
        }
        this.ctx.drawImage(
            instance,
            instance.framesIndex * Math.floor(instance.width / instance.frames),
            0,
            Math.floor(instance.width / instance.frames),
            instance.height,
            this.playerPos.x,
            this.playerPos.y,
            this.playerSize.w,
            this.playerSize.h
        )
        this.animate(frames, instance)

    }

    animate(frames, instance) {
        if (frames % 5 == 0) {
            instance.framesIndex++;
        }
        if (instance.framesIndex > instance.frames - 1) {
            instance.framesIndex = 0
        }
    }

    receiveDamage(attackType) {
        attackType === 'kick' ? this.health -= 25 : this.health -= 15
    }

    hasPlayerReachBorder(direction) {
        if (direction === 'right') {
            return (this.playerPos.x + 10 + this.playerSize.w > this.canvasSize.w)
        } else { return this.playerPos.x - 5 <= 0 }
    }

    playerAttack(playerObj, validAttack) {
        if (!this.playerValidAttack) {
            if (this.getStatus() != 'rest' && this.getStatus() != 'move' && !validAttack) {
                playerObj.receiveDamage(this.getStatus())
                if(this.status === 'punch'){this.audioPunch.play()}
                else {this.audioKick.play()}
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

    getRealBorder() {

        return this.playerType === 'player1' ? this.playerSize.w + this.playerPos.x - 52 : this.playerPos.x + 52
    }

    setPlayerInitialPos() {
        // this.playerType === 'player1' ? this.playerPos.x = 10 : this.playerPos.x = this.canvasSize.w - 10 - this.playerSize.w
        this.playerType === 'player1' ? this.playerPos.x = 10 : this.playerPos.x = this.canvasSize.w - 100 - this.playerSize.w
    }
}