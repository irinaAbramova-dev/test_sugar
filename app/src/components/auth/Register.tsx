import React, {useState} from "react";
import {Button, FormControl, FormErrorMessage, Input, InputGroup, InputLeftElement} from "@chakra-ui/react";
import {EmailIcon, UnlockIcon} from "@chakra-ui/icons";
import {loginApi, registerApi} from "../../api/auth";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Register = () => {
    const router = useRouter()

    const [email, setEmail] = useState(null)
    const handleEmailInputChange = (e) => setEmail(e.target.value)
    const isEmailError = email !== undefined && email === ''

    const [password, setPassword] = useState(null)
    const handlePasswordInputChange = (e) => setPassword(e.target.value)
    const isPasswordError = password !== undefined && password === ''

    const [confirmPassword, setConfirmPassword] = useState(null)
    const handleConfirmPasswordInputChange = (e) => setConfirmPassword(e.target.value)
    const isConfirmPasswordError = confirmPassword !== undefined && confirmPassword === ''

    const handleClick = async (event) => {
        event.preventDefault()
        try {
            const user = await registerApi(email, password)
            const currentUser = await loginApi(email, password)
            if (currentUser) {
                Cookies.set("currentUser", JSON.stringify(currentUser));
            }
            router.push("/profile")
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
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
            <FormControl isInvalid={isConfirmPasswordError} pb={3}>
                <InputGroup size='sm'>
                    <InputLeftElement pointerEvents='none'>
                        <UnlockIcon color='gray.400' />
                    </InputLeftElement>
                    <Input placeholder='Confirm password' type='password' variant='filled' value={confirmPassword} onChange={handleConfirmPasswordInputChange} />
                    {isConfirmPasswordError ? <FormErrorMessage>Password is required.</FormErrorMessage> : <></>}
                </InputGroup>
            </FormControl>
            <Button w='100%' colorScheme='blue' size='sm' onClick={handleClick} mt={3}>
                Sign up
            </Button>
        </div>
    )
};

export default Register;
