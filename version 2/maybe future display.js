const fileInput = document.querySelector('#hopscotchInput');
const output = document.querySelector('#output');
const input = document.querySelector('#input');

const characterSvgs = {bear:'Bear0.svg',parrot:'ParrotFlying0.svg',bird:'Bird0.svg',penguin:'Penguin0.svg',broom:'Broom0.svg',polarbear:'Polarbear0.svg',cauldron:'Cauldron0.svg',pumpkin:'Pumpkin0.svg',chevron:'Chevron0.svg',raccoon:'Raccoon0.svg',chillanna:'Chillanna0.svg',rectangle:'Rectangle0.svg',circle:'Circle0.svg',rtriangle:'RightTriangle0.svg',corner:'Corner0.svg',robo:'Robo0.svg',cody:'Cosmiccody',roundtriangle:'RoundedRightTriangleFullSize0.svg',crocodile:'Crocodile0.svg',roundsquare:'RoundedSquareFullSize0.svg',cupcake:'Cupcake0.svg',yeti:'ShyYeti0.svg',deer:'Deer0.svg',sleigh:'Sleigh0.svg',dino:'Dino0.svg',sloth:'Sloth0.svg',donut:'Donut0.svg',snowglobe:'SnowGlobe0.svg',elf:'Elf0.svg',gonzalo:'SnowMan0.svg',fanblade:'FanbladeFullSize0.svg',snowflake:'Snowflake0.svg',flower:'Flower0.svg',spacepod:'Spacepod0.svg',frankenrilla:'Frankenrilla0.svg',square:'Square0.svg',frog:'Frog0.svg',squiggle:'Squiggle0.svg',ghoulopus:'Ghoulopus0.svg',squishedbox:'SquishedBox0.svg',gorilla:'Gorilla0.svg',star:'Star0.svg',jody:'Greenman0.svg',stargirl:'Stargirl0.svg',heart:'Heart0.svg',Lshape:'TetrisL0.svg',hexagon:'Hexagon0.svg',platform:'TetrisLine0.svg',hut:'Hut0.svg',Vshape:'TetrisTV30.svg',iguana:'Iguana0.svg',Zshape:'TetrisZ0.svg',jeep:'Jeepers0.svg',fanblade2:'ThreeProngedBoomerang0.svg',witch:'JodyWitch0.svg',toucan:'Toucan0.svg',lantern:'Lantern0.svg',triangle:'Triangle0.svg',mandrill:'Mandrill0.svg',flytrap:'Venus0.svg',misschief:'MissChief0.svg',ana:'WinterQueen0.svg',mistle:'Mistletoe0.svg',Xshape:'XFullSize0.svg',monkey:'Monkey0.svg',zombear:'ZombieBear0.svg',mosquito:'Mosquito0.svg',anteater:'anteater',mustache:'Mustache0.svg',arch:'arch',octo:'Octopus0.svg',banyan:'banyan',parallelogram:'Parallelogram0.svg',bats:'bats',Wparallelogram:'ParallelogramWideV30.svg',bead:'bead'};

const blockHeight = 46;
const marginInsideBlock = 16;

function errorMessage(saying) {
	const message = document.createElement('div');
	message.classList.add('error');
	message.innerHTML = saying;
	return message;
}

function clearElement(e) {
while(e.firstChild) {
		e.removeChild(e.firstChild);
	}
}

window.onerror = (msg,url,l,c,error) => {
clearElement(output);
output.appendChild(errorMessage(msg + '\n Line: ' + error.location.start.line + ' column: ' + error.location.start.column));
}

function blockToImageInstructions(block) {
	const i = {id: Math.random()};
	i.height = blockHeight;
	i.width = minimumWidth;
	if (block.description) {
		i.description = block.description;
	}

console.log(i);
}


function imageFromInstructions(i) {
}


function imageFrom(block) {
	const i = blockToImageInstructions(block);
	return imageFromInstructions(i);
}




input.addEventListener('change', (e) => {
	const readyToParse = e.target.value;	
	console.log(readyToParse);
	const parsedCode = Parser.parse(readyToParse);
	if (parsedCode){
		console.log(parsedCode);
		//display
		imageFrom(parsedCode);
	}
});

const objectsList = document.querySelector('#objectsList');
for (let [key, value] of Object.entries(characterSvgs)) {
    if (characterSvgs.hasOwnProperty(key)){
    	const li = document.createElement('li');
	li.innerHTML = key + `: <img src=svgs/${value}.svg height=50>`;
	objectsList.appendChild(li);
    }
}