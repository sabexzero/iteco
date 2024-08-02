# ITECO-task 🚀

## About the Task

### Main Features

1. Employee full name tracking ✅
2. Tracking departments where employees are listed ✅

### Constraints

1. Employees can be hired and fired. The reasons for dismissal are not relevant ✅
2. Employees can be transferred from one department to another ✅
3. The composition of departments can change on any given day. It is necessary to have the ability to obtain information about the company structure at any point in time ✅
4. Departments have a hierarchical dependency on each other ✅
5. Data integrity control is outside the scope of this task ✅

### Implemented UI

1. Adding a new employee to any department ✅
2. Displaying the list of all departments on a specific date ✅
3. Displaying employees of a selected department for a period (start and end dates are specified, all employees who were listed in the department for at least one day within the specified period are displayed) ✅

## Implementation Details

- **Hierarchy**: To implement the hierarchical structure of departments, it was decided to use **ltree**, which allows quick operations with such data structures.
- **Visualization**: The [React Flow](https://reactflow.dev/) library was chosen for visualizing the hierarchy structure, making the addition of departments and the visualization of their structure look natural.
- **Swagger Documentation**: Available at: http://localhost:8081/swagger-ui/index.html

## Negative aspects
- **Pagination**: It is worth noting that pagination is implemented only at the backend level for potential future use, but it has not been implemented at the frontend level.
- **Bugs**: Before the task was submitted, the worker counter stopped working in the nodes (On frontend level).

## Technologies 🛠️

- **Backend**: Spring Boot (Java)
- **Frontend**: React
- **Database**: PostgreSQL

## Project Launch 🚀

### Step 1: Install Docker and Docker Compose

Make sure Docker and Docker Compose are installed on your computer. Installation instructions can be found on the official websites:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Step 2: Clone the Repository

First, clone the project repository:

```bash
git clone https://github.com/your-repository/iteco-task.git
cd iteco-task
```

### Step 3: Setup and Launch Containers

1. Ensure your Docker Daemon is running.
2. Start Docker Compose to create and launch the containers:
```bash
docker-compose up --build
```

### Step 4: Access the Application
After successfully launching the containers:

- **Backend**: is available at: http://localhost:8081
- **Frontend**: is available at: http://localhost:3000
  
### Step 5: Database Initialization
The database will be automatically initialized using the init.sql script, which is connected to the database container.

### Notes  📚
- Ensure that ports 8081 and 5432 are not occupied by other applications.
- If you want to change the database configuration, edit the environment variables in docker-compose.yml.

