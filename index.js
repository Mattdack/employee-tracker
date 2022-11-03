const inquirer = require("inquirer");
const mysql = require("mysql2");
const ctable = require("console.table");

const db = mysql.createConnection(
  {
    // This will need to be updated based off of personal user information.
    host: "localhost",
    user: "root",
    password: "password",
    database: "employee_db",
  },
  console.log(`Connected to the employee_db database.`)
);

init();

function init() {
  inquirer
    .prompt([
      {
        type: "list",
        message: `Welcome to the Employee Tracker! Please make a selection.`,
        choices: [
          `View All Departments`,
          `View All Roles`,
          `View All Employees`,
          `Add A Department`,
          `Add A Role`,
          `Add An Employee`,
          `Update An Employee Role`,
          `Quit`,
        ],
        name: `entry`,
      },
    ])
    .then((response) => {
      if (response.entry === `Quit`) {
        console.log(
          `Thank you for visiting the Employee Tracker. Have a nice day!`
        );
      } else if (response.entry === `View All Departments`) {
        viewAllDepartments();
      } else if (response.entry === `View All Roles`) {
        viewAllRoles();
      } else if (response.entry === `View All Employees`) {
        viewAllEmployees();
      } else if (response.entry === `Add A Department`) {
        addDepartment();
      } else if (response.entry === `Add A Role`) {
        addRole();
      } else if (response.entry === `Add An Employee`) {
        addEmployee();
      } else if (response.entry === `Update An Employee Role`) {
        updateRole();
      }
    });
}

function viewAllDepartments() {
  db.query(`SELECT * FROM departments;`, (err, result) => {
    if (err) {
      console.log(`There was an error retrieving department data`);
    } else {
      console.log(`
    `);
      console.table(result);
      console.log(`Press an arrow key to make next menu selection.`);
    }
  });
  init();
}

function viewAllRoles() {
  db.query(
    `SELECT roles.title AS Title, roles.salary AS Salary, departments.name AS Department_Name FROM roles JOIN departments ON roles.department_id = departments.id;`,
    (err, result) => {
      if (err) {
        console.log(`There was an error retrieving role data`);
      } else {
        console.log(`
    `);
        console.table(result);
        console.log(`Press an arrow key to make next menu selection.`);
      }
    }
  );
  init();
}

function viewAllEmployees() {
  db.query(
    `SELECT CONCAT(employees.first_name, ' ', employees.last_name) AS Name, roles.title AS Title, roles.salary AS Salary, departments.name AS Department_Name, CONCAT(manager.first_name, ' ', manager.last_name) AS Manager FROM employees 
    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id
    LEFT JOIN employees AS manager ON employees.manager_id = manager.id;`,
    (err, result) => {
      if (err) {
        console.log(`There was an error retrieving employee data`);
      } else {
        console.log(`
    `);
        console.table(result);
        console.log(`Press an arrow key to make next menu selection.`);
      }
    }
  );
  init();
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: `input`,
        message: `What is the name of the department?`,
        name: `name`,
      },
    ])
    .then((response) => {
      db.query(
        `INSERT INTO departments (name) VALUES (?)`,
        [response.name],
        (err, result) => {
          if (err) {
            console.log(`There was an error adding the department data.`);
          } else {
            console.log(
              `The department was added to the list of available departments.`
            );
            init();
          }
        }
      );
    });
}

function addRole() {
  db.query(`SELECT name FROM departments`, (err, result) => {
    if (err) {
      console.log(`There was an error retrieving department names`);
    } else {
      const currentDepartments = result.map((department) => department.name);
      inquirer
        .prompt([
          {
            type: `input`,
            message: `What is the title of the role?`,
            name: `title`,
          },
          {
            type: `number`,
            message: `What is the salary of the role? (Please enter a number without commas.)`,
            name: `salary`,
          },
          {
            type: `list`,
            message: `What department does this role belong to?`,
            choices: currentDepartments,
            name: `department`,
          },
        ])
        .then((response) => {
          const departmentIndex =
            currentDepartments.indexOf(response.department) + 1;
          db.query(
            `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`,
            [
              response.title,
              response.salary,
              departmentIndex,
            ],
            (err2, result2) => {
              if (err2) {
                console.log(`There was an error adding the role data.`);
              } else {
                console.log(
                  `The entered role was added to the list of available roles.`
                );
                init();
              }
            }
          );
        });
    }
  });
}

