const axios = require("axios");
const Services = require("./CategoryService.js");
// mock the imported axios which is called in all api functions
jest.mock("axios");

beforeEach(() => {
    // clear axios before each test because it can hold data from previous tests
    axios.post.mockReset();
    axios.get.mockReset();
});
// Describes what the tests under this function do/ has no operational purpose other than scope
describe('getAllCategories tests', () => {
    // the actual test that will run, the function "it" is interchangeable with "test"
    it('should return all categories', async () => {
        // creation of mock data to match the axios result in the actual function
        const categories = [{ category: 1, name: "cameras" }];
        const result = { result: categories };
        const response = { data: result };
        // this should match the data format of response.data.result
        //        debugger;
        // this will catch axios the next time it uses the get function and create the response we gave it
        axios.get.mockResolvedValue(response);
        //        console.log(await Services.getCategories());

        // expect(axios.get).toHaveBeenCalledWith('/api/categories/');
        // when getCategories resolves check that the data matches the response we gave it
        return Services.getCategories().then(data => expect(data).toEqual(categories));
    })
});

