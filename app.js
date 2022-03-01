const shoppingCar = document.getElementById('shoppingCar')
const templateShoppingCar = document.getElementById('templateShoppingCar')
const button = document.querySelectorAll('.card-details .button-drink')
const fragment = document.createDocumentFragment()
const footer = document.getElementById('footer')
const templateFooter = document.getElementById('templateFooter')


document.addEventListener('click', e =>{
    //console.log(e.target.matches('.card-details .button'));
    if(e.target.matches('.card-details .button-drink')){
        shopping(e)
    }
    if(e.target.matches('.rev-add .add')){
        addButton(e)
    }
    if(e.target.matches('.rev-add .remove')){
        removeButton(e)
    }
})

let shoppingObject = []

const shopping = (e) => {
    //console.log('diste click', e.target.dataset);
    const product = {
        title: e.target.dataset.drink,
        id: e.target.dataset.drink,
        lot: 1,
        price: e.target.dataset.price,
    }
    //console.log(product);
    const indice = shoppingObject.findIndex(
        item => item.id === product.id
    )
    if(indice === -1){
        shoppingObject.push(product)
    }else{
        shoppingObject[indice].lot ++
    }
    //console.log(indice);

    printCart()
}

const printCart = () => {
    shoppingCar.textContent = ''

    shoppingObject.forEach(item => {
        const clone = templateShoppingCar.content.cloneNode(true)
        clone.querySelector('.description .title').textContent = item.id
        clone.querySelector('.description .lot').textContent = item.lot
        clone.querySelector('.article-total .total span').textContent = item.price * item.lot
        clone.querySelector('.rev-add .remove').dataset.id = item.id
        clone.querySelector('.rev-add .add').dataset.id = item.id

        fragment.appendChild(clone)
    })
    shoppingCar.appendChild(fragment)

    printFooter()
}

const addButton = (e) => {
    //console.log('me diste click', e.target.dataset.id);
    shoppingObject = shoppingObject.map(item => {
        if(item.id === e.target.dataset.id){
            item.lot ++
        }
        return item
    })
    printCart()
}

const removeButton = (e) => {
    //console.log('me diste click', e.target.dataset.id);
    shoppingObject = shoppingObject.filter(item => {
        if(item.id === e.target.dataset.id){
            if(item.lot > 0){
                item.lot --
                if(item.lot === 0){return}
                return item
            }
        } else{
            return item
        }
    })
    //console.log(shoppingObject);
    printCart()
}

const printFooter = (e) => {
    footer.textContent = ''

    const total = shoppingObject.reduce(
        (acc, current) => acc + current.lot * current.price, 0
    )
    console.log(total);
    const clone = templateFooter.content.cloneNode(true)
    clone.querySelector('.footertotal .total span').textContent = total

    footer.appendChild(clone)

}