const DataExpense = require("../models/data_expenses")

let expense = new DataExpense({

    username: "61bd9a6c2fcd3b08f3365f75",
    expensesentry:[
        {
            date: Date.now,
            amount: 10,
            category: "candy",
            description: "red"
        },
        {
            date: Date.now,
            amount: 100,
            category: "phone",
            description: "blue"
        },
        {
            date: Date.now,
            amount: 5,
            category: "ticket",
            description: "green"
        }
    ]


})