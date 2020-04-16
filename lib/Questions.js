let Employee = require("./Employee");

/** 
 * Enumeration of Action Types
 * @enum {object}
*/
const ActionTypes = {
    AddManager: "Manager",
    AddEngineer: "Engineer",
    AddIntern: "Intern",
    Generate: "Generate"
};

/**
 * Function returns an array of inquirer prompts based on the current user action type passed in.
 * @param {ActionTypes} userActionType the action type selected by the user
 * @returns {Array<object>} array of inquirer prompts
 */
const fetchQuestions = (userActionType) => {
    // By default, Load up questions for the manager 
    if (userActionType == null)
        userActionType = ActionTypes.AddManager;
    // No prompts supported for Generate Action Type
    if (userActionType == ActionTypes.Generate) {
        throw new Error("Cannot fetch questions for the 'Generate' action.");
    }
    // Return prompts
    return [{
        name: "name",
        message: `${userActionType} Name:`,
        validate: (val) => (val != null && val.trim() != "") ? true : "Please enter a name!"
    }, {
        name: "id",
        message: "Employee Id:",
        // Show next employee id as default
        default: () => Employee.getNextId(),
        validate: (val) => (parseInt(val) > 0) ? true : "Employee Id should be an integer!"
    }, {
        name: "email",
        message: "Email Id:",
        validate: (email) => (/\S+@\S+/.test(email)) ? true : "Please enter a valid email!"
    }, {
        name: "officeNumber",
        message: "Office Number:",
        validate: (val) => (parseInt(val) > 0) ? true : "Office Number should be an integer!",
        when: (userActionType == ActionTypes.AddManager)
    }, {
        name: "github",
        message: "GitHub Id:",
        validate: (val) => (val != null && val.trim() != "") ? true : "Please enter a GitHub Id!",
        when: (userActionType == ActionTypes.AddEngineer)
    }, {
        name: "school",
        message: "School:",
        validate: (val) => (val != null && val.trim() != "") ? true : "Please enter the Intern's School!",
        when: (userActionType == ActionTypes.AddIntern)
    }, {
        name: "actionType",
        message: "Select an action:",
        type: "list",
        // list of user action choices - show the generate html option only once a manager 
        // and at least one employee has been added
        choices: () =>
            (userActionType == ActionTypes.AddManager) ?
                actionChoiceAddEmployees : [...actionChoiceAddEmployees, actionChoiceGenerate]
    }];
}

/** array of action choice options for add employee */
const actionChoiceAddEmployees = [{
    name: "Add an Engineer",
    value: ActionTypes.AddEngineer
}, {
    name: "Add an Intern",
    value: ActionTypes.AddIntern
}];

/** action choice - Generate */
const actionChoiceGenerate = {
    name: "Generate Team Html",
    value: ActionTypes.Generate
}

module.exports = {
    fetch: fetchQuestions,
    ActionTypes
};