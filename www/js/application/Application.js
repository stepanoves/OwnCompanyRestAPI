class Application {

    constructor() {
        this.__view = new View();
        this.__gameAPI = new GameAPI();
    }

    async start(elements) {
        await this.everyTurn(elements);

        Application.timerID = setInterval(() => {
            this.everyTurn(elements);
        }, Application.TIMEOUT);
    }

    stop() {
        clearInterval(Application.timerID);
    }

    async everyTurn(elements) {

        await fetch('http://localhost:3000/projects/checkprojects', {
            method: 'PUT'
        });

        await fetch('http://localhost:3000/projects/status/false',  {
            method: 'GET'
        })
            .then((res) => res.json())
            .then(res => this.__view.updateItems(res, elements.freeProjDiv));

        await fetch('http://localhost:3000/projects/status/true',  {
            method: 'GET'
        })
            .then((res) => res.json())
            .then(res => this.__view.updateItems(res, elements.processProjDiv));

        await fetch('http://localhost:3000/managers/status/false',  {
            method: 'GET'
        })
            .then((res) => res.json())
            .then(res => this.__view.updateItems(res, elements.freeManDiv));

        await fetch('http://localhost:3000/managers/status/true',  {
            method: 'GET'
        })
            .then((res) => res.json())
            .then(res => this.__view.updateItems(res, elements.processManDiv));

        await fetch('http://localhost:3000/developers/status/false',  {
            method: 'GET'
        })
            .then((res) => res.json())
            .then(res =>  {this.__view.updateItems(res, elements.freeDevDiv)});

        await fetch('http://localhost:3000/developers/status/true',  {
            method: 'GET'
        })
            .then((res) => res.json())
            .then(res =>  {this.__view.updateItems(res, elements.processDevDiv)});

        await fetch(`http://localhost:3000/company/${elements.title.value}/${elements.currentBudget.value}`,  {
            method: 'PUT'
        });

        await fetch(`http://localhost:3000/company/budget/${elements.title.value}`,  {
            method: 'GET'
        })
            .then((res) => res.json())
            .then(res => {this.__view.updateBudget(res[0].budget, elements.currentBudget)});

    }


}

Application.timerID = undefined;
Application.TIMEOUT = 3000;