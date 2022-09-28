import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeContainer from '../../containers/screens/home/HomeContainer';
import SearchContainer from '../../containers/screens/search/SearchContainer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AddReviewContainer from '../../containers/screens/addReview/AddReviewContainer';
import UserProfile from '../../containers/screens/userProfile/UserProfile';
import MyReviews from '../../containers/screens/myReviews/MyReviews';
import EditReview from '../../containers/screens/editReview/EditReview';


const AuthenticatedStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthenticatedScreens = () => {
    return <AuthenticatedStack.Navigator initialRouteName="Root">
        <AuthenticatedStack.Screen name="Root" component={TabStack}
            options={{
                headerShown: false
            }}
        />
        <AuthenticatedStack.Screen name="AddReview" component={AddReviewContainer}
        // options={{
        //     headerShown: false
        // }}
        />
        <AuthenticatedStack.Screen name="EditReview" component={EditReview}
            options={{
                // headerShown: false,
                headerTitle: "Edit review"
            }}
        />
    </AuthenticatedStack.Navigator>
}

const TabStack = () => {
    return <Tab.Navigator
        screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
        }}
    >
        <Tab.Screen name='HomeWrapper' component={HomeContainer}
            options={{
                tabBarIcon: ({
                    focused,
                    color,
                    size
                }: any) => < Icon as={MaterialCommunityIcons} size={"xl"} name="home-circle-outline" color={focused ? "blue.300" : "coolGray.500"} />
            }}



        />
        <Tab.Screen name="Search" component={SearchContainer}
            options={{
                tabBarIcon: ({
                    focused,
                    color,
                    size
                }: any) => <Icon as={MaterialIcons} size={"xl"} name="search" color={focused ? "blue.300" : "coolGray.500"} />
            }}
        />
        <Tab.Screen name="MyReview" component={MyReviews}
            options={{
                tabBarIcon: ({
                    focused,
                    color,
                    size
                }: any) => <Icon as={MaterialCommunityIcons} size={"xl"} name="message-reply-outline" color={focused ? "blue.300" : "coolGray.500"} />
            }}
        />
        <Tab.Screen name="UserProfile" component={UserProfile}
            options={{
                tabBarIcon: ({
                    focused,
                    color,
                    size
                }: any) => <Icon as={MaterialCommunityIcons} size={"xl"} name="face-man" color={focused ? "blue.300" : "coolGray.500"} />
            }}
        />

    </Tab.Navigator>
}

function AuthenticatedPagesStack() {
    return (
        <AuthenticatedScreens />
    );
}

export default AuthenticatedPagesStack;