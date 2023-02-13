import {
  Button,
  Container,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import { IUser } from "../../interface/interface";
import React, { useState } from "react";

interface ITableHistory {
  user: IUser[];
  label?: string;
  sliceFrom?: number;
  sliceTo?: number;
}
export const TableHistory: React.FC<ITableHistory> = ({ user, label, sliceFrom, sliceTo }) => {
  const [chooseFilter, setChooseFilter] = useState("");
  const filterBy = user[0]?.userExchangeHistory?.filter((curr) => curr.purchasedCurrency === chooseFilter);
  return (
    <Container>
      <Flex align={"center"} justifyContent={"space-between"}>
        <Text fontSize={"xl"} color={"#000000"} fontWeight={"bold"}>
          {label}
        </Text>
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
            <MenuItem onClick={() => setChooseFilter("All")}>All</MenuItem>
            <MenuDivider />
            <MenuItem onClick={() => setChooseFilter("Deposit")}>Deposit</MenuItem>
            <MenuDivider />
            <MenuItem onClick={() => setChooseFilter("GBP-USD")}>GBP</MenuItem>
            <MenuDivider />
            <MenuItem onClick={() => setChooseFilter("USD-GBP")}>USD</MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <TableContainer border={"1px solid #8236FD"} borderRadius={5}>
        <Table variant="striped" colorScheme={"#8236FD"} overflowX={"hidden"}>
          <Thead>
            <Tr>
              <Th>Currency</Th>
              <Th>Amount</Th>
              <Th>Date</Th>
            </Tr>
          </Thead>
          {chooseFilter === "All" || chooseFilter === ""
            ? user[0]?.userExchangeHistory
                ?.map((info, key) => (
                  <Tbody key={key}>
                    <Tr>
                      <Td>{info?.purchasedCurrency}</Td>
                      <Td>${info?.currencyAmount}</Td>
                      <Td>{info?.dateOfExchange}</Td>
                    </Tr>
                  </Tbody>
                ))
                .reverse()
                .slice(sliceFrom, sliceTo)
            : filterBy
                ?.map((info, key) => (
                  <Tbody key={key}>
                    <Tr>
                      <Td>{info?.purchasedCurrency}</Td>
                      <Td>${info?.currencyAmount}</Td>
                      <Td>{info?.dateOfExchange}</Td>
                    </Tr>
                  </Tbody>
                ))
                .reverse()
                .slice(sliceFrom, sliceTo)}
        </Table>
      </TableContainer>
    </Container>
  );
};
