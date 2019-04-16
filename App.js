import { AuthSession, Constants } from 'expo';
import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableHighlight,
  Image,
  Alert,
  FlatList,
  ScrollView,
} from 'react-native';
import jwtDecoder from 'jwt-decode';

import gql from 'graphql-tag';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { Query } from "react-apollo";

// You can import from local files
import UMlogo from './components/UmLogo';
import LogBox from './components/LogBox';
import AssetExample from './components/AssetExample';

import { Card } from 'react-native-paper';

/*
  You need to swap out the Auth0 client id and domain with
  the one from your Auth0 client.
  In your Auth0 clent, you need to also add a url to your authorized redirect urls.
  For this application, we added https://auth.expo.io/@8base/react-native-example because
  our account on Expo is "8base" and the slug for this app is "react-native-example".
  You can open this app in the Expo client and check your logs for "Redirect URL (add this to Auth0)"
  to see what URL to add if the above is confusing.
*/
const auth0ClientId = 'qGHZVu5CxY5klivm28OPLjopvsYp0baD';
const auth0Domain = 'https://8base.auth0.com';



export class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userID: null };
  }

  onChangeUserID = userID => {
    this.setState({ userID });
  };

  onLogin = async () => {
    const { userID } = this.state;

    let err = null;

    try {
      const res = await this.props.login({
        variables: {
          data: { userID },
        },
      });

      await this.props.auth.setAuthState({
        token: res.data.userLogin.auth.idToken,
        userID,
      });
    } catch (e) {
      console.log(e);
      err = e;
    }

    if (!err) {
      Keyboard.dismiss();

      this.reset();
    }
  };

  reset = () => {
    this.setState({ title: null });
  };

  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    return (
      <View style={styleis.container}>
        <UMlogo />
        <TouchableWithoutFeedback
          style={styleis.container}
          onPress={Keyboard.dismiss}>
          <View style={styleis.card}>
            <LogBox />
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                placeholder="ex. C11998922"
                keyboardType="email-address"
                underlineColorAndroid="transparent"
                onChangeText={this.onChangeEmail}
                value={this.state.email}
              />
            </View>
            <TouchableHighlight
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={() => this.props.navigation.navigate('Student')}>
              <Text style={styles.loginText}>Begin Check-Out</Text>
            </TouchableHighlight>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styleis = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',

    backgroundColor: '#565e65',
    padding: 20,
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a2ad00',
    borderRadius: 15,
    shadowRadius: 11,
    flex: 1,
    fontFamily: 'Georgia',
    marginBottom: 50,
  },
});

const styles = StyleSheet.create({
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 300,
    height: 50,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Georgia',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
    fontFamily: 'Georgia',
  },
  buttonContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    fontFamily: 'Georgia',
    alignSelf: 'center',
  },
  loginButton: {
    backgroundColor: '#a2ad70',
    fontFamily: 'Georgia',
    shadowRadius: 2,
  },
  loginText: {
    color: 'white',
    fontFamily: 'Georgia',
  },
});

