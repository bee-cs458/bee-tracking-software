const axios = require("axios");
const Services = require("./AssetService.js");

jest.mock("axios");


describe('getAll tests', () => {
    it('should return all assets', async () => {
        const assets = [
            [{asset_tag: 1, name: "camera", description: "Black Magic Cinema"},
            {asset_tag: 4, name: "light", description: "Black Magic Cinema"}]
        ];
        debugger;
        axios.get.mockResolvedValue(assets);
        const result = Services.getAllAssets();
        expect(axios.get).toHaveBeenCalledWith(`/api/asset/get_all`);
        expect(result).toEqual(assets);
    })
});