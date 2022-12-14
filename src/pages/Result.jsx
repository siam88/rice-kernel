import React, { Fragment, useEffect, useState, useRef } from "react";
import {
  Button,
  Col,
  Container,
  Row,
  DropdownButton,
  ButtonGroup,
  Dropdown,
} from "react-bootstrap";
import logo from "../asset/photo/Swt_logo_black.png";
import img2 from "../asset/photo/img-3-2.png";
import { AiOutlineCloudUpload, AiOutlineInfoCircle } from "react-icons/ai";
import { BsEmojiSmile, BsEmojiFrown } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";
import { downloadImage } from "../utils/funcs";
import ResultGrid from "../components/ResultGrid";
import { downloadObjectAsJson } from "./../utils/funcs";

const Result = ({ result, setResults }) => {
  const { input, out } = result;
  const [Tab, setTab] = useState("result");
  const [reaction, setReaction] = useState("neutral");
  const gridRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      document
        .querySelector(".result_parent")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  }, [result]);

  const onExportCSV = () => {
    gridRef.current?.api.exportDataAsCsv();
  };
  return (
    <Row className="my-sm-5 mx-2 d-flex align-items-center justify-content-center">
      <Col lg={12} className="upload_list_items p-3 d-sm-flex">
        <button
          className="btn_close"
          onClick={() => {
            setResults((prev) => {
              const filtered = prev.filter((prevResult) => {
                return prevResult != result;
              });
              return filtered;
            });
          }}
        >
          <IoClose />
        </button>
        <Col md={8} className="left_section">
          <div className="py-3 tab_section">
            <span
              className={Tab == "original" ? "active" : ""}
              onClick={() => setTab("original")}
            >
              Input
            </span>
            <span
              className={Tab == "result" ? "active" : ""}
              onClick={() => setTab("result")}
            >
              Output
            </span>
          </div>
          <div>
            {Tab == "original" ? (
              <img className="img_fit" src={input} alt="" />
            ) : (
              <ResultGrid output={out} type="single" gridRef={gridRef} />
            )}
          </div>
        </Col>
        <Col
          md={4}
          className="right_section pt-2 d-flex align-items-sm-center justify-content-center flex-column"
        >
          <div className="d-none d-sm-block">
            <div className="flex_center flex-column">
              {/* <Button
                className="btn btn_sm mb-2"
                onClick={() => {
                  downloadImage(out);
                }}
              >
                Download
              </Button> */}
              <DropdownButton
                as={ButtonGroup}
                title="Export"
                id="bg-nested-dropdown"
                className={`btn btn_sm mb-2 ${
                  Tab == "original" ? "disabled" : ""
                }`}
              >
                <Dropdown.Item eventKey="1" onClick={() => onExportCSV()}>
                  Download CSV
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="2"
                  onClick={() => downloadObjectAsJson(out, Date.now())}
                >
                  Download JSON
                </Dropdown.Item>
              </DropdownButton>
              {/* <p className="d-none d-md-block">
                Preview Image 600 x 400 &nbsp;
                <AiOutlineInfoCircle />
              </p> */}
              {/* <p className="text-center d-md-none">
                Preview Image <br /> 600 x 400 &nbsp;
                <AiOutlineInfoCircle />
              </p> */}
            </div>
          </div>
          {/* ================= */}
          <div className="d-flex flex_center d-sm-none">
            <div className="">
              <Button
                className="btn btn_sm"
                onClick={() => {
                  downloadImage(out);
                }}
              >
                Download
              </Button>

              <p className="text-center d-md-none">
                Preview Image <br /> 600 x 400 &nbsp;
                <AiOutlineInfoCircle />
              </p>
            </div>
          </div>
          <div className="emoji_section mt-2 mt-sm-5 flex_center">
            <p>
              Rate this result:{" "}
              <span className="emoji_icon emoji_icon_click">
                <BsEmojiSmile
                  fill={reaction == "liked" ? "#0b5ed7" : "black"}
                  onClick={() => {
                    setReaction("liked");
                  }}
                />
              </span>
              <span className="emoji_icon emoji_icon_click">
                <BsEmojiFrown
                  fill="red"
                  fill={reaction == "disliked" ? "red" : "black"}
                  onClick={() => {
                    setReaction("disliked");
                  }}
                />
              </span>
            </p>
          </div>
        </Col>
      </Col>
    </Row>
  );
};

export default Result;
