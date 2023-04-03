const axios = require("axios");
const Services = require("./UserService.js");
// mock the imported axios which is called in all api functions
jest.mock("axios");

beforeEach(() => {
    // clear axios before each test because it can hold data from previous tests
    axios.post.mockReset();
    axios.get.mockReset();
});

// setup for mocking return values later
const users = [
    [{ user_id: 1, name: "Colby", username: "cheese" },
    { user_id: 4, name: "kookoo", username: "bera" }]
];
const result = { result: users };
const response = { data: result,
                    status: 0 };
const error = {response: response};


describe('get tests', () => {
    
    describe('getAllUsers tests', () => {
        it('should return all users', async () => {
            // replace normal get response with test values
            axios.get.mockResolvedValueOnce(response);
            // tests
            Services.getAllUsers().then(data => expect(data).toEqual(users));
            expect(axios.get).toHaveBeenCalledWith("/api/user/get_all");
        })


        it('should return an error', async () => {
            axios.get.mockImplementation(() => {
                throw new Error();});
            expect(await Services.getAllUsers()).toBe("Error Getting Users from API");
        })

    });
});