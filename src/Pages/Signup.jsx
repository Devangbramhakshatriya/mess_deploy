import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios"

const init = {
    firstName: "",
    lastName: "",
    mobileNumber: "",
    password: "",
    diposite: 700,
    dipositeStatus: "Pending"
}
function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [text, setText] = useState(init)
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()
    const navigate = useNavigate()
    const handleChange = (e) => {
        setText({ ...text, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        if (text.firstName.length < 3 || text.lastName.length < 3) {
            toast({
                title: 'Name shuld have minimum 3 character',
                description: "Enter Your Credentials",
                status: 'warning',
                duration: 9000,
                isClosable: true,
                position: "top"
            })
            setIsLoading(false)
        }else if(text.mobileNumber.length!==10){
            toast({
                title: 'Please Enter Correct Mobile Number',
                description: "Enter Your Credentials",
                status: 'warning',
                duration: 9000,
                isClosable: true,
                position: "top"
            })
            setIsLoading(false)
        } 
        else {
            const res = axios.post('https://mess-backend-wueq.onrender.com/users/register', text)
                // .then((res)=>console.log("Login Success"))
                // .then(()=>setText(init))
                .catch((err) => console.log(err));
            const data = await res
            console.log(data.status)
            if (data.status == 201) {
                toast({
                    title: 'User Already Exist.',
                    description: "Enter Your Credentials",
                    status: 'warning',
                    duration: 9000,
                    isClosable: true,
                    position: "top"
                })
                setIsLoading(false)
            } else if (data.status == 200) {
                toast({
                    title: 'Account created.',
                    description: "We've created your account for you.",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                    position: "top"
                })
                setIsLoading(false)
                navigate('/login')
            } else {
                toast({
                    title: 'Enter Correct Details.',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                    position: "top"
                })
                setIsLoading(false)
            }
        }


    }
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Sign up
                    </Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to enjoy all of our cool features ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <form onSubmit={handleSubmit}>
                            <HStack>
                                <Box>
                                    <FormControl id="firstName" isRequired>
                                        <FormLabel>First Name</FormLabel>
                                        <Input type="text" onChange={handleChange} name="firstName" />
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl id="lastName">
                                        <FormLabel>Last Name</FormLabel>
                                        <Input type="text" onChange={handleChange} name="lastName" />
                                    </FormControl>
                                </Box>
                            </HStack>
                            <FormControl id="email" isRequired>
                                <FormLabel>Mobile Number</FormLabel>
                                <Input type="number" onChange={handleChange} name="mobileNumber" />
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input type={showPassword ? 'text' : 'password'} onChange={handleChange} name="password" />
                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() =>
                                                setShowPassword((showPassword) => !showPassword)
                                            }>
                                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Stack spacing={10} pt={2}>
                                <Button
                                    type="submit"
                                    isLoading={isLoading}
                                    loadingText="Submitting"
                                    size="lg"
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Sign up
                                </Button>
                            </Stack>
                        </form>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Already a user? <RouterLink to="/login"><Link color={'blue.400'}>Login</Link></RouterLink>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}
export default Signup