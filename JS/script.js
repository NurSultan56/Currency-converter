// const buttonRUB = document.getElementById('from-rub')
// const buttonUSD = document.getElementById('from-usd')
// const buttonEUR = document.getElementById('from-eur')
// const buttonGBP = document.getElementById('from-gbp')


// buttonRUB.addEventListener('click', () => {
//     buttonRUB.classList.toggle("button-selected")
// })

let [flag1, flag2] = [false, false]

const buttonFrom = document.querySelectorAll('.from')

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

        const buttonSelectedFrom = document.querySelector('#from-container .button-selected').textContent
        const buttonSelectedTo = document.querySelector('#to-container .button-selected').textContent
        fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_iLRJhIPjbHbjjs867JpDVDpiMjrfWXDD3AuI2s6K&currencies=${buttonSelectedTo}&base_currency=${buttonSelectedFrom}`)
            .then((response) => response.json())
            .then((data) => {
                resultInput.value = Number(fromInput.value) * data.data[`${buttonSelectedTo}`]
            })
    })
})

const buttonResult = document.querySelectorAll('.result')

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

        const buttonSelectedFrom = document.querySelector('#from-container .button-selected').textContent
        const buttonSelectedTo = document.querySelector('#to-container .button-selected').textContent
        fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_iLRJhIPjbHbjjs867JpDVDpiMjrfWXDD3AuI2s6K&currencies=${buttonSelectedTo}&base_currency=${buttonSelectedFrom}`)
            .then((response) => response.json())
            .then((data) => {
                resultInput.value = Number(fromInput.value) * data.data[`${buttonSelectedTo}`]
            })
    })
})

const fromInput = document.getElementById('from-amount-input')
const resultInput = document.getElementById('result-amount-input')


fromInput.addEventListener('keyup', () => {
    const buttonSelectedFrom = document.querySelector('#from-container .button-selected').textContent
    const buttonSelectedTo = document.querySelector('#to-container .button-selected').textContent
    fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_iLRJhIPjbHbjjs867JpDVDpiMjrfWXDD3AuI2s6K&currencies=${buttonSelectedTo}&base_currency=${buttonSelectedFrom}`)
        .then((response) => response.json())
        .then((data) => {
            resultInput.value = Number(fromInput.value) * data.data[`${buttonSelectedTo}`]
        })
})