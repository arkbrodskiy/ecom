const layout = require('../layout');

module.exports = ({ items }) => {
    const renderedItems = items.map((item) => {
        return `
            <div>Title: ${item.product.title} - Price: ${item.product.price} - Quantity: ${item.quantity}</div>
        `;
    }).join('');

    return layout({
        content: `
            <h1>Cart</h1>
            ${renderedItems}
        `
    });
};