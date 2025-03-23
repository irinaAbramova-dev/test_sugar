import {
    Box,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    AbsoluteCenter,
    Wrap,
    Heading,
    Center,
    Text,
    HStack,
    VStack
} from "@chakra-ui/react";
import React from "react";
import Login from "../../src/components/auth/Login";
import Register from "../../src/components/auth/Register";
import {BsFillChatHeartFill} from "react-icons/bs";

function LoginPage() {
    return (
        <Wrap justify='center' h='100vh'>
            <AbsoluteCenter>
                <VStack mb={30}>
                    <HStack color='blue.300'>
                        <Heading as='h3' size='xl' color='blue.800'>Welcome to</Heading>
                        <BsFillChatHeartFill color="blue.300" size={50}></BsFillChatHeartFill>
                    </HStack>
                </VStack>
                <Center><Text fontSize='sm' color='gray.500'>Please sign up or login with your details</Text></Center>
                <Box borderRadius={5} width={400} bg='gray.50' m={2} boxShadow='md'>
                    <Tabs size='md' isFitted variant='soft-rounded' colorScheme='blue'>
                        <TabList mb={2}>
                            <Tab borderRadius={5}>Login</Tab>
                            <Tab borderRadius={5}>Sign Up</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Login></Login>
                            </TabPanel>
                            <TabPanel>
                                <Register></Register>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </AbsoluteCenter>
        </Wrap>
    )
}

export default LoginPage;
