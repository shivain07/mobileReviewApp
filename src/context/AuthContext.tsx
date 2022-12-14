import React, { useState } from 'react';

const AuthContext = React.createContext<{
    user: any,
    setUser?: any,
    isUserLoggedIn: boolean,
    setIsUserLoggedIn?: any
}>({
    user: null,
    // setUser: undefined,
    isUserLoggedIn: false,
    // setIsUserLoggedIn: undefined
});


const AuthContextProvider = ({ children }: any) => {
    const [user, setUser] = useState<any | null>(null);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
    return (
        <AuthContext.Provider value={{ user, setUser, isUserLoggedIn, setIsUserLoggedIn }}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContext;
export { AuthContextProvider };