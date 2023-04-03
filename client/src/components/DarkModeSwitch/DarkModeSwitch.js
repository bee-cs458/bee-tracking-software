import { FormCheck } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";

const DarkModeSwitch = (props) => {

    return (
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap", justifyContent: "center", alignItems: "center", flex: "1" }}>
            <FontAwesomeIcon className="m-2" icon={faSun} style={{ color: "#f7da45" }} />
            <FormCheck style={{ marginLeft: "25px", paddingLeft: "0" }} type="switch" id="theme-switch" onChange={props.onChange} />
            <FontAwesomeIcon icon={faMoon} style={{ color: "#adcbff", }} className={"m-2"} />
        </div >
    )

}

export default DarkModeSwitch;