import Dropdown from 'react-bootstrap/Dropdown'

// TODO initial hard coded information, need to query the databse somehow :thinking-face:
const cat1 = 'Lights'
const cat2 = 'Camera'
const cat3 = 'Action'
const cat4 = 'Corn'
const cat5 = 'Cry'

function DDownItem(item){
  return (
    <Dropdown.Item href="#/action-3">{item}</Dropdown.Item>
  );
}

function CatDropdown() {   // TODO Still need to connect database and update table
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Category
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {DDownItem(cat1)}
        {DDownItem(cat2)}
        {DDownItem(cat3)}
        {DDownItem(cat4)}
        {DDownItem(cat5)}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default CatDropdown