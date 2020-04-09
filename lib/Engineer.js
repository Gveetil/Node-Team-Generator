const Employee = require("./Employee");

/** This class represents an Engineer */
class Engineer extends Employee {
    /**
     * Creates an instance of an Engineer
     * @param {String} name the Engineer's name
     * @param {Number} id the Engineer's Id as an integer
     * @param {String} email the Engineer's email address
     * @param {String} github the Engineer's github user id
     */
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
    }

    /** gets the Engineer's github user id */
    getGithub() {
        return this.github;
    }
}

module.exports = Engineer;
