import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import getAllCategories from '../../api/CategoryService';

// TODO initial hard coded information, need to query the databse somehow :thinking-face:
const cat1 = 'Lights'
const cat2 = 'Camera'
const cat3 = 'Action'
const cat4 = 'Corn'
const cat5 = 'Cry'

function DDownItem(props){
  return (
    <Dropdown.Item href="#/action-3">{props}</Dropdown.Item>
  );
}

function CatDropdown() {   // TODO Still need to connect database and update table

  const [categories, setCategories] = useState(null);

  useEffect(() => { }, [categories])

  async function getCategories() {
    const catResults = await getAllCategories();
    setCategories(catResults);
  }

  getCategories();
  console.log(categories);

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Category
      </Dropdown.Toggle>

      <Dropdown.Menu>
        for
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default CatDropdown