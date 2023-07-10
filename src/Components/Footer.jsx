const { Box, Text, Image } = require("@chakra-ui/react");

function Footer() {
    return (
        <Box  position="sticky" bottom="0" p="2px" bg="white"  boxShadow="0 -0.5px 1px 0 gray" >
            <Box display="flex" justifyContent="space-around" alignItems="center">
            <Text fontFamily="sans-serif" fontSize="12px">For Any Query Call On: 9168071225</Text>
            <Image src="Mess Logo.PNG" w="40px"/>
            </Box>
        </Box>
    )
}
export default Footer