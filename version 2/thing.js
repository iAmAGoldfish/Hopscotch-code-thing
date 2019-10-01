const BlockTypes = {
main: -1,
scene: 0,
object: 1,
rule: 2,
movement: 3,
drawing: 4,
looks: 5,
variables: 6,
control: 7,
custom: 8,
"-1": 9
}

window.BlockShortcuts = [
/*Scene*/['scene'],
/*Object*/['object','text'],
/*Rules*/['rule','when'],
/*Movement*/['movement','move','flip','set speed','turn','change x','change y','set position','set angle','set center', 'set origin'],
/*Drawing*/['drawing','draw','set trail','clear'],
/*Looks*/['looks','set color','set size','start sound', 'send to back','set z','set image','grow','set invisibility','change pose','set text','shrink','bring to front', 'set width'],
/*Variables*/['variables','set','increase'],
/*Control*/['control','check','repeat','wait','create','change scene','destroy']

].reverse()



const ParameterTypes = {
object : 50,
rule: 52,
default: 42,
variable: -1,
hide: -2
}

const characterSvgs = {bear:'Bear0.svg',parrot:'ParrotFlying0.svg',bird:'Bird0.svg',penguin:'Penguin0.svg',broom:'Broom0.svg',polarbear:'Polarbear0.svg',cauldron:'Cauldron0.svg',pumpkin:'Pumpkin0.svg',chevron:'Chevron0.svg',raccoon:'Raccoon0.svg',chillanna:'Chillanna0.svg',rectangle:'Rectangle0.svg',circle:'Circle0.svg',rtriangle:'RightTriangle0.svg',corner:'Corner0.svg',robo:'Robo0.svg',cody:'Cosmiccody',roundtriangle:'RoundedRightTriangleFullSize0.svg',crocodile:'Crocodile0.svg',roundsquare:'RoundedSquareFullSize0.svg',cupcake:'Cupcake0.svg',yeti:'ShyYeti0.svg',deer:'Deer0.svg',sleigh:'Sleigh0.svg',dino:'Dino0.svg',sloth:'Sloth0.svg',donut:'Donut0.svg',snowglobe:'SnowGlobe0.svg',elf:'Elf0.svg',gonzalo:'SnowMan0.svg',fanblade:'FanbladeFullSize0.svg',snowflake:'Snowflake0.svg',flower:'Flower0.svg',spacepod:'Spacepod0.svg',frankenrilla:'Frankenrilla0.svg',square:'Square0.svg',frog:'Frog0.svg',squiggle:'Squiggle0.svg',ghoulopus:'Ghoulopus0.svg',squishedbox:'SquishedBox0.svg',gorilla:'Gorilla0.svg',star:'Star0.svg',jody:'Greenman0.svg',stargirl:'Stargirl0.svg',heart:'Heart0.svg',Lshape:'TetrisL0.svg',hexagon:'Hexagon0.svg',platform:'TetrisLine0.svg',hut:'Hut0.svg',Vshape:'TetrisTV30.svg',iguana:'Iguana0.svg',Zshape:'TetrisZ0.svg',jeep:'Jeepers0.svg',fanblade2:'ThreeProngedBoomerang0.svg',witch:'JodyWitch0.svg',toucan:'Toucan0.svg',lantern:'Lantern0.svg',triangle:'Triangle0.svg',mandrill:'Mandrill0.svg',flytrap:'Venus0.svg',misschief:'MissChief0.svg',ana:'WinterQueen0.svg',mistle:'Mistletoe0.svg',Xshape:'XFullSize0.svg',monkey:'Monkey0.svg',zombear:'ZombieBear0.svg',mosquito:'Mosquito0.svg',anteater:'anteater',mustache:'Mustache0.svg',arch:'arch',octo:'Octopus0.svg',banyan:'banyan',parallelogram:'Parallelogram0.svg',bats:'bats',Wparallelogram:'ParallelogramWideV30.svg',bead:'bead'};

const ObjectTypes = {
monkey:0,text:1,octopus:2,gorilla:3,cupcake:4,bear:5,dino:6,frog:7,greenman:8,mustache:9,spacepod:10,zombieBear:11,ghoulopus:12,bats:13,frankenrilla:14,jodyWitch:15,cauldron:16,pumpkin:17,broom:18,lantern:19,parrotFlying:20,mandrill:21,mosquito:22,missChief:23,venus:24,jeepers:25,banyan:26,stargirl:27,astro:28,chillanna:29,robo:30,raccoon:31,bird:32,HS_END_OF_CHARACTERS:33,square:34,circle:35,hexagon:36,triangle:37,rightTriangle:38,rectangle:39,heart:40,star:41,arch:42,parallelogram:43,squiggle:44,donut:45,tetrisZ:46,tetrisT:47,tetrisL:48,corner:49,flower:50,threeProngedBoomerang:51,squishedBox:52,bead:53,chevron:54,xShape:55,tetrisLine:56,HS_END_OF_SHAPES:57,toucan:58,anteater:59,crocodile:60,sloth:61,iguana:62,hut:63,penguin:64,winterQueen:65,shyYeti:66,deer:67,elf:68,snowGlobe:69,polarbear:70,sleigh:71,mistletoe:72,snowMan:73,snowflake:74,roundedSquareFullSize:100,squareFullSize:101,circleFullSize:102,hexagonFullSize:103,triangleFullSize:104,rightTriangleFullSize:105,rectangleFullSize:106,heartFullSize:107,starFullSize:108,archFullSize:109,parallelogramTallFullSize:110,squiggleFullSize:111,donutFullSize:112,tetrisZFullSize:113,tetrisTFullSize:114,tetrisLFullSize:115,cornerFullSize:116,flowerFullSize:117,fanbladeFullSize:118,squishedBoxFullSize:119,roundedRightTriangleFullSize:120,arrowRoundedFullSize:121,beadFullSize:122,parallelogramWideFullSize:123,chevronFullSize:124,xFullSize:125,tetrisLineFullSize:126,HS_END_OF_FULL_SIZE_SHAPES:127,HS_NUMBER_OF_OBJECTS:128,image:2e3,nil:1e4,edgeOfScreen:3e4
}

window.replacem = {
ex: '!',
ob: '{',
cb: '}',
device: '📱',
empty: ' ',
op: '(',
cp: ')',
dot:'.'
}



function Block(type, inside, parameters, description) {
	this.type = type;
	if (parameters) {
		this.parameters = parameters;
	}
	if (inside) {
		this.inside = inside;
	}
	if (description) {
		this.description = description;
	}
}

function Parameter(type, key, value,parameters) {
	this.type = type;
	this.key = key;
	this.value = value;
	if (parameters) {
		this.parameters = parameters;
	}
}



function determineBlockType(block) {
	const movement = [23,24,27,28,34,39,41,50];
	const drawing = [26,30,31,32,37,38,46];
	const looks = [29,33,36,40,42,43,47,48,49,51,52,54,56,57];
	const variables = [44,45];
	const control = [19,22,35,53,55,122,124,125,120,121];
	if (movement.indexOf(block.type) != -1) {
		return BlockTypes.movement;
	} else if (drawing.indexOf(block.type) != -1) {
		return BlockTypes.drawing;
	} else if (looks.indexOf(block.type) != -1) {
		return BlockTypes.looks;
	} else if (variables.indexOf(block.type) != -1) {
		return BlockTypes.variables;
	} else if (control.indexOf(block.type) != -1) {
		return BlockTypes.control;
	} else {
		return BlockTypes.custom;
	}
}
