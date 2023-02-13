import { Avatar, Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import { IUser } from "../../interface/interface";

interface IDesktopUser {
  user: IUser[];
}

export const DesktopHeaderInfos: React.FC<IDesktopUser> = ({ user }) => {
  return (
    <Box
      p={2}
      width="100%"
      backgroundColor="white"
      color="#8236FD"
      display={"flex"}
      flexDirection={"row"}
      alignItems={"center"}
      gap={4}
    >
      <Avatar backgroundColor={"#8236FD"} size="xl" name={user[0]?.userName} />

      <div>
        <Text fontSize="lg" fontWeight="bold">
          {user[0]?.userName}
        </Text>
        <Text fontSize="md">{user[0]?.userEmail}</Text>
        <Button variant="outline" size="xs" color="#000000">
          ID: {user[0]?._id}
        </Button>
      </div>
    </Box>
  );
};
