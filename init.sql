-- Установка расширения ltree
CREATE EXTENSION IF NOT EXISTS ltree;

-- Создание таблицы Department
CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    path LTREE NOT NULL,
    created_at DATE,
    disbanded_at DATE
);

-- Создание таблицы Employee
CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    patronymic VARCHAR(255) NOT NULL,
    department_id INTEGER REFERENCES department(id),
    hired_at DATE,
    fired_at DATE
);

-- Вставка данных в таблицу Department
INSERT INTO department (name, path, created_at) VALUES 
('Human Resources', 'HumanResources', '2024-01-01'),
('Finance', 'Finance', '2024-01-01'),
('IT', 'IT', '2024-01-01'),
('Recruitment', 'HumanResources.Recruitment', '2024-02-01'),
('Training', 'HumanResources.Training', '2024-02-01'),
('Employee Relations', 'HumanResources.EmployeeRelations', '2024-02-01'),
('Accounts Payable', 'Finance.AccountsPayable', '2024-03-01'),
('Accounts Receivable', 'Finance.AccountsReceivable', '2024-03-01'),
('Payroll', 'Finance.Payroll', '2024-02-01'),
('Infrastructure', 'IT.Infrastructure', '2024-04-01'),
('Development', 'IT.Development', '2024-04-01'),
('Backend Team', 'IT.Development.BackendTeam', '2024-05-01'),
('Frontend Team', 'IT.Development.FrontendTeam', '2024-08-01');

-- Вставка данных в таблицу Employee
INSERT INTO employee (name, surname, patronymic, department_id, hired_at, fired_at) VALUES 
('John', 'Smith', 'Alexander', 1, '2023-03-01', NULL),
('Jane', 'Johnson', 'Marie', 2, '2023-03-02', NULL),
('Emily', 'Brown', 'Elizabeth', 3, '2023-03-03', '2023-07-01'),
('Michael', 'Davis', 'James', 4, '2023-03-04', NULL),
('Sarah', 'Miller', 'Anne', 5, '2023-03-05', NULL),
('David', 'Wilson', 'Joseph', 6, '2023-03-06', '2023-07-02'),
('Daniel', 'Moore', 'Christopher', 7, '2023-03-07', NULL),
('Laura', 'Taylor', 'Nicole', 8, '2023-03-08', NULL),
('Sophia', 'Anderson', 'Grace', 9, '2023-03-09', NULL),
('James', 'Thomas', 'Andrew', 10, '2023-03-10', '2023-07-03'),
('Alexander', 'Jackson', 'Paul', 1, '2023-03-11', NULL),
('Olivia', 'White', 'Rose', 2, '2023-03-12', NULL),
('Liam', 'Harris', 'David', 3, '2023-03-13', NULL),
('Noah', 'Martin', 'Michael', 12, '2023-03-14', NULL),
('Ava', 'Thompson', 'Sophia', 5, '2023-03-15', NULL),
('Isabella', 'Garcia', 'Olivia', 6, '2023-03-16', NULL),
('Mia', 'Martinez', 'Emily', 7, '2023-03-17', NULL),
('Benjamin', 'Robinson', 'Ethan', 8, '2023-03-18', NULL),
('Charlotte', 'Clark', 'Grace', 9, '2023-03-19', NULL),
('Amelia', 'Rodriguez', 'Marie', 10, '2023-03-20', NULL),
('Henry', 'Lewis', 'William', 1, '2023-03-21', NULL),
('Lucas', 'Lee', 'Alexander', 2, '2023-03-22', NULL),
('Mason', 'Walker', 'James', 3, '2023-03-23', NULL),
('Evelyn', 'Hall', 'Lillian', 4, '2023-03-24', NULL),
('Harper', 'Allen', 'Abigail', 5, '2023-03-25', NULL),
('Jack', 'Young', 'Lucas', 6, '2023-03-26', NULL),
('Ella', 'Hernandez', 'Victoria', 7, '2023-03-27', NULL),
('Aiden', 'King', 'Samuel', 13, '2023-03-28', NULL),
('Matthew', 'Wright', 'Henry', 9, '2023-03-29', NULL),
('Emma', 'Lopez', 'Charlotte', 10, '2023-03-30', NULL);

