const mysql = require("mysql2");
const inquirer = require("inquirer");
const query = require("./queries");
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
function initializeAPP() {
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
					initializeAPP();
				});
			if (answers.option === "View all roles")
				db.query("SELECT * FROM roles", function (err, results) {
					console.table(results);
					initializeAPP();
				});
			if (answers.option === "View all employees")
				db.query("SELECT * FROM employee", function (err, results) {
					console.table(results);
					initializeAPP();
				});
		});

	
}

initializeAPP();
