import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.clear();
    navigate("/signIn");
  };

  const handlePost = () => {
    navigate("/post");
  };
  return (
    <div>
      <div className="italic flex justify-between items-center p-5 bg-black">
        <h1 className=" text-5xl text-white">STARCHAT</h1>

        <div>
          <Button
            type="primary"
            danger
            className="font-semibold mx-5"
            onClick={handlePost}
          >
            Post
          </Button>
          <Button
            type="primary"
            danger
            onClick={handleClick}
            className="font-semibold mx-8"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
