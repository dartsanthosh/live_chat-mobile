import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from './AuthContext';

const AuthProvider = ({children}) => {
  const [user, setuser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);

  const [dashboardData, setDashboardData] = useState([]);
  // const [adminUsername, setAdminUsername] = useState('Nijanthan');
  // const [messageInput, setMesssageInput] = useState('');

  useEffect(() => {
    const loadUser = async () => {
      let userDetails = await AsyncStorage.getItem('@user');
      setuser(JSON.parse(userDetails));
      setLoading(false);
    };

    loadUser();
  }, []);

  const receiveMessage = async () => {
    try {
      await connection.on(
        'ReceiveMessage',
        (userName, message, connectionId, chatRoomId) => {
          const connId = connection.connectionId;
          setMessages(msg => [
            ...msg,
            {
              userName,
              message,
              chatRoomId,
              type: connectionId === connId ? 'sent' : 'received',
            },
          ]);
          const messageClass =
            connection.connectionId === connectionId ? 'send' : 'received';
        },
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleUser = async userInfo => {
    await AsyncStorage.setItem('@user', JSON.stringify(userInfo));
    setuser(userInfo);
  };

  const handleConnection = connectionDetails => {
    setConnection(connectionDetails);
  };

  const handleDashboardData = dashboardDetails => {
    setDashboardData(dashboardDetails);
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        handleUser,

        connection,
        handleConnection,
        messages,
        receiveMessage,
        handleDashboardData,
        dashboardData,
        // messageInput,
        // setMesssageInput,
        // adminUsername,
        // setAdminUsername,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
