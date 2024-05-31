import React, { useState, useEffect } from "react";
import { Input, Button, Spin, FloatButton, Modal } from "antd";
import Cardid from "../Card/Cardid";
import { storage, db } from "@/utils/firebase"; // Adjust the path according to your project structure
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { ref, getDownloadURL } from "firebase/storage";
import Navbar from "../Navbar/Navbar";
const { TextArea } = Input;
const { Search } = Input;

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const navigate = useNavigate();

  ///-----------USERDATA-------------------//////
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const q = collection(db, "USER");
        const querySnapshot = await getDocs(q);
        const userList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  // -----------Search------------------------//////

  useEffect(() => {
    const searchData = users.filter((value) =>
      value.username.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(searchData);
  }, [search, users]);

  // ---modal------////

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posttitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };
  // --------PostDAta--------------///

  const handleOk = async () => {
    try {
      const uid = localStorage.getItem("USER");
      const profileImgRef = ref(storage, `profile/${uid}`);
      const profileImageURL = await getDownloadURL(profileImgRef);
      const docRef = await addDoc(collection(db, "POST"), {
        uid,
        title: posttitle,
        content: postContent,
        profile: profileImageURL,
      });
      console.log(profileImageURL, "profile");
      console.log(docRef);
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // ------------Navigate----------------//
  const handleClick = () => {
    localStorage.clear();
    navigate("/signIn");
  };

  const handlePost = () => {
    navigate("/post");
  };

  return (
    <div>
      <Navbar />

      <FloatButton onClick={showModal} />
      <Modal
        title="Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            Submit
          </Button>,
        ]}
      >
        <Input
          placeholder="Post title"
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <br />
        <br />
        <TextArea
          rows={6}
          placeholder="Post Content"
          className=" text-black"
          onChange={(e) => setPostContent(e.target.value)}
        />
      </Modal>

      <div className="w-1/3 mx-auto text-center m-3">
        <Search
          placeholder="input search text"
          enterButton="Search"
          size="large"
          loading={loading}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>
      {loading ? (
        <div className="flex justify-center">
          <Spin size="large" />
        </div>
      ) : (
        <div className="flex gap-20 justify-around mt-10 flex-wrap">
          {filteredUsers.map((user, index) => (
            <Cardid key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
