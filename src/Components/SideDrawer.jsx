import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  IconButton,
} from '@chakra-ui/react'
import React from 'react'
import { Link as RouterLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi"
import { HamburgerIcon } from '@chakra-ui/icons';

export function SideDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  let token = localStorage.getItem("user_token")
  const handleLogout = () => {
    localStorage.setItem("user_token", "")
  }
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label='Options'
        icon={<HamburgerIcon />}
        variant='outline'
        border="none"
        alignSelf="center"
      />
      <MenuList>
        <MenuItem >
          <RouterLink to="/">Home</RouterLink>
        </MenuItem>
        <MenuItem >
          <RouterLink to="/profile">Profile</RouterLink>
        </MenuItem>
        <MenuItem >
          <RouterLink to="/login" onClick={onClose}><Button display={!token ? "none" : ""} onClick={handleLogout}>Logout</Button></RouterLink>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

