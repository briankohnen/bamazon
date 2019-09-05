const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require('cli-table');

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "pass24",
  database: "bamazon_db"
});

connection.connect((err) => {
  if (err) throw err;
  listOptions();
});

const listOptions = () => {
    inquirer.prompt([
        {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: ["View Sales by Department", "Create New Department"]
        }
    ]).then(answers => {
        switch (answers.action) {
            case "View Sales by Department":
                viewSales();
                break;
            case "Create New Department":
                createDep();
                break;
            default:
                //listOptions();
                connection.end();
                break;
        }
    })
};

const viewSales = () => {
        connection.query("SELECT departments.id, departments.department_name, departments.over_head_costs, SUM(products.product_sales) AS product_sales, (SUM(products.product_sales) - departments.over_head_costs) AS total_profit FROM departments, products WHERE departments.department_name = products.department_name GROUP BY products.department_name",
        (err, res) => {
            
            if (err) throw err;
            console.log(res);

            let table = new Table({
                head: ['department_id', 'department_name', 'over_head_costs', 'product_sales', 'total_profit'],
                colWidths: [20, 20, 20, 20, 20]
            });
            
            for (var i = 0; i < res.length; i++) {
                table.push(
                    [res[i].id, res[i].department_name, res[i].over_head_costs, res[i].product_sales, res[i].total_profit]
                );
            }
            
            console.log(table.toString());
            listOptions();
        });
};

const createDep = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "depname",
            message: "Name of department to add"
        },
        {
            type: "input",
            name: "costs",
            message: "Enter overhead costs"
        }
    ]).then(answers => {

        connection.query("INSERT INTO departments SET ?",
        {
            department_name: answers.depname,
            over_head_costs: answers.costs
        }, (err, res) => {
            if (err) throw err;
            console.log("Department added!");
            listOptions();
        })
    })
};