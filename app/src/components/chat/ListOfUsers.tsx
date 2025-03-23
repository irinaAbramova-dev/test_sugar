import React, {useEffect, useState} from "react";
import {Button, FormControl, FormErrorMessage, Flex, Avatar, WrapItem, Wrap, Box, Stack} from "@chakra-ui/react";
import { EmailIcon, UnlockIcon } from '@chakra-ui/icons'
import {useRouter} from "next/router";
import Cookies from "js-cookie";
import {loginApi} from "../../api/auth";
import {listOfUsersApi} from "../../api/chat";

const ListOfUsers = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        listOfUsersApi()
            .then((data) => setUsers(data))
            .catch((err) => console.log(err))
    }, [])

    if (users.length > 0) {
        return (
            <Flex flexDirection="column">
                {users.map((user) => (
                    <Stack>
                        <Avatar size='md' name={user.email} />
                        <span>{user.email}</span>
                    </Stack>
                ))}
            </Flex>
        )
    }

    return <Wrap></Wrap>
};

export default ListOfUsers;
