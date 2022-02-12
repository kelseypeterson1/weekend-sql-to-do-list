CREATE TABLE tasks (
	id SERIAL,
	task varchar(250),
	owner varchar(100),
	due date
);

INSERT INTO "tasks" 
	("task", "owner", "due date") 
VALUES
	('Clean fridge', 'Kelsey', '2/15/2022'),
	('Oil Change', 'Car Elf', '2/28/2022'),
	('Dentist Appt', 'Kelsey', '6/1/2022')