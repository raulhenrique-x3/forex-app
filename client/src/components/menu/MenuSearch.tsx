import { MenuButton, MenuDivider, MenuItem, MenuList, Menu, Button } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

export const MenuSearch = () => {
  return (
    <Menu>
      <MenuButton
        px={4}
        py={2}
        transition="all 0.2s"
        borderRadius="md"
        borderWidth="1px"
        _hover={{ bg: "#8236FD", color: "#ffffff" }}
        _expanded={{ bg: "blue.400" }}
        _focus={{ boxShadow: "outline" }}
        as={Button}
        rightIcon={<BsChevronDown />}
      >
        List by
      </MenuButton>

      <MenuList>
        <MenuItem>Deposit</MenuItem>
        <MenuDivider />
        <MenuItem>GBP</MenuItem>
        <MenuDivider />
        <MenuItem>USD</MenuItem>
      </MenuList>
    </Menu>
  );
};
