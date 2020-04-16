
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const htmlRenderer = require("./lib/htmlRenderer");
const Questions = require("./lib/Questions");

/** output path where file is generated and saved */
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPathHTML = path.join(OUTPUT_DIR, "team.html");
const outputPathCSS = path.join(OUTPUT_DIR, "style.css");

/** Header message displayed to the user on execution */
const userMessage = "This utility will walk you through creating an Information page for your team.\n\nPress ^C at any time to quit.\n\nPlease enter the below details ...";

/**
 * Saves the HTML Team Information to new file(s) 
 * @param {*} teamHtml the HTML Team Information 
 * @param {*} teamCSS the HTML Team Information stylesheet 
 */
function createTeamHtmlFile(teamHtml, teamCSS) {
    // Create output folder if it doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    // Save HTML and CSS to file
    fs.writeFileSync(outputPathHTML, teamHtml);
    fs.writeFileSync(outputPathCSS, teamCSS);
}

/** This method initializes and executes the application */
async function init() {
    try {
        console.log(userMessage);
        const employees = await fetchEmployees();
        const teamCSS = htmlRenderer.renderCSS();
        const teamHTML = htmlRenderer.render(employees);
        createTeamHtmlFile(teamHTML, teamCSS);
        console.log(`Team Information file generated successfully at: ${outputPathHTML}`);
    }
    catch (error) {
        console.log(`\n\nTeam Information Generation failed!\nException encountered:\n ${error.stack}`);
    }
}

/** 
 * This method prompts the user for team member details, loads the answers 
 * into an array of employees and returns the same
 * @returns {Array<Employee>} the array of employees input by the user 
 */
async function fetchEmployees() {
    try {
        // The first action is always - add a manager
        var userAction = Questions.ActionTypes.AddManager;
        var employees = [];
        // Loop until the user selects the generate option
        do {
            var response = await inquirer.prompt(Questions.fetch(userAction));
            let newEmployee = loadEmployee(userAction, response);
            employees.push(newEmployee);
            // Switch to the user's next action 
            userAction = response.actionType;
        } while (userAction != Questions.ActionTypes.Generate)
        return employees;
    }
    catch (error) {
        throw new Error(error.stack);
    }
}

/**
 * Create and return an Employee object based on the user's input 
 * @param {Questions.ActionTypes} actionType the current action type 
 * @param {object} response the response object containing the user's inputs
 * @returns {Employee} returns an Employee obect 
 */
function loadEmployee(actionType, { name, id, email, officeNumber, school, github }) {
    const employeeId = parseInt(id);
    switch (actionType) {
        case Questions.ActionTypes.AddManager:
            {
                const parsedOfficeNumber = parseInt(officeNumber);
                return new Manager(name, employeeId, email, parsedOfficeNumber);
            }
        case Questions.ActionTypes.AddEngineer:
            return new Engineer(name, employeeId, email, github);
        case Questions.ActionTypes.AddIntern:
            return new Intern(name, employeeId, email, school);
        default:
            break;
    }
    return null;
}

// Call the init method to start the application
init();