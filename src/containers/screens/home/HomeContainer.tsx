import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Avatar, Box, Button, Heading, HStack, Icon, Input, ScrollView, SearchIcon, Text, View, VStack } from 'native-base';
import React, { useContext, useEffect, useRef, useState } from 'react';
import AuthContext from '../../../context/AuthContext';
import CustomCard from '../../../ui-components/CustomCard';
import HeadingTextComponent from '../../../ui-components/HeadingTextComponent';
import auth from '@react-native-firebase/auth';
import { ActivityIndicator, Dimensions, FlatList, useWindowDimensions } from 'react-native';
import Carousel from "react-native-snap-carousel"
import { Emitter } from 'react-native-particles'
/**
 * 
 * @desc Landing home page for logged in user 
 */

function HomeContainer({
    navigation
}: any) {
    const [index, setIndex] = React.useState(0)
    const isCarousel = React.useRef(null)
    const { isUserLoggedIn, setIsUserLoggedIn, setUser, user } = useContext(AuthContext)
    // Set an initializing state whilst Firebase connects
    const { width, height } = useWindowDimensions();

    const TrendingReviewsList = [
        {
            id: 0,
            topic: "Sidhbali mandir",
            review: "Great place to visit",
            location: "Dehradun",
            tags: "#travel #tourist",
            reviewBy: {
                id: "jshegre",
                name: "shivain"
            },

        },
        {
            id: 1,
            topic: "Sidhbali mandir",
            review: "Great place to visit",
            location: "Dehradun",
            tags: "#travel #tourist",
            reviewBy: {
                id: "jshegre",
                name: "shivain"
            },

        },
        {
            id: 2,
            topic: "Sidhbali mandir",
            review: "Great place to visit",
            location: "Dehradun",
            tags: "#travel #tourist",
            reviewBy: {
                id: "jshegre",
                name: "shivain"
            },

        },
    ]
    const ReviewCardMinView = ({ item, index }: any) => {
        return <Box bg={"amber.200"} p={2} m={2} rounded={"md"} key={item?.id} width={width - 60} height={"60%"}>
            <HStack space={2}>
                <Avatar bg="amber.500" source={{
                    uri: user ? user?.photoURL : "notAvailable"
                }} size="md">
                    NB
                    {/* <Avatar.Badge bg="blue.100" /> */}
                </Avatar>
                <VStack>
                    <Text fontSize="md" bold>Topic : {item?.topic}</Text>
                    <Text fontSize="sm" italic>{item?.location}</Text>
                </VStack>
            </HStack>
            <Text fontSize="md" bold alignSelf={"center"}>{item?.review}</Text>
            <Box flexDirection={"row"} justifyContent={"space-between"}>
                <Text>{item?.tags}</Text>
                <Text ml={0}>- {item?.reviewBy?.name}</Text>
            </Box>
        </Box>
    }
    return (
        <Box flex={1}>
            <Box bg={"coolGray.500"} borderBottomRadius={"2xl"} mb={2} alignItems={"center"} justifyContent={"center"} flex={1}>
                <Avatar bg="amber.500" source={{
                    uri: user ? user?.photoURL : "notAvailable"
                }} size="xl">
                    userPic
                    {/* <Avatar.Badge bg="blue.100" /> */}
                </Avatar>
                <Text fontSize="md">{user?.displayName}</Text>
                <Text fontSize="sm">{user?.email}</Text>
            </Box>
            <Box flex={1} my={2}>
                <Box flexDirection={"row"} justifyContent={"space-around"} flex={1}>
                    <Box height={"40%"} width={"40%"} bg={"blue.200"} rounded={"md"} alignItems={"center"} justifyContent={"center"}>
                        <Heading fontSize="xs">Add review</Heading>
                        <Button
                            colorScheme="primary"
                            onPress={() => {
                                navigation.navigate("AddReview")
                            }}
                        >
                            Add review
                        </Button>

                    </Box>
                    <Box height={"40%"} width={"40%"} bg={"blue.200"} rounded={"md"} alignItems={"center"} justifyContent={"center"}>
                        <Heading fontSize="xs">Activity</Heading>
                        <Button
                            colorScheme="primary"
                            onPress={() => {

                            }}
                        >
                            View activity
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Box flex={1} bg={"coolGray.500"} borderTopRadius={"2xl"} alignItems={"center"} p={2}>
                <Heading>Trending reviews</Heading>
                <FlatList
                    data={TrendingReviewsList}
                    renderItem={ReviewCardMinView}
                    keyExtractor={(item) => `${item?.id}`}
                    horizontal={true}
                />
            </Box>







            {/* <Box>
                <Button
                    size={"sm"}
                    colorScheme="primary"
                    onPress={() => {
                        navigation.navigate("AddReview")
                    }}

                >
                    Add post
                </Button>

            </Box>
            <NaviagteToSearchComponent
                inputStyleProps={{
                    mx: 5
                }}
                onChangeHandler={() => {
                    navigation.navigate("Search")
                }}
            /> */}



            {/* <Button
                colorScheme="primary"
                onPress={logoutHandler}

            >
                Log out
            </Button> */}

        </Box>
    );
}

export default HomeContainer;


interface INaviagteToSearchComponentProps {
    inputSize?: string,
    placeholderText?: string,
    inputStyleProps?: {},
    inputWrapperComponentStyleProps?: {},
    onChangeHandler?: () => void
}
function NaviagteToSearchComponent({
    inputSize = "xl",
    placeholderText = "Search",
    inputStyleProps,
    inputWrapperComponentStyleProps,
    onChangeHandler
}: INaviagteToSearchComponentProps) {
    return (
        <View {...inputWrapperComponentStyleProps}>
            <Input onPressIn={onChangeHandler} size={inputSize} placeholder={placeholderText} {...inputStyleProps} InputRightElement={<SearchIcon mr={2} size={"lg"} />} />

        </View>
    );
}


    // {
    //     "displayName": "Shivain Gusain",
    //     "email": "shivaingusain07@gmail.com",
    //     "emailVerified": true,
    //     "isAnonymous": false,
    //     "metadata": {
    //       "creationTime": 1663875706107,
    //       "lastSignInTime": 1663875706108
    //     },
    //     "phoneNumber": null,
    //     "photoURL": "https://lh3.googleusercontent.com/a-/ACNPEu8z_V8jG6an19ZZd74OEu6p9Zka5_mwekmi590p=s96-c",
    //     "providerData": [
    //       [
    //         "Object"
    //       ]
    //     ],
    //     "providerId": "firebase",
    //     "tenantId": null,
    //     "uid": "RStIzjisaqcrJdHiRq828PfEvn53"
    //   }