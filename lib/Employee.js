
/** This class represents an Employee */
class Employee {
    /**
     * Creates an instance of an Employee
     * @param {String} name the Employee's name  
     * @param {Number} id the Employee's Id as an integer
     * @param {String} email the Employee's email address
     */
    constructor(name, id, email) {
        if (id == null) {
            // If Id is not specified, default to the next available id
            this.id = Employee.getNextId();
        }
        else if (typeof id !== "number" || isNaN(id) || id <= 0) {
            // Invalid Id - throw an error
            throw new Error("Parameter 'id' has to be a positive number");
        } else {
            this.id = id;
        }
        this.name = (name == null) ? "" : name;
        this.email = (email == null) ? "" : email;
        Employee.updateNextId(this.id);
    }

    /** gets the Employee's email address */
    getEmail() {
        return this.email;
    }

    /** gets the Employee's role */
    getRole() {
        return "Employee";
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

/** property keeps track of the current employee id in use */
Employee.maxEmployeeId = 0;

/** Check and update the current employee id once it has been used */
Employee.updateNextId = function (currentId) {
    if (Employee.maxEmployeeId < currentId)
        Employee.maxEmployeeId = currentId;
}

/** Gets the next available employee id */
Employee.getNextId = function () {
    return Employee.maxEmployeeId + 1;
}

module.exports = Employee;