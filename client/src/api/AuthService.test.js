const axios = require("axios");
const Services = require("./AuthService.js");

jest.mock("axios");

beforeEach(() => {
  axios.post.mockReset();
  axios.get.mockReset();
});

describe("verifyLogin tests", () => {
  it("should return user information", async () => {
    const user = [
      [
        {
          user_id: 1,
          first_name: "Coraline",
          last_name: "Dutch",
          username: "cdutch0",
          permissions: 2,
          advanced: 0,
        },
      ],
    ];
    const result = { result: user };
    const response = { data: result };

    axios.post.mockResolvedValueOnce(response);

    var testResult = await Services.verifyLogin("cdutch0", "newpass");

    expect(testResult).toBe(user);

    // return Services.verifyLogin("cdutch0", "newpass").then((data) =>
    //   expect(data).toEqual(user)
    // );
  });
});
