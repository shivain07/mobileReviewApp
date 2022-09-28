import { useContext } from "react";
import AuthContext from "./context/AuthContext";

function onAuthStateChanged(user: any) {
    if (user) {
        return user;
    } else {
        return null;
    }

}

export default onAuthStateChanged;