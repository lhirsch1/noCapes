-- DROP DATABASE IF EXISTS nocapes_db;

-- CREATE DATABASE nocapes_db;

USE nocapes_db;


-- CREATE TABLE charities (
-- id INTEGER(11) AUTO_INCREMENT  NOT NULL,
-- name VARCHAR(30),
-- streetAddress VARCHAR(50),
-- city VARCHAR(20),
-- zipCode VARCHAR(5),
-- state VARCHAR(2),
-- phoneNumber VARCHAR(20),
-- charUrl VARCHAR(50),
-- photo VARCHAR(20),
-- email VARCHAR(30),
-- PRIMARY KEY (`id`)
-- );


-- CREATE TABLE categories (
-- id INT NOT NULL AUTO_INCREMENT,
-- name VARCHAR(20),
-- PRIMARY KEY (`id`)
-- );


-- CREATE TABLE users (
-- id INT NOT NULL AUTO_INCREMENT,
-- email VARCHAR(50) NOT NULL,
-- password VARCHAR(12) NOT NULL,
-- firstName VARCHAR(30) NOT NULL,
-- lastName VARCHAR(30) NOT NULL,
-- phoneNumber VARCHAR(20),
-- zipCode VARCHAR(5) NOT NULL,
-- photo VARCHAR(20),
-- charityID INT,
-- PRIMARY KEY (`id`),
-- FOREIGN KEY (`charityID`) REFERENCES `charities` (`id`)
-- );

-- CREATE TABLE tasks(
-- id INT NOT NULL AUTO_INCREMENT,
-- charityID INT NOT NULL,
-- categoryID INT NOT NULL,
-- name VARCHAR(40) NOT NULL,
-- description VARCHAR(200) NOT NULL,
-- points INT NOT NULL,
-- badge VARCHAR(40),
-- confirmation BOOLEAN,

-- PRIMARY KEY (`id`),
-- FOREIGN KEY (`charityID`) REFERENCES `charities` (`id`),
-- FOREIGN KEY (`categoryID`) REFERENCES `categories` (`id`)

-- );

-- -- completion status determines if task is in todo list, scorecard, or is expired
-- --confirmed is if the charity says you completed the task
-- CREATE TABLE userTasks (
-- id INT NOT NULL AUTO_INCREMENT,
-- taskID INT NOT NULL,
-- userID INT NOT NULL,
-- completionStatus INT,
-- photo VARCHAR(20),
-- confirmed BOOLEAN,
-- PRIMARY KEY (`id`),
-- FOREIGN KEY (`taskID`) REFERENCES `tasks` (`id`),
-- FOREIGN KEY (`userID`) REFERENCES `users` (`id`)
-- );




INSERT INTO Charities (name, streetAddress, city, zipCode, state, phoneNumber, charUrl, photo, email) VALUES ('Minneapolis Food Bank', '123 fake st', 'Minneapolis', '55408','MN', '1231231231', 'http://www.google.com','fadfadf','hi3@gmail.com'),('st paul Food Bank', '123 fake st', 'st paul', '55408','MN', '1231231231', 'http://www.google.com','fadfadf','hi4@gmail.com'),('st cloud Food Bank', '123 fake st', 'st cloud', '55408','MN', '1231231231', 'http://www.google.com','fadfadf','hi5@gmail.com');


INSERT INTO categories (name) VALUES ('donation'),('event'),('promotion');


INSERT INTO tasks (CharityId,CategoryId, name, description, points,badge, confirmation) VALUES (1,2,'event1','this is an event!',50,'hi there', 1),(2,1,'event2','this is an event2!',50,'hi there',0),(3,1,'event2','this is an event3!',50,'hi there',1);

-- SELECT tasks.name, charities.name, tasks.points FROM tasks LEFT OUTER JOIN charities on charities.id = tasks.charityID

 INSERT INTO users (email, password, firstName, lastName, phoneNumber, zipCode, photo, CharityId) VALUES ('abd@gmail.com', 'basjd', 'jimbo', 'jackson', '1231231231', '44444', 'hi!', 1), ('lukerules@aol.biz', 'adfj123', 'luke', 'hirsch', '1231231231', '41523', 'photo!',1),('lukesux@aol.biz', 'adfj123', 'lucas', 'hersch', '1231231231', '51231', 'photo!',1),('steverules@aol.biz', 'adfj123', 'steve', 'jimbo', '1231231231', '12314','photo!',null);

INSERT INTO userTasks (TaskID, UserID, completionStatus, photo, confirmed) VALUES (1,1,1,'photo!',null),(1,2,1,'photo!',1);

-- query for generating scorecard and to do list
-- select userTasks.id, userTasks.completionStatus, users.first_name, tasks.name, charities.name  from userTasks left outer join tasks on tasks.id = userTasks.taskID left outer join users on users.id = userTasks.userID left outer join charities on tasks.charityID = charities.id;