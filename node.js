const https = require('https');
const parse = (data) => {
    let products = [];
    data.products.forEach(product => {
        products[Number(product.id)] = {price: product.price}
        products[Number(product.id)]['id'] = Number(product.id);

    })
    data.colors.forEach(color => {
        products[Number(color.id)]['color'] = color.value;

    })
    data.sizes.forEach(size => {
        products[Number(size.id)]['size'] = size.value;
    })
    const colorSet = new Set(data.selectedFilters.colors);
    const sizeSet = new Set(data.selectedFilters.sizes);
    products = products.filter(x => colorSet.has(x.color) && sizeSet.has(x.size) && x.price > 200);
    const price = products.map(el => el.price);
    const [max, min] = [Math.max(...price), Math.min(...price)];
    const minMax = Math.round(max * min);
    const arr = minMax.toString(10)
        .match(/.{1,2}/g)
        .map(pair => pair.split('').map(str => Number(str))
            .reduce((a, b) => a + b, 0))

    const result = arr.findIndex(el => el === 14) * minMax * "Monogo".length;
    console.log(result)
}

https.get('https://www.monogo.pl/competition/input.txt', (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
        data += chunk;
    })
    resp.on('end', () => {
        parse(JSON.parse(data));
    })
})