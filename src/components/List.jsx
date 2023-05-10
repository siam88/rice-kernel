import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";

const List = ({output}) => {
    console.log("output==",output)
  return (
    <ListGroup as="ol" numbered>
      {output?.count.Rice &&<ListGroup.Item className="d-flex justify-content-between align-items-start">
        <div className="ms-2 me-auto">
          <div className="fw-bold p-4" >1. Rice <div style={{background:"#ff3838",minHeight:"5px"}}/></div>
        </div>
        <span className="p-4 fw-bold">{output.count.Rice} <div style={{background:"#ff3838",minHeight:"5px"}}/></span>
      </ListGroup.Item>}
     {output?.count.Kernel && <ListGroup.Item className="d-flex justify-content-between align-items-start">
        <div className="ms-2 me-auto">
          <div className="fw-bold p-4">2. Kernel <div style={{background:"#ff9d97",minHeight:"5px"}}/></div>
        </div>
        <span className="p-4 fw-bold">{output.count.Kernel} <div style={{background:"#ff9d97",minHeight:"5px"}}/></span>
      </ListGroup.Item>}
      {output?.count.Broken && <ListGroup.Item className="d-flex justify-content-between align-items-start">
        <div className="ms-2 me-auto">
          <div className="fw-bold p-4">3. Broken Rice <div style={{background:"#ff701f",minHeight:"5px"}}/></div>
        </div>
        <span className="p-4 fw-bold">{output.count.Broken} <div style={{background:"#ff701f",minHeight:"5px"}}/></span>
      </ListGroup.Item>}
    </ListGroup>
  );
};

export default List;
