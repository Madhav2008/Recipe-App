import React, { Component } from 'react';
import {View,Text, KeyboardAvoidingView,TextInput,StyleSheet,ScrollView,TouchableOpacity,Alert} from 'react-native';
import MyHeader from '../components/MyHeader'
import db from '../config'
import firebase from 'firebase'

export default class SettingScreen extends Component{
  constructor(){
    super();
    this.state={
      emailId:'',
      firstName:'',
      lastName:'',
      contact:'',
      docId:''
    }
  }

 getData(){
  var user = firebase.auth().currentUser;
  var email= user.email

 db.collection('users').where('username','==',email).get()
  .then(snapshot => {
    snapshot.forEach(doc => {
       var data = doc.data()
       this.setState({
         emailId: data.username,
         firstName:data.first_name,
         lastName:data.last_name,
         contact:data.mobile_number,
         docId:doc.id
       })
    });
  })
}

 updateData(){

  db.collection('users').doc(this.state.docId)
    .update({
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      mobile_number:this.state.contact,
    })

    return Alert.alert(
      'Recipe Posted Successfully',        
    );
}

componentDidMount(){
  this.getData()
}

    render(){
        return(
              <View style={{flex:1, alignItems: 'center',justifyContent: 'center'}} >
                <MyHeader title="Settings" navigation ={this.props.navigation}/>
                <View style={{flex:1,width:'100%',alignItems: 'center'}}>
                <TextInput
                  style={styles.formTextInput}
                  placeholder ={"First Name"}
                  maxLength ={8}
                  onChangeText={(text)=>{
                    this.setState({
                      firstName: text
                    })
                  }}
                  value ={this.state.firstName}
                />
                <TextInput
                  style={styles.formTextInput}
                  placeholder ={"Last Name"}
                  maxLength ={8}
                  onChangeText={(text)=>{
                    this.setState({
                      lastName: text
                    })
                  }}
                    value ={this.state.lastName}
                />
                <TextInput
                  style={styles.formTextInput}
                  placeholder ={"Contact"}
                  maxLength ={10}
                  keyboardType={'numeric'}
                  onChangeText={(text)=>{
                    this.setState({
                      contact: text
                    })
                  }}
                    value ={this.state.contact}
                />
                <TextInput
                  style={styles.formTextInput}
                  placeholder ={"Email"}
                  keyboardType ={'email-address'}
                  onChangeText={(text)=>{
                    this.setState({
                      emailId: text
                    })
                  }}
                    value ={this.state.emailId}
                />
                <TouchableOpacity style={styles.button}
                  onPress={()=>{this.updateData()}}>
                  <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}> Save </Text>
                </TouchableOpacity>
                </View>
              </View>
        )
    }
}

const styles = StyleSheet.create({
    formTextInput:{
      width:"80%",
      height:45,
      alignSelf:'center',
      borderColor:'#32867d',
      borderRadius:10,
      borderWidth:1,
      marginTop:30,
      padding:10,
    },
    button:{
        width:"55%",
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
        marginTop:35
      },
}
)