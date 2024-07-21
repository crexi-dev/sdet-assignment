const { exec } = require("child_process");
const testFiles = [
  "cypress/e2e/profileUpdate.cy.js",
  "cypress/e2e/propertyDetails.cy.js",
  "cypress/e2e/search.cy.js",
  "cypress/e2e/userLogin.cy.js",
  // Add more test files as needed
];

const processes = testFiles.map((file) => {
  return new Promise((resolve, reject) => {
    const command = `npx cypress run --spec ${file}`;
    const process = exec(command, (err, stdout, stderr) => {
      if (err) {
        reject(`Error running test ${file}: ${err}`);
        return;
      }
      console.log(`Output for test ${file}:\n`, stdout);
      if (stderr) {
        console.error(`Stderr for test ${file}:\n`, stderr);
      }
      resolve();
    });

    process.stdout.pipe(process.stdout);
    process.stderr.pipe(process.stderr);
  });
});

Promise.all(processes)
  .then(() => {
    console.log("All tests completed successfully.");
  })
  .catch((error) => {
    console.error("Error running tests:", error);
  });
