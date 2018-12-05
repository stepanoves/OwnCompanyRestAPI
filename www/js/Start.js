;(function () {
    const titleField = document.querySelector('.title');
    const budgetField = document.querySelector('.budget');
    const startButton = document.querySelector('.start-btn');
    const addDevButton = document.querySelector('.add-dev');
    const addManagerButton = document.querySelector('.add-mngr');
    const addProjectButton = document.querySelector('.add-project');
    const projectTitleField = document.querySelector('.project-title');
    const projectCostField = document.querySelector('.project-cost');
    const devsQuantityField = document.querySelector('.devs-quantity');
    const projectStrQuantityField = document.querySelector('.project-str-quantity');
    const managerNameField = document.querySelector('.mngr-name');
    const managerSurnameField = document.querySelector('.mngr-surname');
    const managerExpField = document.querySelector('.mngr-exp');
    const devNameField = document.querySelector('.dev-name');
    const devSurnameField = document.querySelector('.dev-surname');
    const devPositionField = document.querySelector('.dev-position');
    const devStringsField = document.querySelector('.str-quantity');
    const chooseAdd = document.querySelector('.choose-add');
    const stopButton = document.querySelector('.stop-btn');

    const ADD_ELEMENTS = {
        projectPanel : document.querySelector('.add-project-panel'),
        managerPanel : document.querySelector('.add-manager-panel'),
        developerPanel : document.querySelector('.add-developer-panel'),
    };

    const ELEMENTS = {
        freeDevDiv: document.querySelector('.developers-free'),
        freeManDiv: document.querySelector('.managers-free'),
        freeProjDiv: document.querySelector('.projects-free'),
        processProjDiv: document.querySelector('.projects-process'),
        processDevDiv: document.querySelector('.developers-process'),
        processManDiv: document.querySelector('.managers-process'),
        currentBudget: document.querySelector('.current-budget')
    };

    let application = new Application();

    startButton.addEventListener('click', function () {
        const title = titleField.value;
        const budget = budgetField.value;

        fetch('http://localhost:3000/company',  {
            method: 'POST',
            body: JSON.stringify({title: title, budget: budget}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then( (res) => console.log(res.status) );
        titleField.setAttribute('disabled', '');
        budgetField.setAttribute('disabled', '');
        application.start(ELEMENTS);
    });

    stopButton.addEventListener('click', () => {
        application.stop();
        titleField.removeAttribute('disabled');
        budgetField.removeAttribute('disabled');
        ELEMENTS.currentBudget.value = '';
    })

    addDevButton.addEventListener('click', function () {
        const name =  devNameField.value;
        const surname = devSurnameField.value;
        const position = devPositionField.value;
        const stringQuantity = devStringsField.value;

        fetch('http://localhost:3000/developers',  {
            method: 'POST',
            body: JSON.stringify({name: name, surname: surname, position: position, stringQuantity: stringQuantity}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then( (res) => console.log(res.status) );

    });

    addManagerButton.addEventListener('click', function () {
        const name =  managerNameField.value;
        const surname = managerSurnameField.value;
        const exp = managerExpField.value;

        fetch('http://localhost:3000/managers',  {
            method: 'POST',
            body: JSON.stringify({name: name, surname: surname, coefficient: exp}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then( (res) => console.log(res.status) );

    });

    addProjectButton.addEventListener('click', function () {
        const title = projectTitleField.value;
        const cost = projectCostField.value;
        const devs = devsQuantityField.value;
        const str = projectStrQuantityField.value;

        fetch('http://localhost:3000/projects',  {
            method: 'POST',
            body: JSON.stringify({title: title, cost: cost, developerQuantity: devs, stringQuantity: str}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then( (res) => console.log(res.status) );

    });

    chooseAdd.addEventListener('click', function () {
        ADD_ELEMENTS.projectPanel.style.display =  'none';
        ADD_ELEMENTS.managerPanel.style.display =  'none';
        ADD_ELEMENTS.developerPanel.style.display =  'none';
        document.querySelector(`${chooseAdd.value}`).style.display = 'block';
    });


})();