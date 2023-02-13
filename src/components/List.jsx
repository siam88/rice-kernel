import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";

const List = ({output}) => {
    console.log("output==",output)
  return (
    <ListGroup as="ol" numbered>
      {output?.Rice &&<ListGroup.Item className="d-flex justify-content-between align-items-start">
        <div className="ms-2 me-auto">
          <div className="fw-bold p-4">1. Rice</div>
        </div>
        <span className="p-4 fw-bold">{output.Rice}</span>
      </ListGroup.Item>}
     {output?.Kernel && <ListGroup.Item className="d-flex justify-content-between align-items-start">
        <div className="ms-2 me-auto">
          <div className="fw-bold p-4">2. Kernel</div>
        </div>
        <span className="p-4 fw-bold">{output.Kernel}</span>
      </ListGroup.Item>}
      {output?.Broken && <ListGroup.Item className="d-flex justify-content-between align-items-start">
        <div className="ms-2 me-auto">
          <div className="fw-bold p-4">3. Broken Rice</div>
        </div>
        <span className="p-4 fw-bold">{output.Broken}</span>
      </ListGroup.Item>}
    </ListGroup>
  );
};

export default List;
