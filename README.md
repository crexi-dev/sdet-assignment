# Ramsen Constantione - SDET Assignment

## Overview
This solution SDET assignment is done in Playwright with Javascript.

## Playwright Automation Framework Setup Guide
1. **Clone the repository:**  
   `git clone <repository-url>`
2. **Install Node.js:**  
   Ensure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org).
3. **Install project dependencies:**  
   `npm install`
4. **Install Playwright browsers:**  
   `npx playwright install --with-deps`
5. **Framework dependencies:**  
   The framework uses Faker.js and dotenv.
6. **Create a `.env` file in the project root:**  
   Set your environment variables (stored in GitHub secrets):  
   `echo "USER_PASSWORD=yourpassword" >> .env`  
   `echo "BASE_URL=https://your-base-url.com" >> .env`
7. **Run the tests:**  
   `npm run test`

## Project Notes
1. Test users are stored in `users-testdata.json`, while the password for these users is in the `.env` file.
2. Tests are located in the `tests` folder.
3. Page objects containing element variables are in the `pageobjects` folder.
4. Media for uploads is in the `assets` folder.
5. The YAML file accesses GitHub secrets for UploadCare and .env file creation.

## Test Notes
1. The sign up test cases are skipped at the moment as email aliasing and fakerjs emails are not accepted by the sign up form.
2. My user `ramsencrexi@google.com` in `users-testdata.json` should be `"type": "google"`, but Google log in does not work in headless mode. It currently uses email log in. 
2. Bugs I found relating to tests have the text `"BUG:"` above them.
3. I used a single critieria for my search tests, but can easily expand to more property types with what I have there.
