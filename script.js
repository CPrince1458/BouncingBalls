document.addEventListener("DOMContentLoaded", function(){
   //once the page is loaded, the update function will be repeatedly called
    setInterval(Update, 1);
});


//declares a global array to store each ball
var balls = [];
//declares global arrays to store the individual positions and speeds of each ball
var leftPos = [];
var rightPos = [];
var topPos = [];
var botPos = [];
var horizSpeed = [];
var vertSpeed = [];

//constructor function called with a button to create a new ball with a random position, speed, and colour
Ball = function(){
        //an array containing the possible colours for the balls
        var colours = [
            "blue",
            "red",
            "yellow",
            "green",
            "orange",
            "purple",
            "lime",
            "cyan",
            "pink",
            "magenta",
            "deeppink",
            "orangered"
        ];
        //creates and appends a ball with a random position and a random colour from the array
        this.div = document.createElement( "div" ) ;
	    document.body.appendChild( this.div ) ;
        this.div.className = "Ball";
        this.div.style.left = Math.round(Math.random() * 95) + "%";
        this.div.style.top = Math.round(Math.random() * 95) + "%";
        this.div.style.backgroundColor = colours[Math.round(Math.random() * colours.length)];
    
        //adds the created ball into the balls array for later reference
        balls.push(this.div);
    
        //adds the created balls position into the different position arrays
        leftPos.push(this.div.offsetLeft);
        rightPos.push(this.div.offsetLeft + this.div.offsetWidth);
        topPos.push(this.div.offsetTop);
        botPos.push(this.div.offsetTop + this.div.offsetHeight);
    
        //generates two random numbers to determine is the horizontal and vertical speeds wil the positive or negative
        let hPosNeg = Math.random();
        let vPosNeg = Math.random();
    
        //creates random horizontal and vertical speeds for the ball
        let hSpeed = Math.random() + 0.1;
        let vSpeed = Math.random() + 0.1;
    
        //flips the speeds to negative if the positive/negative variable is below 0.5
       if(hPosNeg < 0.5) {
            hSpeed = hSpeed * -1;
        }
        if(vPosNeg < 0.5) {
            vSpeed = vSpeed * -1;
        }
        
        //adds the horizontal and vertical speeds to their corresponding arrays
        horizSpeed.push(hSpeed);
        vertSpeed.push(vSpeed);
};


function Update(){
    if(balls.length > 0){
        balls.forEach((element) => {
            
            //gets the curent position of the ball, changes the sorresponding position in the arrays to match
            leftPos[balls.indexOf(element)] = element.offsetLeft;
            rightPos[balls.indexOf(element)] = element.offsetLeft + element.offsetWidth;
            topPos[balls.indexOf(element)] = element.offsetTop;
            botPos[balls.indexOf(element)] = element.offsetTop + element.offsetHeight;
            
            //if the ball is off the left side of the screen, its horizontal speed is reversed
            if (leftPos[balls.indexOf(element)] < 1) {
                horizSpeed[balls.indexOf(element)] = horizSpeed[balls.indexOf(element)] * -1;
            }
            //if the ball is off the right side of the screen, its horizontal speed is reversed
            if (rightPos[balls.indexOf(element)] > window.innerWidth - 1) {
                horizSpeed[balls.indexOf(element)] = horizSpeed[balls.indexOf(element)] * -1;
            }
            //if the ball is off the top of the screen, its vertical speed is reversed
            if(topPos[balls.indexOf(element)] < 1) {
                vertSpeed[balls.indexOf(element)] = vertSpeed[balls.indexOf(element)] * -1;
            }
             //if the ball is off the bottom of the screen, its vertical speed is reversed
            if(botPos[balls.indexOf(element)] > window.innerHeight - 1) {
                vertSpeed[balls.indexOf(element)] = vertSpeed[balls.indexOf(element)] * -1;
            }
           
            //moves the ball
            element.style.left = (leftPos[balls.indexOf(element)] + 3 * horizSpeed[balls.indexOf(element)]) + "px";
            element.style.top = (topPos[balls.indexOf(element)] + 2 * vertSpeed[balls.indexOf(element)]) + "px";
            
        });
    }
    
}
