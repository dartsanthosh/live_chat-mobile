import {View, Text, FlatList} from 'react-native';
import React, {useContext, useState} from 'react';
import styles from './ChatPage.style';
import AuthContext from '../../AuthContext/AuthContext';
import MessageInput from '../../components/MessageInput';

const ChatPage = ({route}) => {
  const {connection, messages} = useContext(AuthContext);
  const [messageInput, setMessageInput] = useState('');

  const data = [
    {
      name: 'Ezhumalai',
      message: 'Chat Room ID: d88f68fd-dc6a-4992-9e4a-c08a2d56de44',
      type: 'received',
    },
    {
      name: 'Ezhumalai',
      message: 'Ezhumalai joined the conversation',
      type: 'received',
    },
    {
      name: 'Ezhumalai',
      message: 'welcome',
      chatRoomId: 'd88f68fd-dc6a-4992-9e4a-c08a2d56de44',
      type: 'sent',
    },
  ];

  const handleSubmit = async () => {
    try {
      if (messageInput && connection) {
        await connection.invoke(
          'SendMessage',
          route.params.record.userName,
          messageInput,
          route.params.record.chatRoomId,
        );
        setMessageInput('');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const filteredMessages = messages?.filter(msg => {
    return msg.chatRoomId === route.params.record.chatRoomId;
  });

  const renderItem = ({item}) => {
    return (
      <View
        style={
          item.type === 'sent'
            ? {
                width: '70%',
                alignSelf: 'flex-end',
                alignItems: 'flex-end',
              }
            : {
                width: '70%',
                alignSelf: 'flex-start',
                alignItems: 'flex-start',
              }
        }>
        <View
          style={[
            {backgroundColor: 'red', padding: 10, margin: 10, borderRadius: 10},
            item.type === 'sent' && {backgroundColor: 'green'},
          ]}>
          <Text style={{color: '#fff', fontSize: 15}}>{item.message}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.msgContainer}>
        <Text style={styles.date}>{route.params.record.date}</Text>

        <FlatList data={data} renderItem={renderItem} />
      </View>

      <MessageInput
        messageInput={messageInput}
        setMessageInput={setMessageInput}
        handleSubmit={handleSubmit}
      />
    </View>
  );
};

export default ChatPage;
