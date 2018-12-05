class FireButton {
    constructor() {
    }

    generate(item) {
        let fireButton = document.createElement('a');
        fireButton.setAttribute('href', '#');
        fireButton.innerText = 'Уволить';


        if (item.hasOwnProperty('position') && !item.status) {
            fireButton.addEventListener('click', () => {
                fetch(`http://localhost:3000/developers/delete/${item.id}`,  {
                    method: 'DELETE'
                });
            });
            return fireButton;
        }
        if (item.hasOwnProperty('coefficient') && !item.status) {
            fireButton.addEventListener('click', () => {
                fetch(`http://localhost:3000/managers/delete/${item.id}`, {
                    method: 'DELETE'
                });
            });
            return fireButton;
        }

        if (item.hasOwnProperty('title') && !item.status){
            fireButton.innerText = 'Отказаться';
            fireButton.addEventListener('click', () => {
                fetch(`http://localhost:3000/projects/delete/${item.id}`,  {
                    method: 'DELETE'
                });
            });

            return fireButton;
        }
    }
}