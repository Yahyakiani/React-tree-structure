# Stamped.io assignment

Hello there and welcome to Stamped.io's assignment.

Before we start, we want to thank you for your interest in Stamped.io, and for making the time to work on this task as part of your adventure to become one of us!

We have created an [api ('https://stamped-redux-task.herokuapp.com/')](https://stamped-redux-task.herokuapp.com/) that provides the following endpoints:

```
- [GET] '/api/companies' -> returns all companies
- [GET] '/api/companies/:id' -> returns a company by given company id
- [GET] '/api/companies/by_name/:name' -> returns a company by given company name. Note if you use this the company name should be in the following format 'hackett-greenfelder'

- [GET] '/api/address' -> returns all adresses
- [GET] '/api/adress/:id -> returns an adress by given adress id
- [GET] '/api/adress/by_company/:id -> returns an adress by given company id

- [GET] '/api/employee/' -> returns all employees
- [GET] '/api/employee/:id' -> returns employee by given employee id
- [GET] '/api/employee/by_company/:id' -> returns employees by given company id

- [GET] '/api/projects/' -> returns all projects
- [GET] '/api/projects/:id' -> returns projects by company id
- [PUT] '/api/projects/update_project' -> updates given project
  - [JSON] expected request data 
    {
      projectID: "8faa447c-3cf5-49c7-92a9-14c2c0a453eb",
      projectName: "Handcrafted Frozen Shoes",
      employees: [
        "73591378-6602-4338-a110-b9ad8b032e27"
        "c7fff585-2f9b-4164-94f0-6552dbeeeb04"
        "26e44cf2-cf3c-4ac9-b331-c87c9dfd07cf"
      ]
    }
```

You will use them to build a small app. You can view example response data from the JSON files located inside /data.

### App requirements

- Use the company and employees data to build a tree view like navigation with the following structure:

```
Company name
  Employees job areas
    Employees names
```

- When the user clicks on a company, the app should display the company's address and the company's projects. It should be possible to visualize the information about each   project. If you feel that this is too easy, add the ability to edit project details (changing the project name) and assigning & removing employees from a project.
- When the user clicks on an employee's name you will need to show the employee's details, and projects they're part of.
- Clicking on Employee's job area should only display how many employees work in that area, and the number of projects they participate in.

### Tech requirements

- The app should be developed using React/Next.js. You can start from scratch, use the current code or a scaffolding CLI. Feel free to re-arrange.
- You can use ES5+ and any supporting libraries (e.g. Lodash, etc.) you need.
- The code needs to demonstrate state management(Redux) within the app as well as managing asynchronous requests.
- The app's aesthetics are up to you - you can use Bootstrap, Material or custom CSS.
- We should be able to run your solution by simply running a single command on the command line.

### Getting started

Clone the repo, it is bootstrapped with 'create-react-app', run 'yarn start' to run the project.

Good luck!