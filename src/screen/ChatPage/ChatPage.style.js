import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
    justifyContent: 'space-between',
  },
  msgContainer: {
    flex: 1,
    // padding: 15,
    backgroundColor: '#eeeeee',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 10,
  },
  date: {
    color: '#0e4377',
    fontSize: 12,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;
