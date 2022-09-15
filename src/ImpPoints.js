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