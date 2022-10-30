import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { updateAsset } from "../../../../controllers/AssetController";
import getAllCategories from "../../api/CategoryService";

// Easy formatting of drop down item
function DDownItem(name, id) {
  return <Dropdown.Item eventKey={id}>{name}</Dropdown.Item>;
}

// custom hook for when the selected value changes
export function useChange() {
  const [selectedValue, setValue] = useState(0);
  function change(value) {
    setValue(value);
  }
  return { change, selectedValue };
}

// export of the dropdown
export default function CatDropdown() {
  // scoped variable selected value uses the custom useChange method to live updateAsset
  const { change, selectedValue } = useChange();
  let categories;

  // Executes getCategory once when it first runs, because the array is empty
  useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
    const catResults = await getAllCategories();
    categories = catResults;
    console.log(categories);
  }

  return (
    // On Selection, use the change method defined on 23, then the useChange to update the selected value
    <Dropdown title="CategoryDropdown" onSelect={change}>
      <Dropdown.Toggle id="dropdown-basic">Filter Category</Dropdown.Toggle>

      {/* Filler content, each must have an evenKey matching the category ID */}
      <Dropdown.Menu>
        <Dropdown.Item eventKey={0}>zero</Dropdown.Item>
        <Dropdown.Item eventKey={1}>one</Dropdown.Item>
        <Dropdown.Item eventKey={2}>two</Dropdown.Item>
        <Dropdown.Item eventKey={3}>three</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