export class StudentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pointA: 4 };
    let A = 4;
    const B = 3;
  }

  render() {
    this.props.pointA;
    return (
      <View style={stylesS.container}>
        <View style={stylesS.profile}>
          <AssetExample />
          <View style={stylesS.head}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={2}
              style={stylesS.namebar}>
              Athlete Profile {'\n'}
              {'\n'}
            </Text>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={stylesS.namebar}>
              Name: Joanna Smith {'\n'}
            </Text>
            <Text
              adjustsFontSizeToFit
              numberOfLines={2}
              style={stylesS.namebar}>
              Sport: Rowing {'\n'}
              {'\n'}
            </Text>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={stylesS.namebar}>
              Points Avaiable: {'\n'}
            </Text>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={stylesS.namebar}>
              {this.props.pointA} points{'\n'}
            </Text>
          </View>
        </View>
        <View style={stylesS.choices}>
          <Text adjustsFontSizeToFit numberOfLines={1} style={stylesS.pointBar}>
            Choose snack category {'\n'}
            {'\n'}
          </Text>
        </View>
        <View style={{ flex: 0, flexDirection: 'row' }}>
          <TouchableHighlight
            style={[styles.pointBar, stylesS.points]}
            onPress={() => this.props.navigation.navigate('Snack')}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={stylesS.pointBar}>
              Produce
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[stylesS.pointBar, stylesS.points]}
            onPress={() => this.props.navigation.navigate('Snack')}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={stylesS.pointBar}>
              Breads
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[stylesS.pointBar, stylesS.points]}
            onPress={() => this.props.navigation.navigate('Snack')}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={2}
              style={stylesS.pointBar}>
              Salty Snacks
            </Text>
          </TouchableHighlight>
        </View>
        <View style={{ flex: 0, flexDirection: 'row' }}>
          <TouchableHighlight
            style={[stylesS.pointBar, stylesS.points]}
            onPress={() => this.props.navigation.navigate('Snack')}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={stylesS.pointBar}>
              Dairy
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[stylesS.pointBar, stylesS.points]}
            onPress={() => this.props.navigation.navigate('Snack')}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={stylesS.pointBar}>
              Juice
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[stylesS.pointBar, stylesS.points]}
            onPress={() => this.props.navigation.navigate('Snack')}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={2}
              style={stylesS.pointBar}>
              Whole Protein
            </Text>
          </TouchableHighlight>
        </View>
        <View style={{ flex: 0, flexDirection: 'row' }}>
          <TouchableHighlight
            style={[stylesS.pointBar, stylesS.points]}
            onPress={() => this.props.navigation.navigate('Snack')}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={stylesS.pointBar}>
              Bars
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[stylesS.pointBar, stylesS.points]}
            onPress={() => this.props.navigation.navigate('Snack')}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={2}
              style={stylesS.pointBar}>
              Create-Your Own
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.pointBar, stylesS.points]}
            onPress={() => this.props.navigation.navigate('Snack')}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={stylesS.pointBar}>
              Miscellaneous
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const stylesS = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#565e65',
    padding: 30,
  },
  profile: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 15,
  },
  choices: {
    flex: 0,
    flexDirection: 'row',
    alignSelf: 'bottom',
    marginBottom: 15,
    marginTop: 10,
  },
  head: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a2ad00',
    borderRadius: 15,
    shadowRadius: 11,
    flex: 0,
    flexDirection: 'column',
    marginBottom: 10,
    alignSelf: 'top',
    paddingTop: 10,
    paddingBottom: 10,
  },
  namebar: {
    fontFamily: 'Georgia',
    color: 'orange',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textShadowColor: '#000',
    margin: 5,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  points: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#a2ad00',
    borderRadius: 15,
    shadowRadius: 11,
    textAlign: 'center',
    fontSize: 25,
    alignSelf: 'center',
    padding: 10,
  },
  pointBar: {
    fontFamily: 'Georgia',
    color: '#FBDE81',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textShadowColor: '#000',
    margin: 5,
    textAlign: 'center',
    //height: 70,
    fontSize: 40,
  },
});

