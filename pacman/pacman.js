              //var
        var px = 106,
            py = 207,
            direction = 0,
            gamestate = 0,
            lives = 2,
            score = 0,
            eating = false,
            demo = 129,
            timer = 4,
            deadState = 0,
            deadtimer = 0,
            spriteWidth = 177,
            spriteState = 0,
            spriteH = 282,
            left = 1,
            right = 1,
            down = 1,
            up = 1,
            debug = true,
            testvar = 0,
            click = false,
            sectors,
            t = 0,
            priority,
            go = true,
            priorityX,
            priorityY,
            deadtime = 0,
            sectors2,
            height,
            //ghosts
            ghostTimer = 0,
            ghostTimer2 = 0,
            gSpeed = 1,
            flight = 0;

        //sprites
        var sprites = new Image();
        sprites.src = "Images/sprites.png";
        //sounds
        var waka = new Audio("Sounds/waka.ogg");
        var opening = new Audio("Sounds/opening.ogg");
        var dead = new Audio("Sounds/dead.ogg");



        //array
        var keyPressList = new Array();
        var ghostCords = new Array();
        ghostCords[0] = ('120,109,0,0,0');
        ghostCords[1] = ('89,130,1,0,600');
        ghostCords[2] = ('105,130,1,0,300');
        ghostCords[3] = ('121,130,1,0,900');

        //ghost map
        //map = "widthmin,heightmin,widthmax,heightmax,type" 1==| 2==_ 3== | 4== - 5==|_ 6==_| 7==-| 8==|-
        var gmap = new Array();
        //lane 1
        gmap.push('5,29,8')
        gmap.push('45,29,4')
        gmap.push('93,29,7')
        gmap.push('117,29,8')
        gmap.push('165,29,4')
        gmap.push('205,29,7')

        //lane 2

        gmap.push('5,61,1')
        gmap.push('45,61,0')
        gmap.push('69,61,4')
        gmap.push('93,61,2')
        gmap.push('117,61,2')
        gmap.push('141,61,4')
        gmap.push('165,61,0')
        gmap.push('205,61,3')

        //lane 3
        gmap.push('5,85,5')
        gmap.push('45,85,3')
        gmap.push('69,85,5')
        gmap.push('93,85,7')
        gmap.push('117,85,8')
        gmap.push('141,85,6')
        gmap.push('165,85,1')
        gmap.push('205,85,6')

        //lane 4
        gmap.push('69,109,8')
        gmap.push('93,109,2')
        gmap.push('117,109,2')
        gmap.push('141,109,7')

        //lane 5 teleport ding implanteren hiero_____________________________
        gmap.push('-16,133,9')
        gmap.push('45,133,0')
        gmap.push('69,133,3')
        gmap.push('141,133,1')
        gmap.push('165,133,0')
        gmap.push('240,133,10')


        //lane 6
        gmap.push('69,157,1')
        gmap.push('141,157,3')

        //lane 7
        gmap.push('5,181,8')
        gmap.push('45,181,0')
        gmap.push('69,181,2')
        gmap.push('93,181,7')
        gmap.push('117,181,8')
        gmap.push('141,181,2')
        gmap.push('165,181,0')
        gmap.push('205,181,7')

        //lane 8 1==| 2==_ 3== | 4== - 5==|_ 6==_| 7==-| 8==|-
        gmap.push('5,205,5')
        gmap.push('21,205,7')
        gmap.push('69,205,4')
        gmap.push('45,205,1')
        gmap.push('93,205,2')
        gmap.push('117,205,2')
        gmap.push('165,205,3')
        gmap.push('141,205,4')
        gmap.push('189,205,8')
        gmap.push('205,205,6')

        //lane 9
        gmap.push('5,229,8')
        gmap.push('21,229,2')
        gmap.push('45,229,6')
        gmap.push('69,229,5')
        gmap.push('93,229,7')
        gmap.push('117,229,8')
        gmap.push('141,229,6')
        gmap.push('165,229,5')
        gmap.push('189,229,2')
        gmap.push('205,229,7')

        //lane 10
        gmap.push('5,253,5')
        gmap.push('93,253,2')
        gmap.push('117,253,2')
        gmap.push('205,253,6')

        //kooi
        gmap.push('89,128,8')
        gmap.push('89,138,5')
        gmap.push('105,128,0')
        gmap.push('105,138,2')
        gmap.push('121,128,7')
        gmap.push('121,138,6')
        gmap.push('105,109,11')
       //map
       //sector [sector] = "widthmin,heightmin,widthmax,heightmax"

        var sector = new Array();
        sector.push('1,25,223,27');
        sector.push('21,45,43,59');
        sector.push('61,45,91,59');
        sector.push('109,27,115,59');
        sector.push('133,45,163,59');
        sector.push('181,45,203,59');
        sector.push('21,77,43,83');
        sector.push('61,77,67,131');
        sector.push('85,77,139,83');
        sector.push('157,77,163,131');
        sector.push('181,77,203,83');
        sector.push('1,27,3,102');
        sector.push('221,27,223,102');
        sector.push('1,101,43,103');
        sector.push('61,101,91,107');
        sector.push('109,83,115,107');
        sector.push('133,101,163,107');
        sector.push('181,101,223,103');
        sector.push('41,102,43,130');
        sector.push('181,102,183,130');
        sector.push('0,129,43,131');
        sector.push('85,125,139,155');
        sector.push('181,129,224,131');
        sector.push('0,149,43,151');
        sector.push('61,149,67,179');
        sector.push('157,149,163,179');
        sector.push('181,149,254,151');
        sector.push('-14,131,-13,149');
        sector.push('237,131,239,149');
        sector.push('41,149,43,177');
        sector.push('181,149,183,177');
        sector.push('1,177,43,179');
        sector.push('85,173,139,179');
        sector.push('181,177,253,179');
        sector.push('1,179,3,269');
        sector.push('221,179,223,269');
        sector.push('109,179,115,203');
        sector.push('21,197,43,203');
        sector.push('61,197,91,203');
        sector.push('133,197,163,203');
        sector.push('181,197,203,203');
        sector.push('37,203,43,227');
        sector.push('181,203,187,227');
        sector.push('3,221,19,227');
        sector.push('61,221,67,251');
        sector.push('85,221,139,227');
        sector.push('157,221,163,251');
        sector.push('205,221,223,227');
        sector.push('21,245,91,251');
        sector.push('109,221,115,251');
        sector.push('133,245,203,251');
        sector.push('1,269,243,271');


        var balls = new Array();


        //essencials
        window.addEventListener("load", eventWindowLoaded, false);
        setInterval(eventWindowLoaded, 33);


        function eventWindowLoaded ()
        {

          var theCanvas= document.getElementById("canvas");
          if(!theCanvas || !theCanvas.getContext)
          {
            console.log(theCanvas);
          }
          else
          {
            resize(theCanvas);
            var context = theCanvas.getContext("2d");
            context.imageSmoothingEnabled = false;
            context.webkitImageSmoothingEnabled = false;
            context.mozImageSmoothingEnabled = false;
            DrawBackground(context);
            if (gamestate===0)
            {
                DrawStart(context);
            }

            if (gamestate===1)
            {
                Dead(context);
            }
            if (gamestate===2)
           {
                DrawPlayer(context);
                DrawLevel(context);
                DrawGhosts(context);
                CalcMovements();
           }

           if (gamestate===3)
           {
               Win(context);

           }
          }
        }

        function resize (theCanvas)
        {
            if (height!==window.innerHeight)
            {
            height=window.innerHeight,
            theCanvas.style.height=height*0.9.toString() + "px";
            theCanvas.style.width=height*0.7.toString() + "px";
            console.log("resized")}
        }
        function DrawBackground(context)
        {

            context.fillStyle = '#000000';
            context.fillRect(0, 0, 244, 289);
            context.drawImage(sprites, 0, 0, 224, 248, 0, 24, 224, 248);
            context.textBaseline = 'top';
            context.fillStyle = '#ffffff';
            context.font = '12px _sans';
            context.fillText ("SCORE:"+score, 0, 0);
            sectors = (include(sector,py,px));
            if (sectors != undefined) {sectors2 = (include(sector,py,px,sectors.split(",")[0]))};
            if(debug==true){}
            timer = timer + 1;
            if (timer ===7) {timer = 0; click=false}
            if (lives>=2) {context.drawImage(sprites, 96, 315, 11, 11, 35, 274, 11, 11)}
            if (lives>=1) {context.drawImage(sprites, 96, 315, 11, 11, 19, 274, 11, 11)}
            //document.addEventListener('mousedown',toucht,false)

        }
        function toucht(event)
        {
            click=true;
            var canvaswidth = document.getElementById("canvas").style.width;
            var canvasheight = document.getElementById("canvas").style.height;
            var wwidth = window.innerWidth;
            var wheight = window.innerHeight;
            var x = event.clientX
            var y = event.clientY
            if (x<=wwidth*0.5){keyPressList[37]=true} else {keyPressList[37]=false}
            if (x>wwidth*0.5){keyPressList[39]=true} else {keyPressList[39]=false}
            if (y<=wheight*0.3){keyPressList[37]=false; keyPressList[39]=false; keyPressList[38]=true} else {keyPressList[38]=false}
            if (y>wheight*0.7){keyPressList[37]=false; keyPressList[39]=false; keyPressList[40]=true} else {keyPressList[40]=false}

            console.log(event.clientX + "," + event.clientY + "," + height)


          // Left keyPressList[37]
          // down keyPressList[40]
          // right keyPressList[39]
          // up keyPressList[38]
        }
        function DrawStart(context)
        {
            context.fillStyle = '#ffffff';
            context.font = '40px _sans';
            context.textBaseline = 'top';
            context.fillText ("", 20, 20);
            context.fillStyle = '#ffffff';
            context.font = '20px _sans';
            context.fillText("press space to start",20, 144);
            if (keyPressList[32]==true || click==true)
            {

                deadtimer=0;
                deadState=0;
                px=106;
                py=206;
                direction = 0;
                score = 0;
                gamestate = 2;
                lives = 2;
                opening.play();

                ghostCords[0] = ('120,109,0,0,0');
                ghostCords[1] = ('89,130,1,0,600');
                ghostCords[2] = ('105,136,3,0,300');
                ghostCords[3] = ('121,130,1,0,900');
                // balls.push('witdh,height') color = FF9E83
                balls.length=0;
                //lane 1
                balls.push('12,36');
                balls.push('20,36');
                balls.push('28,36');
                balls.push('36,36');
                balls.push('44,36');
                balls.push('52,36');
                balls.push('60,36');
                balls.push('68,36');
                balls.push('76,36');
                balls.push('84,36');
                balls.push('92,36');
                balls.push('100,36');
                balls.push('124,36');
                balls.push('132,36');
                balls.push('140,36');
                balls.push('148,36');
                balls.push('156,36');
                balls.push('164,36');
                balls.push('172,36');
                balls.push('180,36');
                balls.push('188,36');
                balls.push('196,36');
                balls.push('204,36');
                balls.push('212,36');
                // lane 2
                balls.push('12,44');
                balls.push('52,44');
                balls.push('100,44');
                balls.push('124,44');
                balls.push('172,44');
                balls.push('212,44');
                //lane 3
                balls.push('12,52');// groot
                balls.push('52,52');
                balls.push('100,52');
                balls.push('124,52');
                balls.push('172,52');
                balls.push('212,52');// groot
                //lane 4
                balls.push('12,60');
                balls.push('52,60');
                balls.push('100,60');
                balls.push('124,60');
                balls.push('172,60');
                balls.push('212,60');
                //lane 5
                balls.push('12,68');
                balls.push('20,68');
                balls.push('28,68');
                balls.push('36,68');
                balls.push('44,68');
                balls.push('52,68');
                balls.push('60,68');
                balls.push('68,68');
                balls.push('76,68');
                balls.push('84,68');
                balls.push('92,68');
                balls.push('100,68');
                balls.push('108,68');
                balls.push('116,68');
                balls.push('124,68');
                balls.push('132,68');
                balls.push('140,68');
                balls.push('148,68');
                balls.push('156,68');
                balls.push('164,68');
                balls.push('172,68');
                balls.push('180,68');
                balls.push('188,68');
                balls.push('196,68');
                balls.push('204,68');
                balls.push('212,68');
                //lane 6
                balls.push('12,76');
                balls.push('52,76');
                balls.push('76,76');
                balls.push('148,76');
                balls.push('172,76');
                balls.push('212,76');
                //lane 7
                balls.push('12,84');
                balls.push('52,84');
                balls.push('76,84');
                balls.push('148,84');
                balls.push('172,84');
                balls.push('212,84');
                //lane 8
                balls.push('12,92');
                balls.push('20,92');
                balls.push('28,92');
                balls.push('36,92');
                balls.push('44,92');
                balls.push('52,92');
                balls.push('76,92');
                balls.push('84,92');
                balls.push('92,92');
                balls.push('100,92');
                balls.push('124,92');
                balls.push('132,92');
                balls.push('140,92');
                balls.push('148,92');
                balls.push('172,92');
                balls.push('180,92');
                balls.push('188,92');
                balls.push('196,92');
                balls.push('204,92');
                balls.push('212,92');
                //lane 9
                balls.push('52,100');
                balls.push('172,100');
                //lane 10
                balls.push('52,108');
                balls.push('172,108');
                //lane 11
                balls.push('52,116');
                balls.push('172,116');
                //lane 12
                balls.push('52,124');
                balls.push('172,124');
                //lane 13
                balls.push('52,132');
                balls.push('172,132');
                //lane 14
                balls.push('52,140');
                balls.push('172,140');
                //lane 15
                balls.push('52,148');
                balls.push('172,148');
                //lane 16
                balls.push('52,156');
                balls.push('172,156');
                //lane 17
                balls.push('52,164');
                balls.push('172,164');
                //lane 18
                balls.push('52,172');
                balls.push('172,172');
                //lane 19
                balls.push('52,180');
                balls.push('172,180');
                //lane 20
                balls.push('12,188');
                balls.push('20,188');
                balls.push('28,188');
                balls.push('36,188');
                balls.push('44,188');
                balls.push('52,188');
                balls.push('60,188');
                balls.push('68,188');
                balls.push('76,188');
                balls.push('84,188');
                balls.push('92,188');
                balls.push('100,188');
                balls.push('124,188');
                balls.push('132,188');
                balls.push('140,188');
                balls.push('148,188');
                balls.push('156,188');
                balls.push('164,188');
                balls.push('172,188');
                balls.push('180,188');
                balls.push('188,188');
                balls.push('196,188');
                balls.push('204,188');
                balls.push('212,188');
                // lane 21
                balls.push('12,196');
                balls.push('52,196');
                balls.push('100,196');
                balls.push('124,196');
                balls.push('172,196');
                balls.push('212,196');
                // lane 22
                balls.push('12,204');
                balls.push('52,204');
                balls.push('100,204');
                balls.push('124,204');
                balls.push('172,204');
                balls.push('212,204');
                //lane 23
                balls.push('12,212');// groot
                balls.push('20,212');
                balls.push('28,212');
                balls.push('52,212');
                balls.push('60,212');
                balls.push('68,212');
                balls.push('76,212');
                balls.push('84,212');
                balls.push('92,212');
                balls.push('100,212');
                balls.push('124,212');
                balls.push('132,212');
                balls.push('140,212');
                balls.push('148,212');
                balls.push('156,212');
                balls.push('164,212');
                balls.push('172,212');
                balls.push('196,212');
                balls.push('204,212');
                balls.push('212,212');// groot
                // lane 24
                balls.push('28,220');
                balls.push('52,220');
                balls.push('76,220');
                balls.push('148,220');
                balls.push('172,220');
                balls.push('196,220');
                // lane 25
                balls.push('28,228');
                balls.push('52,228');
                balls.push('76,228');
                balls.push('148,228');
                balls.push('172,228');
                balls.push('196,228');
                //lane 26
                balls.push('12,236');
                balls.push('20,236');
                balls.push('28,236');
                balls.push('36,236');
                balls.push('44,236');
                balls.push('52,236');
                balls.push('76,236');
                balls.push('84,236');
                balls.push('92,236');
                balls.push('100,236');
                balls.push('124,236');
                balls.push('132,236');
                balls.push('140,236');
                balls.push('148,236');
                balls.push('172,236');
                balls.push('180,236');
                balls.push('188,236');
                balls.push('196,236');
                balls.push('204,236');
                balls.push('212,236');
                // lane 27
                balls.push('12,244');
                balls.push('100,244');
                balls.push('124,244');
                balls.push('212,244');
                // lane 28
                balls.push('12,252');
                balls.push('100,252');
                balls.push('124,252');
                balls.push('212,252');
                //lane 29
                balls.push('12,260');
                balls.push('20,260');
                balls.push('28,260');
                balls.push('36,260');
                balls.push('44,260');
                balls.push('52,260');
                balls.push('60,260');
                balls.push('68,260');
                balls.push('76,260');
                balls.push('84,260');
                balls.push('92,260');
                balls.push('100,260');
                balls.push('108,260');
                balls.push('116,260');
                balls.push('124,260');
                balls.push('132,260');
                balls.push('140,260');
                balls.push('148,260');
                balls.push('156,260');
                balls.push('164,260');
                balls.push('172,260');
                balls.push('180,260');
                balls.push('188,260');
                balls.push('196,260');
                balls.push('204,260');
                balls.push('212,260');
            }
        }

        function Reset()
        {
                deadtimer=0;
                deadState=0;
                px=106;
                py=206;
                direction = 0;
                flight=0;
            ghostCords[0] = ('120,109,0,0,0');
            ghostCords[1] = ('89,130,1,0,200');
            ghostCords[2] = ('105,130,1,0,400');
            ghostCords[3] = ('121,130,1,0,600');
            gamestate=2;
        }

        //player
        function DrawPlayer(context)
        {

            if (direction>0 && timer===5){
                spriteWidth = spriteWidth + 16
            if (spriteState==1) {spriteWidth = 177, spriteState=0}
            if (spriteWidth>209 && spriteState==0) {spriteWidth = 193, spriteState=1}
            }


            context.drawImage(sprites, spriteWidth, spriteH, 13, 13, px, py, 13, 13);
        }


        function DrawLevel(context)
        {
//
//            context.fillStyle = '#ffffff';
//            if (debug===true){for(var f = 0;f<sector.length;f++){
//            context.fillRect(sector[f].split(",")[0],sector[f].split(",")[1],sector[f].split(",")[2]-sector[f].split(",")[0],sector[f].split(",")[3]-sector[f].split(",")[1]);}}


            context.fillStyle = '#FF9E83';
            for(var b = 0;b<balls.length;b++){
            if (px<=balls[b].split(",")[0] && px+13>=balls[b].split(",")[0] && py<=balls[b].split(",")[1] && py+13>=balls[b].split(",")[1] && balls[b].split(",")[2]==undefined) {balls[b] += ',' + '1', score++; if (b==30 || b==35 || b==158 || b==177){flight=60}}
            if (balls[b].split(",")[2]==undefined){if (b==30 || b==35 || b==158 || b==177){context.fillRect(balls[b].split(",")[0]-3,balls[b].split(",")[1]-3, 6 , 6)} else {
            context.fillRect(balls[b].split(",")[0]-1,balls[b].split(",")[1]-1, 2 , 2);}
        }}


            if (sectors != undefined){
                if(sectors.split(",")[0]=="27") {px=220}
                if(sectors.split(",")[0]=="28") {px=-10}
                if(sectors.split(",")[1]>=px && sectors.split(",")[2]-12<=py && sectors.split(",")[4]>=py){right=false} else (right = true)
                if(sectors.split(",")[2]>=py && sectors.split(",")[1]-12<=px && sectors.split(",")[3]>=px){down=false} else (down = true)
                if(sectors.split(",")[3]<=px && sectors.split(",")[2]-12<=py && sectors.split(",")[4]>=py){left=false} else (left=true)
                if(sectors.split(",")[4]<=py && sectors.split(",")[1]-12<=px && sectors.split(",")[3]>=px){up=false} else (up=true)
                    if (sectors2 != undefined){
                    if(sectors2.split(",")[0]=="27") {px=220}
                    if(sectors2.split(",")[0]=="28") {px=-10}
                    if(sectors2.split(",")[1]>=px && sectors2.split(",")[2]-12<=py && sectors2.split(",")[4]>=py){right=false}
                    if(sectors2.split(",")[2]>=py && sectors2.split(",")[1]-12<=px && sectors2.split(",")[3]>=px){down=false}
                    if(sectors2.split(",")[3]<=px && sectors2.split(",")[2]-12<=py && sectors2.split(",")[4]>=py){left=false}
                    if(sectors2.split(",")[4]<=py && sectors2.split(",")[1]-12<=px && sectors2.split(",")[3]>=px){up=false}
                    }
            } else {left=true, up=true, right=true, down=true}

            if (score>=244){gamestate=3}

            if (keyPressList[85]==true)
            {
                lives=lives-1
                gamestate=1;
                dead.play();
            }
            if (keyPressList[84]==true)
            {
                debug=false;
            }
            if (keyPressList[86]==true)
            {
                sprites.src = "Images/spritesdepth.png";
            }
        }

        function DrawGhosts(context)
        {
            ghostTimer = ghostTimer + 1;
            if (ghostTimer === 20) {ghostTimer = 0}
            ghostTimer2 = ghostTimer2 + 1;
            if (ghostTimer2 === 30) {ghostTimer2 = 0}

            ghost(0,context)
            ghost(1,context)
            ghost(2,context)
            ghost(3,context)
        }

        function ghost(id,context)
        {

            var tempX = parseFloat(ghostCords[id].split(',')[0])
            var tempY = parseFloat(ghostCords[id].split(',')[1])
            var tempS = parseFloat(ghostCords[id].split(',')[3])
            var tempR = parseFloat(ghostCords[id].split(',')[4])
            if (flight==60 && tempS==-1 || flight==0 && tempS==-1) {tempS=0}
            if (tempR>0)
            {
                if (tempR<50)
                {var tempC = (pathfinding(gmap,tempX,tempY,id,106,108,1))}
                else {var tempC = (pathfinding(gmap,tempX,tempY,id,73+16*id,130,1))}
                tempR--
                var tempSpeed=0.5;
                tempS=-1
            } else {
                if (tempS>0){
                        var tempC = (pathfinding(gmap,tempX,tempY,id,105,110,2))
                            } else {
                             var tempC = (pathfinding(gmap,tempX,tempY,id,px,py,3))}
                            }


            if (tempC != undefined) {if (typeof tempC == "string") {var tempD=tempC.split(',')[0]; tempX=parseFloat(tempC.split(',')[1])} else {var tempD=tempC}} else {var tempD=parseFloat(ghostCords[id].split(',')[2])}

            if (tempS>0){

                var tempSpeed=1
                tempS=tempS-1
                tempColor=313
                tempW=1 + 16 * tempD
                if (tempX>=104 && tempX<=106 && tempY>=124 && tempY<=127) {tempS=-1; tempR=40}
            } else {

                if (flight>0 && tempS==0 && tempR==0) {
                    var tempSpeed=gSpeed
                    if (ghostTimer2>=15){tempColor=297} else {tempColor=281}
                    var tempW = 129;
                    if (tempX+12>=px && tempX<=px+12 && tempY+12>=py && tempY<=py+12){tempS=600}

                        } else {
                          var tempSpeed=1
                          var tempColor = 249 + 16 * id;
                          var tempW = 1 + 32 * tempD
                          if (tempX+12>=px && tempX<=px+12 && tempY+12>=py && tempY<=py+12){lives=lives-1, gamestate=1}
                          }}


            if (tempD==0) {tempX=tempX+1*tempSpeed}
            if (tempD==1) {tempY=tempY+1*tempSpeed}
            if (tempD==2) {tempX=tempX-1*tempSpeed}
            if (tempD==3) {tempY=tempY-1*tempSpeed}
            if (tempX<=244 && tempX>=-20  && tempY>=0 && tempY<=288) {} else {console.log(tempX+","+tempY); tempX=5; tempY=29}


            if (ghostTimer>=10 && tempS<=0){tempW=tempW+16}
            ghostCords[id] = tempX + ',' + tempY + ',' + tempD + ',' + tempS + ',' + tempR
            tempX=parseFloat(tempX.toFixed())
            tempY=parseFloat(tempY.toFixed())
            context.drawImage(sprites,tempW,tempColor,14,14,tempX,tempY,14,14)
        }

        function pathfinding(arr,x,y,id,tx,ty,random)
        {//0=right 1=down 2=left 3=up. split= 1==| 2==_ 3== | 4== - 5==|_ 6==_| 7==-| 8==|-

            x=x.toFixed()
            y=y.toFixed()

            for (var i = 0;i<arr.length;i++){
            if (arr[i].split(",")[0] <= x && arr[i].split(",")[1] <= y && arr[i].split(",")[0] >= x && arr[i].split(",")[1] >= y)
            {
                if (flight==0) {gSpeed=1; flight=-1;}
                if (tx-x>0){priorityX=tx-x} else {priorityX=x-tx}
                if (ty-y>0){priorityY=ty-y} else {priorityY=y-ty}
                go = true

                if (arr[i].split(",")[2]!=3 && arr[i].split(",")[2]!=6 && arr[i].split(",")[2]!=7){var r=true} else {var r=false}
                if (arr[i].split(",")[2]!=1 && arr[i].split(",")[2]!=5 && arr[i].split(",")[2]!=8){var l=true} else {var l=false}
                if (arr[i].split(",")[2]!=2 && arr[i].split(",")[2]!=5 && arr[i].split(",")[2]!=6){var d=true} else {var d=false}
                if (arr[i].split(",")[2]!=4 && arr[i].split(",")[2]!=7 && arr[i].split(",")[2]!=8){var u=true} else {var u=false}

                if (arr[i].split(",")[2]==9) {priority=2; newx = 239; go=false; return priority + "," + newx}
                if (arr[i].split(",")[2]==10) {priority=0; newx = -15; go=false; return priority + "," + newx}
                if (arr[i].split(",")[2]==11 && random==2) {priority=1; go=false; return priority}
                if (arr[i].split(",")[2]==11) {priority = (parseFloat(Math.random().toFixed())); if (priority==1){priority=2}; go=false; return priority;}
                if (go==true){
                if ((Math.floor((Math.random()*10)+1))==2 && random!=1 || flight>0 && random<=0){
                    if (flight>0){flight=flight-1, gSpeed=0.5}
                    priority = (Math.floor((Math.random()*3)+1))
                             if (r==true && priority==0) {priority=0} else {
                                    if (d==true && priority==1){priority=1} else {
                                        if (l==true && priority==2) {priority=2} else {
                                            if (u==true && priority==3){priority=3} else {

                                            if (r==false && priority==0) {priority=2} else {
                                                if (d==false && priority==1){priority=3} else {
                                                    if (l==false && priority==2) {priority=0} else {
                                                        if (u==false && priority==3){priority=1}
                    }}}}}}}} else {
                    if (priorityX>priorityY /*left and right*/){
                        if (x<=tx && r==true){priority=0} else {
                            if (x>=tx && l==true) {priority=2} else {
                                if (y<=ty && d==true){priority=1} else {
                                    if (y>=ty && u==true){priority=3} else {
                                        priority=4}}}}

            } else {

                        if (y<=ty && d==true){priority=1} else {
                            if (y>=ty && u==true){priority=3} else {
                                if (x<=tx && r==true){priority=0} else {
                                    if (x>=tx && l==true) {priority=2} else {
                                         priority=4}}}}}





                                    if (priority==4 && arr[i].split(",")[2]!=11){
                                        if (r!=true) {priority=2} else {
                                            if (d!=true){priority=3} else {
                                                if (l!=true) {priority=0} else {
                                                    if (u!=true){priority=1}


                                        }}}
                                    }}}


//                     console.log(priority)
                    return priority;

              }
        }}



        function include(arr,y,x,s2)
        {
        for (var i = 0;i<arr.length;i++){
        if (arr[i].split(",")[0]-15 <= x && arr[i].split(",")[2]- -2 >= x &&  arr[i].split(",")[1]-15 <= y && arr[i].split(",")[3]- -2 >=y && i != s2) {return i + "," + arr[i]}
}}


        function CalcMovements()
        {
          if (keyPressList[37]==true)
          { // Left
            direction=1
            spriteH=282
          }
          if (keyPressList[40]==true)
          { // down
            direction=2
            spriteH=330
          }
          if (keyPressList[39]==true)
          { // Right
            direction=3
            spriteH=298
          }
          if (keyPressList[38]==true)
          { // up
            direction=4
            spriteH=314
          }


        if (direction===1 && left == true)
            {
                px-- //left
            }
        if (direction===2 && down == true)
            {
                py++ //down
            }
        if (direction===3 && right == true)
            {
                px++ //right
            }
        if (direction===4 && up == true)
            {
                py-- //up
            }
  }
        function Dead(context)
        {
            deadtimer = deadtimer + 0.08
            if (deadtimer>1)
            {

                deadtime=deadtime+1
                if(deadtime==2){
                 deadState = deadState + 16, deadtime=0}


                if (deadState<176) {

                dead.play();
            context.drawImage(sprites, deadState, 330, 16, 13,
            px-2, py, 16, 13);
            } else {if (lives>=0){
            context.textBaseline = 'top';
            context.fillStyle = '#ffffff';
            context.font = '20px _sans';
            context.fillText("press space to continue",10, 144);
            if (keyPressList[32]==true  || click==true)
            {
                Reset()
            }}
                   else {
            Gamelost(context)

            }}}
                    else
                {
                    context.drawImage(sprites, 193, 315, 13, 13,
                    px, py, 13, 13);
                }
    }


        function Win(context)
        {
            context.fillStyle = '#ffffff';
            context.textBaseline = 'top';
            context.font = '40px _sans';
            context.fillText ("YOU WON", 13, 40);
            context.font = '20px _sans';
            context.fillText ("Press R to restart", 35, 80);
            if (keyPressList[82]==true || click==true)
            {
                gamestate=0;
            }
        }


        function Gamelost(context)
        {
             context.fillStyle = '#ffffff';
             context.font = '18px _sans';
             context.textBaseline = 'top';
             context.fillText ("Game Over score: "+score, 20, 20);
             context.font = '20px _sans';
             context.fillText ("press R to reset", 20, 80);
             if (keyPressList[82]==true || click==true)
            {
                gamestate=0;
            }
        }





          //contol scripts
          document.onkeydown = function(e){
          e=e?e:window.event;
          //ConsoleLog.log(e.keyCode + "down");
          keyPressList[e.keyCode] = true;
          }
        document.onkeyup = function(e){
          //document.body.onkeyup=function(e){
          e = e?e:window.event;
          //ConsoleLog.log(e.keyCode + "up");
          keyPressList[e.keyCode] = false;
        };
