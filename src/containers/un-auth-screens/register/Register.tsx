import { VStack, Box, Center, Heading, Button, FormControl, Input, Link, HStack, Text } from 'native-base';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TextBase } from 'react-native';
import auth from '@react-native-firebase/auth';
function Register({ navigation }: any) {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (formData: any) => {
        auth()
            .createUserWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
            .then(() => {
                console.log('User account created & signed in!');
            })
            .catch((error: any) => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });
    }

    return <Box flex={1} justifyContent={"center"} >
        <Center w="100%">
            <Box safeArea p="2" py="8" w="90%" maxW="290">
                <Heading size="lg" fontWeight="600">
                    Welcome
                </Heading>
                <Heading mt="1" _dark={{
                    color: "warmGray.200"
                }} color="coolGray.600" fontWeight="medium" size="xs">
                    Sign up to continue!
                </Heading>

                <VStack space={3} mt="5">
                    <Controller
                        control={control}
                        name="userName"
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <FormControl>
                                <FormControl.Label>Username</FormControl.Label>
                                <Input onBlur={onBlur} onChangeText={onChange} value={value} isInvalid={errors?.userName?.type == "required" ? true : false} />
                            </FormControl>
                        )}
                    />
                    {errors?.userName && <Text color={"danger.500"}>Username is required</Text>}

                    <FormControl>
                        <FormControl.Label>Email ID</FormControl.Label>
                        <Input />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Password</FormControl.Label>
                        <Input type="password" />
                    </FormControl>
                    <Button mt="2" colorScheme="indigo" onPress={handleSubmit(onSubmit)}>
                        Sign up
                    </Button>
                    <HStack mt="6" justifyContent="center">
                        <Text fontSize="lg" color="coolGray.600" _dark={{
                            color: "warmGray.200"
                        }}>
                            Already a user.{" "}
                        </Text>
                        <Link _text={{
                            color: "indigo.500",
                            fontWeight: "medium",
                            fontSize: "lg"
                        }} onPress={() => navigation.navigate("Login")}>
                            Sign In
                        </Link>
                    </HStack>
                </VStack>
            </Box>
        </Center>
    </Box>
}

export default Register;