import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import getAllCategories from "../../api/CategoryService";
import { useOutletContext } from "react-router-dom";

export default function CatDropdown(props) {
  // we lifted the state up
  const { state, update, categories, updateCategories, children } = props;

  const [dom, updateDom] = useState("Loading...");
  const [theme] = useOutletContext();

  const handleChange = (eventKey) => {
    // eventKey is the index
    if (eventKey) {
      update(categories[eventKey]);
    }
  };

  const renderChildren = () => {
    if (children) {
      return (
        <>
          <Dropdown.Divider />
          {children}
        </>
      );
    }
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
      <Dropdown.Toggle id="dropdown-basic" className="beets_buttons">
        {state?.catName || "Filter Category"}
      </Dropdown.Toggle>
      <Dropdown.Menu variant={theme}>
        <Dropdown.Item eventKey={-1}>All</Dropdown.Item>
        {dom}
        {renderChildren()}
      </Dropdown.Menu>
    </Dropdown>
  );
}
