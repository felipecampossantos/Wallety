import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput
} from 'react-native';

import { Colors, Typography } from '../../styles';
import { insertMoneyBox, updateMoneyBox } from '../../dbHelpers/moneyboxHelper';

import Button from '../../components/Button';
import BackHeader from '../../components/Headers/BackHeader';

import Toast from 'react-native-toast-message';

const AddMoneyBox = ({ navigation, route }) => {
  const [name, setName] = useState(null);
  const [total, setTotal] = useState(0);
  const [collected, setCollected] = useState(0);

  useEffect(() => {
    if (route.params?.item) {
      setName(route.params.item.name);
      setTotal((route.params.item.total).toString());
      setCollected((route.params.item.collected).toString());
    }
  }, []);

  // Insert MoneyBox
  const __insert = () => {
    insertMoneyBox({
      name: name,
      total: parseFloat(total),
      collected: parseFloat(collected)
    });
  }

  // Update MoneyBox
  const __update = () => {
    updateMoneyBox({
      id: route.params.item.id,
      name: name,
      total: parseFloat(total),
      collected: parseFloat(collected)
    });
  }

  // Save MoneyBox
  const __save = () => {
    if (route.params?.item) {
      __update();
    }
    else {
      let { isValid, errorMessage } = areParamsValid()
      if (!isValid) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: errorMessage
        });
      } else {
        // only inserts when it doesnt have errors
        __insert();
      }
    }
    navigation.goBack();
  }

  const areParamsValid = () => {
    let valid = true;
    let errorMessage = ``;

    if (!name) {
      valid = false;
      errorMessage = `Name can't be empty.`
    }

    if (total == 0) {
      valid = false;
      errorMessage = `Total can't be zero.`
    }
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <BackHeader title={route.params?.item ? 'Edit MoneyBox' : 'New MoneyBox'} />

      {/* Body */}
      <ScrollView style={styles.bodyContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.inputContainer}>
          <Text style={[Typography.TAGLINE, { color: Colors.GRAY_DARK }]}>Title</Text>
          <TextInput
            value={name}
            placeholder='Exp: Car'
            keyboardType='default'
            onChangeText={(text) => setName(text)}
            style={[styles.input, Typography.BODY]}
            placeholderTextColor={Colors.GRAY_MEDIUM} />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[Typography.TAGLINE, { color: Colors.GRAY_DARK }]}>Total</Text>
          <TextInput
            value={total}
            placeholder='Exp: 1000'
            keyboardType='numeric'
            onChangeText={(text) => setTotal(text)}
            style={[styles.input, Typography.BODY]}
            placeholderTextColor={Colors.GRAY_MEDIUM} />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[Typography.TAGLINE, { color: Colors.GRAY_DARK }]}>Collected</Text>
          <TextInput
            value={collected}
            placeholder='Exp: 20'
            keyboardType='numeric'
            onChangeText={(text) => setCollected(text)}
            style={[styles.input, Typography.BODY]}
            placeholderTextColor={Colors.GRAY_MEDIUM} />
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footerContainer}>
        <Button
          title='Save'
          onPress={() => __save()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK
  },
  // Body
  bodyContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    color: Colors.WHITE,
    backgroundColor: Colors.LIGHT_BLACK
  },
  // Footer
  footerContainer: {
    padding: 20,
  },
});

export default AddMoneyBox;
