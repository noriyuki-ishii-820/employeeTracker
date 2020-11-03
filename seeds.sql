INSERT INTO department (department_name)
VALUES("Sales"),
    ("Engineering"),
    ("Finance"),
    ("Legal");
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