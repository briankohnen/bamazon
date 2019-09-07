const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
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
        choices: ["View products", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
    ]).then(answers => {
        switch (answers.action) {
            case "View Products":
                viewItems();
                break;
            case "View Low Inventory":
                lowInv();
                break;
            case "Add to Inventory":
                addToInv();
                break;
            case "Add New Product":
                addItem();
                break;
            default:
                viewItems();
                //connection.end();
        }
    })
};

const viewItems = () => {
        connection.query("SELECT * FROM products", (err, res) => {
            if (err) throw err;
            res.forEach(element => {
                console.log(
                    "~~~~~~~~~~~~~~~~~~~~~~~~~~~" +
                  "\nProduct ID : " + element.id +
                  "\nProduct : " + element.product_name +
                  "\nDepartment : " + element.department_name +
                  "\nPrice : " + element.price +
                  "\nIn Stock : " + element.stock_quantity + 
                  "\n~~~~~~~~~~~~~~~~~~~~~~~~~~~"
                );
            });
            listOptions();
        });
    };
    
const lowInv = () => {
    connection.query("SELECT * FROM products", (err, res) => {
        if (err) throw err;
        res.forEach(element => {
            if (element.stock_quantity < 5) {
                console.log(
                    "~~~~~~~~~~~~~~~~~~~~~~~~~~~" +
                    "\nProduct ID : " + element.id +
                    "\nProduct : " + element.product_name +
                    "\nDepartment : " + element.department_name +
                    "\nPrice : " + element.price +
                    "\nIn Stock : " + element.stock_quantity + 
                    "\n~~~~~~~~~~~~~~~~~~~~~~~~~~~"
                );
            }
        });
        listOptions();
    }); 
}

const addToInv = () => {
    let choices = [];
    connection.query("SELECT * FROM products", (err,res) => {

        if (err) throw err;

        res.forEach(element => {
            choices.push(element.product_name);
        });

        inquirer.prompt([
            {
            type: "list",
            name: "toadd",
            message: "Which item would you like to stock?",
            choices: choices
            },
            {
            type: "input",
            name: "amt",
            message: "How much would you like to add?"
            }
        ]).then(answers => {
            let currQuantity = 0;
            connection.query("SELECT stock_quantity FROM products WHERE?", {product_name: answers.toadd},
            (err, res) => {

                if (err) throw err;
                currQuantity = res[0].stock_quantity;

            connection.query("UPDATE products SET ? WHERE ?",
            [{stock_quantity: (currQuantity + parseInt(answers.amt))}, {product_name: answers.toadd}], (err, res) => {
                if (err) throw err;
                console.log("Successfully added " + answers.amt + " to the stock.");
                })
                listOptions();
            })
        })
    })
};

const addItem = () => {
    inquirer.prompt([
        {
        type: "input",
        name: "toAdd",
        message: "What would you like to add?",
        },
        {
        type: "input",
        name: "department",
        message: "Which department does this belong in?",
        },
        {
        type: "input",
        name: "price",
        message: "Price per unit"
        },
        {
        type: "input",
        name: "stock",
        message: "How much are we stocking?"
        }
    ]).then(answers => {
        connection.query("INSERT INTO products SET ?",
        {
        product_name: answers.toAdd,
        department_name: answers.department,
        price: answers.price,
        stock_quantity: answers.stock
        }, (err, res) => {
            if (err) throw err;
            console.log("Item added!");
            listOptions();
        })
    })
}