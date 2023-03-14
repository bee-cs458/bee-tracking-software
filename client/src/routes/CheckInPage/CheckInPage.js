import { useEffect, useState } from "react";
import "./CheckInPage.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ConditionalAlert from "../../components/CheckInUtilities/ConditionalAlert";
import {
  incrementUserStrikes,
  getOverdue,
  checkInAssetWithNotes,
  getCheckoutRecordsByUserID,
  getCheckoutRecordsByTag,
} from "../../api/CheckInServices";
import CheckInTable from "../../components/CheckInUtilities/CheckInTable";
import getCategories from "../../api/CategoryService";
import { getAllUnavailableAssets } from "../../api/AssetService";
import { useOutletContext } from "react-router-dom";
import { AccountLink } from "../../components/AccountLink/AccountLink";

export default function CheckInPage() {
  const [assets, setAssets] = useState([]);
  const [currentTag, setEnteredTag] = useState(null);
  const [studentID, setEnteredID] = useState(null);
  const [notes, setNotes] = useState("No Notes");
  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [strikes, setStrikes] = useState(0);
  const [disabledButton, setDisabledButton] = useState(false);
  //const [selectedStudent, setStudent] = useState("TODO Enter Student Here");
  const [cats, setCats] = useState([]);
  const [unavailableAssetTags, setUnAvailableAssetTags] = useState([]);
  const [theme, setTheme] = useOutletContext();

  const removeAsset = (asset_tag) => {
    if (asset_tag) {
      let tempList = assets.slice(); //creates a temp list that isn't a state
      //let index = 0; // for the index of the asset
      assets.forEach((asset) => {
        // go through every element in the list
        if (asset.asset_tag === asset_tag)
          //check if the current asset is the passes in asset
          tempList.shift(); //removes the first element in the list which is the asset with the tag that was passed in
        else tempList.push(tempList.shift()); //shifts the list so that the first element is now at the back
      });
      setAssets(tempList); //set the state to the temp list that has the change
    }
  };

  function handleIDChange(newValue) {
    setEnteredID(newValue);
    setAlertType(null);
    //console.log("input value: " + studentID);
  }

  function handleTagChange(newValue) {
    setEnteredTag(newValue);
    setAlertType(null);
    //console.log("Input Value: " + currentTag);
  }

  function clearAll() {
    setAssets([]);
    setNotes("");
    setAlertType(null);
    //console.log("Pending Assets Cleared");
  }

  const handleTagPress = async (event) => {
    if (currentTag != null) {
      let currentList = [...assets];
      if (currentList.every((asset) => asset.asset_tag !== currentTag)) {
        await getCheckoutRecordsByTag(currentTag).then((result) => {
          const newAsset = result[0];
          if (newAsset) {
            currentList.push(newAsset);
            setAlertType(null);
            setAssets(currentList);
          } else {
            setAlertType(1);
            setAlertMessage("Asset is already checked in");
          }
        });
      } else {
        setAlertType(1);
        setAlertMessage("Asset is Already Queued for Check In");
      }
      //console.log(assets);
    }
  };

  const handleIDPress = async (event) => {
    if (studentID != null) {
      await getCheckoutRecordsByUserID(studentID).then((result) => {
        const newAssets = result;
        if (newAssets) {
          setAssets(newAssets);
          if (newAssets.length === 0) {
            setAlertType(1);
            setAlertMessage("User does not have any assets checked out");
          }
          //console.log(newAssets);
        } else {
          setAlertType(1);
          setAlertMessage("User does not exist");
        }
      });
    }
  };

  const handleKeypressAsset = (e) => {
    //called when enter key is pressed while in the asset input box
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      handleTagPress();
    }
  };

  const handleKeypressStudent = (e) => {
    //called when enter key is pressed while in the id input box
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      handleIDPress();
    }
  };

  const checkIn = async (asset) => {
    setDisabledButton(true);
    const today = new Date();
    await checkInAssetWithNotes(
      asset.record_id,
      notes,
      asset.operational,
      asset.damage_notes +
        "\n" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate() +
        "-" +
        today.getFullYear() +
        ": " +
        asset.notes
    ).then(() => setDisabledButton(false));

    const overDue = await getOverdue(asset.record_id);

    if (overDue.overdue) {
      incrementUserStrikes(overDue.student_id);
      setStrikes(strikes + 1);
    }
    setDisabledButton(false);
  };

  const handleSubmit = async (event) => {
    if (assets.length < 1) {
      setAlertType(1);
      setAlertMessage("No Assets Selected");
    } else {
      setAlertType(null);
      setAlertMessage(null);

      assets.forEach((asset) => {
        checkIn(asset);
      });

      clearAll();

      if (strikes > 0) {
        setAlertType(0);
        setAlertMessage(
          "Late Asset Checked In\n" + strikes + " strikes added to student"
        );
      } else {
        setAlertType(3);
        setAlertMessage("Asset(s) Successfully Checked In");
      }

      setStrikes(0);
    }

    // set date in on records
    // add note to records

    // add damage notes to assets
    // add damaged var to assets
    // if overdue, add strike to student
    // make assets available if not damaged
  };

  const populateAssetTags = async () => {
    getAllUnavailableAssets()
      .then((tags) => {
        setUnAvailableAssetTags(tags);
        return tags;
      })
      .catch((err) => console.log(err));

    getCategories()
      .then((value) => {
        setCats(value);
        return value;
      })
      .catch((err) => console.log(err));
  };

  // re-render the assets table
  useEffect(() => {
    populateAssetTags();
  }, [assets, currentTag, studentID, alertMessage]);

  return (
    <div>
      <div className="header-container">
        <div style={{ marginLeft: "70%" }}>
          <AccountLink />
        </div>
      </div>
      <div className="main-content-checkin">
        <h1 className="mb-3">Check In Equipment</h1>
        <Form>
          <Row className="m-3">
            <ConditionalAlert
              type={alertType}
              message={alertMessage}
            ></ConditionalAlert>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="assetTag">
              <Form.Label>Asset Tag</Form.Label>
              <Form.Control
                className="search"
                type="search"
                list="unavailableAssets"
                placeholder="Enter Asset Tag Number"
                onKeyDown={handleKeypressAsset}
                onChange={(event) => {
                  handleTagChange(event.target.value);
                }}
              />
              <datalist id="unavailableAssets">
                {unavailableAssetTags.map((asset) => {
                  let inList = false;
                  for (let i = 0; i < assets.length; i++) {
                    if (assets[i].asset_tag === asset.asset_tag) {
                      inList = true;
                      return null;
                    }
                  }
                  if (!inList)
                    return (
                      <option key={asset.asset_tag} value={asset.asset_tag} />
                    );
                  return null;
                })}
              </datalist>
              <Button onClick={handleTagPress} disabled={disabledButton}>
                Add
              </Button>
            </Form.Group>

            <Form.Group as={Col} controlid="studentId">
              <Form.Label>Student ID Number</Form.Label>
              <Form.Control
                className="search"
                type="search"
                placeholder="Enter Student ID Number"
                onKeyDown={handleKeypressStudent}
                onChange={(event) => {
                  handleIDChange(event.target.value);
                }}
              />
              <Button onClick={handleIDPress} disabled={disabledButton}>
                Submit
              </Button>
            </Form.Group>
          </Row>
          <Row className="mb-3 notes">
            <CheckInTable
              as={Row}
              assets={assets}
              disabledButton={disabledButton}
              removeAsset={removeAsset}
              cats={cats}
              variant={theme}
            ></CheckInTable>

            <Form.Group as={Row}>
              <Form.Label>Check In Notes</Form.Label>
              <Form.Control
                as="textarea"
                row={3}
                onChange={(event) => {
                  setNotes(event.target.value);
                }}
              />
            </Form.Group>
          </Row>

          <div className="mb-3">
            <Button
              className="clearAll"
              type="reset"
              onClick={clearAll}
              disabled={disabledButton}
            >
              Clear All
            </Button>
            <Button
              className="checkIn"
              variant="primary"
              onClick={handleSubmit}
              disabled={disabledButton}
            >
              Check In
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
