const Movement = {
	NONE: 0,
	LEFT: 1,
	RIGHT: 2,
	UP: 4,
	DOWN: 8
};


function Vaus(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
};


function Bullet(x, y, radius, dir) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.dir = Movement.NONE;
	this.speed = 3;
}


function Brick(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.status=1;
};


function Bricks(cant_horizontal, cant_vertical, brick_width, brick_height) {
	this.bricks = new Array();
	for (let c = 0; c < cant_vertical; c++) {
		this.bricks[c] = new Array();
		for (let r = 0; r < cant_horizontal; r++) {
			this.bricks[c][r] = new Brick(r * brick_width, c * brick_height, brick_width, brick_height);
		}
	}
}


function Arkanoid(canvas) {
	const VAUS_WIDTH = 60;
	const VAUS_HEIGHT = 10;
	const BULLET_SIZE = 3;
	const BULLET_MAX_SPEED = 20;
	const BRICK_WIDTH=59;
	const BRICK_HEIGHT=20;
	const BRICK_COLUMN=11;
	const BRICK_ROWS=8;
	const BRICK_ROOF_SPACE=60;
	const BRICK_SPACE_BETWEEN=5;
	let LIVES = 3;
	let SCORE = 0;

	this.init = function () {
		if (!canvas.getContext) {
			console.warn('Tu navegador no soporta canvas');
			return;
		}

		this.context = canvas.getContext('2d');
		this.pause = false;
		this.gameOver = false;

		this.createElements();

		setInterval(() => {
			//this.collision();
			this.update();
			this.updateScore();
			this.fullDraw();
		}, 20);
	}

	this.createElements = function () {
		this.vaus = new Vaus(canvas.width / 2 - VAUS_WIDTH / 2, canvas.height - 20, VAUS_WIDTH, VAUS_HEIGHT);
		this.bullet = new Bullet(canvas.width / 2, canvas.height / 2, BULLET_SIZE, Movement.NONE);
		this.bricks = new Bricks(BRICK_COLUMN, BRICK_ROWS, BRICK_WIDTH, BRICK_HEIGHT);

	}

	this.drawBullet = function () {
		this.context.beginPath();
		this.context.arc(this.bullet.x, this.bullet.y, this.bullet.radius, 0, 2 * Math.PI, false);
		this.context.fillStyle = 'yellow';
		this.context.fill();
	}

	this.drawVaus = function () {
		this.context.fillStyle = 'rgb(35, 144, 247)';
		this.context.fillRect(this.vaus.x, this.vaus.y, this.vaus.width, this.vaus.height);
	}

	this.drawBricks= function () {
		for (let c = 0; c < this.bricks.bricks.length; c++) {
			for (let r = 0; r < this.bricks.bricks[c].length; r++) {
					this.context.fillRect(this.bricks.bricks[c][r].x, this.bricks.bricks[c][r].y +BRICK_ROOF_SPACE, this.bricks.bricks[c][r].width -BRICK_SPACE_BETWEEN, this.bricks.bricks[c][r].height-BRICK_SPACE_BETWEEN);
			}
		}
	}

	this.fullDraw = function () {
		this.context.clearRect(0, 0, canvas.width, canvas.height);

		canvas.style.cursor = "none";
		this.context.fillStyle = 'rgb(0,10,0)';
		this.context.fillRect(0, 0, canvas.width, canvas.height);

		this.drawBullet();

		this.drawVaus();

		this.drawBricks();

		this.writeText('Lives: ' + parseInt(LIVES), 10, 20);

		this.writeText('Score: ' + parseInt(SCORE), 10, 40);

		if (this.gameOver)
			this.writeText('Game Over', canvas.width / 2 - 40, canvas.height / 2);
	}

	this.update = function () {
		if (this.pause || this.gameOver)
			return;

		if (this.bullet.dir & Movement.RIGHT)
			this.bullet.x += this.bullet.speed;
		else if (this.bullet.dir & Movement.LEFT)
			this.bullet.x -= this.bullet.speed;

		if (this.bullet.dir & Movement.UP)
			this.bullet.y -= this.bullet.speed;
		else if (this.bullet.dir & Movement.DOWN)
			this.bullet.y += this.bullet.speed;

		if ((this.bullet.x + this.bullet.radius > this.vaus.x && this.bullet.x - this.bullet.radius < this.vaus.x + this.vaus.width) &&
			(this.bullet.y + this.bullet.radius > this.vaus.y)) {
			if (this.bullet.speed < BULLET_MAX_SPEED)
				this.bullet.speed += 0.5;
			if (this.bullet.dir & Movement.DOWN) {
				this.bullet.dir = this.bullet.dir - Movement.DOWN + Movement.UP;
			} else if (this.bullet.dir & Movement.UP) {
				this.bullet.dir = this.bullet.dir - Movement.UP + Movement.DOWN;
			}
		}

		if (this.bullet.x - this.bullet.radius < 0) {
			this.bullet.x = this.bullet.radius;
			this.bullet.dir = this.bullet.dir - Movement.LEFT + Movement.RIGHT;
		}
		if (this.bullet.x + this.bullet.radius > canvas.width) {
			this.bullet.x = canvas.width - this.bullet.radius;
			this.bullet.dir = this.bullet.dir - Movement.RIGHT + Movement.LEFT;
		}
		if (this.bullet.y - this.bullet.radius < 0) {
			this.bullet.y = this.bullet.radius;
			this.bullet.dir = this.bullet.dir - Movement.UP + Movement.DOWN;
		}

		if (this.bullet.y + this.bullet.radius > canvas.height) {
			this.bullet.speed = 3;
			LIVES -= 1;
			if (LIVES > 0) {
				this.restartGame();
			} else if (LIVES <= 0) {
				this.bullet.dir = Movement.NONE;
				this.gameOver = true;
			}
		}

		if (this.bullet.dir == Movement.NONE) {
			this.bullet.x = this.vaus.x + this.vaus.width / 2;
			this.bullet.y = this.vaus.y - this.bullet.radius * 2;
		}


for (let c = 0; c < this.bricks.bricks.length; c++) {
			for (let r = 0; r < this.bricks.bricks[c].length; r++) {
				if (this.bricks.bricks[c][r] !=null) {
					if (this.bullet.dir == Movement.LEFT + Movement.UP) {
						if (this.brickCollision(this.bullet.x - this.bullet.speed, this.bullet.y , this.bricks.bricks[c][r].x, this.bricks.bricks[c][r].y, this.bricks.bricks[c][r].width, this.bricks.bricks[c][r].height)) {
							this.context.clearRect(this.bricks.bricks[c][r].x, this.bricks.bricks[c][r].y + BRICK_ROOF_SPACE, this.bricks.bricks[c][r].width - BRICK_SPACE_BETWEEN, this.bricks.bricks[c][r].height - BRICK_SPACE_BETWEEN);
							this.bricks.bricks[c].splice(r,1);
							this.bullet.dir=this.bullet.dir -Movement.RIGHT + Movement.LEFT;
							return;
						}
						if (this.brickCollision(this.bullet.x, this.bullet.y - this.bullet.speed, this.bricks.bricks[c][r].x, this.bricks.bricks[c][r].y , this.bricks.bricks[c][r].width, this.bricks.bricks[c][r].height)) {
							this.context.clearRect(this.bricks.bricks[c][r].x, this.bricks.bricks[c][r].y + BRICK_ROOF_SPACE, this.bricks.bricks[c][r].width - BRICK_SPACE_BETWEEN, this.bricks.bricks[c][r].height - BRICK_SPACE_BETWEEN);
							this.bricks.bricks[c].splice(r,1);
							this.bullet.dir=this.bullet.dir -Movement.UP + Movement.DOWN;
							return;
						}
					} else if (this.bullet.dir == Movement.LEFT + Movement.DOWN) {
						if (this.brickCollision(this.bullet.x - this.bullet.speed, this.bullet.y, this.bricks.bricks[c][r].x, this.bricks.bricks[c][r].y , this.bricks.bricks[c][r].width, this.bricks.bricks[c][r].height)) {
							this.context.clearRect(this.bricks.bricks[c][r].x, this.bricks.bricks[c][r].y + BRICK_ROOF_SPACE, this.bricks.bricks[c][r].width - BRICK_SPACE_BETWEEN, this.bricks.bricks[c][r].height - BRICK_SPACE_BETWEEN);
							this.bricks.bricks[c].splice(r,1);
							this.bullet.dir=this.bullet.dir -Movement.LEFT + Movement.RIGHT;
							return;
						}
						if (this.brickCollision(this.bullet.x, this.bullet.y + this.bullet.speed, this.bricks.bricks[c][r].x, this.bricks.bricks[c][r].y , this.bricks.bricks[c][r].width, this.bricks.bricks[c][r].height)) {
							this.context.clearRect(this.bricks.bricks[c][r].x, this.bricks.bricks[c][r].y + BRICK_ROOF_SPACE, this.bricks.bricks[c][r].width - BRICK_SPACE_BETWEEN, this.bricks.bricks[c][r].height - BRICK_SPACE_BETWEEN);
							this.bricks.bricks[c].splice(r,1);
							this.bullet.dir=this.bullet.dir -Movement.UP + Movement.DOWN;
							return;
						}
					} else if (this.bullet.dir == Movement.RIGHT + Movement.UP) {
						if (this.brickCollision(this.bullet.x + this.bullet.speed, this.bullet.y, this.bricks.bricks[c][r].x, this.bricks.bricks[c][r].y , this.bricks.bricks[c][r].width, this.bricks.bricks[c][r].height)) {
							this.context.clearRect(this.bricks.bricks[c][r].x, this.bricks.bricks[c][r].y + BRICK_ROOF_SPACE, this.bricks.bricks[c][r].width - BRICK_SPACE_BETWEEN, this.bricks.bricks[c][r].height - BRICK_SPACE_BETWEEN);
							this.bricks.bricks[c].splice(r,1);
							this.bullet.dir=this.bullet.dir -Movement.RIGHT + Movement.LEFT;
							return;
						}
						if (this.brickCollision(this.bullet.x, this.bullet.y - this.bullet.speed, this.bricks.bricks[c][r].x, this.bricks.bricks[c][r].y , this.bricks.bricks[c][r].width, this.bricks.bricks[c][r].height)) {
							this.context.clearRect(this.bricks.bricks[c][r].x, this.bricks.bricks[c][r].y + BRICK_ROOF_SPACE, this.bricks.bricks[c][r].width - BRICK_SPACE_BETWEEN, this.bricks.bricks[c][r].height - BRICK_SPACE_BETWEEN);
							this.bricks.bricks[c].splice(r,1);
							this.bullet.dir=this.bullet.dir -Movement.UP + Movement.DOWN;
							return;
						}
					} else if (this.bullet.dir == Movement.RIGHT + Movement.DOWN) {
						if (this.brickCollision(this.bullet.x + this.bullet.speed, this.bullet.y, this.bricks.bricks[c][r].x, this.bricks.bricks[c][r].y, this.bricks.bricks[c][r].width, this.bricks.bricks[c][r].height)) {
							this.context.clearRect(this.bricks.bricks[c][r].x, this.bricks.bricks[c][r].y + BRICK_ROOF_SPACE, this.bricks.bricks[c][r].width - BRICK_SPACE_BETWEEN, this.bricks.bricks[c][r].height - BRICK_SPACE_BETWEEN);
							this.bricks.bricks[c].splice(r,1);
							this.bullet.dir=this.bullet.dir -Movement.RIGHT + Movement.LEFT;
							return;
						}
						if (this.brickCollision(this.bullet.x, this.bullet.y + this.bullet.speed, this.bricks.bricks[c][r].x, this.bricks.bricks[c][r].y, this.bricks.bricks[c][r].width, this.bricks.bricks[c][r].height)) {
							this.context.clearRect(this.bricks.bricks[c][r].x, this.bricks.bricks[c][r].y + BRICK_ROOF_SPACE, this.bricks.bricks[c][r].width - BRICK_SPACE_BETWEEN, this.bricks.bricks[c][r].height - BRICK_SPACE_BETWEEN);
							this.bricks.bricks[c].splice(r,1);
							this.bullet.dir=this.bullet.dir -Movement.UP + Movement.DOWN;
							return;
						}
					}
				}
			}
		}
	}

	this.brickCollision=function(bulletx,bullety,brickx,bricky,brick_width,brick_height){
		if ((bulletx > brickx && bulletx < brickx + brick_width - BRICK_SPACE_BETWEEN) &&
			(bullety > bricky + BRICK_ROOF_SPACE && bullety < bricky + BRICK_ROOF_SPACE + brick_height- BRICK_SPACE_BETWEEN))
			return true;
		return false;
	}

	this.updateScore = function () {
		if (this.bullet.dir != Movement.NONE) {
			SCORE += 1;
		}
	}

	this.writeText = function (text, width, height) {
		this.context.fillStyle = 'rgb(255,255,0)';
		this.context.font = 'bold 20px Arial';
		this.context.fillText(text, width, height);
	}

	this.startGame = function () {
		if (this.bullet.dir == Movement.NONE && this.gameOver == false) {
			this.bullet.dir = Movement.RIGHT + Movement.UP;
		}
	}

	this.restartGame = function () {
		this.gameOver = false;
		this.bullet.dir = Movement.NONE;
		this.bullet.x = this.vaus.x + this.vaus.width / 2;
		this.bullet.y = this.vaus.y - this.bullet.radius * 2;
	}

	this.setVausPosition = function (x) {
		if (this.pause || this.gameOver) return;
		if (x < 0) x = 0;
		if (x > canvas.width - this.vaus.width) x = canvas.width - this.vaus.width;
		this.vaus.x = x;
	}

	this.resetCounters = function () {
		LIVES = 3;
		SCORE = 0;
		this.vaus.x = ((canvas.width/2) - (this.vaus.width/2));
		this.restartGame();
	}

	document.addEventListener('mousemove', (event) => {
		this.setVausPosition(event.pageX);
	});

	canvas.addEventListener('click', () => {
		this.startGame();
	});

}