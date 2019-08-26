const fileInput = document.querySelector('#hopscotchInput');
const output = document.querySelector('#output');
const input = document.querySelector('#input');

const characterSvgs = {bear:'Bear0.svg',parrot:'ParrotFlying0.svg',bird:'Bird0.svg',penguin:'Penguin0.svg',broom:'Broom0.svg',polarbear:'Polarbear0.svg',cauldron:'Cauldron0.svg',pumpkin:'Pumpkin0.svg',chevron:'Chevron0.svg',raccoon:'Raccoon0.svg',chillanna:'Chillanna0.svg',rectangle:'Rectangle0.svg',circle:'Circle0.svg',rtriangle:'RightTriangle0.svg',corner:'Corner0.svg',robo:'Robo0.svg',cody:'Cosmiccody',roundtriangle:'RoundedRightTriangleFullSize0.svg',crocodile:'Crocodile0.svg',roundsquare:'RoundedSquareFullSize0.svg',cupcake:'Cupcake0.svg',yeti:'ShyYeti0.svg',deer:'Deer0.svg',sleigh:'Sleigh0.svg',dino:'Dino0.svg',sloth:'Sloth0.svg',donut:'Donut0.svg',snowglobe:'SnowGlobe0.svg',elf:'Elf0.svg',gonzalo:'SnowMan0.svg',fanblade:'FanbladeFullSize0.svg',snowflake:'Snowflake0.svg',flower:'Flower0.svg',spacepod:'Spacepod0.svg',frankenrilla:'Frankenrilla0.svg',square:'Square0.svg',frog:'Frog0.svg',squiggle:'Squiggle0.svg',ghoulopus:'Ghoulopus0.svg',squishedbox:'SquishedBox0.svg',gorilla:'Gorilla0.svg',star:'Star0.svg',jody:'Greenman0.svg',stargirl:'Stargirl0.svg',heart:'Heart0.svg',Lshape:'TetrisL0.svg',hexagon:'Hexagon0.svg',platform:'TetrisLine0.svg',hut:'Hut0.svg',Vshape:'TetrisTV30.svg',iguana:'Iguana0.svg',Zshape:'TetrisZ0.svg',jeep:'Jeepers0.svg',fanblade2:'ThreeProngedBoomerang0.svg',witch:'JodyWitch0.svg',toucan:'Toucan0.svg',lantern:'Lantern0.svg',triangle:'Triangle0.svg',mandrill:'Mandrill0.svg',flytrap:'Venus0.svg',misschief:'MissChief0.svg',ana:'WinterQueen0.svg',mistle:'Mistletoe0.svg',Xshape:'XFullSize0.svg',monkey:'Monkey0.svg',zombear:'ZombieBear0.svg',mosquito:'Mosquito0.svg',anteater:'anteater',mustache:'Mustache0.svg',arch:'arch',octo:'Octopus0.svg',banyan:'banyan',parallelogram:'Parallelogram0.svg',bats:'bats',Wparallelogram:'ParallelogramWideV30.svg',bead:'bead'};

function errorMessage(saying) {
	const message = document.createElement('div');
	message.classList.add('error');
	message.innerHTML = saying;
	return message;
}

function displayTextForParameter(e,text) {
	if (text) {
	const newText = text.replace(/\[\w+\]/gi, match => {
		if (characterSvgs.hasOwnProperty(match.substring(1,match.length-1))) {
			return `<img src="svgs/${characterSvgs[match.substring(1,match.length-1)]}.svg" height=30>`;
		}
		return match;
	});
	e.innerHTML = newText;}
	return e;
}

window.onerror = (msg,url,l,c,error) => {
output.appendChild(errorMessage(msg + '\n Line: ' + error.location.start.line + ' column: ' + error.location.start.column));
}

