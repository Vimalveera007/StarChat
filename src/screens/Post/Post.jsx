import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, storage } from "@/utils/firebase";
import { ref, getDownloadURL } from "firebase/storage";
import Navbar from "../Navbar/Navbar";
import { Card, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { BallTriangle } from "react-loader-spinner";
const { Meta } = Card;
const Post = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data from Firestore...");
        const postCollection = collection(db, "POST");
        const uid = localStorage.getItem("USER");
        const querySnapshot = await getDocs(postCollection);
        const postdat = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const docData = doc.data();
            let profileImageURL = "";
            try {
              profileImageURL = await getDownloadURL(
                ref(storage, `profile/${docData.uid}`)
              );
              console.log(docData.uid, "PROfile");
            } catch (error) {
              console.log(error);
            }
            console.log("Document data:", docData);
            return {
              id: doc.id,
              ...docData,
              profileImageURL,
            };
          })
        );
        setData(postdat);
        console.log("Fetched posts:", postdat);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex gap-6 flex-wrap my-10 text-center justify-center items-center">
        {data.length === 0 ? (
          <h3 className="flex justify-center items-center text-center">
            <BallTriangle
              height={100}
              width={100}
              radius={5}
              color="#4fa94d"
              ariaLabel="ball-triangle-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </h3>
        ) : (
          data.map((postdata) => (
            <Card
              key={postdata.id}
              hoverable
              style={{ width: 300 }}
              loading={loading}
              className="border-black"
            >
              <Avatar
                size={64}
                icon={<UserOutlined />}
                src={postdata.profileImageURL}
                className="mb-4"
              />
              <Meta title={postdata.title} description={postdata.content} />
            </Card>
          ))
        )}
      </div>
    </>
  );
};

export default Post;
