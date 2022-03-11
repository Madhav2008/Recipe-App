import React ,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity, ScrollView} from 'react-native';
import{Card,Header,Icon} from 'react-native-elements';
import firebase from 'firebase';
import { RFValue } from "react-native-responsive-fontsize";
import db from '../config.js';

export default class RecipeDetailsScreen extends Component{
  constructor(props){
    super(props);
    this.state={
      viewerId: firebase.auth().currentUser.email,
      recipeName : this.props.navigation.getParam('details')['recipe_name'],
      recipe : this.props.navigation.getParam('details')['recipe'],
      userId : this.props.navigation.getParam('details')['user_id'],
      requestId:this.props.navigation.getParam('details')['request_id'],
      userName : '',
      emailId:'',
      firstName:'',
      lastName:'',
      contact:'',
    }
  }

  getUserDetails=(userId)=>{
    db.collection("users").where('username','==', userId).get()
    .then((snapshot)=>{
      snapshot.forEach((doc) => {
        console.log(doc.data().first_name);
        this.setState({
          userName  :doc.data().first_name + " " + doc.data().last_name
        })
      })
    })
  }

  componentDidMount(){
    this.getUserDetails(this.state.userId)
  }

  likedRecipes = (recipeName) => {
    var viewerId = this.state.viewerId;
    var requestId = this.state.requestId;
    db.collection('all_LikedRecipes').add({
      viewer_id: viewerId,
      recipe_name: recipeName,
      request_id: requestId,
      recipeStatus: 'liked',
    });
  };

  render(){
    return(
      <View style={styles.container}>
        <View style={{flex:0.1}}>
          <Header
            leftComponent ={<Icon name='arrow-left' type='feather' color='#ffff'  onPress={() => this.props.navigation.goBack()}/>}
            centerComponent={{ text:"Recipe", style: { color:'#ffff', fontSize:20,fontWeight:"bold", } }}
            backgroundColor = "#32867d"
          />
        </View>
        <View style={{flex:0.5,marginTop:RFValue(20)}}>
        <ScrollView>
          <Card
              title={"About Recipe"}
              titleStyle= {{fontSize : 20}}>
              
              <Text style={{fontWeight:'bold'}}>Recipe Name : {this.state.recipeName}</Text>

              <Text style={{fontWeight:'bold'}}></Text>
            
              <Text style={{fontWeight:'bold'}}>Recipe : {this.state.recipe}</Text>
          </Card>
          </ScrollView>
        </View>
        <View>
          {
            this.state.receiverId !== this.state.userId
            ?(
              <TouchableOpacity
                  style={styles.button}
                  onPress={()=>{
                    this.props.navigation.navigate('MyLikedRecipes');
                    this.likedRecipes(this.state.recipeName);
                  }}>
                <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}> Like </Text>
              </TouchableOpacity>
            )
            : null
          }

          <TouchableOpacity style={styles.button1}
            onPress={()=>{this.props.navigation.navigate('Recipe')}}>
            <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}> Unlike </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex:0.4,marginTop:RFValue(20)}}>
          <Card
              title={"About User"}
              titleStyle= {{fontSize : 20}}>
              
              <Text style={{fontWeight:'bold'}}>User Name : {this.state.userName}</Text>

              <Text style={{fontWeight:'bold'}}></Text>
            
              <Text style={{fontWeight:'bold'}}>User Id : {this.state.userId}</Text>
          </Card>
        </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  button:{
    width:"45%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    margin: 12,
    borderRadius:10,
    backgroundColor:"#32867d",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop:35
  },
  button1:{
    width:"45%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    margin: 12,
    borderRadius:10,
    backgroundColor:"#32867d",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop:-62,
    marginLeft: '50%'
  },
})