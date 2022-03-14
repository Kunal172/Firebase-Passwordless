import React from 'react'
import  {Heading, GridItem, Text} from '@chakra-ui/react'

import { useAuth } from '../../Hooks/useAuth'

const DashBoard = () => {
    const {user} = useAuth()

    return (
        <GridItem colStart={[1, null, null, 2, null, null]} colSpan={[3, null, null, 1, null, null]} p={6}>
            <Heading as='h1' mb={6}>DashBoard</Heading>
            <Text fontSize='lg'> Welcome, {user.email}! </Text>
        </GridItem>
    )
}

export default DashBoard;