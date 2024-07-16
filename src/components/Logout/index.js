import {Text, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import AuthContext from '../../AuthContext/AuthContext';

export default function LogoutComponent() {
  const {handleUser} = useContext(AuthContext);

  const handleLogin = () => {
    handleUser(null);
  };
  return (
    <TouchableOpacity
      onPress={handleLogin}
      style={{
        borderWidth: 1,
        alignItems: 'center',
        padding: 15,
        margin: 15,
        backgroundColor: '#ff00ff',
      }}>
      <Text style={{color: '#ffffff', fontSize: 16, fontWeight: 'bold'}}>
        Logout
      </Text>
    </TouchableOpacity>
  );
}
