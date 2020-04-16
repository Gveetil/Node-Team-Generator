const path = require("path");
const fs = require("fs");

const templatesDir = path.resolve(__dirname, "../templates");

const render = employees => {
  const html = [];

  employees
    .filter(employee => employee.getRole() === "Manager")
    .forEach(manager => html.push(renderManager(manager))
    );
  employees
    .filter(employee => employee.getRole() === "Engineer")
    .forEach(engineer => html.push(renderEngineer(engineer))
    );
  employees
    .filter(employee => employee.getRole() === "Intern")
    .forEach(intern => html.push(renderIntern(intern))
    );

  return renderMain(html.join(""));
};

const renderCSS = () => {
  let stylesheet = fs.readFileSync(path.resolve(templatesDir, "style.css"), "utf8");
  return stylesheet;
};

const renderManager = manager => {
  let template = fs.readFileSync(path.resolve(templatesDir, "manager.html"), "utf8");
  template = replaceEmployeePlaceholders(template, manager);
  template = replacePlaceholders(template, "officeNumber", manager.getOfficeNumber());
  return template;
};

const renderEngineer = engineer => {
  let template = fs.readFileSync(path.resolve(templatesDir, "engineer.html"), "utf8");
  template = replaceEmployeePlaceholders(template, engineer);
  template = replacePlaceholders(template, "github", engineer.getGithub());
  return template;
};

const renderIntern = intern => {
  let template = fs.readFileSync(path.resolve(templatesDir, "intern.html"), "utf8");
  template = replaceEmployeePlaceholders(template, intern);
  template = replacePlaceholders(template, "school", intern.getSchool());
  return template;
};

const replaceEmployeePlaceholders = (template, employee) => {
  template = replacePlaceholders(template, "name", employee.getName());
  template = replacePlaceholders(template, "role", employee.getRole());
  template = replacePlaceholders(template, "email", employee.getEmail());
  template = replacePlaceholders(template, "id", employee.getId());
  return template;
};

const renderMain = html => {
  const template = fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8");
  return replacePlaceholders(template, "team", html);
};

const replacePlaceholders = (template, placeholder, value) => {
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
  return template.replace(pattern, value);
};

module.exports = { render, renderCSS };
