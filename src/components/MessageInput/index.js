import {View, Text, TextInput, TouchableOpacity} from 'react-native';

import styles from './MessageInput.style';

const MessageInput = ({handleSubmit, messageInput, setMessageInput}) => {
  return (
    <View style={styles.txtIptWrap}>
      <TextInput
        value={messageInput}
        numberOfLines={2}
        multiline={true}
        scrollEnabled={true}
        style={styles.txtIpt}
        onChangeText={text => setMessageInput(text)}
      />
      <TouchableOpacity style={styles.sndBtn} onPress={handleSubmit}>
        <Text style={{color: '#fff'}}>send</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MessageInput;
