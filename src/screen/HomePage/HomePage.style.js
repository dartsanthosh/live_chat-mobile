import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#eeeeee',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 15,
    borderRadius: 5,
    elevation: 5,
  },
  idText: {
    color: '#0e4377',
    textAlign: 'left',
    textTransform: 'capitalize',
    fontSize: 12,
    fontWeight: 'bold',
  },
  text: {
    color: '#0e4377',
    fontSize: 20,
    textTransform: 'capitalize',
  },
  conText: {
    color: '#58595a',
    fontSize: 14,
    marginVertical: 5,
  },
  visitid: {
    color: '#fff',
    textAlign: 'center',
    justifyContent: 'flex-end',
    textTransform: 'capitalize',
    fontSize: 12,
    fontWeight: 'bold',
  },
  draft: {
    backgroundColor: '#d95351',
    borderBottomStartRadius: 5,
    borderTopEndRadius: 5,
    position: 'absolute',
    right: 0,
    top: 0,
    width: 120,
    paddingVertical: 3,
  },
});

export default styles;
