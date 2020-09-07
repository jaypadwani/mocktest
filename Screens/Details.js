import {View, Text, TextInput} from 'react-native';

import React, {Component, useState} from 'react';

export default class Details extends Component {
  render() {
    const data = this.props.route.params.data;
    console.log('new', data);

    return (
      <View>
        <Text style={{fontSize: 16, fontWeight: '700'}}>Name: {data.name}</Text>
        <Text style={{fontSize: 16, fontWeight: '700'}}>
          Potentially_hazardous_asteroid :{' '}
          {data.is_potentially_hazardous_asteroid.toString()}
        </Text>
        <Text style={{fontSize: 13, fontWeight: '700'}}>
          Nasa_jpl_url: {data.nasa_jpl_url}
        </Text>
      </View>
    );
  }
}
