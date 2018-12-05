class View {

    constructor(){
        this.__itemView = new ItemView();
        this.__fireButton = new FireButton();
    };

    updateItems(itemList, itemDiv) {
        itemDiv.innerHTML = null;

        for (let item of itemList) {
            itemDiv.appendChild(this.__itemView.generate(item));
            itemDiv.appendChild(this.__fireButton.generate(item));
        }
    }

    updateBudget(currentBudget, budgetField) {
        budgetField.value = currentBudget;
    }
}