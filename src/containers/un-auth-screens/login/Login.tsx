import { VStack, Box, Center, Heading, Button, FormControl, Input, Link, HStack, Text, Icon, Spinner, AlertDialog, Toast } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import AntDesign from "react-native-vector-icons/AntDesign"
import AuthContext from '../../../context/AuthContext';
import auth from '@react-native-firebase/auth';
import {
    GoogleSignin,
} from '@react-native-google-signin/google-signin';
import { ActivityIndicator, Alert } from 'react-native';
import { userCollectionReference } from '../../../utils/api/GetCalls';

function Login({ navigation }: any) {
    const { setIsUserLoggedIn, setUser } = useContext(AuthContext);

    const [isSigningIn, setIsSigningIn] = useState(false);


    async function onGoogleButtonPress() {
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
    }
    const addingUserToDatabase = async (data: any) => {
        const loggedInUserId = data?.user?.uid
        const userDetailsObj = {
            uid: data?.user?.uid,
            displayName: data?.user?.displayName,
            email: data?.user?.email,
            photoUrl: data?.user?.photoURL,
            reviews: []

        }
        await userCollectionReference.doc(loggedInUserId).set(userDetailsObj);
        setUser(data?.user);
        setIsUserLoggedIn(true);
        setIsSigningIn(false);

    }
    const getUserDetails = async () => {

    }
    const loginHandler = async () => {
        setIsSigningIn(true);

        // ⭐ :TODO need to check list of doc  if user then don't update the userData
        onGoogleButtonPress().then((data) => {
            try {
                // 📛 check data?.user?.id == collection.users(data?.user?.id)
                // if true ▶️ setUser(response.data);
                // else true ▶️ addingUserToDatabase(response.data);
                userCollectionReference.doc(data?.user?.uid).get().then((doc) => {
                    if (doc.exists) {
                        console.log(doc)
                        setUser(doc.data())
                    } else {
                        addingUserToDatabase(data);
                    }
                })
            } catch (error) {
                Toast.show({
                    title: "Error occured saving userInfo to DB"
                });
            }
        }).catch((err) => {
            setIsSigningIn(false)
            Toast.show({
                title: "Error occured while signining In"
            });
        })

    }
    return <Box flex={1} justifyContent={"center"} >
        <Center w="100%">
            <Box safeArea p="2" py="8" w="90%" maxW="290">
                <Heading size="lg" fontWeight="600" mb={5}>
                    Welcome to MYapp
                </Heading>

                <VStack space={1}>
                    <Button variant="subtle" leftIcon={<Icon as={AntDesign} name="google" size="sm" />} onPress={loginHandler}>
                        <Text fontSize="sm">
                            Sign In with Google
                            {isSigningIn && <Spinner size="sm" mr={2} />}
                        </Text>
                    </Button>
                    <Button variant="subtle" leftIcon={<Icon as={AntDesign} name="facebook-square" size="sm" />}>
                        Sign In with Facebook
                    </Button>
                </VStack>
            </Box>
        </Center>
    </Box>
};

export default Login;



{/* <Heading mt="1" _dark={{
                    color: "warmGray.200"
                }} color="coolGray.600" fontWeight="medium" size="xs">
                    Sign in to continue!
                </Heading> */}

{/* <VStack space={3} mt="5">
                    <FormControl>
                        <FormControl.Label>Email ID</FormControl.Label>
                        <Input />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Password</FormControl.Label>
                        <Input type="password" />
                        <Link _text={{
                            fontSize: "sm",
                            fontWeight: "500",
                            color: "indigo.500"
                        }} alignSelf="flex-end" mt="1">
                            Forget Password?
                        </Link>
                    </FormControl>
                    <Button mt="2" colorScheme="indigo">
                        Sign in
                    </Button>
                    <HStack mt="6" justifyContent="center">
                        <Text fontSize="lg" color="coolGray.600" _dark={{
                            color: "warmGray.200"
                        }}>
                            I'm a new user.{" "}
                        </Text>
                        <Link _text={{
                            color: "indigo.500",
                            fontWeight: "medium",
                            fontSize: "lg"
                        }} onPress={() => navigation.navigate("Register")}>
                            Sign Up
                        </Link>
                    </HStack>
                </VStack> */}