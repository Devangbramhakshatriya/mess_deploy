const { Box, Text } = require("@chakra-ui/react");

function Footer() {
    return (
        <Box boxShadow="md" h={["35px", "35px", "40px", "40px", "40px", "40px"]} position="fixed" left="0" bottom="0" p="2px">
            <Text fontFamily="sans-serif" fontSize="12px">Node:- The application is under testing mode. It's better if you keep track of your records.</Text>
        </Box>
    )
}
export default Footer