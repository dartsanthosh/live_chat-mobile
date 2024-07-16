import React, {useEffect, useState} from 'react';

import Navigator from './src/Navigator';
import AuthProvider from './src/AuthContext';

import {HubConnectionBuilder} from '@microsoft/signalr';

function App() {
  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl('https://chatserver.demodooms.com/chathub')
      .build();

    newConnection
      .start()
      .then(() => {
        newConnection.on(
          'ReceiveMessage',
          (name, message, connectionId, chatRoomId) => {
            console.log(name, '------------------------name');
            console.log(message, '------------------message');
            console.log(connectionId, '--------connectionId');
            console.log(chatRoomId, '------------chatRoomId');
          },
        );
        console.log('Connection Succeeded');
      })
      .catch(err => {
        console.error('Failed to start the connection:', err);
      });
  }, []);

  return (
    <AuthProvider>
      <Navigator />
    </AuthProvider>
  );
}

export default App;
