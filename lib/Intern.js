const Employee = require("./Employee");

/** This class represents an Intern */
class Intern extends Employee {
    /**
     * Creates an instance of an Intern
     * @param {String} name the Intern's name
     * @param {Number} id the Intern's Id as an integer
     * @param {String} email the Intern's email address
     * @param {String} school the Intern's school 
     */
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
    }

    /** gets the Intern's school */
    getSchool() {
        return this.school;
    }
}

module.exports = Intern;
