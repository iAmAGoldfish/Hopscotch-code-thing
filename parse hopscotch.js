const maxParameterValueLength = 25;






function parseParameterFromHopscotch(parameter, variables) {
	let value = parameter.value;
	if (value != value.substring(0,maxParameterValueLength)) {
		value = value.substring(0,maxParameterValueLength) + '...';
	}
	let key = parameter.key;
	
	if (parameter.datum) {
		const datum = parameter.datum;
		if (datum.params) {
			const params = datum.params;
			const parameters = [];
			params.forEach((param) => {
				
				const parsedParam = parseParameterFromHopscotch(param,variables);
				parameters.push(parsedParam);
			});
			
			return new Parameter(parameter.type,parameter.key,'',parameters);
		} else {
			
		}
		
			if (parameter.datum.description) {
				value = parameter.datum.description;
				if (parameter.datum.variable) {
					value = variables[parameter.datum.variable].name;
				}
			}
	}
	return new Parameter(parameter.type,key,value);
}



function parseAbility(ability,abilitiesList,previousAbility,variables) {
if (!previousAbility) {
previousAbility = [];
}
const blocks = ability.blocks;
				const abilityInside = [];
let blockInside;
let elsee;
if (!blocks) {return}
				blocks.forEach((block) => {
					//Unfinished block code
					//if (block.block_class != 'control' && block.block_class != 'conditionalControl') {
						const blockParameters = [];
						if (block.parameters) {
							const parametersOfBlock = block.parameters;
							parametersOfBlock.forEach((parameter) => {
								
				blockParameters.push(parseParameterFromHopscotch(parameter,variables));
							});
						}
												if (block.controlScript) {
if (!previousAbility || previousAbility.indexOf(block.controlScript.abilityID) == -1) {

						const controlScript = block.controlScript.abilityID;
console.log(controlScript);
previousAbility.push(controlScript)
						const csAbility = abilitiesList[controlScript];
						blockInside = parseAbility(csAbility,abilitiesList,previousAbility,variables);
}
					} else {
						blockInside = undefined;
					}
if (block.description == 'Set Image' && blockParameters[0]) {blockParameters[0].key = 'to'}

if (block.controlFalseScript) {
if (!previousAbility || previousAbility.indexOf(block.controlFalseScript.abilityID) == -1) {

						const controlScript = block.controlFalseScript.abilityID;
console.log(controlScript);
previousAbility.push(controlScript)
						const csAbility = abilitiesList[controlScript];
						elsee = new Block(BlockTypes.control,parseAbility(csAbility,abilitiesList,previousAbility,variables),false,'else');
}
					} else {
						elsee = undefined;
					}
						

const blockType = determineBlockType(block);

						const parsedBlock = new Block(blockType,blockInside,blockParameters,block.description);
						
						abilityInside.push(parsedBlock);
						if (elsee) {
						abilityInside.push(elsee);}
					/*} else {
						
					}*/});
return abilityInside;
}

function parseHopscotchProject(project) {
	const scenes = project.scenes;
	const result = new Block(-1, []);
	const allObjects = project.objects;
	const objectsList = {};
	allObjects.forEach((object) => {
		const id = object.objectID;
		objectsList[id] = object;
	});
	const allVariables = project.variables;
	const variablesList = {};
	allVariables.forEach((variable) => {
		const id = variable.objectIdString;
		variablesList[id] = variable;
	});

	const allRules = project.rules;
	const rulesList = {};
	allRules.forEach((rule) => {
		const id = rule.id;
		rulesList[id] = rule;
	});
	const allAbilities = project.abilities;
	const abilitiesList = {};
	allAbilities.forEach((ability) => {
		const id = ability.abilityID;
		abilitiesList[id] = ability;
	});
	console.log(objectsList, rulesList);
	scenes.forEach((scene) => {
		const inside = [];
		const objects = scene.objects;
		objects.forEach((objectID) => {
			const object = objectsList[objectID];
			const parameter = new Parameter(50,object.name,object.type);
			const rules = object.rules;
			const insideObject = [];
			rules.forEach((ruleID) => {
				const rule = rulesList[ruleID];
if (rule) {
				let ruleParameter;
				if (rule.parameters) {
					ruleParameter = parseParameterFromHopscotch(rule.parameters[0],variablesList);
				} else {
					ruleParameter = new Parameter(ParameterTypes.rule,'','Missing parameter');
					
				}
				/*
				let ruleParameter;
				if (rule.parameters[0].datum) {
					ruleParameter = new Parameter(ParameterTypes.rule,'When',rule.parameters[0].datum.description);
				} else {
					ruleParameter = new Parameter(ParameterTypes.rule,'When','\📱 Unknown');
				}
				*/
				const ability = abilitiesList[rule.abilityID];
				const abilityInside = parseAbility(ability,abilitiesList,[],variablesList);
					
				
				
				const parsedRule = new Block(BlockTypes.rule,abilityInside,[ruleParameter],'When');
				insideObject.push(parsedRule);}
			});
			const parsedObject = new Block(BlockTypes.object,insideObject,[parameter]);
			inside.push(parsedObject);
		});
		result.inside.push(new Block(BlockTypes.scene, inside, false, scene.name));
	})
	console.log(JSON.stringify(result));
	console.log(result);
	return result;

}

