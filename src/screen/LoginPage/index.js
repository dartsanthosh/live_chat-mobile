import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useContext, useState} from 'react';
import CheckBox from 'react-native-check-box';
import AuthContext from '../../AuthContext/AuthContext';
import axios from 'axios';
import Stopwatch from '../Stopwatch';

const LoginPage = () => {
  const {handleUser} = useContext(AuthContext);
  const [formData, setFormData] = useState({
    user: 'Local User',
    userName: 'admin',
    password: 'admin',
  });

  const handleLoginState = async (value, item) => {
    setFormData({
      ...formData,
      [item]: value,
    });
  };

  const handleLogin = async () => {
    handleUser('user logged in');
    await axios
      .post('https://chatserver.demodooms.com/api/login', formData, {
        withCredentials: true,
      })
      .then(res => {
        console.log(res);
        handleUser('user logged in');
      })
      .catch(err => console.log(err));
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#eeeeee',
        padding: 15,
      }}>
      <View style={{alignItems: 'center'}}>
        <Text style={{color: '#0000ff', fontSize: 40, fontWeight: 'bold'}}>
          Login
        </Text>
      </View>
      <View style={{marginTop: 35}}>
        <Text style={{color: '#0000ff', fontSize: 16, fontWeight: 'bold'}}>
          User:
        </Text>
        <TextInput
          style={{
            backgroundColor: '#d2d2d4',
            padding: 10,
            color: '#000',
            marginTop: 5,
          }}
          onChangeText={text => handleLoginState(text, 'user')}
          value={formData.user}
        />
      </View>
      <View style={{marginTop: 35}}>
        <Text style={{color: '#0000ff', fontSize: 16, fontWeight: 'bold'}}>
          User Name:
        </Text>
        <TextInput
          style={{
            backgroundColor: '#d2d2d4',
            padding: 10,
            color: '#000',
            marginTop: 5,
          }}
          onChangeText={text => handleLoginState(text, 'userName')}
          value={formData.userName}
        />
      </View>
      <View style={{marginTop: 35}}>
        <Text style={{color: '#0000ff', fontSize: 16, fontWeight: 'bold'}}>
          Password:
        </Text>
        <TextInput
          style={{
            backgroundColor: '#d2d2d4',
            padding: 10,
            color: '#000',
            marginTop: 5,
          }}
          onChangeText={text => handleLoginState(text, 'password')}
          value={formData.password}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 15,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <CheckBox style={{}} onClick={() => {}} isChecked={true} />
          <Text style={{color: '#0000ff', fontSize: 14, fontWeight: 'bold'}}>
            Remember me
          </Text>
        </View>
        <TouchableOpacity>
          <Text style={{color: '#0000ff', fontSize: 14, fontWeight: 'bold'}}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={handleLogin}
        style={{
          borderWidth: 1,
          alignItems: 'center',
          marginTop: 35,
          padding: 15,
          backgroundColor: '#ff00ff',
        }}>
        <Text style={{color: '#ffffff', fontSize: 16, fontWeight: 'bold'}}>
          Login
        </Text>
      </TouchableOpacity>
      {/* <Stopwatch /> */}
    </View>
  );
};

export default LoginPage;
