DROP DATABASE IF EXISTS nocapes_db;

CREATE DATABASE nocapes_db;

USE nocapes_db;


CREATE TABLE charities (
id INTEGER(11) AUTO_INCREMENT  NOT NULL,
name VARCHAR(30),
streetAddress VARCHAR(50),
city VARCHAR(20),
zipCode VARCHAR(5),
state VARCHAR(2),
phone_number VARCHAR(20),
charUrl VARCHAR(50),
photo VARCHAR(20),
email VARCHAR(30),
PRIMARY KEY (`id`)
);


CREATE TABLE categories (
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(20),
PRIMARY KEY (`id`)
);


CREATE TABLE users (
id INT NOT NULL AUTO_INCREMENT,
email VARCHAR(50),
password VARCHAR(12),
first_name VARCHAR(30),
last_name VARCHAR(30),
phone_number VARCHAR(20),
photo VARCHAR(20),
charityID INT,
PRIMARY KEY (`id`),
FOREIGN KEY (`charityID`) REFERENCES `charities` (`id`)
);

CREATE TABLE tasks(
id INT NOT NULL AUTO_INCREMENT,
charityID INT NOT NULL,
categoryID INT NOT NULL,
name VARCHAR(40),
description VARCHAR(200),
points INT,
badge VARCHAR(40),

PRIMARY KEY (`id`),
FOREIGN KEY (`charityID`) REFERENCES `charities` (`id`),
FOREIGN KEY (`categoryID`) REFERENCES `categories` (`id`)

);


CREATE TABLE userTasks (
id INT NOT NULL AUTO_INCREMENT,
taskID INT,
userID INT,
completionStatus INT,
photo VARCHAR(20),
confirmed BOOLEAN,
PRIMARY KEY (`id`),
FOREIGN KEY (`taskID`) REFERENCES `tasks` (`id`),
FOREIGN KEY (`userID`) REFERENCES `users` (`id`)
);


-- -- task list takes is both scorecard and todo list, sort by status
-- CREATE TABLE taskList (
-- id INT NOT NULL AUTO_INCREMENT,
-- userID INT NOT NULL,
-- userTaskID INT NOT NULL,
-- PRIMARY KEY (`id`),
-- FOREIGN KEY (`userID`) REFERENCES `users` (`id`),
-- FOREIGN KEY (`userTaskID`) REFERENCES `userTasks` (`id`)
-- )

-- INSERT INTO Categories VALUES('1','event'),('2','donation'),('3');
-- select * from Categories;

INSERT INTO Charities (name, streetAddress, city, zipCode, state, phone_number, charUrl, photo, email) VALUES ('Minneapolis Food Bank', '123 fake st', 'Minneapolis', '55408','MN', '1231231231', 'http://www.google.com','fadfadf','hi3@gmail.com'),('st paul Food Bank', '123 fake st', 'st paul', '55408','MN', '1231231231', 'http://www.google.com','fadfadf','hi4@gmail.com'),('st cloud Food Bank', '123 fake st', 'st cloud', '55408','MN', '1231231231', 'http://www.google.com','fadfadf','hi5@gmail.com');


INSERT INTO categories (name) VALUES ('donation'),('event'),('promotion');


INSERT INTO tasks (charityID,categoryID, name, description, points,badge) VALUES (1,2,'event1','this is an event!',50,'hi there'),(2,1,'event2','this is an event2!',50,'hi there'),(3,1,'event2','this is an event3!',50,'hi there');

-- SELECT tasks.name, charities.name, tasks.points FROM tasks LEFT OUTER JOIN charities on charities.id = tasks.charityID

INSERT INTO users (email, password, first_name, last_name, phone_number, photo, charityID) VALUES ('lukerules@aol.biz', 'adfj123', 'luke', 'hirsch', '1231231231', 'photo!',null),('lukesux@aol.biz', 'adfj123', 'lucas', 'hersch', '1231231231', 'photo!',null),('steverules@aol.biz', 'adfj123', 'steve', 'jimbo', '1231231231', 'photo!',null);

INSERT INTO userTasks (taskID, userID, completionStatus, photo, confirmed) VALUES (1,1,1,'photo!',null);

-- query for generating scorecard and to do list
-- select userTasks. completionStatus, users.first_name, tasks.name, charities.name  from userTasks left outer join tasks on tasks.id = userTasks.taskID left outer join users on users.id = userTasks.userID left outer join charities on tasks.charityID = charities.id;