const axios = require("axios");
const Services = require("./CheckInServices.js");
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
    
    describe('getCheckoutRecords tests', () => {
        it('should return checkout records', async () => {
            // replace normal get response with test values
            axios.get.mockResolvedValueOnce(response);
            // tests
            Services.getCheckoutRecords().then(data => expect(data).toEqual(number));
            expect(axios.get).toHaveBeenCalledWith("/api/checkin");
        })


        it('should return an error', async () => {
            axios.get.mockImplementation(() => {
                throw new Error();});
            expect(await Services.getCheckoutRecords()).toBe("Error getting the checkout records");
        })

    });
});