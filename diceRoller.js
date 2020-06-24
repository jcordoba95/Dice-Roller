const log = {
    operations: []
}

const roll = function (amount, dice) {
    const individualRolls = []
    var result = 0
    while (amount > 0) {
        let roll = Math.floor(Math.random() * dice + 1)
        individualRolls.push(roll)
        result += roll
        amount--
    }
    return { 'rolls': individualRolls, 'total': result }
}

const sanitizer = function (formula) {
    const regex = /[^d)(+*\/\d\-]/g
    return formula.replace(regex, '')
}

const diceRoller = function (formula) {
    formula = sanitizer(formula)
    const regex = /(\d+d\d+)/g
    var processedFormula = formula
    log.operations.push({ 'formula': formula, 'rolls': [], 'total': 0 })
    
    formula.match(regex).forEach(element => {
        let [amount, dice] = element.split('d')
        let diceRoll = roll(amount, dice)
        log.operations[log.operations.length - 1].rolls.push({
            'roll': element,
            'individualRolls': diceRoll.rolls,
            'total': diceRoll.total
        })
        // Replace only first occurence
        processedFormula = processedFormula.replace(element, diceRoll.total)
    })
    log.operations[log.operations.length - 1].total = eval(processedFormula)
    log.operations[log.operations.length - 1].processedFormula = processedFormula
    return processedFormula
}
diceRoller('1d4 - 1d4 * 1d4 / 1d4')
console.log(log)