export class SnackPage extends React.Component {
  render() {
    return (
      <ScrollView style={stylesSnack.container}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={stylesSnack.head}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={stylesSnack.namebar}>
              Product Name
            </Text>
          </View>
          <View style={stylesSnack.points}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={stylesSnack.pointBar}>
              Points
            </Text>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <TouchableHighlight
            style={stylesSnack.first}
            onPress={() => this.props.navigation.navigate('Summary')}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={stylesSnack.second}>
              Name of the Product
            </Text>
          </TouchableHighlight>
          <View style={stylesSnack.third}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={stylesSnack.fourth}>
              1
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const stylesSnack = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#565e65',
    padding: 20,
  },

  head: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a2ad00',
    borderRadius: 15,
    shadowRadius: 11,
    flex: 1,
    flexDirection: 'row',
    height: 50,
    marginBottom: 50,
    alignSelf: 'top',
  },
  namebar: {
    fontFamily: 'Georgia',
    color: '#FBDE81',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textShadowColor: '#000',
    margin: 5,
    marginBottom: 5,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  points: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a2ad00',
    borderRadius: 15,
    shadowRadius: 11,
    flexDirection: 'row',
    height: 50,
    marginBottom: 50,
    marginLeft: 20,
    fontSize: 25,
    alignSelf: 'top',
    width: 80,
  },
  pointBar: {
    fontFamily: 'Georgia',
    color: '#FBDE81',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textShadowColor: '#000',
    margin: 5,
    marginBottom: 5,
    fontSize: 100,
  },
  first: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a2ad00',
    borderRadius: 15,
    shadowRadius: 11,
    flex: 1,
    flexDirection: 'row',
    height: 50,
    marginBottom: 50,
    alignSelf: 'top',
  },
  second: {
    fontFamily: 'Georgia',
    color: '#FBDE81',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textShadowColor: '#000',
    margin: 5,
    marginBottom: 5,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  third: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a2ad00',
    borderRadius: 45,
    shadowRadius: 11,
    flexDirection: 'row',
    height: 50,
    marginBottom: 50,
    marginLeft: 20,
    fontSize: 25,
    alignSelf: 'top',
    width: 50,
  },
  fourth: {
    fontFamily: 'Georgia',
    color: '#FBDE81',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textShadowColor: '#000',
    margin: 5,
    marginBottom: 5,
    fontSize: 100,
  },
});

export class SummaryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userID: null };
  }
  render() {
    return (
      <View style={styleSum.container}>
        <View style={styleSum.choices}>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={styleSum.pointBar}>
            Currently in order: {'\n'}
            {'\n'}
          </Text>
        </View>
        <View style={styleSum.product_tag}>
          <View style={styleSum.head}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={styleSum.product_box}>
              Product name tag{' '}
            </Text>
          </View>
          <View style={styleSum.head}>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('Delete')}>
              <Text style={styleSum.product_remove}>(-)</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styleSum.product_tag}>
          <View>
            <Text
              adjustsFontSizeToFit
              numberOfLines={2}
              style={styleSum.product_sum}>
              Points used: {'\n'} 1
            </Text>
          </View>
          <View>
            <Text
              style={styleSum.product_sum}
              adjustsFontSizeToFit
              numberOfLines={2}>
              Points remaining: {'\n'} 3
            </Text>
          </View>
        </View>
        <View style={styleSum.navig_tag}>
          <View style={styleSum.navig_box}>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('Student')}>
              <Text style={styleSum.product_navig}>Add more items</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styleSum.navig_tag}>
          <View style={styleSum.navig_box}>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('Final')}>
              <Text style={styleSum.product_navig}>Finish Check-out</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

const styleSum = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#565e65',
    padding: 20,
  },
  choices: {
    flex: 1,
    alignSelf: 'center',
    marginBottom: 15,
    marginTop: 30,
  },
  head: {
    flexDirection: 'maxWidth',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    shadowRadius: 11,
    margin: 10,
    alignSelf: 'top',
    padding: 20,
  },
  product_tag: {
    flex: 2,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    margin: 20,
  },
  product_box: {
    fontFamily: 'Georgia',
    color: 'black',
    textShadowRadius: 1,
    textShadowColor: '#000',
    margin: 5,
    fontSize: 30,
    textAlign: 'center',
  },
  product_remove: {
    width: 40,
    fontFamily: 'Georgia',
    color: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowColor: '#000',
    margin: 5,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  navig_tag: {
    flex: 2,
    flexDirection: 'maxWidth',
    paddingTop: 10,
  },
  navig_box: {
    flexDirection: 'maxWidth',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#9EAB00',
    borderRadius: 15,
    shadowRadius: 11,
    margin: 10,
    alignSelf: 'top',
    padding: 20,
  },
  product_navig: {
    fontFamily: 'Georgia',
    color: '#FBDE81',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textShadowColor: '#000',
    margin: 5,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pointBar: {
    fontFamily: 'Georgia',
    color: '#FBDE81',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textShadowColor: '#000',
    margin: 5,
    fontSize: 40,
  },
  product_sum: {
    textAlign: 'center',
    fontFamily: 'Georgia',
    alignContent: 'center',
    color: '#FBDE81',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textShadowColor: '#000',
    margin: 5,
    fontSize: 25,
  },
});

