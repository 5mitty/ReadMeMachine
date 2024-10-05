// TODO: Include packages needed for this application
import fs from 'fs';
import inquirer from 'inquirer';
import path from 'path';

// Function to create output directory if it doesn't exist
function createOutputDir() {
    const dir = './output';
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
}

// Function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) => {
        if (err) throw err;
        console.log('README.md has been generated!');
    });
}



// Function to initialize app
function init() {
    const licenses = [
        { name: 'MIT', value: 'mit' },
        { name: 'Apache 2.0', value: 'apache-2.0' },
        { name: 'GPL 3.0', value: 'gpl-3.0' },
        { name: 'BSD 3-Clause', value: 'bsd-3-clause' },
        { name: 'No License', value: 'none' },
    ];
    console.log("Starting the Inquirer prompts...");
    createOutputDir(); // Ensure the output directory exists
    // Title, Description, Installation, Usage, Contributing, and Tests
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the title of your project?',
            },
            {
                type: 'input',
                name: 'description',
                message: 'Please provide a description of your project:',
            },
            {
                type: 'input',
                name: 'installation',
                message: 'What are the installation instructions?',
            },
            {
                type: 'input',
                name: 'usage',
                message: 'How is the application used?',
            },
            {
                type: 'input',
                name: 'test',
                message: 'What are the test instructions?',
            },
            {
                type: 'input',
                name: 'contribution',
                message: 'What are the contribution conditions?',
            },
            {
                type: 'list',
                name: 'license',
                message: 'What license does your project have?',
                choices: licenses,
            },
            {
                type: 'input',
                name: 'github',
                message: 'What is your GitHub username?',
            },
            {
                type: 'input',
                name: 'email',
                message: 'What is your email address?',
            },
        ])
        .then((answers) => {
            const readMeFile = `
            ## ${answers.title}

            ## Description

            ${answers.description}

            ## Table of Contents

            - [Installation](#installation)
            - [Usage](#usage)
            - [Contributing](#contributing)
            - [Tests](#tests)
            - [License](#license)
            - [Questions](#questions)

            ## Installation

            ${answers.installation}

            ## Usage

            ${answers.usage}

            ## Contributing

            The contribution conditions are: ${answers.contribution}

            ## Tests

            The test instructions are: ${answers.test}

            ## License

            This project has a/an ${answers.license} license.

            ## Questions

            For any questions, please reach out to me on GitHub [${answers.github}](https://github.com/${answers.github}) or via email at ${answers.email}.
        `;

            // Call writeToFile with the correct parameters
            writeToFile('./output/README.md', readMeFile);
        })
        .catch((error) => {
            console.error("Error in prompts:", error);
        });
}

// Function call to initialize app
init();