function f(text) {
return text.replace(/\(/g,'[op]').replace(/\)/g,'[cp]').replace(/{/g,'[ob]').replace(/}/g,'[cb]').replace(/!/g,'[ex]').replace(/\./g,'[dot]');
}

function parseHopscotchProject(project) {
	let output = '';
	const scenes = project.scenes;
	const objects = project.objects;
	const ol = {};
	objects.forEach(object => {
		ol[object.objectID] = object;
	});

	const rules = project.rules;
	const rl = {};
	rules.forEach(rule => {
		rl[rule.id] = rule;
	});
	
	const abilities = project.abilities;
	const al = {};
	abilities.forEach(ability => {
		al[ability.abilityID] = ability;
	});
	
	scenes.forEach(scene => {
		output += f(scene.name) + '!scene' + '{';
		const objects = scene.objects;
		objects.forEach(o => {
			const object = ol[o];
			output += '\n' + f(object.name) + '([' + object.filename.substring(0,object.filename.length -4) + '])' + '!object{\n'
			object.rules.forEach(r => {
				rule = rl[r] || {abilityID:al[0],parameters:[{"datum":{"description":"Broken"}}]};
				if (rule.name) {
					output += f(rule.name) + '!custom{\n'
				}
				output += 'When (' + hopscotchWhenParametersToCode(rule.parameters) + '){\n';
				
				output += hopscotchAbilityToCode(rule.abilityID,al,[]);

				if (rule.name) {
					output += '}';
					//End of custom if custom rules
				}
				output += '}\n' //This ends the inside part of the rule
			});


			output += '}\n'; /*This ends the inside part of the object*/
		});


		output += '}\n'; /*This ends the inside part of the scene*/
	});
	return output;
}

function hopscotchWhenParametersToCode(parameters) {
/*TEMPORARY*/
	return f(parameters[0].datum.description);
/*TEMPORARY*/
}

function hopscotchAbilityToCode(ability, al, ual) {
let output = '';
if (al[ability]) {
al[ability].blocks.forEach(block => {
	output += f(block.description);
	if (block.parameters) {
		block.parameters.forEach(parameter => {
			//TEMPORARY
			if (/[^a-zA-Z=÷\-×\^%<>≠"'\[\]\+\-_\_\\0-9:/\?,&$#@;☺️*️⃣＞＜]+/g.test(f(parameter.value))) {
				parameter.value = parameter.value.replace(/\s/g,'[blank]');
			}
			output += ' ' + parameter.key + ' (' + f(parameter.value) + ')';
			//TEMPORARY
	});}

	if (block.type == 123){
		output += '!custom';
	}
	if (block.controlScript) {
		if (ual.indexOf(block.controlScript.abilityID) == -1) {

		ual += block.controlScript.abilityID;
		output += '{\n';
		output += hopscotchAbilityToCode(block.controlScript.abilityID,al,ual);		
		output += '}';
		block.hasCSParsed = true;
		}
	}
	if (block.controlFalseScript) {
		if (ual.indexOf(block.controlFalseScript.abilityID) == -1 && block.hasCSParsed) {
		if (al[block.controlScript.abilityID].blocks) {
			if (al[block.controlScript.abilityID].blocks.length > 0) {
				output += ' else {\n';
				output += hopscotchAbilityToCode(block.controlFalseScript.abilityID,al,ual);
				output += '}'
			}
		}
		}
	}

	
	output += '\n' //End of block
});
}
return output;
}