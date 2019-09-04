const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("table");
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
                //connection.end();
                break;
        }
    })
};

const viewSales = () => {
        connection.query("SELECT departments.id, departments.department_name, departments.over_head_costs, SUM(products.product_sales) FROM departments, products WHERE departments.department_name = products.department_name GROUP BY products.department_name",
        (err, res) => {
            if (err) throw err;
            console.log(res);
            listOptions();
        });
};
