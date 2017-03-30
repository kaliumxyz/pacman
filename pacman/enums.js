const Gamestate = {
    START: 0,
    DEAD: 1,
    PLAYING: 2,
    WIN: 3
}


const Direction = {
    RIGHT: 0,
    DOWN: 1,
    LEFT: 2,
    UP: 3
}


ghostCords["blinky"] = ('120,109,0,0,0');
ghostCords["pinky"] = ('89,130,1,0,600');
ghostCords["inky"] = ('105,130,1,0,300');
ghostCords["clyde"] = ('121,130,1,0,900');


//sprites
const sprites = new Image();
sprites.src = "Images/sprites.png";
//sounds
const waka = new Audio("Sounds/waka.ogg");
const opening = new Audio("Sounds/opening.ogg");
const dead = new Audio("Sounds/dead.ogg");


function createBalls() {
    let balls = [];
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
    return balls;
}


function createGmap() {
    var gmap = [];
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

    return gmap;
}