function displayParameter(parameter,depth,blockType) {
const parameterE = document.createElement('span');
if (parameter.type != ParameterTypes.variable) {
				displayTextForParameter(parameterE,parameter.key);
				const bubble = document.createElement('span');
				bubble.classList.add('parameterBubble');
				let hasParameter = parameter.parameters;
if (hasParameter) {
hasParameter = parameter.parameters[0];
}
				if (!hasParameter) {

					if (true/*parameter.type != ParameterTypes.object*/) {
						displayTextForParameter(bubble,parameter.value);//bubble.innerHTML = parameter.value;
						if (parameter.type == ParameterTypes.rule) {
							bubble.classList.add('when');
						}

					} else {
						bubble.classList.add('object');
						bubble.innerHTML = parameter.value;
					}
				
				} else {
					bubble.style.backgroundColor = `rgb(150,110,150)`;
					bubble.style.borderColor = '#000';
					parameter.parameters.forEach((param) => {
						bubble.appendChild(displayParameter(param,depth++));
console.log(param.key);
					});
				}
if (blockType && blockType !== 0) {
					if (blockType == BlockTypes.object) {bubble.style.backgroundColor = '#0F9BC0'}
					if (blockType == BlockTypes.rule) {bubble.style.backgroundColor = '#AC2052'}}
	if (parameter.value || parameter.parameters) {
parameterE.appendChild(bubble);
}
} else {
	const bubble = document.createElement('span');
	bubble.classList.add('parameterBubble');
	bubble.style.backgroundColor = '#FBD42B';
	const object = document.createElement('span');
	object.classList.add('parameterBubble');
	displayTextForParameter(object,parameter.key);
	bubble.appendChild(object);
	const text = document.createElement('span');
	displayTextForParameter(text,parameter.value);
	bubble.appendChild(text);
	parameterE.appendChild(bubble);
}
return parameterE;

}


function makeInsideElement(block) {
	const output = document.createElement('div');
	block.inside.forEach((block) => {
		const e = document.createElement('div');
		e.classList.add('block');
		if (block.type != 9) {
			e.classList.add(`blockType${block.type}`);
		} else {
			e.classList.add(`blockType${Math.floor(Math.random() * 8)}`);
		}
		const text = document.createElement('span');
		
		if (block.description) {
			let description = block.description; //Unfinished
			if (block.type == 9) {
				description = description.split('').reverse().join('');
			}
			displayTextForParameter(text,description + ' ');;
		}
		if (block.parameters && block.parameters.length > 0) {
			block.parameters.forEach((parameter) => {
				//console.log(parameter.value);
				
				text.appendChild(displayParameter(parameter,0,block.type));
			});
		}
		e.appendChild(text);

		const moveBlock = document.createElement('span');
		moveBlock.classList.add('moveBlock');
		moveBlock.classList.add(`moveBlockType${block.type}`);
		moveBlock.textContent = '≡';
		e.appendChild(moveBlock);
		if (block.inside) {
			e.appendChild(document.createElement('br'));
			e.classList.add('control');
			const insideElement = document.createElement('div');
			insideElement.classList.add('inside');
			insideElement.classList.add('block');
			const nextBlocks = makeInsideElement(block);
			insideElement.appendChild(nextBlocks);
			e.appendChild(insideElement);
		}
		
		output.appendChild(e);
		output.appendChild(document.createElement('br'));
	});
	return output;
	
}


function display(blocks, output) {
	while(output.firstChild) {
		output.removeChild(output.firstChild);
	}
	if (blocks.type != -1) {
		output.appendChild(errorMessage(`Main block's type is not -1. Instead, it is ${blocks.type}. Check console for the JSON form of blocks.`));
		console.log(blocks,JSON.stringify(blocks));
		return;
	}
	const e = makeInsideElement(blocks);
	output.appendChild(e);
	
}

fileInput.addEventListener('change', () => {
	const fr = new FileReader();
	fr.onload = () => {
		const result = fr.result;
		console.log(JSON.parse(result));
		const parsedProject = parseHopscotchProject(JSON.parse(result));
		if (!document.querySelector('#images').checked) {
		const out = document.createElement('div');
		display(parsedProject,out);
document.body.appendChild(out);
		html2canvas(out).then(function(canvas) {
   			document.body.removeChild(out);
			const dataURL = canvas.toDataURL();
			const img = document.createElement('img');
			img.src = dataURL;
			output.appendChild(img);
		});} else {
			display(parsedProject,output);

		}
	}
	fr.readAsText(fileInput.files[0]);
});

input.addEventListener('change', (e) => {
	const readyToParse = e.target.value;	
	console.log(readyToParse);
	const parsedCode = Parser.parse(readyToParse);
	if (parsedCode){
console.log(parsedCode);
		const out = document.createElement('div');
		display(parsedCode,out);
document.body.appendChild(out);
		html2canvas(out, {backgroundColor: null}).then(function(canvas) {
   			document.body.removeChild(out);
			const dataURL = canvas.toDataURL();
			const img = document.createElement('img');
			img.src = dataURL;
			const newThing = document.createElement('div');
			newThing.appendChild(img);
			while (output.firstChild) {
    output.removeChild(output.firstChild);
}
			output.appendChild(newThing);
		});
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
