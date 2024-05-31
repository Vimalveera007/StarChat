import { useState } from "react";
import { Input, Button, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { storage, db } from "@/utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

const CreateProfile = () => {
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState({});
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const onUploadFileChange = ({ file }) => {
    console.log("PROPS", file);
    setImage(file);
  };

  const handleSubmit = async () => {
    try {
      const uid = localStorage.getItem("USER");
      const profileImgRef = ref(storage, `profile/${uid}`);
      const snapshot = await uploadBytes(profileImgRef, image.originFileObj);
      const profileImageURL = await getDownloadURL(profileImgRef);
      console.log("SNAPSHOT", snapshot);
      const docRef = await addDoc(collection(db, "USER"), {
        uid,
        name,
        username,
        mobile,
        profileImageURL,
      });
      navigate("/home");
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Create Profile</h1>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-4">
            <Upload
              fileList={[image]}
              name="avatar"
              listType="picture-circle"
              className="avatar-uploader"
              onChange={onUploadFileChange}
            >
              {!image?.originFileObj ? uploadButton : null}
            </Upload>
          </div>
          <div className="mb-4">
            <Input
              placeholder="Full Name"
              onChange={(evt) => setName(evt.target.value)}
            />
          </div>
          <div className="mb-4">
            <Input
              placeholder="User Name"
              onChange={(evt) => setUsername(evt.target.value)}
            />
          </div>

          <div className="mb-4">
            <Input
              placeholder="Mobile"
              onChange={(evt) => setMobile(evt.target.value)}
            />
          </div>
          <div className="text-center">
            <Button type="primary" loading={isLoading} onClick={handleSubmit}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
