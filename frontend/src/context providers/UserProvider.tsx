import {createContext,  ReactNode, FC} from "react";
import { useLocalState } from "../customHooks/useLocalState.ts";

// Define the shape of the context
type UserContextType = {
    jwt: string | null;
    setJwt: (value: string | null) => void;
};

// Create the context with an initial value of undefined
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
 const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [jwt, setJwt] = useLocalState("jwt");

    return (
        <UserContext.Provider value={{ jwt, setJwt }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };