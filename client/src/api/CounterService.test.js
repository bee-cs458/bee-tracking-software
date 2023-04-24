const axios = require("axios");
const Services = require("./CounterService.js");
// mock the imported axios which is called in all api functions
jest.mock("axios");

beforeEach(() => {
    // clear axios before each test because it can hold data from previous tests
    axios.post.mockReset();
    axios.get.mockReset();
});
// setup for mocking return values later
const number = 1;
const result = { result: number };
const response = { data: result,
                    status: 0 };
const error = {response: response};


describe('get tests', () => {
    
    describe('getCount tests', () => {
        it('should return count', async () => {
            // replace normal get response with test values
            axios.get.mockResolvedValueOnce(response);
            // tests
            Services.getCounterValue().then(data => expect(data).toEqual(number));
            expect(axios.get).toHaveBeenCalledWith("/api/count");
        })


        it('should return an error', async () => {
            axios.get.mockImplementation(() => {
                throw new Error();});
            expect(await Services.getCounterValue()).toBe("Error Getting Counter Value");
        })

    });
});