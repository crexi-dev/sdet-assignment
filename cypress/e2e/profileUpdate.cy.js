import { changeAvatar, login } from "../utils/authenication";

describe("Update Profile", () => {
  beforeEach(() => {});

  afterEach(() => {});

  it("User is able to change their profile picture", function () {
    login("ngojackie90@gmail.com", "rnw!ytn8KGX5nte8acb");
    changeAvatar();
  });
});
