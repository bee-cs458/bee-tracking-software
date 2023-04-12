import { Spinner } from "react-bootstrap";

const LoadingSpinner = ({ size = "4rem" }) => {
    return (
        <div className="d-flex flex-fill justify-content-center">
            <Spinner animation="border" role="status" variant="primary" style={{ width: `${size}`, height: `${size}` }}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>

    )
}

export default LoadingSpinner;