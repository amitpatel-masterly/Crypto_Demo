import React, {useState} from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import {GET_CURRENCY_LIST} from '../model/crypto/actions';

const mapStateToProps = (state, props) => {
  const {currency_list} = state.currency;
  return {currency_list};
};
const mapDispatchToProps = (dispatch, props) => ({
  geyCurrency: (params) => {
    dispatch({
      type: GET_CURRENCY_LIST,
      payload: {params},
    });
  },
});

const HomeView = ({currency_list, geyCurrency}) => {
  const [modalVisible, setModelVisible] = useState(false);
  const [currency, setCurrency] = useState('');

  const addItem = () => {
    if (currency.length == 0) {
      alert('Currency can not be empty');
      return;
    }

    const list = currency_list.filter((item) => {
      return (
        item.data.name.toUpperCase() == currency.toUpperCase() ||
        item.data.symbol.toUpperCase() == currency.toUpperCase()
      );
    });
    if (list.length > 0) {
      alert('Currency already added');
      return;
    }
    setModelVisible(false);
    geyCurrency(currency);
    setCurrency('');
  };

  const renderItem = (item) => {
    return (
      <View>
        <View style={styles.rowMain}>
          <View style={styles.flex}>
            <Text style={styles.name}> {item.data.name}</Text>
            <Text style={styles.symbol}> {item.data.symbol}</Text>
          </View>
          <Text style={styles.price}>
            {' '}
            ${item.data.market_data.price_usd.toFixed(2)}
          </Text>
        </View>
        <View style={styles.line}></View>
      </View>
    );
  };

  const renderAddCurrency = () => {
    return (
      <Modal visible={modalVisible}>
        <TouchableOpacity
          style={styles.payload}
          onPress={() => {
            setModelVisible(false);
            setCurrency('');
          }}>
          <Text style={styles.backToList}>Back to List</Text>
        </TouchableOpacity>
        <View style={styles.modal}>
          <View style={styles.payload}>
            <Text style={styles.txtAddCrypto}>Add a Cryptocurrency</Text>

            <TextInput
              style={styles.placeHolder}
              placeholder={'Use a name or ticket symbol...'}
              onChangeText={setCurrency}
              value={currency}></TextInput>
            <TouchableOpacity
              title="Add"
              style={styles.btnAdd}
              onPress={() => {
                addItem();
              }}>
              <Text style={styles.txtAdd}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.flex}>
      <FlatList
        data={currency_list}
        renderItem={({item}) => {
          return renderItem(item);
        }}
        keyExtractor={item => item.data.id}
      />
      <TouchableOpacity
        style={styles.btnOpenModel}
        onPress={() => {
          setModelVisible(true);
        }}>
        <Text style={styles.txtAdd}>+ Add a Cryptocurrency</Text>
      </TouchableOpacity>

      {renderAddCurrency()}
    </View>
  );
};

const styles = StyleSheet.create({
  btnAdd: {
    backgroundColor: 'yellow',
    width: '50%',
    padding: 10,
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  flex: {
    flex: 1,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    margin: 10,
  },
  rowMain: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  padding: {
    padding: 10,
  },
  btnOpenModel: {
    padding: 10,
    alignItems: 'center',
  },
  backToList: {
    padding: 10,
    color: 'black',
    fontSize: 16,
  },
  txtAddCrypto: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  name: {
    color: 'black',
    fontSize: 16,
  },
  price: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  line: {
    backgroundColor: 'grey',
    height: 1,
  },
  symbol: {
    color: 'grey',
    fontSize: 13,
  },
  placeHolder: {
    borderColor: 'grey',
    borderRadius: 2,
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
  },
  txtAdd: {
    color: 'grey',
    fontWeight: 'bold',
  },
});

const Home = connect(mapStateToProps, mapDispatchToProps)(HomeView);

export default Home;
