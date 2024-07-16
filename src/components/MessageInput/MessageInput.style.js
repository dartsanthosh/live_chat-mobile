import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  txtIpt: {
    flex: 1,
    borderWidth: 1,
    marginRight: 5,
    borderRadius: 50,
    backgroundColor: '#fff',
    padding: 10,
    paddingHorizontal: 20,
    color: '#000',
  },
  txtIptWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sndBtn: {
    backgroundColor: '#1e8a61',
    padding: 5,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
});

export default styles;
