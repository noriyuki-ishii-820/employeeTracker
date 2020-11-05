const inquirer = require("inquirer");
var mysql = require("mysql");
const cTable = require("console.table");

var roleArray = [];
var managerArray = [];

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Kreva141!", // delete password before commiting
  database: "employee_DB",
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
  const query =
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id  LEFT JOIN employee manager ON manager.id = employee.manager_id;";

  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
  });
  startSearch();
}

function viewEmployeesByDept() {
  const query = "SELECT name FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    //console.log(res);

    inquirer
      .prompt([
        {
          type: "list",
          message: "Which department would you like to check?",
          name: "choices",
          choices: res,
        },
      ])
      .then(function (answer) {
        const query2 =
          "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id WHERE department.name =?";

        connection.query(query2, [answer.choices], function (err, res) {
          console.log(res);
          if (err) throw err;
          console.table(res);
          startSearch();
        });
      });
  });
}

function viewEmployeesByManager() {
  const query =
    "SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS name FROM employee LEFT JOIN role ON employee.role_id = role.id  WHERE role.title LIKE '%Manager' OR '%manager'";
  connection.query(query, function (err, res) {
    if (err) throw err;

    inquirer
      .prompt([
        {
          type: "list",
          message: "Which manager's team would you like to check?",
          name: "choices",
          choices: res,
        },
      ])
      .then(function (answer) {
        const query2 =
          "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id WHERE department.id = manager_id;";

        connection.query(query2, [answer.choices], function (err, res) {
          if (err) throw err;
          console.table(res);
          startSearch();
        });
      });
  });
}

function findRole() {
  const query = "SELECT title FROM role";
  connection.query(query, function (err, results) {
    if (err) throw err;
    for (var i = 0; i < results.length; i++) {
      roleArray.push(results[i].title);
    }
  });
  return roleArray;
}

function findManager() {
  const query =
    "SELECT CONCAT(first_name, ' ', last_name) AS manager FROM employee WHERE manager_id IS null";
  connection.query(query, function (err, results) {
    if (err) throw err;
    for (var i = 0; i < results.length; i++) {
      managerArray.push(results[i].manager);
    }
  });
  return managerArray;
}

// need to take another look
function addEmployee() {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the first name of the new employee?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the last name of the new employee?",
      },
      {
        name: "role",
        type: "list",
        message: "What is the role of the new employee?",
        choices: findRole(),
      },
      {
        name: "manager",
        type: "list",
        choices: findManager(),
        message: "Who is the manager of the new employee?",
      },
    ])
    .then(function (answer) {
      var roleId = findRole().indexOf(answer.role) + 1;
      var managerId = findManager().indexOf(answer.manager) + 1;
      connection.query("INSERT INTO employee SET ?", {
        first_name: answer.firstName,
        last_name: answer.lastName,
        role_id: roleId,
        manager_id: managerId,
      });
    });

  startSearch();
}

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "deptName",
        type: "input",
        message: "What is the name of the new Department?",
      },
    ])
    .then(function (answer) {
      connection.query("INSERT INTO department SET ?", {
        name: answer.deptName,
      });
      console.log("Added the new " + answer.deptName + " department.");
    });
  startSearch();
}

startSearch();
