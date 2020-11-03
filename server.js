const inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Kreva141!", // delete password before commiting
  database: "great_bayDB",
});

connection.connect(function (err) {
  if (err) throw err;
});

function startSearch() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What do you want to do?",
        name: "choices",
        choices: [
          "View All Employees",
          "View All Employees by Department",
          "View All Employees by Manager",
          "Add a new Employee",
          "Add a new Department",
          "Add a new Role",
          "Update Employee Role",
          "Exit",
        ],
      },
    ])
    .then(function (answer) {
      switch (answer.choices) {
        case "View All Employees":
          viewEmployees();
          break;

        case "View All Employees by Department":
          viewEmployeesByDept();
          break;

        case "View All Employees by Manager":
          viewEmployeesByManager();
          break;

        case "Add a new Employee":
          addEmployee();
          break;

        case "Add a new Department":
          addDepartment();
          break;

        case "Add a new Role":
          addRole();
          break;

        case "Update Employee Role":
          updateRole();
          break;

        case "Exit":
          connection.end();
          break;
      }
    });
}

function viewEmployees() {
  var query = "Select * from employee_DB.employee";
  connection.query(query, function (err, res) {
    console.table(res);
    startSearch();
  });
}

startSearch();
