import { changeAvatar, login } from "../utils/authenication";

describe("Update Profile", () => {
  beforeEach(() => {});

  afterEach(() => {});

  it("User is able to change their profile picture", function () {
    login();
    changeAvatar();
  });
});
