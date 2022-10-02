import { Box, Button, FormControl, Heading, Input, Text, TextArea, VStack } from 'native-base';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

function EditReview({ navigation }: any) {
    const { register, handleSubmit, formState: { errors }, control } = useForm();

    // ⭐ ⭐ should we pass data through params as stringified json and the parse it or normal way which is better

    const onSubmit = (formData: any) => {
        console.log(formData)
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
                        <VStack space={2} my={2}>
                            <Controller
                                control={control}
                                name={"review"}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <FormControl isRequired  >
                                        <FormControl.Label>Your Review</FormControl.Label>
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
                            {errors.review && <Text>This is required.</Text>}

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
                        Update
                    </Button>
                </Box>
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>

    );
}

export default EditReview;