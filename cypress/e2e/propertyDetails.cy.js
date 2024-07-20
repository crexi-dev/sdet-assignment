import { login } from "../utils/authenication";
import { visitFirstPropertyCard } from "../utils/property";

describe("Authenication", () => {
  beforeEach(() => {});

  afterEach(() => {});

  it("user is able to view sale properties", function () {
    login("ngojackie90@gmail.com", "rnw!ytn8KGX5nte8acb");
    visitFirstPropertyCard("properties");
  });

  it("user is able to view lease properties", function () {
    login("ngojackie90@gmail.com", "rnw!ytn8KGX5nte8acb");
    visitFirstPropertyCard("lease/properties");
  });

  it("user is able to view aunction properties", function () {
    login("ngojackie90@gmail.com", "rnw!ytn8KGX5nte8acb");
    visitFirstPropertyCard("properties/Auctions");
  });
});
