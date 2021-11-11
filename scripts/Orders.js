//generte HTML for placed Orders

import { getOrders, getMetals, getSizes, getStyles } from "./database.js"

const buildOrderListItem = (order) => {

    const metals = getMetals()
    const styles = getStyles()
    const sizes = getSizes()


// Remember that the function you pass to find() must return true/false
const foundMetal = metals.find(
    (metal) => {
        return metal.id === order.metalId
    }
)
const foundSize = sizes.find(
    (size) => {
        return size.id === order.sizeId
}
)

const foundStyle = styles.find(
    (style) => {
        return style.id === order.styleId
        } 
)

/* const foundStyle = styles.find(
    (style) => {
        return style.id === order.styleId
    }
) */
const totalCost = foundMetal.price + foundSize.price + foundStyle.price

const costString = totalCost.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
})

   return  `<li>
        Order #${order.id} was placed on ${order.timestamp} and cost ${costString}
    </li>`
}

export const Orders = () => {
    /*
        Can you explain why the state variable has to be inside
        the component function for Orders, but not the others?
    */

    //state variable needs to be inside component function so the orders will be re-rendered with freshest data when the html page is refreshed 

    const orders = getOrders()

    let html = "<ul>"

    const listItems = orders.map(buildOrderListItem)

    html += listItems.join("")
    html += "</ul>"

    return html
}

