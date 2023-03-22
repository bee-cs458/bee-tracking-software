const axios = require("axios");
const Services = require("./AuthService.js");

jest.mock("axios");

// Resets the mock before each test
beforeEach(() => {
  axios.mockReset();
});

// Sets up a test suite to test the return values from our login functions in AuthService
describe("tests to verify the return values from login functions", () => {
  // A test to verify the return values from a successful local login (username and password)
  it("should return user information", async () => {
    const user = [
      {
        user_id: 1,
        first_name: "Coraline",
        last_name: "Dutch",
        username: "cdutch0",
        permissions: 2,
        advanced: 0,
      },
    ];

    // Tells the mock what the call to axios should return
    axios.mockResolvedValueOnce(user);

    return Services.verifyLogin("cdutch0", "newpass").then((response) =>
      expect(response).toEqual(user)
    );
  });

  // A test to verify the return values from a failed local login (username and password)
  it("should return an object with an error code", async () => {
    // Tells the mock what the call to axios should return
    axios.mockRejectedValueOnce({ response: { status: 404 } });

    return Services.verifyLogin("cdutch0", "wrongpass").then((response) =>
      expect(response).toEqual({ status: 404 })
    );
  });

  // A test to verify the return values from a successful check of the currently authenticated user
  it("should return user information", async () => {
    const user = [
      {
        user_id: 1,
        first_name: "Coraline",
        last_name: "Dutch",
        username: "cdutch0",
        permissions: 2,
        advanced: 0,
      },
    ];

    axios.mockResolvedValueOnce(user);

    return Services.getLoggedInUser().then((response) =>
      expect(response).toEqual(user)
    );
  });

  // A test to check the return values of a failed check of the currently authenticated user
  it("should return a user with ID of -1 and permissions of -1", async () => {
    const user = {
      user: {
        user_id: -1,
        permissions: -1,
      },
    };

    axios.mockRejectedValue();

    return Services.getLoggedInUser().then((response) =>
      expect(response).toEqual(user)
    );
  });
});
