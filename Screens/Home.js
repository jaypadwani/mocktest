import {View, TextInput, TouchableOpacity, Text, FlatList} from 'react-native';

import React, {Component, useState} from 'react';
import Navigation from './Navigation';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFlatlist: false,
      input: '',
      dataSource: [],
      dataSource_org: [],
      color: true,
    };
  }

  randomFunction = () => {
    this.setState({
      showFlatlist: !this.state.showFlatlist,
      //Activityloader: true,
    });

    return fetch(
      'https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=mCxFazLQuRjcKM5zXwaasYtdse5jb8OExCgrMBt5',
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          loading: true,
          Activityloader: false,
          dataSource: responseJson.near_earth_objects,
        });
        // console.log('fetch  data ', this.state.dataSource);
      })
      .catch(error => console.log(error)); //to catch the errors if any
  };

  searching = () => {
    const {input} = this.state;
    // alert(input);
    console.log(input);

    return fetch(
      `https://api.nasa.gov/neo/rest/v1/neo/${input}?api_key=mCxFazLQuRjcKM5zXwaasYtdse5jb8OExCgrMBt5`,
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          loading: true,

          dataSource_org: responseJson,
        });
        console.log('source', this.state.dataSource_org);
        this.props.navigation.navigate('Details', {
          data: this.state.dataSource_org,
        });
      })
      .catch(error => console.log(error)); //to catch the errors if any
  };

  getId(id) {
    return fetch(
      `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=fI2eNwr318OqhcJm0Avfn5TszH8zjRFkxvB2kgih`,
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          loading: true,
          dataSource_org: responseJson,
        });

        this.props.navigation.navigate('Details', {
          data: this.state.dataSource_org,
        });
      })
      .catch(error => console.log(error)); //to catch the errors if any
  }

  renderItem(data) {
    console.log('data', data);
    return (
      <TouchableOpacity
        onPress={() => this.getId(data.item.id)}
        style={{
          borderWidth: 1,
          borderColor: 'white',
          alignSelf: 'center',
          margin: 15,
        }}>
        <Text>{data.item.id}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'lightgrey'}}>
        <TextInput
          onChangeText={input => this.setState({input})}
          placeholder="Enter Asteroid ID"
          style={{
            borderColor: 'black',
            borderWidth: 1,
            marginTop: 10,
            alignSelf: 'center',
          }}
        />

        <TouchableOpacity
          disabled={this.state.input.length > 0 ? false : true}
          onPress={() => this.searching()}
          style={{
            backgroundColor:
              this.state.input.length > 0 ? 'orange' : 'lightgrey',
            borderColor: 'black',
            borderWidth: 1,
            marginTop: 10,
            alignSelf: 'center',

            padding: 15,
            borderRadius: 10,
          }}>
          <Text style={{color: 'black', alignSelf: 'center'}}>Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.randomFunction()}
          style={{
            borderColor: 'black',
            borderWidth: 1,
            marginTop: 10,
            alignSelf: 'center',
            backgroundColor: 'orange',
            padding: 15,
            borderRadius: 10,
          }}>
          <Text>Random ID</Text>
        </TouchableOpacity>

        {this.state.showFlatlist && (
          <FlatList
            data={this.state.dataSource}
            renderItem={item => this.renderItem(item)}
            keyExtractor={item => item.id}
          />
        )}
      </View>
    );
  }
}
