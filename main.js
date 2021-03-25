// dom elements
const passwordElem = document.getElementById('password')
const lengthElem = document.getElementById('length')
const upperCaseElem = document.getElementById('uppercase')
const lowerCaseElem = document.getElementById('lowercase')
const numberElem = document.getElementById('numbers')
const symbolElem = document.getElementById('symbols')
const generateElem = document.getElementById('generate')
const clipboardElem = document.getElementById('clipboard')

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}
// Generate event listen
generateElem.addEventListener('click', () => {
    const length = +lengthElem.value
    const hasLower = lowerCaseElem.checked
    const hasUpper = upperCaseElem.checked
    const hasNumber = numberElem.checked
    const hasSymbol = symbolElem.checked

    passwordElem.innerText = generatePassword(
        hasLower,
        hasUpper,
        hasNumber,
        hasSymbol,
        length
    )
})
// Copy password ClipBoard
clipboardElem.addEventListener('click', () => {
    const textarea = document.createElement('textarea')
    const password = passwordElem.innerText

    if (!password) {
        return
    }

    textarea.value = password
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
    alert('Password copied to clipboard!!!')
})

// Generate Password Function
function generatePassword(lower, upper, number, symbol, length) {
// 1 init password variables
// 2 Filter out unchecked types
// 3 Loop over length call generate functions for each type
// 4 Add final password to the passwords var and return

    let generatedPassword = ''

    const typesCount = lower + upper + number + symbol
    const typesArr = [{ lower }, { upper }, { number }, { symbol }]
        .filter(item => Object.values(item)[0])

    if (typesCount === 0) {
        return ''
    }

    for(let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0]
            // console.log('funName', funcName)
            generatedPassword += randomFunc[funcName]()
        })
    }

    const finalPassword = generatedPassword.slice(0, length)
    return finalPassword
}

// Generate Function

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>?,.'
    return symbols[Math.floor(Math.random() * symbols.length)]
}


