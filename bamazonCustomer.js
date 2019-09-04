const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "pass24",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  showItems();
});

const showItems = () => {
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
        customerBuy();
    });
};

const customerBuy = () => {
    inquirer.prompt([
        {
        type: "input",
        name: "itemID",
        message: "Which item would you like to purchase? (ITEM ID)"
        },
        {
        type: "input",
        name: "howmany",
        message: "How many would you like to purchase?"
        }
    ]).then(answers => {
        checkStore(answers.itemID, answers.howmany)
    });
}

const checkStore = (item, amt) => {
    connection.query("SELECT stock_quantity, price FROM products WHERE ?", {id: item},
     (err, res) => {
        if (err) throw err;
        if (res[0].stock_quantity < amt) {
            console.log("Not enough in stock, sorry");
            customerBuy();
        } else {
            updateStore(item, res[0].stock_quantity, amt, res[0].price);
        }
    });
}

const updateStore = (item, stock, amt, price) => {
    connection.query("UPDATE products SET ? WHERE ?", 
    [{stock_quantity: (stock - amt)}, {id: item}], (err, res) => {
        if (err) throw err;
        console.log("Success! Your total came out to be " + (amt * price) + " dollars. Shop with us again!");
        //showItems();
    })
    connection.end();
}
