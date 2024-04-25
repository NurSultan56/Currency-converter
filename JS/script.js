
const fromInput = document.getElementById('from-amount-input')
const resultInput = document.getElementById('result-amount-input')

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const getCurrencyData = async () => {
    const buttonSelectedFrom = document.querySelector('#from-container .button-selected').textContent
    const buttonSelectedTo = document.querySelector('#to-container .button-selected').textContent
    console.log(buttonSelectedFrom)
    console.log(buttonSelectedTo)
    if (buttonSelectedFrom === buttonSelectedTo) {
            resultInput.value = fromInput.value
            const currencyDescription = document.querySelectorAll('.currency-description')

            currencyDescription.forEach((item) => {
                item.textContent = `1 ${buttonSelectedFrom} = 1 ${buttonSelectedTo}`
            })
    } else {
            await timeout(100)
            console.log('ok')
            const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${buttonSelectedFrom.toLowerCase()}.min.json`)
            const data = await response.json()
            return data[`${buttonSelectedFrom.toLowerCase()}`]

    }
}

const getInverseCurrencyData = async () => {
    const buttonSelectedFrom = document.querySelector('#from-container .button-selected').textContent
    const buttonSelectedTo = document.querySelector('#to-container .button-selected').textContent
    await timeout(100)
    const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024.4.24/v1/currencies/${buttonSelectedTo.toLowerCase()}.min.json`)
    const data = await response.json()
    return data[`${buttonSelectedTo.toLowerCase()}`]
}


fromInput.addEventListener('keyup', () => {
    getCurrencyData()
        .then((data) => {
            switch (fromInput.value) {
                case '':
                    resultInput.value = 0
                    break
                default:
                    if (data != undefined)
                    {
                    const buttonSelectedTo = document.querySelector('#to-container .button-selected').textContent
                    const buttonSelectedFrom = document.querySelector('#from-container .button-selected').textContent
                    resultInput.value = Number(fromInput.value) * data[`${buttonSelectedTo.toLowerCase()}`]
                    const currencyDescriptionFrom = document.getElementById('currency-description-from')
                    currencyDescriptionFrom.textContent = `1 ${buttonSelectedFrom} = ${data[buttonSelectedTo.toLowerCase()]} ${buttonSelectedTo}`

                    getInverseCurrencyData()
                        .then((data) => {
                            const currencyDescriptionTo = document.getElementById('currency-description-to')
                            currencyDescriptionTo.textContent = `1 ${buttonSelectedTo} = ${data[buttonSelectedFrom.toLowerCase()]} ${buttonSelectedFrom}`
                        })
                        .catch(error => {
                            console.log(error)
                        })
                    }
            }
        })
        .catch(error => {
            console.log(error)
        })
})

let [flag1, flag2] = [false, false]   //FLAGS

const buttonFrom = document.querySelectorAll('.from')  //FROM BUTTONS WORK

buttonFrom.forEach((item) => {
    item.addEventListener('click', () => {
        if (flag1 === true) {
            buttonFrom.forEach((item) => {
                item.classList.remove("button-selected")
            })
            item.classList.add("button-selected")
            flag1 = false
        } else {
            item.classList.remove("button-selected")
            flag1 = true
        }

        getCurrencyData()
        .then((data) => {
            switch (fromInput.value) {
                case '':
                    resultInput.value = 0
                    break
                default:
                    if (data != undefined)
                    {
                    const buttonSelectedTo = document.querySelector('#to-container .button-selected').textContent
                    const buttonSelectedFrom = document.querySelector('#from-container .button-selected').textContent
                    resultInput.value = Number(fromInput.value) * data[`${buttonSelectedTo.toLowerCase()}`]
                    const currencyDescriptionFrom = document.getElementById('currency-description-from')
                    currencyDescriptionFrom.textContent = `1 ${buttonSelectedFrom} = ${data[buttonSelectedTo.toLowerCase()]} ${buttonSelectedTo}`

                    getInverseCurrencyData()
                        .then((data) => {
                            const currencyDescriptionTo = document.getElementById('currency-description-to')
                            currencyDescriptionTo.textContent = `1 ${buttonSelectedTo} = ${data[buttonSelectedFrom.toLowerCase()]} ${buttonSelectedFrom}`
                        })
                        .catch(error => {
                            console.log(error)
                        })
                    }
            }
        })
        .catch(error => {
            console.log(error)
        })
    })
})


const buttonResult = document.querySelectorAll('.result')  //TO BUTTONS WORK

buttonResult.forEach((item) => {
    item.addEventListener('click', () => {
        if (flag2 === true) {
            buttonResult.forEach((item) => {
                item.classList.remove("button-selected")
            })
            item.classList.add("button-selected")
            flag2 = false
        } else {
            item.classList.remove("button-selected")
            flag2 = true
        }

        getCurrencyData()
        .then((data) => {
            switch (fromInput.value) {
                case '':
                    resultInput.value = 0
                    break
                default:
                    if (data != undefined)
                    {
                    const buttonSelectedTo = document.querySelector('#to-container .button-selected').textContent
                    const buttonSelectedFrom = document.querySelector('#from-container .button-selected').textContent
                    resultInput.value = Number(fromInput.value) * data[`${buttonSelectedTo.toLowerCase()}`]
                    const currencyDescriptionFrom = document.getElementById('currency-description-from')
                    currencyDescriptionFrom.textContent = `1 ${buttonSelectedFrom} = ${data[buttonSelectedTo.toLowerCase()]} ${buttonSelectedTo}`

                    getInverseCurrencyData()
                        .then((data) => {
                            const currencyDescriptionTo = document.getElementById('currency-description-to')
                            currencyDescriptionTo.textContent = `1 ${buttonSelectedTo} = ${data[buttonSelectedFrom.toLowerCase()]} ${buttonSelectedFrom}`
                        })
                        .catch(error => {
                            console.log(error)
                        })
                    }
            }
        })
        .catch(error => {console.log(error)})
        })
    })