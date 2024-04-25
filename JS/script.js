// const buttonRUB = document.getElementById('from-rub')
// const buttonUSD = document.getElementById('from-usd')
// const buttonEUR = document.getElementById('from-eur')
// const buttonGBP = document.getElementById('from-gbp')


// buttonRUB.addEventListener('click', () => {
//     buttonRUB.classList.toggle("button-selected")
// })


const fromInput = document.getElementById('from-amount-input')
const resultInput = document.getElementById('result-amount-input')

const getCurrencyData = async () => {
    const buttonSelectedFrom = document.querySelector('#from-container .button-selected').textContent
    const buttonSelectedTo = document.querySelector('#to-container .button-selected').textContent
    switch (buttonSelectedFrom) {
        case buttonSelectedTo:
            resultInput.value = fromInput.value
            const currencyDescription = document.querySelectorAll('.currency-description')

            currencyDescription.forEach((item)=>{
                item.textContent = `1 ${buttonSelectedFrom} = 1 ${buttonSelectedTo}`
            })
            break
        default:
            const response = await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_iLRJhIPjbHbjjs867JpDVDpiMjrfWXDD3AuI2s6K&currencies=${buttonSelectedTo}&base_currency=${buttonSelectedFrom}`)
            const data = await response.json()
            return data

    }
}

const getInverseCurrencyData = async () => {
    const buttonSelectedFrom = document.querySelector('#from-container .button-selected').textContent
    const buttonSelectedTo = document.querySelector('#to-container .button-selected').textContent
    const response = await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_iLRJhIPjbHbjjs867JpDVDpiMjrfWXDD3AuI2s6K&currencies=${buttonSelectedFrom}&base_currency=${buttonSelectedTo}`)
    const data = await response.json()
    return data
}




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
    })
})


fromInput.addEventListener('keyup', () => {
    setTimeout(getCurrencyData()
    .then((data) => {
        const buttonSelectedTo = document.querySelector('#to-container .button-selected').textContent
        resultInput.value = Number(fromInput.value) * data.data[`${buttonSelectedTo}`]
        const buttonSelectedFrom = document.querySelector('#from-container .button-selected').textContent
        const currencyDescriptionFrom = document.getElementById('currency-description-from')
        currencyDescriptionFrom.textContent = `1 ${buttonSelectedFrom} = ${data.data[buttonSelectedTo]} ${buttonSelectedTo}`

        getInverseCurrencyData()
            .then((data) => {
                const currencyDescriptionTo = document.getElementById('currency-description-to')
                currencyDescriptionTo.textContent = `1 ${buttonSelectedTo} = ${data.data[buttonSelectedFrom]} ${buttonSelectedFrom}` 
            })
            .catch(error => {
                alert(error=`Вы превысили лимит допустимых обращений! (Так как используемый API бесплатный, имеется определенный лимит). Пожалуйста побробуйте обратиться чуть позже


You reached limit of call! (Since the API used is free, there is a limit on calls). Please try later!`)
            })
    .catch(error => {
        alert(error=`Вы превысили лимит допустимых обращений! (Так как используемый API бесплатный, имеется определенный лимит). Пожалуйста побробуйте обратиться чуть позже



You reached limit of call! (Since the API used is free, there is a limit on calls). Please try later!`)
    })
        
    }) ,2000)  
})