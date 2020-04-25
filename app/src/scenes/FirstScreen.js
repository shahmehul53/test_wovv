import React, {useState} from 'react';
import {
  Container,
  Content,
  Button,
  Text,
  Input,
  Item,
  List,
  ListItem,
} from 'native-base';
import Axios from 'axios';

var api_key = 'dWeIsA9Z1luB8B1Jqyo4DIaRQvEU1sFdGIvOGCnb';

const FirstScreen = ({navigation}) => {
  const [data1, setData1] = useState({id: '', validation: true});
  const [response, setResponse] = useState('');
  const [arrData, setArrData] = useState([]);
  let randomItem = [];

  const apiCall2 = () => {
    Axios.get(
      `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${api_key}`,
    ).then(res => {
      setArrData(res.data.near_earth_objects);
      var resultArray = res.data.near_earth_objects;

      for (let i = 0; i < resultArray[i].id.length - 1; i++) {
        arrData.push(resultArray[i].id);
      }

      //For Random Item
      randomItem = arrData[Math.floor(Math.random() * arrData.length)];
    });
  };

  const apiCall1 = () => {
    Axios.get(
      `https://api.nasa.gov/neo/rest/v1/neo/${data1.id}?api_key=${api_key}`,
    )
      .then(res => {
        if (res.status == 200) {
          setResponse(res.data);
          navigation.navigate('Second', {id: res.data.id});
        } else {
          alert('No ID Found');
        }
      })
      .catch(error => alert('No ID Found'));
  };

  return (
    <Container style={{flex: 1, backgroundColor: '#fff'}}>
      <Container style={{margin: 10}}>
        <Item padder>
          <Input
            placeholder="Enter Asteroid ID"
            style={{margin: 10}}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={id => setData1({id, validation: false})}
          />
        </Item>

        <Button
          padder
          disabled={data1.validation}
          style={{margin: 20, justifyContent: 'center', alignItems: 'center'}}
          onPress={() => apiCall1()}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>SUBMIT</Text>
        </Button>

        <Button
          padder
          style={{margin: 20, justifyContent: 'center', alignItems: 'center'}}
          onPress={() => apiCall2()}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>
            Random Asteroid
          </Text>
        </Button>

        <List
          dataArray={arrData}
          style={{backgroundColor: '#fff'}}
          renderRow={item => (
            <ListItem
              button
              selected
              style={{alignItems: 'center', justifyContent: 'center'}}
              onPress={() => navigation.navigate('Second', {id: item.id})}>
              <Text style={{padding: 10}}>{item.id}</Text>
            </ListItem>
          )}
        />
      </Container>
    </Container>
  );
};

export default FirstScreen;
