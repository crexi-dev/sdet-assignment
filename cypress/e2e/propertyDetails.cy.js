import { login } from "../utils/authenication";
import { visitFirstPropertyCard } from "../utils/property";

describe("Authenication", () => {
  beforeEach(() => {});

  afterEach(() => {});

  it("user is able to view sale properties", function () {
    login();
    visitFirstPropertyCard("properties");
  });

  it("user is able to view lease properties", function () {
    login();
    visitFirstPropertyCard("lease/properties");
  });

  it("user is able to view aunction properties", function () {
    login();
    visitFirstPropertyCard("properties/Auctions");
  });
});
