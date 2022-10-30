import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import getAllCategories from "../../api/CategoryService";

function DDownItem(props) {
  return <Dropdown.Item href="#/action-3">{props}</Dropdown.Item>;
}

export function useChange() {
  const [selectedValue, setValue] = useState(0);
  function change(value) {
    setValue(value);
  }
  return { change, selectedValue };
}

export default function CatDropdown() {
  const { change, selectedValue } = useChange();
  let categories;

  useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
    const catResults = await getAllCategories();
    categories = catResults;
    console.log(categories);
  }

  return (
    <Dropdown title="CategoryDropdown" onSelect={change}>
      <Dropdown.Toggle id="dropdown-basic">Filter Category</Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey={0}>zero</Dropdown.Item>
        <Dropdown.Item eventKey={1}>one</Dropdown.Item>
        <Dropdown.Item eventKey={2}>two</Dropdown.Item>
        <Dropdown.Item eventKey={3}>three</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
