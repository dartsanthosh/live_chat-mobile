import {useContext} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import styles from './HomePage.style';

import AuthContext from '../../AuthContext/AuthContext';
import LogoutComponent from '../../components/Logout';

const HomePage = ({navigation}) => {
  const {receiveMessage, dashboardData} = useContext(AuthContext);

  const handleMessage = async item => {
    // await receiveMessage();
    navigation.navigate('ChatPage', {record: item, pageTitle: item.chatRoomId});
  };

  const RenderChildren = ({item, index}) => {
    return (
      <View
        style={[styles.content, index % 2 == 0 && {backgroundColor: '#fff'}]}>
        <Text style={[styles.text, {fontWeight: 'bold', fontSize: 14}]}>
          {`${new Date(item.date).toLocaleDateString()} : ${new Date(
            item.date,
          ).toLocaleTimeString()}`}
        </Text>
        <View style={{marginTop: 5}}>
          <Text style={styles.idText}>{item.chatRoomId}</Text>
        </View>

        {/* {item?.agent && ( */}
        <View style={{marginTop: 5}}>
          <Text
            style={[styles.text, {fontWeight: 'bold', color: '#0E9C9B'}]}
            numberOfLines={1}>
            {item.agent}
          </Text>
        </View>
        {/* // )} */}

        <View style={{marginTop: 5}}>
          <Text
            style={[styles.text, {fontWeight: 'bold', fontSize: 15}]}
            numberOfLines={1}>
            {item.message}
          </Text>
        </View>
        {/* {item?.status.toLowerCase() == 'new' && ( */}
        <TouchableOpacity
          onPress={() => handleMessage(item)}
          style={{
            alignItems: 'center',
            padding: 8,
            borderRadius: 5,
            marginTop: 10,
            backgroundColor: '#1e8a61',
            backgroundColor: 'orange',
          }}>
          <Text style={styles.visitid}>Attend</Text>
        </TouchableOpacity>
        {/* )} */}
        <View style={styles.draft}>
          <Text style={styles.visitid}>{item.status}</Text>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#d2d4d4',
        paddingVertical: 15,
      }}>
      <LogoutComponent />
      <FlatList
        data={dashboardData}
        renderItem={RenderChildren}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default HomePage;
