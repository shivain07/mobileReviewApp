import { Avatar, Badge, Box, ChevronDownIcon, CircleIcon, HStack, Icon, Text, VStack } from 'native-base';
import React from 'react';
import HeadingTextComponent from './HeadingTextComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { useWindowDimensions } from 'react-native';
// Ionicons.loadFont();

interface ICustomCardProps {
    tagsList: {
        tagTitle: string,
        id: string
    }[],
    numberOfChecksRecieved: number,
    imageUrl: string,
    location: string,
    reviewSubject: string,
    review: string
}
function CustomCard({
    tagsList,
    numberOfChecksRecieved,
    imageUrl,
    location,
    reviewSubject,
    review

}: ICustomCardProps) {
    const { width, height } = useWindowDimensions();
    return (
        <Box rounded="lg" shadow="2" bg={"coolGray.200"} m={2} p={2} w={width - 70}>
            <HStack space="2" mb={2}>
                {tagsList?.map((tag) => {
                    return <Badge key={tag?.id} colorScheme="coolGray" rounded={"sm"} shadow={"2"}>{tag?.tagTitle}</Badge>
                })}
            </HStack>
            <HStack justifyContent={"flex-end"} bg={"red.100"} px={2} my={2}>
                <Text fontSize="xs" fontWeight={"bold"}>{numberOfChecksRecieved}</Text>
            </HStack>

            <HStack space="3" mb={2}>
                <Avatar bg="amber.500" size="lg" source={{
                    uri: (imageUrl || "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80")
                }}>
                    img
                </Avatar>
                <VStack space="1">
                    <HStack space="2" alignItems="center">
                        <Icon as={Feather} name="octagon" color={"coolGray.400"} />
                        <HeadingTextComponent
                            text={reviewSubject}
                            textSize={"lg"}
                            textWeight={"bold"} />
                    </HStack>
                    <HStack space="2" alignItems="center">
                        <Icon as={Ionicons} name="location" color={"coolGray.400"} />
                        <HeadingTextComponent
                            text={location}
                            textSize={"md"}
                        />
                    </HStack>
                </VStack>
            </HStack>
            <Box rounded="lg" shadow="2" bg={"coolGray.100"} m={2} p={2}>
                <HeadingTextComponent
                    text={review}
                    textSize={"sm"}
                    textWeight={"bold"}
                />
                <HStack justifyContent={"flex-end"}>
                    <ChevronDownIcon />
                </HStack>
            </Box>
        </Box>
    );
}

export default CustomCard;