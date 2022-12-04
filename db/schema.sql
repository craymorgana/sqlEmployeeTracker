DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
    id INT PRIMARY KEY
    , name VARCHAR(30)   -- VARCHAR(30) to hold department name
);

CREATE TABLE roles (
      id INT PRIMARY KEY
    , title VARCHAR(30)  -- VARCHAR(30) to hold role title
    , salary DECIMAL     -- DECIMAL to hold role salary
    , department_id INT  -- INT to hold reference to department role belongs to
);

CREATE TABLE employee (
      id INT PRIMARY KEY
    , first_name VARCHAR(30) -- VARCHAR(30) to hold employee first name
    , last_name VARCHAR(30)  -- VARCHAR(30) to hold employee last name
    , role_id INT            -- INT to hold reference to employee role
    , manager_id INT         -- INT to hold reference to another employee that is the manager of the current employee (null if the employee has no manager)
);

