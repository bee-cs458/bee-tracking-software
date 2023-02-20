const axios = require("axios");
const Services = require("./AssetService.js");

jest.mock("axios");

beforeEach(() => {
    axios.post.mockReset();
    axios.get.mockReset();
});

jest.mock('axios');

describe('getAllAssets tests', () => {
    it('should return all assets', async () => {
        const assets = [
            [{ asset_tag: 1, name: "camera", description: "Black Magic Cinema" },
            { asset_tag: 4, name: "light", description: "Black Magic Cinema" }]
        ];
        const result = { result: assets };
        const response = { data: result };

        axios.get.mockResolvedValueOnce(response);

        return Services.getAllAssets().then(data => expect(data).toEqual(assets));
    })


});

describe('getAllAssetsWithDueDates tests', () => {
    it('should return all assets with due dates', async () => {
        const assets = [
            [{ asset_tag: 1, name: "camera", description: "Black Magic Cinema" },
            { asset_tag: 4, name: "light", description: "Black Magic Cinema" }]
        ];
        const result = { result: assets };
        const response = { data: result };

        axios.get.mockResolvedValueOnce(response);

        return Services.getAllAssetsWithDueDates().then(data => expect(data).toEqual(assets));
    })


});

describe('getAssetsByDescription tests', () => {
    it('should return all assets with due dates', async () => {
        const assets = [
            [{ asset_tag: 1, name: "camera", description: "Black Magic Cinema" },
            { asset_tag: 4, name: "light", description: "Black Magic Cinema" }]
        ];
        const result = { result: assets };
        const response = { data: result };

        axios.get.mockResolvedValueOnce(response);

        return Services.getAssetsByDescription().then(data => expect(data).toEqual(assets));
    })


});