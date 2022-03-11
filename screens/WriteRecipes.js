import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'

export default class WriteRecipe extends Component{
  constructor(){
    super();
    this.state ={
      userId : firebase.auth().currentUser.email,
      recipeName: "",
      recipe: ""
    }
  }

  createUniqueId(){
    return Math.random().toString(36).substring(7);
  }

  addRequest =(recipeName,recipe)=>{
    var userId = this.state.userId
    var randomRequestId = this.createUniqueId()
    db.collection('recipes').add({
        "user_id": userId,
        "recipe_name": recipeName,
        "recipe": recipe,
        "request_id" : randomRequestId,
    })

    this.setState({
        recipeName :'',
        recipe : ''
    })

    
    return  Alert.alert(
             'Recipe Posted Successfully',
             '',
             [
               {text: 'OK', onPress: () => this.props.navigation.navigate('Recipes')},
             ]
         );
  }

  render(){
    return(
        <View style={{flex:1}}>
          <MyHeader title="Write Recipes" navigation ={this.props.navigation}/>
            <KeyboardAvoidingView style={styles.keyBoardStyle}>
              <TextInput
                style ={styles.formTextInput}
                placeholder={"Enter Recipe Name"}
                onChangeText={(text)=>{
                    this.setState({
                      recipeName:text
                    })
                }}
                value={this.state.recipeName}
              />
              <TextInput
                style ={[styles.formTextInput,{height:300}]}
                multiline
                numberOfLines ={8}
                placeholder={"Write The Recipe Here"}
                onChangeText ={(text)=>{
                  this.setState({
                    recipe: text
                  })
                }}
                value ={this.state.recipe}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={()=>{this.addRequest(this.state.recipeName,this.state.recipe)}}
                >
                <Text style={{fontWeight: 'bold',color:'white', fontSize:20}}>Post Recipe</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  keyBoardStyle : {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#32867d',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10,
  },
  button:{
    width:"75%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
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
    marginTop:20
    },
  }
)