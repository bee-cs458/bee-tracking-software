import axios from "axios";

/*
Calls the API endpoint that gets every Checkout record that is in the database whith a null in_date
@return collection of checkout records from the database, where each entry is one row.
*/
export async function getCheckoutRecords() {
  try {
    const response = await axios.get("/api/checkin");
    return response.data.result;
  } catch (error) {
    return "Error getting the checkout records";
  }
}

/*
Calls the API endpoint that gets the checkout record for the checkout record with the highest record_id witht the given asset_tag
@param tag asset tag 
@return checkout record
*/
export async function getCheckoutRecordsByTag(tag) {
  try {
    /*
    console.log(
      "Getting the mot recent checkout record for the asset with tag" + tag
    );
    */
    const response = await axios.get("/api/checkin/byasset/" + tag);
    return response.data.result;
  } catch (error) {
    return "Error getting the checkout record with the tag " + tag;
  }
}

/* 
Calls the APT endpount that gets a list of all the checkout records that with given user id with a null in_date
@param userId student's id
@return collection of checkout records, where each entry is one row
*/
export async function getCheckoutRecordsByUserID(userId) {
  try {
    /*
    console.log(
      "Getting the mot recent checkout records for the user " + userId
    );
    */
    const response = await axios.get("/api/checkin/" + userId);
    return response.data.result;
  } catch (error) {
    return "Error getting the checkout records for the user " + userId;
  }
}

/* 
Calls the APT endpount that gets a list the assets of all the checkout records that with given user id with a null in_date
@param userId student's id
@return collection of assets, where each entry is one row
*/
export async function getAssetsByUserID(userId) {
  try {
    /*
    console.log(
      "Getting the mot recent assets for checkout records for the user " +
        userId
    );
    */
    const response = await axios.get("/api/checkin/assets/" + userId);
    return response.data.result;
  } catch (error) {
    return (
      "Error getting the assets for ythe checkout records for the user " +
      userId
    );
  }
}

/**
 * Function that call axios to query the database to set a checkout record for an asset with the entered notes and current date. Also sets asset to being avaliable.
 * @param {*} recordId the ID of the asset that is being checked in
 * @param {*} notes the notes for the checkout record
 * @returns the result of the query.
 */
export async function checkInAssetWithNotes(recordId, notes) {
  try {
    //console.log("Getting the most recent checkout record  " + recordId);

    const response = await axios.post("/api/checkin/checkin/" + recordId, {
      notes,
    });
    return response.data.result;
  } catch (error) {
    return "Error getting the checkout record " + recordId;
  }
}

/* 
Calls the API endpoint that updates the checkout record by updating the in_date and the notes
@param recordId the reocord id that will be updated
@param notes notes to be added to the checkout record
@param damage 1 if the asset is still opertional 0 if not
@param damageNotes any notes of the damages
*/
export async function checkInAssetWithDamageNotes(
  recordId,
  notes,
  damage,
  damageNotes
) {
  try {
    //console.log("Getting the most recent checkout record  " + recordId);

    const response = await axios.post(
      "/api/checkin/checkin/notes/" + recordId,
      {
        notes,
        damage,
        damageNotes,
      }
    );
    return response.data.result;
  } catch (error) {
    return "Error getting the checkout record " + recordId;
  }
}

/* 
Calls the API endpoint that gets true if the record asset was turned in after the due date
@param recordId the record id
@return the studentid and true if late and false if not.
*/
export async function getOverdue(recordId) {
  try {
    //console.log("Checking if the asset is overdue for record: " + recordId);

    const response = await axios.get("/api/checkin/overdue/" + recordId);
    //console.log(response.data.result);
    return response.data;
  } catch (error) {
    return "Error getting the overdue info for checkout record " + recordId;
  }
}

/* 
Calls the API endpoint that increments the user strikes
@param userId the user that will have a strike added
*/
export async function incrementUserStrikes(userId) {
  try {
    //console.log("Giving the user " + userId + " one more strike");

    const response = await axios.post("/api/checkin/student/" + userId);
    return response.data.result;
  } catch (error) {
    return "Error incrementing the strikes for user " + userId;
  }
}
