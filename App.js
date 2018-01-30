/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Accelerometer } from 'react-native-sensors';

const URL = 'https://www.google.com';

export default class App extends React.PureComponent<
  {},
  { accelNum: number, response: string, gyroNum: 0 }
> {
  accel$ = new Accelerometer();

  state = {
    accelNum: 0,
    response: '',
  };

  componentWillMount() {
    this.accel$
      .map(({ x, y, z }) => {
        let accelNum = parseFloat(
          Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2)).toFixed(2)
        );
        this.setState({ accelNum });
        return accelNum;
      })
      .filter(z => z > 10)
      .subscribe(() =>
        fetch(URL).then(res => {
          this.setState({ response: 'calling home...' });
          setTimeout(() => this.setState({ response: '' }), 2000);
        })
      );
  }

  componentWillUnmount() {
    this.accel$.stop();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{this.state.accelNum}</Text>
        <Text style={[styles.welcome, styles.resRed]}>
          {this.state.response}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  resRed: {
    color: 'red',
  },
});
