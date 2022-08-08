import React from "react";
import { Wrap, WrapItem, Avatar } from "@chakra-ui/react";

const Players = () => {
  return (
    <Wrap>
      Connected players:
      <WrapItem>
        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
      </WrapItem>
    </Wrap>
  );
};

export default Players;
