const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


let employees = [];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
init();





// FUNCTIONS

function init(){  //initializes Introduction of Team App. Gives choices of adding member or rendering files
    inquirer.prompt([
        {
            type:"list",
            message:"Welcome to the Team App. \n Here you can add employees to your team. You will be asked \n A series of questions and also assigning roles to them.",
            choices:["Add Employee", "Render File"],
            name:"main"
        }
    ])
    .then(function(main){
        switch (main.main) {
            case "Add Employee":
                console.log("\nAdding Employee...\n")
                getEmployees();
                break;
            case "Render File":
                console.log("\nRendering File...\n");
                console.log(employees);
                render(employees);
                break;
        }
    })
}

function addMore(){   // Same as above but with different message
    inquirer.prompt([
        {
            type:"list",
            message:"Would you like to add more Employees?",
            choices:["Add Employee", "Render File"],
            name:"main"
        }
    ])
    .then(function(main){
        switch (main.main) {
            case "Add Employee":
                console.log("\n Adding Employee...\n")
                getEmployees();
                break;
            case "Render File":
                console.log("\n Rendering File...\n");
                console.log(employees);
                render(employees);
                break;
        }
    })
}

function getEmployees(){ // Get's employee name, id, email via inquirer then depending on choice of manager, engineer, or intern, it'll ask the prompts depending on role.
    inquirer.prompt([
        {
            type:"input",
            message:"What is the Employee's Name? \n (Please Insert First and Last Name)\n",
            name:"name"
        },
        {
            type:"input",
            message:"What is their Employee ID?\n",
            name:"id"
        },
        {
            type:"input",
            message:"What is their E-mail?\n",
            name:"email"
        },
        {
            type:"checkbox",
            message:"What is their role in this team?\n",
            choices:["Manager", "Engineer", "Intern"],
            name:"role"
        },
        {
            type:"input",
            message:"What is the Manager's Office #?\n",
            name:"officeNumber",
            when: function(answers){
                return answers.role == "Manager";
            }
        },
        {
            type:"input",
            message:"What is the Intern's School?\n",
            name:"school",
            when: function(answers){
                return answers.role == "Intern";
            }
        },
        {
            type:"input",
            message:"What is the Engineer's GitHub Name?\n",
            name:"github",
            when: function(answers){
                return answers.role == "Engineer";
            }
        }
        
    ])
    .then(function(info){
        employees.push(info);
        addMore();
    })
};



// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
