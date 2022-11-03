import { CameraModal } from "./CameraModal";
import React, {
  Fragment,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { Button, Col, Container, Row, Modal, Spinner } from "react-bootstrap";
import logo from "../asset/photo/Swt_logo_black.png";
import img3 from "../asset/photo/img-3-2.jpg";
import { AiOutlineCloudUpload, AiOutlineTable } from "react-icons/ai";
import { FiCamera } from "react-icons/fi";
import ResultList from "./ResultList";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import useMediaDevices from "./../hooks/useMediaDevices";
import { isWindows } from "../utils/funcs";
import { Link } from "react-router-dom";
import AllResultModal from "../components/AllResultModal";
const { REACT_APP_SERVER_ROOT: SERVER_ROOT } = process.env;
const { REACT_APP_CAMERA: CAMERA } = process.env;
function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

function Landing(props) {
  const deviceStatus = useMediaDevices();
  const [show, setShow] = useState(false);
  const webcamRef = React.useRef(null);
  const [capturedImage, setCapturedImage] = useState("");
  const [results, setResults] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [Mode, setMode] = useState("Camera");
  const handleClose = () => {
    setShow(false);
    setMode("Camera");
  };
  const handleShow = () => setShow(true);
  const inputRef = useRef(null);
  const [videoConstraints, SetvideoConstraints] = useState({
    width: 1280,
    height: 720,
  });

  const [AllResultmodalShow, setAllResultModalShow] = useState(false);

  useEffect(() => {
    console.log({ CAMERA });
    return () => { };
  }, [deviceStatus]);

  const onDrop = useCallback((acceptedFiles) => {
    let errors = 0;
    acceptedFiles.forEach((file) => {
      if (file.type.includes("image")) {
        const reader = new FileReader();
        reader.onabort = () => toast.warn("file reading was aborted");
        reader.onerror = () => toast.warn("file reading has failed");
        reader.onload = () => {
          setLoading(true);
          const binaryStr = reader.result;
          var formData = new FormData();
          formData.append("image", dataURLtoFile(binaryStr));

          submitImage(
            formData,
            (result) => {
              setResults((prev) => {
                return [...prev, { input: binaryStr, out: result }];
              });
              setLoading(false);
            },
            () => { }
          );
        };
        reader.readAsDataURL(file);
      } else {
        errors++;
      }
    });
    if (errors) {
      toast.error("Can not process non-image files.");
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setMode("Preview");
  }, [webcamRef]);

  function submitImage(formData, cbOk, cbErr) {
    setMode("Camera");
    setLoading(true);
    fetch(SERVER_ROOT, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        if (cbOk) {
          cbOk(result);
        }
      })
      .catch((e) => {
        setLoading(false);
        if (cbErr) {
          cbErr(e);
        }
      });
  }

  const onCameraSubmit = (img) => {
    var formData = new FormData();
    formData.append("file", dataURLtoFile(img));
    submitImage(
      formData,
      (result) => {
        setResults((prev) => {
          return [...prev, { input: img, out: result }];
        });
      },
      () => { }
    );
    handleClose();
  };

  return (
    <Fragment>
      {show && (
        <CameraModal
          show={show}
          handleClose={handleClose}
          webcamRef={webcamRef}
          videoConstraints={videoConstraints}
          capture={capture}
          Mode={Mode}
          setMode={setMode}
          capturedImage={capturedImage}
          onCameraSubmit={onCameraSubmit}
          Loading={Loading}
        />
      )}

      {
        <AllResultModal
          show={AllResultmodalShow}
          onHide={() => setAllResultModalShow(false)}
          results={results.map(({ out }) => {
            return out;
          })}
        />
      }
      <Container
        fluid={true}
        className="p-0 bg-light noPointer"
        {...getRootProps({
          role: "unset",
        })}
        onClick={(e) => { }}
      >
        <div>
          <input {...getInputProps()} ref={inputRef} />
        </div>

        {isDragActive ? (
          <div className="drop_zone">
            <h1>Drop to upload ...</h1>
          </div>
        ) : null}
        <div className="nav_section d-flex align-item-center justify-content-between">
          <Link className="logo" to="/">
            <img src={logo} alt="" />
          </Link>
          <span className="menu_btn">
            {Loading && (
              <Spinner animation="border" variant="dark" className="loader" />
            )}
            {deviceStatus.hasWebcam && CAMERA == "ON" && (
              <FiCamera className="menu_icon" onClick={handleShow} />
            )}

            {results.length > 0 && (
              <AiOutlineTable
                className="menu_icon"
                title="All results"
                onClick={() => setAllResultModalShow(true)}
              />
            )}
            <AiOutlineCloudUpload
              className="menu_icon"
              onClick={() => {
                inputRef.current?.click();
              }}
            />
          </span>
        </div>
        <Container className=" main_content text-center section_margin">
          <Row>
            <Col md={6} className="flex_center flex-column">
              <div className="px-md-5">
                <h2 className="l_title">Instant Rice Details</h2>
                <p className="sub_title">100% Automatically</p>
              </div>
              <div className="img_section">
                <img className="img_fit" src={img3} alt="" />
              </div>
            </Col>
            <Col md={6} className="upload_section flex_center mt-0 px-0">
              <div className="flex-column flex_center upload_section_inner">
                {deviceStatus.hasWebcam && CAMERA == "ON" && (
                  <Button
                    className="btn_webcam mb-3 btn-secondary"
                    onClick={handleShow}
                  >
                    Use Webcam
                  </Button>
                )}

                <Button
                  className="btn btn_upload mb-2"
                  onClick={() => {
                    inputRef.current?.click();
                  }}
                >
                  <AiOutlineCloudUpload className="upload_icon" />
                  Upload
                </Button>
                <p>or drop an image...</p>
              </div>
            </Col>
          </Row>
        </Container>

        <ResultList results={results} setResults={setResults} />
      </Container>
    </Fragment>
  );
}

export default Landing;
