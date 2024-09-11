const { faker } = require("@faker-js/faker");

/** Function that returns generated data object for SignUp form. Uses faker library to generate random data.
 *Usage of this library would depend on the project requirements.
 */

function populateSignUpData() {
  const password = faker.internet.password();
  /**Commenting some roles.For those roles we have extra logic upon sign up.
   * My current logic for setting form fields is looking for label that includes text.
   * Currently we have some labels that are not unique, so I commented those as well
   * */
  const industryRole = [
    "Listing Broker/Agent",
    "Buyer Broker/Agent",
    "Selling/Buying Broker/Agent",
    "Transaction Coordinator",
    // "Landlord Broker/Agent",
    // "Tenant Rep Broker",
    "Principal",
    "Lender",
    "Assessor",
    "Appraiser",
    "Third Party Service",
    // "Tenant",
    "Owner/Property Manager",
    "Other",
  ];
  return {
    properties: [
      { label: "First Name", type: "text", value: faker.person.firstName() },
      { label: "Last Name", type: "text", value: faker.person.lastName() },
      { label: "Email", type: "text", value: faker.internet.email() },
      { label: "Password", type: "text", value: password },
      {
        label: "Industry Role",
        type: "select",
        value: industryRole[Math.floor(Math.random() * industryRole.length)],
      },
      {
        label: "Phone Number",
        type: "text",
        value: faker.phone.number({ style: "national" }),
      },
    ],
  };
}
//If we would want to login with the same data as we signed up, we would take the email and password from the signUpData object and use it in the loginData object.
//In our case I am using separate data for login as I am not doing any verification of succesful sign up and login with the same user.
//In Ideal world we would want to store our sensitive data in a secure place like secret manager or encrypt it and not just store a raw data in env file.

/**
 * Generates login data for a test user.
 *
 * @param {string} testUserEmail - The email of the test user.
 * @param {string} testUserPassword - The password of the test user.
 * @returns {object} - An object containing properties for email and password.
 */
function populateLoginData(testUserEmail, testUserPassword) {
  return {
    properties: [
      { label: "Email", type: "text", value: testUserEmail },
      { label: "Password", type: "text", value: testUserPassword },
    ],
  };
}

module.exports = { populateSignUpData, populateLoginData };
