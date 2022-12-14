import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import getAllCategories from "../../api/CategoryService";

export default function CatDropdown(props) {
  // we lifted the state up
  const { state, update, categories, updateCategories } = props;

  const [dom, updateDom] = useState("Loading...");

  const handleChange = (eventKey) => {
    // eventKey is the index
    update(categories[eventKey]);
  };

  // Executes getCategory once when it first runs, because the array is empty
  useEffect(() => {
    async function generateList(categoryList) {
      return categoryList.map((category, index) => {
        return (
          <Dropdown.Item key={category.category_id} eventKey={index}>
            {category.catName}
          </Dropdown.Item>
        );
      });
    }

    getAllCategories()
      .then((value) => {
        updateCategories(value);
        return value;
      })
      .then(generateList)
      .then(updateDom)
      .catch((err) => console.log(err));
  }, [updateCategories]);

  return (
    <Dropdown title="CategoryDropdown" onSelect={handleChange}>
      <Dropdown.Toggle id="dropdown-basic">
        {state?.catName || "Filter Category"}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item eventKey={null}>
          All
        </Dropdown.Item>
        {dom}
      </Dropdown.Menu>
    </Dropdown>
  );
}
