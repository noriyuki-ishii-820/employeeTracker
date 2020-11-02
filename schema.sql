DROP DATABASE IF EXISTS employee_DB;
CREATE database employee_DB;

USE employee_DB;

CREATE TABLE department (
  id INT NOT NULL,
  department_name VARCHAR(100) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL,
  title VARCHAR(30) NULL,
  salary DECIMAL(10,2) NULL,
  department_id INT NOT NULL REFERENCES department(id),
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NOT NULL REFERENCES role(id),
  manager_id INT NULL REFERENCES id.first_name id.last_name
  PRIMARY KEY (id)
);