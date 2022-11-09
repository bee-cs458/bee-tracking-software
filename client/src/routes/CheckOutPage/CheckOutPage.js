import PageTemplate from '../../components/PageTemplate/PageTemplate';
import './CheckOutPage.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

function CheckOutPage() {

    return (
        <div>
            <PageTemplate></PageTemplate>
                <div className="main-content">
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="assetTag">
                                <Form.Label>Asset Tag</Form.Label>
                                    {/* Not sure what Form.Control type should be */}
                                <Form.Control type="search" placeholder="Enter Asset Tag Number" />
                                <Button id="addAsset">Add</Button>
                            </Form.Group>

                            <Form.Group as={Col} controlID="studentId">
                                <Form.Label>Student ID Number</Form.Label>
                                    {/* Not sure what Form.Control type should be */}
                                <Form.Control type="search" placeholder="Enter Student ID Number" />
                                <Button id="submitStudent">Submit</Button>
                            </Form.Group>
                        </Row>

                        {/* Figure out how to display each asset here as they are added */}
                        <Table responsive>
                            <caption>Selected Assets</caption>
                            <thead>
                                <tr>
                                    <th>Tag</th>
                                    <th>Name</th>
                                    <th>Due Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <td></td>
                            </tbody>
                        </Table>

                        <Button className="clearAll" type="reset">Clear All</Button>
                        <Button className="checkOut" variant="primary" type="submit">Check Out</Button>
                    </Form>
                </div>

        </div>

    );
}

export default CheckOutPage;