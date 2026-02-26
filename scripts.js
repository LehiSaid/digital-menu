const searchInput = document.getElementById('search')
const list = document.querySelector('ul')
const buttonShowAll = document.querySelector('.show-all')
const buttonMapAll = document.querySelector('.map-all')
const sumAll = document.querySelector('.sum-all')
const filterAll = document.querySelector('.filter-all')
let currentProducts = [...menuOptions] 
const sortButton = document.querySelector('.sort-price')


function formatCurrency(value) {
    const newValue = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) // formata o valor para o formato de moeda brasileira


return newValue // retorna o valor formatado
}

function showAll(productsArray = currentProducts) {
    let myLi = ''

    productsArray.forEach((product) => {
        myLi += `
        <li>
            <img src=${product.src}>
            <p>${product.name}</p>
            <p class="item-price">${formatCurrency(product.price)}</p>
        </li>
        `
    })

    list.innerHTML = myLi
}

function mapAllItems() {
    const newPrices = menuOptions.map((product) => ({
        ...product, // copia as propriedades originais do produto
        price: product.price * 0.9, // 10% de desconto

    }))

    showAll(newPrices) // exibe os produtos com os novos preços  
}

function sumAllItems() {
    const totalValue = menuOptions.reduce((acc, curr) => acc + curr.price, 0) // soma os preços de todos os produtos, começando com um acumulador de 0

       list.innerHTML = `
        <li>
            <p>O valor total dos itens é: ${formatCurrency(totalValue)}</p>
        </li>  
    `
}

function filterAllItems() {
    const filterJustVegan = menuOptions.filter((product) => product.vegan) // filtra os produtos para incluir apenas os veganos

    showAll(filterJustVegan) // exibe apenas os produtos veganos

}

buttonShowAll.addEventListener('click', () => {
    currentProducts = [...menuOptions]
    showAll()
})

buttonMapAll.addEventListener('click', () => {
    currentProducts = currentProducts.map(product => ({
        ...product,
        price: product.price * 0.9
    }))
    showAll()
})

sumAll.addEventListener('click', () => {
    const totalValue = currentProducts.reduce((acc, curr) => acc + curr.price, 0)

    list.innerHTML = `
        <li>
            <p>Valor total: ${formatCurrency(totalValue)}</p>
        </li>
    `
})

filterAll.addEventListener('click', () => {
    currentProducts = menuOptions.filter(product => product.vegan)
    showAll()
})

searchInput.addEventListener('input', () => {
    const value = searchInput.value.toLowerCase()

    currentProducts = menuOptions.filter(product =>
        product.name.toLowerCase().includes(value)
    )

    showAll()
})

sortButton.addEventListener('click', () => {
    currentProducts = [...currentProducts].sort((a, b) => a.price - b.price)
    showAll()
})