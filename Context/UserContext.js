import { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = (props) => {
    const [user, setUser] = useState(null); // User is initially null

    const login = (userData) => {
        setUser(userData); // Store user data after login
    };

    const logout = () => {
        setUser(null); // Reset user data on logout
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserProvider;
