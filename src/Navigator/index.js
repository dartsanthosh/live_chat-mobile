import React, {useContext, useEffect, useState} from 'react';
import {HubConnectionBuilder} from '@microsoft/signalr';
import * as SignalR from '@microsoft/signalr';
import {REACT_APP_CHATHUB_URL} from '@env';

// Navigator
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// Screens
import LoginPage from '../screen/LoginPage';
import HomePage from '../screen/HomePage';

// Components
import AuthContext from '../AuthContext/AuthContext';
import CustomLoader from '../components/CustomLoader';
import ChatPage from '../screen/ChatPage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Stopwatch from '../screen/Stopwatch';

const Navigator = () => {
  const {user, loading, handleConnection, handleDashboardData} =
    useContext(AuthContext);

  const [messages, setMessages] = useState([]);

  console.log(messages);

  // -------------------------------------------------------------------------------------------------
  const receiveClients = connection => {
    connection.on('ReceiveConnectedClients', data => {
      const newData = data.map((item, index) => {
        return {
          key: index,
          date: item.date.slice(0, 10) + ' ' + item.date.slice(11, 19),
          chatRoomId: item.chatRoomId,
          message: item.userName,
          agent: item.agent,
          status: item.status,
          connectionId: item.connectionId,
          id: item.id,
          canView: true,
        };
      });

      handleDashboardData(newData);
    });
  };

  const receiveLeaveChats = connection => {
    connection.on(
      'ReceiveLeaveChat',
      (name, message, connectionId, chatRoomId) => {
        setMessages(msg => [
          ...msg,
          {
            name,
            message,
            chatRoomId,
            type: connectionId == connection.connectionId ? 'sent' : 'received',
          },
        ]);
      },
    );
  };

  // const receiveMessages = connection => {
  //   connection.on('ReceiveMessage', data => {
  //     console.log(data, 'nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
  //     setMessages(msg => [
  //       ...msg,
  //       {
  //         name,
  //         message,
  //         chatRoomId,
  //         type:
  //           connectionId === connection.connectionId ? 'sent' : 'received',
  //       },
  //     ]);
  //   });
  // };

  // -------------------------------------------------------------------------------------------------

  useEffect(() => {
    // const startConnection = async () => {
    // try {
    const newConnection = new HubConnectionBuilder()
      .withUrl(REACT_APP_CHATHUB_URL + 'chathub')
      // .withAutomaticReconnect()
      .build();

    // if (newConnection) {
    //   await newConnection.start();
    handleConnection(newConnection);
    receiveClients(newConnection);
    receiveLeaveChats(newConnection);
    // receiveMessages(newConnection);

    newConnection
      .start()
      .then(() => {
        newConnection.on(
          'ReceiveMessage',
          (name, message, connectionId, chatRoomId) => {
            console.log(message, '------------------------check');
            // setMessages(msg => [
            //   ...msg,
            //   {
            //     name,
            //     message,
            //     chatRoomId,
            //     type:
            //       connectionId === newConnection.connectionId
            //         ? 'sent'
            //         : 'received',
            //   },
            // ]);
          },
        );
        // newConnection.invoke('SendConnectedClients');
        // newConnection.on('ReceiveAccessToken', async newAccessToken => {
        //   await AsyncStorage.setItem('access_token', newAccessToken);
        // });
        console.log('Connection Succeeded');
      })

      // } else {
      //   console.error('Failed to build a new connection.');
      // }
      // }
      //////////////////////////////
      .catch(err => {
        console.error('Failed to start the connection:', err);
      });
    ////////////////////////
    // };

    // startConnection();
  }, []);

  // useEffect(() => {
  //   const newConnection = new SignalR.HubConnectionBuilder()
  //     .withUrl(REACT_APP_CHATHUB_URL + 'chathub')
  //     .build();

  //   newConnection.on('ReceiveMessage', (name, message) => {
  //     setMessages(prevMessages => [...prevMessages, {name, message}]);
  //   });

  //   newConnection
  //     .start()
  //     .catch(error => console.error('Connection failed: ', error));

  //   return () => {
  //     newConnection.stop();
  //   };
  // }, []);

  if (loading) {
    return <CustomLoader />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user == null ? (
          <>
            <Stack.Screen
              name="LoginPage"
              component={LoginPage}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="HomePage"
              component={HomePage}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ChatPage"
              component={ChatPage}
              options={({route}) => ({
                title: route.params?.pageTitle,
              })}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
