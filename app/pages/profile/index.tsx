import {
    Avatar,
    Stack,
} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {
    Button,
    Flex,
    HStack,
    Input,
    Text,
    Box,
    SkeletonCircle,
    SkeletonText,
    Wrap,
    VStack,
    StackDivider,
    Textarea,
    Heading
} from '@chakra-ui/react';
import ListOfUsers from "../../src/components/chat/ListOfUsers";
import {listOfUsersApi} from "../../src/api/chat";
import { FiSend } from "react-icons/fi";

function ChatPage() {
    // useEffect(() => {
    //     listOfUsersApi()
    //         .then((data) => setUsers(data))
    //         .catch((err) => console.log(err))
    // }, [])

    return (
        <Flex h='100vh' p={8}>
            <Box bg='pink.50'></Box>
        </Flex>
    )
}

export default ChatPage;
