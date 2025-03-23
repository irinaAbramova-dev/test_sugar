import {Avatar, Box, Button, ChakraProvider, Flex,VStack,Tooltip,HStack,Spacer} from "@chakra-ui/react";
import type { AppProps } from 'next/app'

import { extendTheme } from '@chakra-ui/react'
import '@fontsource-variable/nunito'
import React, {useEffect, useState} from "react";

import {FiLogOut, FiSend} from "react-icons/fi";
import Cookies from "js-cookie";
import {useRouter} from "next/router";
import { BsFillChatHeartFill } from "react-icons/bs";

const theme = extendTheme({
    fonts: {
        heading: `'Nunito', sans-serif`,
        body: `'Nunito', sans-serif`,
    },
})

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter()
    const logOut = () => {
        Cookies.remove("currentUser");
        router.push("/login")
    }
    const [headerVisability, setHeaderVisability] = useState(router.asPath !== '/login')

    useEffect(() => {
        setHeaderVisability(router.asPath !== '/login')
    }, [router.asPath]);

    return (
        <ChakraProvider theme={theme}>
            <Box>
                {headerVisability ? <Flex bg='blue.300' boxShadow='lg' p={2}>
                  <Tooltip hasArrow bg='gray.600' label="Chat" placement='right'>
                    <Button
                      colorScheme="blue"
                      bg='blue.300'
                      onClick={() => {router.push("/chat")}}
                    >
                      <BsFillChatHeartFill></BsFillChatHeartFill>
                    </Button>
                  </Tooltip>
                  <Spacer></Spacer>
                  <Tooltip hasArrow bg='gray.600' label="Profile" placement='left'>
                    <Button colorScheme="blue" bg='blue.300' onClick={() => router.push("/profile")}> <Avatar size='xs'/></Button>
                  </Tooltip>
                  <Tooltip hasArrow bg='gray.600' label="Logout" placement='left'>
                    <Button colorScheme="blue" bg='blue.300' onClick={logOut}><FiLogOut></FiLogOut></Button>
                  </Tooltip>
                </Flex> : <></>}
                <Box>
                    <Component {...pageProps} />
                </Box>
            </Box>
        </ChakraProvider>
    )
}
