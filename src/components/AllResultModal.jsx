import React, { useRef } from "react";
import {
  Modal,
  Button,
  Dropdown,
  DropdownButton,
  ButtonGroup,
} from "react-bootstrap";
import ResultGrid from "./ResultGrid";
import { downloadObjectAsJson } from "./../utils/funcs";
const AllResultModal = (props) => {
  const { results } = props;
  const gridRef = useRef();

  const onExportCSV = () => {
    gridRef.current?.api.exportDataAsCsv();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          All ({results.length}) Results
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ResultGrid output={results} type="collection" gridRef={gridRef} />
      </Modal.Body>
      <Modal.Footer>
        <DropdownButton
          as={ButtonGroup}
          title="Export"
          id="bg-nested-dropdown"
          className={`btn btn_sm mb-2`}
        >
          <Dropdown.Item eventKey="1" onClick={() => onExportCSV()}>
            Download CSV
          </Dropdown.Item>
          <Dropdown.Item
            eventKey="2"
            onClick={() => downloadObjectAsJson(results, Date.now())}
          >
            Download JSON
          </Dropdown.Item>
        </DropdownButton>
        <Button onClick={props.onHide} variant="danger">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AllResultModal;
