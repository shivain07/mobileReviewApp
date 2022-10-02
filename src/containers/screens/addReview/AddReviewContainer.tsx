import { Box, Text, HStack, TextArea, VStack, Icon, Heading, Input, Button, FormControl, Toast, KeyboardAvoidingView, ScrollView } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import { Keyboard, Alert, Platform, TouchableWithoutFeedback } from 'react-native';
import AuthContext from '../../../context/AuthContext';
import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import uuid from 'react-native-uuid';
import { NavigationContainer } from '@react-navigation/native';
import { allReviewsReference } from '../../../utils/api/GetCalls';
import { convertNullValuesToEmptyString, isNullOrEmpty } from '../../../utils/helperMethods';

interface IUserDetails {
    name: string,
    id: string,
    email: string,
    photoUrl: string,
    reviews: IReviewObj[]
}

interface IReviewObj {
    id: string,
    location?: string,
    review: string,
    tags?: string,
    topic?: string
}

function AddReviewContainer({ navigation }: any) {
    const { isUserLoggedIn, setIsUserLoggedIn, setUser, user } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors }, control, setValue } = useForm();
    const [userDetails, setUserDetails] = useState<IUserDetails | FirebaseFirestoreTypes.DocumentData>();
    const userDocument = firestore().collection('users').doc(user?.uid);

    useEffect(() => {
        userDocument.get().then((doc) => {
            if (doc.exists) {
                setUserDetails(doc.data());
            }
        });
    }, []);

    const addUserReviewMethod = async (formData: any) => {
        let reviewId = `${uuid.v4()}`;
        let reviewToAdd = {
            id: reviewId,
            ...convertNullValuesToEmptyString(formData)
        }

        //use updateMethod if updating a doc is required as it won't rewrite the whole DOCUMENT    
        await userDocument.update({
            "reviews": [...userDetails?.reviews, {
                ...reviewToAdd
            }],
            "isEdited": false
        });

        //use set to create new doc with custom id
        await allReviewsReference.doc(reviewId).set({
            ...reviewToAdd,
            reviewBy: {
                userId: user?.uid,
                name: user?.displayName
            }
        })
    }
    const onSubmit = (formData: any) => {
        try {
            addUserReviewMethod(formData).then(() => {
                Toast.show({
                    title: "Review added"
                });
                navigation.navigate("MyReview")
            })
        } catch (error) {
            console.log(error)
        }
    }

    const closeKeyboardIfOpen = () => {
        Keyboard.dismiss();
    }

    return (
        <KeyboardAwareScrollView style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={closeKeyboardIfOpen} style={{ flex: 1 }}>
                <Box px="4" rounded="lg">
                    <Box>
                        {/* <Heading my={2}>
                            hey this is add review page
                        </Heading> */}
                        <VStack space="1" alignItems="center" my={1}>
                            <Text>Write about</Text>
                            <Text>Restaurants / cafe /parks etc</Text>
                        </VStack>
                        <VStack space={2} my={2}>
                            <Controller
                                control={control}
                                name={"review"}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <FormControl isRequired  >
                                        <FormControl.Label>Write Review</FormControl.Label>
                                        <TextArea onBlur={onBlur}
                                            fontSize={"md"}
                                            onChangeText={onChange}
                                            value={value} placeholder="Write your thoughts here"
                                            totalLines={5}
                                            my={2}
                                            autoCompleteType={false} />

                                    </FormControl>

                                )}
                            />
                            {errors.review && <Text color={"red.400"}>This is required.</Text>}

                            <Controller
                                control={control}
                                name={"topic"}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <FormControl>
                                        <FormControl.Label>Topic</FormControl.Label>
                                        <Input type="text" onChangeText={onChange}
                                            value={value}
                                            placeholder={"Add a related topic"}
                                        />
                                    </FormControl>
                                )}
                            />
                            <Controller
                                control={control}
                                name={"location"}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <FormControl>
                                        <FormControl.Label>Location</FormControl.Label>
                                        <Input type="text" onChangeText={onChange}
                                            value={value}
                                            placeholder={"Add a related location"}
                                        />
                                    </FormControl>
                                )}
                            />
                            <Controller
                                control={control}
                                name={"tags"}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <FormControl>
                                        <FormControl.Label>Add tags</FormControl.Label>
                                        <Input type="text" onChangeText={onChange}
                                            value={value}
                                            placeholder={"#food #travel etc..."}
                                        />
                                    </FormControl>
                                )}
                            />
                        </VStack>
                    </Box>
                    <Button onPress={handleSubmit(onSubmit)} mt={2}>
                        Add
                    </Button>
                </Box>
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
    );
}

export default AddReviewContainer;