import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity,Image } from 'react-native';
import { ListItem,Icon } from 'react-native-elements'
import MyHeader from '../components/MyHeader';
import db from '../config';
import firebase from "firebase";


export default class Recipes extends Component{
  constructor(){
    super()
    this.state = {
      userId: firebase.auth().currentUser.email,
      allRequests : []
    }
  this.requestRef= null
  }

  getAllRequests =()=>{
    this.requestRef = db.collection("recipes")
    .onSnapshot((snapshot)=>{
      var allRequests = []
      snapshot.forEach((doc) => {
          allRequests.push(doc.data())
      })
      this.setState({allRequests:allRequests})
    })
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    return (
      <ListItem
        key={i}
        title={item.recipe_name}
        titleStyle={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}
        leftElement={<Icon name="star" type="font-awesome" color ='#696969'/>}
        rightElement={
            <TouchableOpacity style={styles.button}
            onPress ={()=>{
               this.props.navigation.navigate("RecipeDetails",{"details": item})}}>
              <Text style={{color: '#ffff', fontSize: 18, fontWeight: 'bold'}}>View</Text>
            </TouchableOpacity>
          }
        bottomDivider
      />
    )
  }

  componentDidMount(){
    this.getAllRequests()
  }

  componentWillUnmount(){
    this.requestRef();
  }

  render(){
    return(
      <View style={{flex:1}}>
        <MyHeader title="Recipes" navigation ={this.props.navigation}/>
        <View style={{flex:1}}>
          {
            this.state.allRequests.length === 0
            ?(
              <View style={{flex:1, fontSize: 20, justifyContent:'center', alignItems:'center'}}>
                <Image source={require('../assets/Notification.png')}/>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop:20}}>No Recipes Found !!</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.allRequests}
                renderItem={this.renderItem}
              />
            )
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button:{
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: "#32867d",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     }
  }
})