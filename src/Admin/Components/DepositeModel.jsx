import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Select,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

function DepositeModel() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [dipositeStatus,setStatus]=useState("")
    const toast=useToast()
    const {id}=useParams()
    const handleSubmit=()=>{
      fetch(`https://ruby-muddy-earthworm.cyclic.app/users/updateuser/${id}`,{
        method:'PATCH',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({dipositeStatus})
      })
      .then(()=>
      toast({
        title: 'Status Changed.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position:"top"
      }))
    }
    return (
      <>
        <Button onClick={onOpen}>Change Deposite Status</Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Select onChange={(e)=>setStatus(e.target.value)}>
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Refunded">Refunded</option>
              </Select>
              <Button onClick={handleSubmit}>Submit</Button>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

  export default DepositeModel