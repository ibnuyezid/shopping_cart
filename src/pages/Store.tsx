import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../component/StoreItem";
import Storeitems from "../data/items.json";
export function Store() {
  return (
    <>
      <h1>store</h1>
      <Row md={2} xs={1} lg={3} className="g-3">
        {Storeitems.map((item) => (
          <Col>
            {" "}
            <StoreItem {...item} />{" "}
          </Col>
        ))}
      </Row>
    </>
  );
}
