const Employee = require("./Employee");

/** This class represents a Manager */
class Manager extends Employee {
    /**
     * Creates an instance of a Manager
     * @param {String} name the Manager's name
     * @param {Number} id the Manager's Id as an integer
     * @param {String} email the Manager's email address
     * @param {Number} officeNumber the Manager's office number as an integer
     */
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        if ((officeNumber != null) &&
            (typeof officeNumber !== "number" || isNaN(officeNumber) || officeNumber <= 0)) {
            // Invalid Office Number - throw an error
            throw new Error("Parameter 'officeNumber' has to be a positive number");
        }
        this.officeNumber = officeNumber;
    }

    /** gets the Manager's office number */
    getOfficeNumber() {
        return this.officeNumber;
    }

    /** (Overridden) gets the Employee's role */
    getRole() {
        return "Manager";
    }
}

module.exports = Manager;
