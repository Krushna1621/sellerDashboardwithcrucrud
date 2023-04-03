const savetocrud = async (event) => {
    event.preventDefault()
    const itemname = event.target.itemname.value
    const Description = event.target.Description.value
    const Price = event.target.Price.value
    const Quantity = event.target.Quantity.value

    const obj = {
        itemname,
        Description,
        Price,
        Quantity
    }

    try {
        const postreq = await axios.post('https://crudcrud.com/api/857cc11dc75843c29dec6110178e4879/Dashboardseller', obj)
        showOnScreen(postreq.data)

    } catch {
        document.body.innerHTML = document.body.innerHTML + '<h4>somthing went wrong</h4>'
    }
}
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const getreq = await axios.get('https://crudcrud.com/api/857cc11dc75843c29dec6110178e4879/Dashboardseller')

      
        for (let i = 0; i < getreq.data.length; i++) {
            showOnScreen(getreq.data[i])
        }
    }

    catch {
        (error) => {
            console.log(error)
        }
    }
})
const showOnScreen = async (obj) => {
    document.getElementById('itemname').value=''
    document.getElementById('Description').value = ''
    document.getElementById('Price').value = ''
    document.getElementById('Quantity').value = ''
    
    try {
        const parentElem = document.getElementById('listof');
        const childrenElem = `<li> ${obj.itemname} - ${obj.Description} - ${obj.Price}-${obj.Quantity} 
        <button onclick="updateQuantity('${obj._id}', 1)">Buy1</button> <button onclick="updateQuantity('${obj._id}', 2)">Buy2</button> <button onclick="updateQuantity('${obj._id}', 3)">Buy3</button></li>`
        parentElem.innerHTML = parentElem.innerHTML + childrenElem;
        
    }
    catch {
        (err) => {
            document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong </h4>"
            console.log(err)
        }
    }
}
const updateQuantity = async (id, quantity) => {
    try {
        const getItem = await axios.get(`https://crudcrud.com/api/857cc11dc75843c29dec6110178e4879/Dashboardseller/${id}`)
        console.log(getItem.data.Quantity)
        const updatedItem = {
            ...getItem.data,
            Quantity: parseInt(getItem.data.Quantity) - parseInt(quantity)
        }
        delete updatedItem._id
        console.log(updatedItem);
        //axios.put(`https://crudcrud.com/api/857cc11dc75843c29dec6110178e4879/Dashboardseller/${id}`, updatedItem);
        
        const putreq = await axios.put(`https://crudcrud.com/api/857cc11dc75843c29dec6110178e4879/Dashboardseller/${id}`, updatedItem)
        updatedItem._id = id
        showOnScreen(updatedItem);

    } catch {
        document.body.innerHTML = document.body.innerHTML + '<h4>Something went wrong while updating quantity</h4>'
    }
}
