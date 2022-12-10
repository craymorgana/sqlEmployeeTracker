const inquirer = require("inquirer");
const mysql = require("mysql2");
const initApp = require("./index")

const db = mysql.createConnection({
	host: "localhost",
	// MySQL username,
	user: "root",
	// MySQL password
	password: "password",
	database: "company_db",
});

const addDepartment = () => {
	return new Promise((resolve) => {
		inquirer
			.prompt([
				{
					type: "input",
					name: "new",
					message: "What is the name of the new department?",
				},
			])
			.then((answer) => {
				db.query(
					`INSERT INTO department (name) VALUES ("${answer.new}"), SELECT * FROM department`
				);
				console.log(`${answer.new} department has been added.`);
				initApp();
			});
	});
};

module.exports = addDepartment;
