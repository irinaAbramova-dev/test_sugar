import React, {useEffect, useState} from "react";
import {
    Avatar,
    Stack,
    Button,
    Flex,
    HStack,
    Text,
    Box,
    VStack,
    StackDivider,
    Textarea,
    Heading,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Center
} from '@chakra-ui/react';
import {getMessages, listOfUsersApi} from "../../src/api/chat";
import { FiSend } from "react-icons/fi";
import io from 'socket.io-client';
import {useCurrentUser} from "../../src/hooks/auth/useCurrentUser";
import {useRouter} from "next/router";
const socket = io('http://localhost:3000', { autoConnect: false });

type MessageProps = {
    text: string;
    actor: 'author' | 'recipient';
};
type SystemMessage = {
    id: string;
    author: string;
    recipient: string;
    text: string;
    createdAt: string;
};

const Message = ({ text, actor }: MessageProps) => {
    return (
        <Flex
            p={4}
            bg={actor === 'author' ? 'blue.300' : 'gray.100'}
            color={actor === 'author' ? 'white' : 'gray.600'}
            borderRadius={5}
            w="fit-content"
            alignSelf={actor === 'author' ? 'flex-end' : 'flex-start'}
        >
            <Text>{text}</Text>
        </Flex>
    );
};

function ChatPage() {
    const router = useRouter()

    const [users, setUsers] = useState([])
    const [recipient, setRecipient] = useState('')
    const [inputValue, setInputValue] = useState("");
    const handleInputValueChange = (e) => setInputValue(e.target.value)
    const [messages, setMessages] = useState([]);
    const [chatError, setChatError] = useState(false);

    const { user: currentUser } = useCurrentUser();

    useEffect(() => {
        socket.connect();
        socket.on("connect", () => {console.log("Socket connected")});
        socket.on("disconnect", () => {console.log("Socket disconnected")});
        socket.on("chat", (newMessage) => {
            setMessages((previousMessages) => [...previousMessages, newMessage]);
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off("chat");
        };
    }, []);

    const handleSendMessage = async (e) => {
        if (inputValue.trim().length === 0) return;

        await socket.emit("sendMessage", {author: currentUser?.id, text: inputValue.trim(), recipient});
        setInputValue("");
    };

    useEffect(() => {
        listOfUsersApi()
            .then((data) => setUsers(data))
            .catch((err) => console.log(err))
    }, [])

    const handleOpenChat = async (userId) => {
        setRecipient(userId)
        await getMessages(userId)
            .then((data) => setMessages(data))
            .catch(() => setChatError(true))
    }

    return (
        <Flex p={5}>
                 {users.length > 0 ?
                     <VStack w={300} border='1px' borderRadius={5} borderColor='gray.200' boxShadow='md' overflow='scroll' align='stretch'>
                         <Box color='white' bg='blue.300' p={3}>Contacts</Box>
                         {users.map((user) => (
                             <HStack key={user.id} h={16} mr={2} ml={2}>
                                 <Avatar size='md' mr={2} name={user.email} />
                                 <Box>
                                     <Text fontSize='16px' color='blue.800' onClick={() => handleOpenChat(user.id)}>{user.email}</Text>
                                 </Box>
                             </HStack>
                         ))}
                     </VStack> :
                     <></>
                 }

            {recipient ? <Flex ml={5} w='100%' h='full' flexDirection="column" border='1px' borderRadius={5} borderColor='gray.200' boxShadow='md'>
                {!chatError ? <Stack overflow="auto" flex={1} p={5}>
                    {messages.length === 0 ? <Text>No messages here yet</Text> : messages.map((message, idx) => (
                        <Message
                            key={idx}
                            text={message.text}
                            actor={currentUser?.id === message.author ? 'author' : 'recipient'}
                        />
                    ))}
                </Stack> : <Stack overflow="auto" flex={1} p={5}>
                    <Alert status='error'>
                        <AlertIcon />
                        <AlertTitle>Ooops...</AlertTitle>
                        <AlertDescription>Something went wrong!</AlertDescription>
                    </Alert>
                </Stack>}

                <HStack p={4} bg="gray.100">
                    <Textarea bg="white" placeholder="Enter your text" colorScheme="pink" value={inputValue} onChange={handleInputValueChange}/>
                    <Button colorScheme="blue" onClick={handleSendMessage}><FiSend></FiSend></Button>
                </HStack>
            </Flex> : <Flex></Flex>}
        </Flex>
    )
}

export default ChatPage;
