import { companyInfo, login, signUp } from "../utils/authenication";

describe("Authenication", () => {
  beforeEach(() => {});

  afterEach(() => {});

  it("User is able to sign up for an account", function () {
    signUp("Other");
    companyInfo("1 - 5");
  });

  // it("user is able to login with their newly created account", function () {
  //   login();
  // });
});
