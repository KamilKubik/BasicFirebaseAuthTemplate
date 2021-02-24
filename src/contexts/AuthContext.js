import React, { useContext, useEffect, useRef, useState } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext(); // Tutaj można umieścić default Value

export const useAuth = () => {
  // Według schematu, jes to Custom Hook
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  // Według schematu, to jest funkcja, w której się wszystko dzieje
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signUp = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password); // To zwraca obietnice, fajnie jest to opisane w dokumentacji
  };

  const logIn = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password); // To samo, co powyżej, tylko do logowania
  };

  const logOut = () => {
    return auth.signOut();
  };

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  const updateEmail = (email) => {
    return currentUser.updateEmail(email); // To musimy zrobić indywidualnie, bo tak działa firebase(?)... No nie wiem, nie wiem
  };

  const updatePassword = (password) => {
    return currentUser.updatePassword(password);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user); // Ten user, którego przypisujemy w tym miejscu, ma mase różnych zmiennych, zobacz sobie na przykład w komponencie SignUp, po kliknięciu przycisku Submit (pamiętaj, że jest to działanie asynchroniczne i żeby je wywołać, musisz zrobić proste renderowanie warunkowe)
      // Pomyślisz sobie, dlaczego zapisują się do tego user'a dane, które defakto nie mają nic związanego z wywołaniem po kliknięciu w Submit? Otóż mają, ponieważ funkcja signUp odwołuje się do auth, tak samo jak to wywołanie, więc wszystko jest tak naprawdę ze sobą połączone
      setLoading(false); // Jak wiemy ten useEffect, odpala się na samym początku, zmieniając loading na false. Chodzi o to, że nasza aplikacja (czyli nasz komponent children jakby) nie renderuje się, zanim stworzy się nowy użytkownik, który wszedł na stronę.
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signUp,
    logIn,
    logOut,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* U góry jest opisane, dlaczego w taki sposób */}
    </AuthContext.Provider>
  );
};
