const output = document.querySelector('#output');
const input = document.querySelector('#input');




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

function parseAndDisplay(input) {document.body.classList.add('wide');
	const readyToParse = input.value;
	let parsedCode	
	try {
	parsedCode = Parser.parse(readyToParse);
	} catch (error) {
	output.appendChild(errorMessage(error.message + '\n Line: ' + error.location.start.line + ' column: ' + error.location.start.column));
	}
	if (parsedCode){
console.log(parsedCode);
		const out = document.createElement('div');
		display(parsedCode,out);
document.body.appendChild(out);
		out.scrollIntoView()
		html2canvas(out, {backgroundColor: null}).then(function(canvas) {
   			document.body.removeChild(out);
			let img;
			try {
			const dataURL = canvas.toDataURL();
			const img = document.createElement('img');
			img.src = dataURL;

			} catch(e) {
			img = canvas;
			console.log(e,img)
			}
			const newThing = document.createElement('div');
			newThing.appendChild(img);
			while (output.firstChild) {
    output.removeChild(output.firstChild);
}
			output.appendChild(newThing);
		});
	}
	document.body.classList.remove('wide');}


input.addEventListener('input', (e) => {
	parseAndDisplay(e.target);
});