function addEmployee() {
  db.query(`SELECT title FROM roles`, (err, result) => {
    if(err) {
        console.log(`There was an error acquiring the stored roles data.`);
    } else {
        const availableRoles = result.map((role) => role.title)
        db.query(`SELECT CONCAT(employees.first_name,' ',  employees.last_name) AS fullname FROM employees`, (err2, result2) => {
            if(err2) {
                console.log(`There was an error acquiring the stored employee data.`);
            } else {
                const availableEmployees = result2.map((employee) => employee.fullname);
                inquirer
                  .prompt([
                    {
                      type: `input`,
                      message: `What is the employee's first name?`,
                      name: `firstName`,
                    },
                    {
                      type: `input`,
                      message: `What is the employee's last name?`,
                      name: `lastName`,
                    },
                    {
                      type: `list`,
                      message: `What is the employee's role?`,
                      choices: availableRoles,
                      name: `role`,
                    },
                    {
                      type: `list`,
                      message: `Who is the employee's manager?`,
                      choices: availableEmployees,
                      name: `manager`,
                    },
                  ])
                  .then((response) => {
                    const roleIndex = availableRoles.indexOf(response.role) + 1;
                    const employeeIndex = availableEmployees.indexOf(response.manager) + 1;
                    console.log(roleIndex + ` ` + employeeIndex);
                    db.query(
                      `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);`,
                      [
                        response.firstName,
                        response.lastName,
                        roleIndex,
                        employeeIndex,
                      ],
                      (err3, result3) => {
                        if (err3) {
                          console.log(`There was an error adding the employee data.`);
                        } else {
                          console.log(
                            response.firstName +
                              ` ` +
                              response.lastName +
                              `'s employee information has been added.`
                          );
                          init();
                        }
                      }
                    );
                  });
            }
        })
    }
  })
}

function updateRole() {
    db.query(`SELECT title FROM roles`, (err, result) => {
        if(err) {
            console.log(`There was an error acquiring the stored roles data.`);
        } else {
            const availableRoles = result.map((role) => role.title)
            db.query(`SELECT CONCAT(employees.first_name,' ',  employees.last_name) AS fullname FROM employees`, (err2, result2) => {
                if(err2) {
                    console.log(`There was an error acquiring the stored employee data.`);
                } else {
                    const availableEmployees = result2.map((employee) => employee.fullname);
                    inquirer
                      .prompt([
                        {
                          type: `list`,
                          message: `Which employee do you want to update the role for?`,
                          choices: availableEmployees,
                          name: `manager`,
                        },
                        {
                          type: `list`,
                          message: `What new role do you want to assign the employee?`,
                          choices: availableRoles,
                          name: `role`,
                        },
                      ])
                      .then((response) => {
                        const roleIndex = availableRoles.indexOf(response.role) + 1;
                        const employeeIndex = availableEmployees.indexOf(response.manager) + 1;
                        console.log(roleIndex + ` ` + employeeIndex);
                        db.query(
                          `UPDATE employees SET role_id = ? WHERE employees.id = ?`,
                          [
                            roleIndex,
                            employeeIndex,
                          ],
                          (err3, result3) => {
                            if (err3) {
                              console.log(`There was an error adding the employee data.`);
                            } else {
                              console.log(`This employees information has been added to the database.`
                              );
                              init();
                            }
                          }
                        );
                      });
                }
            })
        }
      })
}