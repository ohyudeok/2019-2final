var canv = document.getElementById("myCanvas3");
		var ctx2 = canv.getContext("2d");
		var x = canv.width/2;
		var y = canv.height-30;
		var dx = 6; // 공이 2픽셀 움직인다는 것이냐?
		var dy = -6;
		var ballRadius = 10; //간단한 충돌방지: 공
		var paddleHeight = 10;
		var paddleWidth = 35; //패달의 너비>얠 크기 조절해버리면 진짜 사람 화나지.
		var paddleX = (canv.width-paddleWidth)/2;
		var rightPressed = false;
		var leftPressed = false;
		var brickRowCount = 4; //벽돌 배열행 = r
		var brickColumnCount = 5; //벽돌 열의 수 = c
		var brickWidth = 55; // 벽돌 가로길이
		var brickHeight = 10; //벽돌 세로길이
		var brickPadding = 25; // 벽돌 간격
		var brickOffsetTop = 30; // 벽돌이 캔버스의 모서리에 닿지 않게 할 오프셋 변수
		var brickOffsetLeft = 30; // 벽돌이 캔버스의 모서리에 닿지 않게 할 오프셋 변수
		var bricks = [];
		for(var c=0; c<brickColumnCount; c++) {
		    bricks[c] = [];
		    for(var r=0; r<brickRowCount; r++) {
		        bricks[c][r] = { x: 0, y: 0, status:1 };
		    }
		}
		var score = 0; // 점수!!
		var lives = 3; // 생명까지 주겠데...뭐하러?.. 다음 단계 넘어가는건 어케해염....?

		document.addEventListener("keydown", keyDownHandler, false);
		document.addEventListener("keyup", keyUpHandler, false);
		document.addEventListener("mousemove", mouseMoveHandler, false);

			function keyDownHandler(e) {
		    if(e.keyCode == 39) {
		        rightPressed = true;
		    }
		    else if(e.keyCode == 37) {
		        leftPressed = true;
			    }
			}
			function keyUpHandler(e) {
			    if(e.keyCode == 39) {
			        rightPressed = false;
			    }
			    else if(e.keyCode == 37) {
			        leftPressed = false;
			    }
			}

			function mouseMoveHandler(e) {
			    var relativeX = e.clientX - canv.offsetLeft;
			    if(relativeX > 0 && relativeX < canv.width) {
			        paddleX = relativeX - paddleWidth/2;
			    }
			}

			function collisionDetection() {
			    for(var c=0; c<brickColumnCount; c++) {
			        for(var r=0; r<brickRowCount; r++) {
			            var b = bricks[c][r];
			            if(b.status == 1){
				            if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
				                dy = -dy;
				                b.status = 0;
				                score++;
				                if(score == brickRowCount*brickColumnCount){
				                	alert("YOU WIN, CONGRATUATS! GO, LEVEL 5!");
				                	document.location.href = "level5.html";
				                }
				            }
			            }
			        }
			    }
			}

			function drawBall(){
			ctx.beginPath();
			ctx.arc(x, y, 10, 0, Math.PI*2);
			ctx.fillStyle = "#E4E3EB";
			ctx.fill();
			ctx.closePath();
			}

			function drawPaddle() {
		    ctx.beginPath();
		    ctx.rect(paddleX, canv.height-paddleHeight, paddleWidth, paddleHeight);
		    ctx.fillStyle = "#E4E3EB";
		    ctx.fill();
		    ctx.closePath();
			}

			function drawBricks() {
			    for(var c=0; c<brickColumnCount; c++) {
			        for(var r=0; r<brickRowCount; r++) {
			        	if(bricks[c][r].status == 1){
				            var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
				            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
				            bricks[c][r].x = brickX;
				            bricks[c][r].y = brickY;
				            ctx.beginPath();
				            ctx.rect(brickX, brickY, brickWidth, brickHeight);
				            ctx.fillStyle = "#E4E3EB";
				            ctx.fill();
				            ctx.closePath();
					        }
				        }
				    }
			    }
			    

			function drawScore() {
			    ctx.font = "16px Arial";
			    ctx.fillStyle = "white";
			    ctx.fillText("Score: "+score, 8, 20); // 마지막 두개는 좌표래....
			}

			function drawLives() {
			    ctx.font = "16px Arial";
			    ctx.fillStyle = "white";
			    ctx.fillText("Lives: "+lives, canv.width-65, 20);
			} // 이건 생명!
			

			function draw(){
			ctx.clearRect(0, 0, canv.width, canv.height);
			drawBricks();
			drawBall();
			drawPaddle();
			drawScore();
			drawLives();
			collisionDetection();

			//if(x + dx > canvas.width || x + dx < 0) {
    			//dx = -dx;
				//}

			//if(y + dy > canvas.height || y + dy < 0) {
    		//dy = -dy;
			//} <-얘네는 공이 캔버스 밖으로도 나다니게 만들어 버린다.

			if(x + dx > canv.width-ballRadius || x + dx < ballRadius) {
	        dx = -dx;
		    }

		    if(y + dy < ballRadius) {
		        dy = -dy;
		    } else if(y + dy > canv.height-ballRadius) {
		    	if(x > paddleX && x < paddleX + paddleWidth) {
		    		dy = -dy;
		    	} 
		    else {
		    	lives--;
		    	if(!lives) {
		    	document.location.stop();
		    	}
		    	else{
		    		x = canv.width/2;
		    		y = canv.height-30;
		    		dx = 6; // 여기도 같이 바꿔줘야 죽고 나서도 속도가 같다.
		    		dy = -6; // 여기도 같이 바꿔줘야 죽고 나서도 속도가 같다: 공
		    		paddleX = (canv.width-paddleWidth)/2;
		    	}
		    	}
			}

		    if(rightPressed && paddleX < canv.width-paddleWidth) {
       			 paddleX += 7;
		    }
		    else if(leftPressed && paddleX > 0) {
		        paddleX -= 7;
		    } // 패달이 7픽셀 움직인다. + (rightPressed or leftPressed)하면 밖으로도 나다닌다. 움직임을 더 휙휙할 수 있겠다.

			x += dx;
    		y += dy;
    		requestAnimationFrame(draw);
			}
			
			draw();