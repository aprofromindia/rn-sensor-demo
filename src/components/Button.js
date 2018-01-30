// @flow

import * as React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {};

export default function Button({  }: Props): React.Element<*> {
  return (
    <TouchableOpacity>
      <Text>Button</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
  },
});
