INSERT INTO departments(name) 
VALUES  ('Epidemiology'),
        ('Global Health'),
        ('Biostatistics');

INSERT INTO roles(title, salary, department_id)
VALUES  ('Epidemiologist', 70000, 1),
        ('Physician', 200000, 2),
        ('Statistician', 60000, 3);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES  ('Matthew', 'Dacanay', 1, null),
        ('Samuel', 'Dacanay', 3, 1),
        ('Loren', 'Dacanay', 2, null),
        ('Brooke', 'Brun', 2, 1),
        ('Adam', 'Knott', 2, 1);