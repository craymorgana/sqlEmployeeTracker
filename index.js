const mysql = require("mysql2");
const inquirer = require("inquirer");
//const addDepartment = require("./query.js");
const cTable = require("console.table");

// Connect to database
const db = mysql.createConnection(
	{
		host: "localhost",
		// MySQL username,
		user: "root",
		// MySQL password
		password: "password",
		database: "company_db",
	},
	console.log(`Connected to the courses_db database.`)
);

const initApp = () => {
	inquirer
		.prompt([
			{
				type: "list",
				message: "Select an option from below",
				name: "option",
				choices: [
					"View all departments",
					"View all roles",
					"View all employees",
					"Add a department",
					"Add an employee",
					"Update an employee role",
				],
			},
		])
		.then((answers) => {
			if (answers.option === "View all departments")
				db.query("SELECT * FROM department", function (err, results) {
					console.table(results);
					initApp();
				});
			if (answers.option === "View all roles") {
				db.query(
					`SELECT role.id, role.title, department.name AS department, salary
					FROM role
					LEFT JOIN department on (department.id = role.department_id)
					ORDER BY role.id`,
					function (err, results) {
						if (err)
							console.log(err);
						console.table(results);
						initApp();
					}
				);
			}
			if (answers.option === "View all employees") {
				db.query("SELECT * FROM employee", function (err, results) {
					console.table(results);
					initApp();
				});
			}
			if (answers.option === "Add a department") {
				addDepartment();
			}

			if (answers.option === "Add an employee") {
				addEmployee();
			}

			if (answers.option === "Update an employee role") {
				db.query("SELECT * FROM employee", function (err, results) {
					console.table(results);
					initApp();
				});
			}
		});
};

const addDepartment = () => {
	return new Promise(() => {
		inquirer
			.prompt([
				{
					type: "input",
					name: "new",
					message: "What is the name of the new department?",
				},
			])
			.then((answer) => {
				db.query(`INSERT INTO department (name) VALUES ("${answer.new}")`);
				console.log(`${answer.new} department has been added.`);
				initApp();
			});
	});
};

const addEmployee = () => {
	return new Promise(() => {
		inquirer
			.prompt([
				{
					type: "input",
					name: "firstName",
					message: "What is the first name of the new employee?",
				},
				{
					type: "input",
					name: "lastName",
					message: "What is the first name of the new employee?",
				},
				{
					type: "input",
					name: "firstName",
					message: "What is the first name of the new employee?",
				},
			])
			.then((answer) => {
				db.query(`INSERT INTO employee (name) VALUES ("${answer.new}")`);
				console.log(`${answer.new} department has been added.`);
			});
	});
};
initApp();

module.exports = initApp;
