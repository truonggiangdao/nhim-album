import React, {
  useCallback,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";
import AuthGuard from "../../contexts/auth/AuthGuard";
import { uploadFilesToStorage } from "./storage";

const Upload = () => {
  const inputRef = useRef();
  const [fileSelected, setFileSelected] = useState([]);

  const onClear = useCallback(() => {
    setFileSelected([]);
    inputRef.current.value = null;
  }, []);

  const uploadFile = useCallback(async () => {
    try {
      const { succeed, failed} = await uploadFilesToStorage(fileSelected);
      setFileSelected([]);
      toast.success(`Uploaded ${fileSelected.length} files, summary ${succeed.length} successfully and ${failed.length} got error!`);
    } catch (error) {
      toast.error(error.message);
    }
  }, [fileSelected]);

  return (
    <AuthGuard>
      <main className="d-flex justify-content-center align-items-center vh-100">
        <section>
          <div className="text-center">
            <h1>Select Files to Upload</h1>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Accepts Images and Videos
              </label>
              <input
                id="formFile"
                ref={inputRef}
                type="file"
                className="form-control"
                multiple
                onChange={({ target }) => setFileSelected([...target.files])}
              />
            </div>
            <div>
              <button
                onClick={uploadFile}
                disabled={fileSelected.length === 0}
                className="btn btn-primary"
              >
                Upload
              </button>{" "}
              <button
                onClick={onClear}
                disabled={fileSelected.length === 0}
                className="btn btn-primary"
              >
                Clear
              </button>
            </div>
          </div>
        </section>
      </main>
    </AuthGuard>
  );
};

export default Upload;