export class FinPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userID: null };
  }
  render() {
    return (
      <ScrollView
        style={styleFin.container}
        onPress={() => this.props.navigation.navigate('Home')}>
        <View style={styleFin.choices}>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={styleFin.pointBar}>
            THANK YOU! {'\n'}
            {'\n'}
          </Text>
        </View>
        <View style={styleFin.product_tag}>
          <View style={styleFin.head}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={5}
              style={styleFin.product_box}>
              Summary:{'\n'} Student Name {'\n'} item(s): {'\n'} Product Name{' '}
              {'\n'} Product Name
            </Text>
          </View>
        </View>
        <View style={styleFin.point_tag}>
          <View style={styleFin.point_box_sum}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={2}
              style={styleFin.product_sum}>
              Points used: {'\n'} 1
            </Text>
          </View>
          <View style={styleFin.point_box_sum}>
            <Text
              style={styleFin.product_sum}
              adjustsFontSizeToFit
              numberOfLines={2}>
              Points remaining: {'\n'} 3
            </Text>
          </View>
        </View>
        <View style={styleFin.go_home_tag}>
          <TouchableHighlight
            style={styleFin.first}
            onPress={() => this.props.navigation.navigate('Home')}>
            <Text
              adjustsFontSizeToFit
              style={styleFin.go_home}>
              Return Home
            </Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }
}

const styleFin = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#565e65',
    padding: 20,
  },
  choices: {
    flex: 1,
    alignSelf: 'center',
    marginBottom: 15,
    marginTop: 30,
  },
  head: {
    flex: 4,
    flexDirection: 'maxWidth',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#61676E',
    borderRadius: 15,
    shadowRadius: 11,
    margin: 10,
    alignSelf: 'top',
    padding: 10,
  },
  product_tag: {
    flex: 2,
    flexDirection: 'row',
    margin: 10,
  },
  product_box: {
    fontFamily: 'Georgia',
    color: '#FBDE81',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textShadowColor: '#000',
    margin: 5,
    fontSize: 30,
    textAlign: 'center',
  },
  point_tag: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#61676E',
    borderRadius: 15,
    shadowRadius: 11,
    margin: 10,
    alignSelf: 'center',
  },
  point_box_sum: {
    flex: 6,
    flexDirection: 'maxWidth',
  },
  pointBar: {
    fontFamily: 'Georgia',
    color: '#A0AB00',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textShadowColor: '#000',
    margin: 5,
    fontSize: 40,
  },
  product_sum: {
    textAlign: 'center',
    fontFamily: 'Georgia',
    alignContent: 'center',
    color: '#FBDE81',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textShadowColor: '#000',
    margin: 5,
    padding: 10,
    fontSize: 25,
  },
    go_home_tag: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 15,
    shadowRadius: 11,
    margin: 10,
    alignSelf: 'center',
  },
  go_home: {
    fontFamily: 'Georgia',
    color: '#FBDE81',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textShadowColor: '#000',
    margin: 5,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  first: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a2ad00',
    fontFamily: 'Georgia',
    color: '#FBDE81',
    borderRadius: 15,
    shadowRadius: 11,
    flex: 0,
    flexDirection: 'maxWidth',
    padding: 10,
    marginTop: 25,
  },
});

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomePage,
    },
    Snack: {
      screen: SnackPage,
    },
    Student: {
      screen: StudentPage,
    },
    Summary: {
      screen: SummaryPage,
    },
    Final: {
      screen: FinPage,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
