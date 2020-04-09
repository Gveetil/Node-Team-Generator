
/** This class represents an Employee */
class Employee {
    /**
     * Creates an instance of an Employee
     * @param {String} name the Employee's name
     * @param {Number} id the Employee's Id as an integer
     * @param {String} email the Employee's email address
     */
    constructor(name, id, email) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = this.constructor.name;
    }

    /** gets the Employee's email address */
    getEmail() {
        return this.email;
    }

    /** gets the Employee's role */
    getRole() {
        return this.role;
    }

    /** gets the Employee's id */
    getId() {
        return this.id;
    }

    /** gets the Employee's name */
    getName() {
        return this.name;
    }
}

module.exports = Employee;
