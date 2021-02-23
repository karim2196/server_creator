var inquirer = require('inquirer');
const fs = require('fs');
const CHOICES = fs.readdirSync(`${__dirname}/templates`);
const QUESTIONS = [
    {
      name: 'project-choice',
      type: 'list',
      message: 'What project template would you like to generate?',
      choices: CHOICES
    },
    {
        name: 'project-name',
        type: 'input',
        message: 'Project name:',
        validate: function (input) {
          if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
          else return 'Project name may only include letters, numbers, underscores and hashes.';
        }
      },

      {
        name: 'project-directory',
        type: 'input',
        message: 'Type the absolute path of the directory where you want to build your project:',
        
      }
];


inquirer
  .prompt(QUESTIONS)
  .then(answers => {
      const projectChoice = answers['project-choice'];
      const projectName = answers['project-name'];
      const templatePath = `${__dirname}/templates/${projectChoice}`
      const newDirectory = answers['project-directory'];
      console.log('aqui ansers : ' , answers)
      fs.mkdirSync(`${newDirectory}/${projectName}`);
      createDirectoryContents(templatePath, projectName, newDirectory);

  })
  .catch(error => {
    if(error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.log('error istty : ' , error.isTtyError)
    } else {
      // Something else when wrong
      console.log('other error : ' , error)
    }
  });

function createDirectoryContents (templatePath, newProjectPath, newDirectory) {
    console.log('aqui new directory : ' , newDirectory)
    console.log('aqui templatepath : ' , templatePath)
    console.log('aqui newprojectpath : ' , newProjectPath)


    const filesToCreate = fs.readdirSync(templatePath);

    filesToCreate.forEach(file => {
        const origFilePath = `${templatePath}/${file}`;
        const stats = fs.statSync(origFilePath);
        const writePath = `${newDirectory}/${newProjectPath}/${file}`;

        if (stats.isFile()) {
            const contents = fs.readFileSync(origFilePath, 'utf8');
            fs.writeFileSync(writePath, contents, 'utf8');

        } else if (stats.isDirectory()) {
            fs.mkdirSync(writePath);
            let newWritePath = `/${newProjectPath}/${file}`;
            createDirectoryContents(origFilePath,newWritePath,newDirectory)
        }
    });
}