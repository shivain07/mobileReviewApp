/**
 * @react_navigation 
 */

// Instead of adding event listeners manually, we can use the ⭐useFocusEffect hook to perform side effects. It's like React's useEffect hook, but it ties into the navigation lifecycle.

// Example:

// Try this example on Snack 
// import { useFocusEffect } from '@react-navigation/native';

// function Profile() {
//   useFocusEffect(
//     React.useCallback(() => {
//       // Do something when the screen is focused

//       return () => {
//         // Do something when the screen is unfocused
//         // Useful for cleanup functions
//       };
//     }, [])
//   );

//   return <ProfileContent />;
// }


/**
 * @performace optimizations
 * @flatlists
 */

//  Use keyExtractor or key
//  You can set the keyExtractor to your FlatList component. This prop is used for caching and as the React key to track item re-ordering.
 
//  You can also use a key prop in your item component.
 
//  Avoid anonymous function on renderItem
//  Move out the renderItem function to the outside of render function, so it won't recreate itself each time render function called.
 
//  const renderItem = ({ item }) => (
//     <View key={item.key}>
//        <Text>{item.title}</Text>
//     </View>
//   );
 
//  return (
//    // ...
 
//    <FlatList data={items} renderItem={renderItem} />;
//    // ...
//  );

// If you're using the React Native CLI, you can use the --active-arch-only flag together with the run-android command. This flag will make sure the correct ABI is picked up from either the running emulator or the plugged in phone