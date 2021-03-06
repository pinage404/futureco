import { bonus, evaluateNode, mergeMissing } from 'Engine/evaluation'
import { keys, map, mergeAll, pick, pipe } from 'ramda'
import { anyNull, undefOrTrue, val } from './traverse-common-functions'

export default (cache, situationGate, parsedRules, node) => {
	//		console.log((cache.op || ">").padStart(cache.parseLevel),rule.dottedName)
	cache.parseLevel++

	let evaluatedAttributes = pipe(
			pick([
				'parentDependency',
				'non applicable si',
				'applicable si',
				'rendu non applicable'
			]),
			map(value => evaluateNode(cache, situationGate, parsedRules, value))
		)(node),
		{
			parentDependency,
			'non applicable si': notApplicable,
			'applicable si': applicable,
			'rendu non applicable': disabled
		} = evaluatedAttributes,
		isApplicable =
			val(parentDependency) === false ||
			val(notApplicable) === true ||
			val(applicable) === false ||
			val(disabled) === true
				? false
				: anyNull([notApplicable, applicable, parentDependency])
				? null
				: !val(notApplicable) && undefOrTrue(val(applicable)),
		evaluateFormula = () =>
			node.formule
				? evaluateNode(cache, situationGate, parsedRules, node.formule)
				: {},
		// evaluate the formula lazily, only if the applicability is known and true
		evaluatedFormula =
			isApplicable === true
				? evaluateFormula()
				: isApplicable === false
				? {
						...node.formule,
						missingVariables: {},
						nodeValue: 0
				  }
				: {
						...node.formule,
						missingVariables: {},
						nodeValue: null
				  },
		{ missingVariables: formulaMissingVariables, nodeValue } = evaluatedFormula

	// if isApplicable === true
	// evaluateControls
	// attache them to the node for further usage
	// do not output missingVariables for now

	let condMissing =
			isApplicable === false
				? {}
				: mergeAll([
						parentDependency?.missingVariables || {},
						notApplicable?.missingVariables || {},
						applicable?.missingVariables || {}
				  ]),
		// On veut abaisser le score des conséquences par rapport aux conditions,
		// mais seulement dans le cas où une condition est effectivement présente
		hasCondition = keys(condMissing).length > 0,
		missingVariables = mergeMissing(
			bonus(condMissing, hasCondition),
			formulaMissingVariables
		)
	cache.parseLevel--
	//		if (keys(condMissing).length) console.log("".padStart(cache.parseLevel-1),{conditions:condMissing, formule:formMissing})
	//		else console.log("".padStart(cache.parseLevel-1),{formule:formMissing})
	return {
		...node,
		...evaluatedAttributes,
		...{ formule: evaluatedFormula },
		nodeValue,
		isApplicable,
		missingVariables,
		inactiveParent: parentDependency && val(parentDependency) == false
	}
}
