import React, {useState} from "react";
import {Button, FormControl, FormErrorMessage, Flex, Input, InputGroup, InputLeftElement, Box} from "@chakra-ui/react";
import { EmailIcon, UnlockIcon } from '@chakra-ui/icons'
import {useRouter} from "next/router";
import Cookies from "js-cookie";
import {loginApi} from "../../api/auth";

const Login = () => {
    const router = useRouter()

    const [email, setEmail] = useState(null)
    const handleEmailInputChange = (e) => setEmail(e.target.value)
    const isEmailError = email !== undefined && email === ''

    const [password, setPassword] = useState(null)
    const handlePasswordInputChange = (e) => setPassword(e.target.value)
    const isPasswordError = password !== undefined && password === ''

    const handleClick = async (event) => {
        event.preventDefault()
        try {
            const user = await loginApi(email, password)
            if (user) {
                Cookies.set("currentUser", JSON.stringify(user));
            }
            router.push("/profile")
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Box>
            <Flex direction="column">
                <Box w='100%'>
                    <FormControl isInvalid={isEmailError} pb={3}>
                        <InputGroup size='sm'>
                            <InputLeftElement pointerEvents='none'>
                                <EmailIcon color='gray.400' />
                            </InputLeftElement>
                            <Input placeholder='Email' type='email' variant='filled' value={email} onChange={handleEmailInputChange} />
                            {isEmailError ? <FormErrorMessage>Email is required.</FormErrorMessage> : <></>}
                        </InputGroup>
                    </FormControl>
                    <FormControl isInvalid={isPasswordError} pb={3}>
                        <InputGroup size='sm'>
                            <InputLeftElement pointerEvents='none'>
                                <UnlockIcon color='gray.400' />
                            </InputLeftElement>
                            <Input placeholder='Password' type='password' variant='filled' value={password} onChange={handlePasswordInputChange} />
                            {isPasswordError ? <FormErrorMessage>Password is required.</FormErrorMessage> : <></>}
                        </InputGroup>
                    </FormControl>
                </Box>
                <Button size='sm' mt={3} w='100%' colorScheme='blue' onClick={handleClick}>
                    Login
                </Button>
            </Flex>
        </Box>
    )
};

export default Login;
