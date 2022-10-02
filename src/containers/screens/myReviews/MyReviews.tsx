import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';
import { Box, Heading, Text, VStack, HStack, Avatar, Icon, IconButton, Stagger, useDisclose, Center, Modal, Button, FormControl, TextArea, Input, KeyboardAvoidingView, ScrollView } from 'native-base';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FlatList, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AuthContext from '../../../context/AuthContext';
import { allReviewsReference, getAllReviews, getUserAllReview } from '../../../utils/api/GetCalls';
import { isNullOrEmpty } from '../../../utils/helperMethods';

interface IReviewData {
    id: string,
    location: string,
    review: string
    reviewBy: {
        name: string,
        userId: string,
    }
    tags: string,
    topic: string
}
function MyReviews({ navigation }: any) {
    const { width, height } = useWindowDimensions();
    const { user } = useContext(AuthContext)
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userAllReviews, setUserAllReviews] = useState<IReviewData[]>([]);
    useFocusEffect(
        React.useCallback(() => {
            getUserAllReview(user?.uid).then((data) => {
                setUserAllReviews(data);
            });
        }, []));
    return (
        <Box flex={1} py={2}>
            <Heading alignSelf={"center"} mb={2}>My Reviews</Heading>
            <DeleteReviewModal
                showModal={showDeleteModal}
                setShowModal={setShowDeleteModal}
            />
            {!isNullOrEmpty(userAllReviews) && userAllReviews?.length > 0 && <ReviewsView
                userId={user?.uid}
                userAllReviews={userAllReviews}
            />}
            {/* <Box flex={1}>
                {!isNullOrEmpty(userAllReviews) && <FlatList
                    data={userAllReviews}
                    renderItem={(props) => <Card
                        item={props?.item}
                        setShowDeleteModal={setShowDeleteModal}
                        navigation={navigation}
                    />}

                    keyExtractor={(item: any) => `${item?.id}`}
                />}
            </Box> */}

        </Box>

    );
}

export default MyReviews;

const Card = ({ item, setShowDeleteModal, navigation }: any) => {

    return <Box pb={2} mb={2} mx={2} borderBottomWidth={1}>
        <Box
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
        >
            <Box>
                <HStack space={2}>
                    <VStack>
                        <Text fontSize="md" bold>Topic : {item?.topic}</Text>
                        <Text fontSize="sm" italic>{item?.location}</Text>
                    </VStack>
                </HStack>
                <Text fontSize="md" bold alignSelf={"center"}>{item?.review}</Text>
                <Text>{item?.tags}</Text>
            </Box>
            <Box>
                <IconButton mb="2" variant={"subtle"} rounded={"md"} icon={<Icon as={MaterialIcons} size="6" name="edit" color="blue.500" />}
                // onPress={() => { navigation.navigate("EditReview") }} 
                />

                <IconButton mb="1" variant={"subtle"} rounded={"md"}
                    colorScheme={"danger"}
                    icon={<Icon as={MaterialIcons} size="6" name="delete-outline" color="red.600" />}
                // onPress={() => setShowDeleteModal(true)} 
                />
            </Box>

        </Box>
    </Box >
}

const DeleteReviewModal = ({
    showModal, setShowModal
}: any) => {
    return <Center>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content maxWidth="400px">
                <Modal.CloseButton />

                <Modal.Header>Contact Us</Modal.Header>
                <Modal.Body>
                    <Text>
                        Are you sure you want to delete this review
                    </Text>
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group space={2}>
                        <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                            setShowModal(false);
                        }}>
                            Cancel
                        </Button>
                        <Button variant={"solid"} bgColor={"red.600"} onPress={() => {
                            setShowModal(false);
                        }}>
                            Delete
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    </Center>;
};

const ReviewsView = ({ userId, userAllReviews }: {
    userId: string,
    userAllReviews: IReviewData[]
}) => {
    return <Box flex={1}>
        {!isNullOrEmpty(userAllReviews) && <FlatList
            data={userAllReviews}
            renderItem={(props) => <Card
                item={props?.item}
            // setShowDeleteModal={setShowDeleteModal}
            // navigation={navigation}
            />}

            keyExtractor={(item: any) => `${item?.id}`}
        />}
    </Box>
}
