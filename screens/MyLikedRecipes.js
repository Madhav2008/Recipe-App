import React ,{Component} from 'react'
import {View, Text,TouchableOpacity,ScrollView,FlatList,StyleSheet,Image} from 'react-native';
import {Card,Icon,ListItem} from 'react-native-elements'
import MyHeader from '../components/MyHeader.js'
import firebase from 'firebase';
import db from '../config.js'

export default class MyLikedRecipes extends Component {
  static navigationOptions = { header: null };

   constructor(){
     super()
     this.state = {
       userId : firebase.auth().currentUser.email,
       allLikedRecipes : []
     }
     this.requestRef= null
   }

   getAllLikedRecipes =()=>{
     this.requestRef = db.collection("all_LikedRecipes").where("viewer_id" ,'==', this.state.userId)
     .onSnapshot((snapshot)=>{
       var allLikedRecipes = snapshot.docs.map(document => document.data());
       this.setState({
         allLikedRecipes : allLikedRecipes,
       });
     })
   }

   keyExtractor = (item, index) => index.toString()

   renderItem = ( {item, i} ) =>(
     <ListItem
       key={i}
       title={item.recipe_name}
       leftElement={<Icon name="heart" type="font-awesome" color ='#696969'/>}
       titleStyle={{ color: 'black', fontWeight: 'bold' }}
       rightElement={
           <TouchableOpacity style={styles.button} onPress={()=>{
             this.props.navigation.navigate('RecipeDetails');
           }}>
          
              <Text style={{color: '#ffff', fontSize: 18, fontWeight: 'bold'}}>View</Text>
            </TouchableOpacity> 
         }
       bottomDivider
     />
   )

   componentDidMount(){
     this.getAllLikedRecipes()
   }

   componentWillUnmount(){
     this.requestRef();
   }

   render(){
     return(
       <View style={{flex:1}}>
         <MyHeader navigation={this.props.navigation} title="My Liked Recipes"/>
         <View style={{flex:1}}>
           {
             this.state.allLikedRecipes.length === 0
             ?(
               <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Image source={require('../assets/Notification.png')}/>
                <Text style={{fontSize:25, fontWeight:'bold',marginTop:15}}>No Liked Recipes Found !!</Text>
              </View>
             )
             :(
               <FlatList
                 keyExtractor={this.keyExtractor}
                 data={this.state.allLikedRecipes}
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