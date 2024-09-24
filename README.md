## Report Download
You can download the full Cypress Test Automation Report from [here](https://ucarecdn.com/145f83a5-0d00-44ca-a853-ea30a72183ba/stoyanshivarov_CypressTestAutomationReportforCrexiPlatform.docx).


# Cypress Test Suite for Crexi

This repository contains an automated test suite for the [Crexi](https://www.crexi.com/) platform, developed using **Cypress** and **GitHub Actions** for CI. The tests cover essential functionalities, including login, profile picture updates, property details, user registration, and property search.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Setup](#setup)
- [Running the Tests](#running-the-tests)
- [CI Pipeline](#ci-pipeline)
- [Test Results](#test-results)
- [Contributing](#contributing)

## Project Overview
This test suite is designed to automate end-to-end (E2E) testing for Crexi, ensuring that core functionalities work as expected. It leverages **Cypress**, a modern JavaScript-based testing framework, and uses **GitHub Actions** for continuous integration (CI) to automatically run the test suite upon every code push.

## Features
The test suite includes the following scenarios:
1. **Login Test**: Validates that users can log in with valid credentials.
2. **Profile Picture Update Test**: Ensures profile pictures can be successfully updated.
3. **Property Details Test**: Confirms that the correct property details are displayed when selected.
4. **User Registration Test**: Verifies that a new user can register with valid details.
5. **Search Functionality Test**: Tests the ability to search for properties based on type and location.

## Setup

### Prerequisites
To run this project locally, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14.x or later)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- Cypress (latest version)

### Installation Steps
1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/your-username/stoyan-shivarov-crexi-cypress.git
