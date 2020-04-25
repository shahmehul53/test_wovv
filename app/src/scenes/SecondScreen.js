import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Content, Body, Text, Card} from 'native-base';
import Axios from 'axios';

var api_key = 'dWeIsA9Z1luB8B1Jqyo4DIaRQvEU1sFdGIvOGCnb';

const SecondScreen = ({route, navigation}) => {
  const {id} = route.params;
  console.log('ID', id);
  const [data, setData] = useState('');

  const apiCall = () => {
    Axios.get(
      `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${api_key}`,
    ).then(res => {
      setData(res.data);
    });
  };

  useEffect(() => {
    apiCall();
  }, []);

  return (
    <Container style={{flex: 1, margin: 10}}>
      <Content>
        <Card>
          <Body>
            <Text style={styles.title}>name : {data.name}</Text>
            <Text style={styles.title}>nasa_jpl_url : {data.nasa_jpl_url}</Text>
            <Text style={styles.title}>
              is_potentially_hazardous_asteroid :{' '}
              {data.is_potentially_hazardous_asteroid ? 'true' : 'false'}
            </Text>
          </Body>
        </Card>
      </Content>
    </Container>
  );
};

export default SecondScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 10,
    textAlign: 'center',
  },
});
