import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Login from '../../containers/un-auth-screens/login/Login';
import Register from '../../containers/un-auth-screens/register/Register';
const UnAuthenticatedStack = createNativeStackNavigator();

const UnAuthenticatedScreens = () => {
    return <UnAuthenticatedStack.Navigator initialRouteName="Login" screenOptions={{
        headerShown: false
    }}>
        <UnAuthenticatedStack.Screen name="Login" component={Login}
        />
        <UnAuthenticatedStack.Screen name="Register" component={Register}
        />
    </UnAuthenticatedStack.Navigator>
}
function UnAuthenticatedPagesStack() {
    return (
        <UnAuthenticatedScreens />
    );
}

export default UnAuthenticatedPagesStack;