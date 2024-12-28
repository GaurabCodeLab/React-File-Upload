import { useState } from "react";
import axios from "axios";

const App = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState({ started: true, pc: 0 });
  const [message, setMessage] = useState(null);

  console.log("file hai", file);
  const handleUpload = () => {
    if (!file) {
      setMessage("No file selected");
      return;
    }
    const fd = new FormData();

    // for multiple file uploads
    // for (let i = 0; i < file.length; i++) {
    //   fd.append(`file${i + 1}`, file[i]);
    // }

    fd.append("file", file);
    setMessage("Uploading...");
    setProgress((pre) => {
      return { ...pre, started: true };
    });
    axios
      .post("http://httpbin.org/post", fd, {
        onUploadProgress: (progressEvent) => {
          return setProgress((pre) => {
            return { ...pre, pc: progressEvent.progress * 100 };
          });
        },
        headers: {
          "Custom-Header": "value",
        },
      })
      .then((res) => {
        setMessage("Upload successful...");
        console.log("successful upload", res);
      })
      .catch((err) => {
        console.log(err);
        setMessage("Upload failed");
      });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Uploading file in react</h1>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />{" "}
      {/* for multiple file upload put multiple boolean attribute in input field and setFile(e.target.files) */}
      <button style={{ cursor: "pointer" }} onClick={handleUpload}>
        Upload
      </button>
      <div
        style={{
          marginTop: "30px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {progress.started && (
          <progress max="100" value={progress.pc}></progress>
        )}
        {message && <span>{message}</span>}
      </div>
    </div>
  );
};

export default App;
