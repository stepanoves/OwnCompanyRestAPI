class Application {

    constructor() {
        this.__view = new View();
    }

    start(elements) {
        this.everyTurn(elements);

        Application.timerID = setInterval(() => {
            this.everyTurn(elements);
        }, Application.TIMEOUT);
    }

    stop() {
        clearInterval(Application.timerID);
    }

    everyTurn(elements) {

        fetch('http://localhost:3000/projects/false',  {
            method: 'GET'
        })
            .then((res) => res.json())
            .then(res => this.__view.updateItems(res, elements.freeProjDiv));

        fetch('http://localhost:3000/projects/true',  {
            method: 'GET'
        })
            .then((res) => res.json())
            .then(res => this.__view.updateItems(res, elements.processProjDiv));

        fetch('http://localhost:3000/managers/false',  {
            method: 'GET'
        })
            .then((res) => res.json())
            .then(res => this.__view.updateItems(res, elements.freeManDiv));

        fetch('http://localhost:3000/managers/true',  {
            method: 'GET'
        })
            .then((res) => res.json())
            .then(res => this.__view.updateItems(res, elements.processManDiv));

        fetch('http://localhost:3000/developers/false',  {
            method: 'GET'
        })
            .then((res) => res.json())
            .then(res =>  {this.__view.updateItems(res, elements.freeDevDiv)});

        fetch('http://localhost:3000/developers/true',  {
            method: 'GET'
        })
            .then((res) => res.json())
            .then(res =>  {this.__view.updateItems(res, elements.processDevDiv)});


        fetch('http://localhost:3000/company',  {
            method: 'GET'
        })
            .then((res) => res.json())
            .then(res => this.__view.updateBudget(res.budget, elements.currentBudget));

        fetch('http://localhost:3000/company/paysalary',  {
            method: 'PUT'
        })
            .then((res) => res.json())
            .then(res => this.__view.updateBudget(res.budget, elements.currentBudget));


        fetch('http://localhost:3000/projects/checkprojects',  {
            method: 'PUT'
        })
            .then( (res) => console.log(res.status) );


    }
}

Application.timerID = undefined;
Application.TIMEOUT = 3000;