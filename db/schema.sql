DROP DATABASE IF EXISTS nocapes_db;

CREATE DATABASE nocapes_db;

USE nocapes_db;


-- CREATE TABLE charities (
-- id INT NOT NULL AUTO_INCREMENT,
-- charName VARCHAR(30),
-- streetAddress VARCHAR(50),
-- city VARCHAR(20),
-- zipCode VARCHAR(5),
-- phone_number VARCHAR(20),
-- charUrl VARCHAR(50),
-- photo VARCHAR(20),
-- PRIMARY KEY (`id`)
-- );

-- CREATE TABLE categories (
-- id INT NOT NULL AUTO_INCREMENT,
-- category VARCHAR(20),
-- PRIMARY KEY (`id`)
-- );


-- CREATE TABLE users (
-- id INT NOT NULL AUTO_INCREMENT,
-- charityID INT,
-- email VARCHAR(50),
-- password VARCHAR(12),
-- first_name VARCHAR(30),
-- last_name VARCHAR(30),
-- phone_number VARCHAR(20),
-- photo VARCHAR(20),
-- PRIMARY KEY (`id`),
-- FOREIGN KEY (`charityID`) REFERENCES `charities` (`id`)
-- );

-- CREATE TABLE tasks(
-- id INT NOT NULL AUTO_INCREMENT,
-- charityID INT NOT NULL,
-- categoryID INT NOT NULL,
-- points INT,

-- PRIMARY KEY (`id`),
-- FOREIGN KEY (`charityID`) REFERENCES `charities` (`id`),
-- FOREIGN KEY (`categoryID`) REFERENCES `categories` (`id`)

-- );


-- CREATE TABLE userTasks (
-- id INT NOT NULL AUTO_INCREMENT,
-- taskID INT,
-- userID INT,
-- completionStatus INT,
-- photo VARCHAR(20),
-- PRIMARY KEY (`id`),
-- FOREIGN KEY (`taskID`) REFERENCES `tasks` (`id`),
-- FOREIGN KEY (`userID`) REFERENCES `users` (`id`)
-- );


-- -- task list takes is both scorecard and todo list, sort by status
-- CREATE TABLE taskList (
-- id INT NOT NULL AUTO_INCREMENT,
-- userID INT NOT NULL,
-- userTaskID INT NOT NULL,
-- PRIMARY KEY (`id`),
-- FOREIGN KEY (`userID`) REFERENCES `users` (`id`),
-- FOREIGN KEY (`userTaskID`) REFERENCES `userTasks` (`id`)
-- )

