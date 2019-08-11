const fileInput = document.querySelector('#hopscotchInput');
const output = document.querySelector('#output');
const input = document.querySelector('#input');

function errorMessage(saying) {
	const message = document.createElement('div');
	message.classList.add('error');
	message.innerHTML = saying;
	return message;
}

window.onerror = (msg,url,l,c,error) => {
output.appendChild(errorMessage(msg + '\n Line: ' + error.location.start.line + ' column: ' + error.location.start.column));
}

function displayParameter(parameter,depth) {
const parameterE = document.createElement('span');
				parameterE.textContent = parameter.key;
				const bubble = document.createElement('div');
				bubble.classList.add('parameterBubble');
				let hasParameter = parameter.parameters;
if (hasParameter) {
hasParameter = parameter.parameters[0];
}
				if (!hasParameter) {

					if (true/*parameter.type != ParameterTypes.object*/) {
						bubble.innerHTML = parameter.value;
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
	
parameterE.appendChild(bubble);

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
			text.textContent = description + ' ';
		}
		if (block.parameters && block.parameters.length > 0) {
			block.parameters.forEach((parameter) => {
				//console.log(parameter.value);
				
				text.appendChild(displayParameter(parameter,0));
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
	const readyToParse = removeShortcuts(e.target.value);	
	console.log(readyToParse);
	const parsedCode = Parser.parse(readyToParse);
	if (parsedCode){
console.log(parsedCode);
		const out = document.createElement('div');
		display(parsedCode,out);
document.body.appendChild(out);
		html2canvas(out).then(function(canvas) {
   			document.body.removeChild(out);
			const dataURL = canvas.toDataURL();
			const img = document.createElement('img');
			img.src = dataURL;
			output.appendChild(img);
		});
	}
});