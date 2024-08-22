const fs = require('fs');
const yaml = require('js-yaml');
const { faker } = require('@faker-js/faker');
 
// Load YAML file from the testData folder
let data = yaml.load(fs.readFileSync('./testData/login.yaml', 'utf8'));
 
// Map of placeholder strings to faker functions
const fakerMapping = {
  'faker.internet.email': () => faker.internet.email(),
  'faker.internet.password': () => faker.internet.password(),
  'faker.internet.userName': () => faker.internet.userName(),
  'faker.name.firstName': () => faker.name.firstName(),
  'faker.name.lastName': () => faker.name.lastName(),
  'faker.address.city': () => faker.address.city(),
  'faker.address.country': () => faker.address.country(),
  'faker.phone.phoneNumber': () => faker.phone.phoneNumber(),
  'faker.datatype.uuid': () => faker.datatype.uuid(),
  // Add more mappings as needed
};
 
// Function to replace placeholders with Faker data
const replacePlaceholders = (obj) => {
  for (let key in obj) {
    if (typeof obj[key] === 'string' && obj[key].startsWith('{{') && obj[key].endsWith('}}')) {
      const expression = obj[key].slice(2, -2).trim();
      console.log(`Processing placeholder: ${expression}`);
      if (fakerMapping[expression]) {
        obj[key] = fakerMapping[expression]();
      } else {
        console.error(`No faker function mapping found for expression: ${expression}`);
        obj[key] = `ERROR: ${expression}`; // Handle missing mappings
      }
    } else if (typeof obj[key] === 'object') {
      replacePlaceholders(obj[key]);
    }
  }
};
 
// Replace placeholders with Faker-generated data
replacePlaceholders(data);
 
// Log the processed data to verify
//console.log(data);
 
// Export the processed data for use in tests
module.exports = data;