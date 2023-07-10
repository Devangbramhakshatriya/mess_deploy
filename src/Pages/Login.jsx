import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import {Navigate, Link as RouterLink, useNavigate} from "react-router-dom"
function Login() {
    const [mobileNumber,setMobileNumber]=useState("")
    const [password,setPassword]=useState("")
    const [isLoading,setIsLoading]=useState(false)
    const toast = useToast()
    const navigate=useNavigate()
    let obj={mobileNumber,password}
    const handleSubmit=async(e)=>{
        e.preventDefault()
        console.log(obj)
        setIsLoading(true)
            const res=axios.post('https://ruby-muddy-earthworm.cyclic.app/users/login',obj)
        .then((res)=>{
            toast({
                title: 'Login Success.',
                description: "Book Your Food 🥘",
                status: 'success',
                duration: 9000,
                isClosable: true,
                position:"top"
              })
              setIsLoading(false)
              console.log(res.data.token)
              localStorage.setItem('user_token', res.data.token)
              navigate('/')
        })
        .catch(()=>{
            toast({
                title: 'Enter Correct Credentials.',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position:"top"
              })
              setIsLoading(false)
        })
        // console.log(await res)
    }
    
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <form onSubmit={handleSubmit}>
                        <FormControl id="email">
                            <FormLabel>Enter Contact Number</FormLabel>
                            <Input type="number" onChange={(e)=>setMobileNumber(e.target.value)}/>
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input type="password" onChange={(e)=>setPassword(e.target.value)}/>
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}>
                                <Checkbox>Remember me</Checkbox>
                                <Link color={'blue.400'}>Forgot password?</Link>
                            </Stack>
                            <Button
                            isLoading={isLoading}
                            loadingText="Signing"
                            type='submit'
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Sign in
                            </Button>
                        </Stack>
                        </form>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Dont't have an account? <RouterLink to="/signup"><Link color={'blue.400'}>Signup</Link></RouterLink>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}
export default Login