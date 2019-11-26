# bamazon
### A CLI App used to read/update information in a store's database

Bamazon features three distinct but connected functionalities to access a web store's stock data.
* __Customer View__: Customers can view all items in the store and purchase *x* amount, as long as the store has enough in stock.
* __Manager View__: Managers also can view all items in the store and additionally can view items with low stock, add items to inventory, and add new products
* __Supervisor View__: Supervisors have the ability to view cost/profits regarding each department the store items fall into.


## How To Use It
Bamazon is a command line application, it is run through the command line.
1. Use the file *bamazon_schema.sql* to create a database/tables pertaining to the store's inventory.
2. Locate the delcaration of the mysql.connection at the top of each .js file, and input your password in the appropriate line.
3. Run an '*npm install*' to get the appropriate packages to run the three separate views.
3. In the command line, try running the three .js files
  1. node bamazonCustomer.js
  ![Customer View](https://i.imgur.com/LTt3tGf.png)
  2. node bamazonManager.js
  ![Manager View](https://i.imgur.com/mrafMeR.png)
  3. node bamazonSupervisor.js
  ![Supervisor View](https://i.imgur.com/N6Jsb6S.png)
4. To exit any of the views, press CTRL+C (CMD+C on Mac)
  
## Tech Used
* __npm packages__
  * _mysql_ : used to read/update data stored in the mysql database
  * _inquirer_ : used to prompt the user for input and progress through the program
  * _cli-table_ : used to present data in a tabular fashion inside bamazonSupervisor.js
