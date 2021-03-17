class Player {
    constructor(ctx, canvasSize, playerType, character) {
        this.ctx = ctx;
        this.canvasSize = canvasSize;

        this.playerType = playerType;
        this.playerSize = { w: 200, h: 296 };
        this.playerPos = {
            x: this.playerType === "player1" ? 80 : 500,
            y: 188
        };
        this.health = 300;
        this.status = "rest";

        this.playerValidAttack = false;

        this.framesObject = [
            { status: "move", frames: 6 },
            { status: "punch", frames: 5 },
            { status: "kick", frames: 6 },
            { status: "rest", frames: 4 },
            { status: "jump", frames: 6 }
        ];

        this.imageInstance = new Image();

        this.characters = [];
        this.character = character;

        this.audioKick = document.querySelector("#audio-kick");
        this.audioKick.volume = 0.6;
        this.audioPunch = document.querySelector("#audio-punch");
        this.audioPunch.volume = 0.6;

        this.preloadedImages = this.generateImages();
    }

    // Draw player

    //#region aux functions

    generateImages() {
        return this.framesObject.map(({ status, frames }) => {
            const image = new Image();
            image.framesIndex = 0;
            image.src = this.createInstanceSrc(
                this.playerType,
                this.character,
                status
            );
            image.frames = frames;

            return {
                status,
                image
            };
        });
    }

    transformStatusToCamelCase(status) {
        return status.charAt(0).toUpperCase() + status.slice(1);
    }

    createInstanceSrc(playerType, character, status) {
        return `animation/${playerType}${character}${this.transformStatusToCamelCase(
      status
    )}.png`;
    }

    //#endregion aux functions

    drawPlayer(frames) {
        this.imageInstance = this.preloadedImages.find(
            (elm) => elm.status === this.status
        ).image;

        this.ctx.drawImage(
            this.imageInstance,
            this.imageInstance.framesIndex *
            Math.floor(this.imageInstance.width / this.imageInstance.frames),
            0,
            Math.floor(this.imageInstance.width / this.imageInstance.frames),
            this.imageInstance.height,
            this.playerPos.x,
            this.playerPos.y,
            this.playerSize.w,
            this.playerSize.h
        );

        this.animate(frames);
    }

    animate(frames) {
        if (frames % 5 == 0) {
            this.imageInstance.framesIndex++;
        }
        if (this.imageInstance.framesIndex > this.imageInstance.frames - 1) {
            this.imageInstance.framesIndex = 0;
        }
    }

    // Move player

    hasPlayerReachBorder(direction) {
        return direction === "right" ?
            this.playerPos.x + 10 + this.playerSize.w > this.canvasSize.w :
            this.playerPos.x - 5 <= 0;
    }

    movePlayer(direction) {
        if (!this.hasPlayerReachBorder(direction)) {
            direction === "right" ?
                (this.playerPos.x += 10) :
                (this.playerPos.x -= 10);
        }
    }

    pushPlayer(direction) {
        if (!this.hasPlayerReachBorder(direction)) {
            direction === "right" ?
                (this.playerPos.x += 30) :
                (this.playerPos.x -= 30);
        }
    }

    // Attacks

    receiveDamage(attackType, validJump) {
        if (this.status != "jump" || validJump) {
            attackType === "kick" ? (this.health -= 25) : (this.health -= 15);
        }
    }

    playerAttack(playerObj, validAttack, validJump) {
        if (!this.playerValidAttack &&
            !validAttack &&
            (this.status === "punch" || this.status === "kick")
        ) {
            console.log(this.playerType, " attacks ", playerObj);

            playerObj.receiveDamage(this.status, validJump);
            this.playerValidAttack = true;

            this.status === "punch" ? this.audioPunch.play() : this.audioKick.play();

            this.playerType === "player1" ?
                playerObj.pushPlayer("right") :
                playerObj.pushPlayer("left");
            setTimeout(() => (this.playerValidAttack = false), 1000);
        }
    }

    //Getters

    getPlayerType() {
        return this.playerType;
    }

    getPosition() {
        return this.playerPos;
    }

    getPlayerHealth() {
        return this.health;
    }

    getStatus() {
        return this.status;
    }

    getPlayerSize() {
        return this.playerSize;
    }

    getRealBorder() {
        return this.playerType === "player1" ?
            this.playerSize.w + this.playerPos.x - 52 :
            this.playerPos.x + 52;
    }

    //Setters

    setPlayerInitialPos() {
        this.playerType === "player1" ?
            (this.playerPos.x = 10) :
            (this.playerPos.x = this.canvasSize.w - 100 - this.playerSize.w);
    }

    setPlayerType(value) {
        this.playerType = value;
    }

    setStatus(newStatus) {
        this.status = newStatus;
    }
}