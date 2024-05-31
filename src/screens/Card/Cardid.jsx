import React from "react";
import { Card } from "antd";

const { Meta } = Card;

const Cardid = ({ user }) => {
  return (
    <Card
      hoverable
      style={{
        width: 240,
        marginBottom: 20,
        textAlign:'center',
      }}
      cover={<img alt={user.username} src={user.profileImageURL} />}
    >
      <Meta  name={user.name} title={user.username} description={user.mobile} />
    </Card>
  );
};

export default Cardid;
