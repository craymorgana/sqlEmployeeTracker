const mysql = require("mysql2");
const inquirer = require("inquirer");
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
					"Add a role",
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
						if (err) console.log(err);
						console.table(results);
						initApp();
					}
				);
			}
			if (answers.option === "View all employees") {
				db.query(
					`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department,
					role.salary, 
					CONCAT(manager.first_name, ' ', manager.last_name) AS manager
					FROM employee
					LEFT JOIN employee manager on manager.id = employee.manager_id
					INNER JOIN role on (role.id = employee.role_id)
					INNER JOIN department on (department.id = role.department_id)
					ORDER BY employee.id`,
					function (err, results) {
						if (err) console.log(err);
						console.table(results);
						initApp();
					}
				);
			}
			if (answers.option === "Add a department") {
				addDepartment();
			}

			if (answers.option === "Add a role") {
				addRole();
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

const roleNameSalary = () => {
	return [
		{
			type: "input",
			name: "roleName",
			message: "What is the name of the role?",
		},
		{
			type: "input",
			name: "newSalary",
			message: "What is the salary of the role?",
		},
	];
};

async function addRole() {
	const newRole = await inquirer.prompt(roleNameSalary());
	db.query(
		`SELECT department.id, department.name FROM department;`,
		async (err, res) => {
			if (err) console.log(err);
			const { department } = await inquirer.prompt([
				{
					name: "department",
					type: "list",
					choices: () => res.map((res) => res.name),
					message: "Which department does the role belong to?",
				},
			]);
			let departmentId;
			for (const row of res) {
				if (row.name === department) {
					departmentId = row.id;
					continue;
				}
			}
			db.query(
				`INSERT INTO role SET ?`,
				{
					title: newRole.roleName,
					salary: newRole.newSalary,
					department_id: departmentId,
				},
				(err, res) => {
					if (err) console.log(err);
					console.log(`\n${newRole.roleName} has been added.\n`);
					initApp();
				}
			);
		}
	);
}

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
