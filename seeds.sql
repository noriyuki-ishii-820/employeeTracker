DROP DATABASE IF EXISTS employee_DB;
CREATE database employee_DB;

USE employee_DB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL(10,2) NULL,
  department_id int (10) NOT NULL,
  FOREIGN KEY (department_id) REFERENCES department(id),
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NOT NULL REFERENCES role(id),
  manager_id INT NULL REFERENCES id,
  PRIMARY KEY (id)
);


INSERT INTO department (department_name)
VALUES("Sales"), ("Engineering"), ("Finance"), ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Manager", 280000, 1), 
("Sales Representative", 170000, 1),
("Engineering Manager", 180000, 2),
("Software Engineer", 120000, 2),
("Accounting Manager", 120000, 3),
("Accountant", 100000, 3),
("Lawyer", 300000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Anakin", "Skywalker", 1, null), 
("Obi-Wan", "Kenobi", 2, 1), 
("Kylo", "Ren", 3, null),
("Sheev", "Palpatine", 4, 3),
("Han", "Solo", 5, null),
("Darth", "Maul", 6, 5),
("Lando", "Calrissian", 7, null);
