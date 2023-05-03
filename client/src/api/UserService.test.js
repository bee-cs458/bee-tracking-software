const axios = require("axios");
const Services = require("./UserService.js");
const { serializeUser } = require("passport");
// mock the imported axios which is called in all api functions
jest.mock("axios");

beforeEach(() => {
  // clear axios before each test because it can hold data from previous tests
  axios.post.mockReset();
  axios.get.mockReset();
});


describe("get tests", () => {
  describe("getAllUsers tests", () => {
    it("should return all users", async () => {
      //setup for mocking
      const users = [
        [
          { user_id: 1, name: "Colby", username: "cheese"},
          { user_id: 4, name: "kookoo", username: "bera"},
        ],
      ];
      const result = { result: users };
      const response = { data: result, status: 0 };
      const error = { response: response };

      // replace normal get response with test values
      axios.get.mockResolvedValueOnce(response);
      // tests
      Services.getAllUsers().then((data) => expect(data).toEqual(users));
      expect(axios.get).toHaveBeenCalledWith("/api/user/get_all");
    });

    it("should return an error", async () => {
      axios.get.mockImplementation(() => {
        throw new Error();
      });
      expect(await Services.getAllUsers()).toBe("Error Getting Users from API");
    });
  });

  describe("getPasswordForUsername tests", () => {
    it("should return the hashes for the user with username cheese", async () => {
      //set up for maocking
      const password = [{password: "cheese"}];
      const result = { result: password };
      const response = { data: result, status: 0 };
      //replace normal get response with test values
      axios.get.mockResolvedValueOnce(response);
      //tests

      Services.getPassowrdForUsername("cheese").then((data) =>
        expect(data).toEqual(result.result[0].password)
      );
      expect(axios.get).toHaveBeenCalledWith(
        "api/user/getPasswordForUsername/cheese"
      );
    });
  });

  describe("getPasswordForUserID tests", () => {
    it("should return the hashes for the user with user_id 1", async () => {
      //set up for mocking
      const password = [{password: "cheese"}];
      const result = { result: password };
      const response = { data: result, status: 0 };
      //replace normal get response with test values
      axios.get.mockResolvedValueOnce(response);
      //tests
      Services.getPassowrdForUserID("1").then((data) =>
        expect(data).toEqual(result.result[0].password)
      );
      expect(axios.get).toHaveBeenCalledWith("api/user/getPasswordForUserID/1");
    });
  });
});
