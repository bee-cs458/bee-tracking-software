const axios = require("axios");
const Services = require("./AssetService.js");

//const get = jest.spyOn(axios, 'get');
jest.mock("axios");
beforeEach(() => {
    axios.post.mockReset();
    axios.get.mockReset();
    //get.mockReset();
});
// setup for mocking return values later
const assets = [
    [{ asset_tag: 1, name: "camera", description: "Black Magic Cinema" },
    { asset_tag: 4, name: "light", description: "Black Magic Cinema" }]
];
const result = { result: assets };
const response = { data: result,
                    status: 0 };
const error = {response: response};


describe('get tests', () => {
    
    describe('getAllAssets tests', () => {
        it('should return all assets', async () => {
            // replace normal get response with test values
            axios.get.mockResolvedValueOnce(response);
            // tests
            Services.getAllAssets().then(data => expect(data).toEqual(assets));
            expect(axios.get).toHaveBeenCalledWith("/api/asset/get_all");
        })


        it('should return an error', async () => {
            axios.get.mockImplementation(() => {
                throw new Error();});
            expect(await Services.getAllAssets()).toBe("Error Getting Assets from API");
        })

    });



    describe('getAllAvailableAssets tests', () => {
        it('should return all available assets', async () => {
            // replace normal get response with test values
            axios.get.mockResolvedValueOnce(response);
            // tests
            Services.getAllAvailableAssets().then(data => expect(data).toEqual(assets));
            expect(axios.get).toHaveBeenCalledWith("/api/asset/get_available");
        });


        it('should return an error', async () => {
            axios.get.mockImplementation(() => {
                throw new Error();});
            expect(await Services.getAllAvailableAssets()).toBe("Error Getting Available Assets from API");
        });

    });

});

//    //Get all unavailable assets from API and return them
//     static async getAllUnavailableAssets() {
//         try {
//             const response = await axios.get("/api/asset/get_unavailable");
//             return response.data;
//         } catch (error) {
//             return "Error Getting Unavailable Assets from API";
//         }
//     };


 describe('getAllUnavailableAssets tests', () => {
        it('should return all unavailable assets', async () => {


            axios.get.mockResolvedValueOnce(response);
            Services.getAllUnavailableAssets().then(data => expect(data).toEqual(assets));
            expect(axios.get).toHaveBeenCalledWith("/api/asset/get_unavailable");
        })

        it('should return an error', async() => {

            axios.get.mockImplementation(() => {
                throw new Error();
            }); 
            
            expect(await Services.getAllUnavailableAssets()).toBe("Error Getting Unavailable Assets from API");
        })
    });



 describe('getAllAssetsWithDueDates tests', () => {
    it('should return all assets with due dates', async () => {
        axios.get.mockResolvedValueOnce(response);
        Services.getAllAssetsWithDueDates().then(data => expect(data).toEqual(assets));
        expect(axios.get).toHaveBeenCalledWith("/api/asset/get_all_due_dates");
    })

    it('should return an error', async() => {
        axios.get.mockImplementation(() => {
            throw new Error();
        }); 
        
        expect(await Services.getAllAssetsWithDueDates()).toBe("Error Getting Assets with Due Dates from API");
    })
});
describe("getAssetsByDescription tests", () => {
  it("should return test model and check the get call", async () => {
    axios.get.mockResolvedValueOnce(response);

    Services.getAssetsByDescription("butter").then((data) =>
      expect(data).toEqual(assets)
    );

    expect(axios.get).toHaveBeenCalledWith("/api/asset/search", {
      params: {
        limit: 10,
        description: "butter",
      },
    });
  });
});

describe('getAssetsByDescription tests', () => {
    it('should return test model and check the get call', async () => {
   
        axios.get.mockResolvedValueOnce(response);

   
        Services.getAssetsByDescription("butter").then(data => expect(data).toEqual(assets));

        expect(axios.get).toHaveBeenCalledWith("/api/asset/search", {
            params: {
              limit: 10,
              description: "butter",
            },
          });

    })

describe("getAssetsByDescription tests", () => {
  it("should return test model and check the get call", async () => {
    axios.get.mockResolvedValueOnce(response);

    Services.getAssetsByDescription("butter").then((data) =>
      expect(data).toEqual(assets)
    );

    expect(axios.get).toHaveBeenCalledWith("/api/asset/search", {
      params: {
        limit: 10,
        description: "butter",
      },
    });
  });
});
});
describe('getAssetsByDescription tests', () => {
    it('should return test model and check the get call', async () => {
   
        axios.get.mockResolvedValueOnce(response);

   
        Services.getAssetsByDescription("butter").then(data => expect(data).toEqual(assets));

        expect(axios.get).toHaveBeenCalledWith("/api/asset/search", {
            params: {
              limit: 10,
              description: "butter",
            },
          });

    })

        it('should return an error', async() => {

            axios.get.mockResolvedValueOnce
            
            expect(await Services.getAssetsByDescription()).toBe("Error Getting Assests by Description from API");
        })


    });

    describe('getAssetFromCat tests', () => {
        it('should return test model and check the get call', async () => {
            
            axios.get.mockResolvedValueOnce(response);
            Services.getAssetFromCat("butter").then(data => expect(data).toEqual(assets));
            expect(axios.get).toHaveBeenCalledWith("/api/asset/get_asset_via_cat/butter");

        })

        // it('should return an error', async() => {
        //     const error = [response];
        
        //     axios.get.mockImplementation(() => {
        //         throw new Error();
        //     }); 
            
        //     expect(await Services.getAssetFromCat()).toBe("Error Getting Assets in category from API");
        // })

        // it('should return a 404 error', async() => {

        //     error.response.status = 404;
        //     error.response.data.result = "rats";
        //     axios.get.mockResolvedValueOnce(error); 
            
        //     expect(await Services.getAssetFromCat()).toBe("rats");
        // })

    //});

});

// describe('create/edit/delete tests', () => {
    
//     describe('Create New Asset', () => {
//         it('should call axios.post with new assset info', async () => {
//             // replace normal get response with test values
//             // tests
            
//             //Services.createNewAsset("KOO-KOO-BER","Laughing KooKoobera", "He laughs at you","Creature",1,1);
//             // expect(axios.post).toHaveBeenCalledWith("/api/asset/", {
//             //     asset_tag: "KOO-KOO-BER",
//             //     name: "Laughing KooKoobera",
//             //     description: "He laughs at you",
//             //     date_added: date, //Set date to todays date (FIX)
//             //     category: "Creature",
//             //     operational: 1,
//             //     advanced: 2,
//             //     checked_out: 0, //Automatically set to not checked out
//             // });
//         })


//         // it('should return an error', async () => {
//         //     axios.get.mockImplementation(() => {
//         //         throw new Error();});
//         //     expect(await Services.getAllAssets()).toBe("Error Getting Assets from API");
//         // })

//     });

// });