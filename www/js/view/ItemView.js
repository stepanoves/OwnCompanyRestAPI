class ItemView {

    constructor() {
    }

    generate(item) {
        let itemView = document.createElement('div');
        itemView.setAttribute('class', 'item');
        for (let key in item) {
            if (key === 'name'|| key === 'surname' || key === 'position'
                || key === 'coefficient' || key === 'stringQuantity'
                || key === 'title' || key === 'cost'
                || key === 'developerQuantity') {

                itemView.innerText += `${key}: ${item[key]} `

            }
        }

        return itemView;
    }
}