import { Spinner } from "react-bootstrap";

const LoadingSpinner = () => {
    return (
        <div className="justify-content-center">
            <Spinner animation="border" role="status" variant="primary" style={{ width: "4rem", height: "4rem" }}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>

    )
}

export default LoadingSpinner;