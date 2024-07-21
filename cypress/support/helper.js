//This is to validate the role created matches
// Currently block from unauthorization
export function getUserInfo(role) {
  return cy
    .request({
      method: "GET",
      url: "https://api.crexi.com/account",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Ensures that cookies are sent with the request
    })
    .then((response) => {
      expect(response.status).to.eq(200);
      const userInfo = response.body;
      expect(userInfo.industryRoles).to.include(role);
    });
}
