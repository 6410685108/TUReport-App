import React, { useState , useEffect , useContext} from 'react'
import { SettingContext } from '../system/setting';

import { View, Button ,StyleSheet, Image, Text, ScrollView,} from 'react-native';
import { data } from '../system/fetchData';
import { db } from '../system/db';
import { useNavigation } from '@react-navigation/native';

const QandA = () => {
  const { setting } = useContext(SettingContext);
  const { theme, language } = setting;
  const styles = theme === 'light' ? lightstyles : darkstyles;
  const [questions, setQuestions] = useState([
    {
      question: "LoremxD",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla viverra, mi nec elementum tincidunt, est ex efficitur ligula, id pretium nisi dui quis quam. Cras felis urna, tempus id pulvinar sit amet, dignissim sed nisl. Aenean eu ornare mauris. Nunc velit lorem, molestie at lacus non, blandit porttitor mauris. Donec facilisis risus eros, eu sagittis justo porttitor ac. Phasellus mauris ex, iaculis vel elementum vitae, rhoncus vitae erat. Morbi maximus diam at malesuada vestibulum. Fusce a ultricies magna. Vestibulum consequat id diam quis vestibulum.",
    },
    {
      question: "BBBBB",
      answer:
        "Aenean est quam, auctor vel rutrum ac, convallis eget ipsum. Nullam a venenatis purus, a dictum diam. Aliquam malesuada rutrum enim vitae maximus. In vitae mattis erat.",
    },
    {
      question: "BBBBB",
      answer:
        "Aenean est quam, auctor vel rutrum ac, convallis eget ipsum. Nullam a venenatis purus, a dictum diam. Aliquam malesuada rutrum enim vitae maximus. In vitae mattis erat.",
    },
    {
      question: "BBBBB",
      answer:
        "Aenean est quam, auctor vel rutrum ac, convallis eget ipsum. Nullam a venenatis purus, a dictum diam. Aliquam malesuada rutrum enim vitae maximus. In vitae mattis erat.",
    },
    // Add more Q&A here
  ]);
  const [sw , setSw] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    setReloadKey(prevKey => prevKey + 1);
  }, [sw , navigation]);

  const handleSw = (bool) => {
    setSw(bool);
    setReloadKey(prevKey => prevKey + 1);
  }

  const user = db.getCurrentUser();
  const navigation = useNavigation();
             
  const qa_iconImage = theme === 'light' ? require('../picture/qa_icon.png') : require('../picture/qa_icon_w.png');
  const qaImage = theme === 'light' ? require('../picture/qa.png') : require('../picture/qa_w.png');
  
  if (language == "EN") {
    return (
      <View style={styles.container}>
        <View style={styles.nav}>
          <View style={styles.inNav}>
            <Image style={[styles.logo]} source={qa_iconImage} />
            <Text style={[styles.text,{marginLeft: 5, fontSize: 25,}]}>Q & A</Text>
          </View>
        </View>
        
        <View style={styles.containerContent} >
          <View style={styles.boxx}>
            <View style={styles.nav2}>
              <Image style={styles.logo2} source={ qaImage }/>
              <View style={{left: '20%'}}>
                <Text style={[styles.text]}>Contact Admin</Text>
                <Text style={[styles.text]}>Tel: 00000000</Text>
                <Text style={[styles.text]}>Line: BBBBBB</Text>
              </View>
            </View>
          </View>
        </View>
        <ScrollView style={[styles.center,{marginLeft:0}]}>
          {questions.map((item, index) => (
            <View key={index} style={styles.qa}>
              <Text style={styles.text2}>Q:{item.question}</Text>
              <Text style={styles.text2}>A:{item.answer}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
  else{
    return (
      <View style={styles.test}>
        <Text>Profile</Text>
        <Button title="Sign Out" onPress={() => data.logout()} />
      </View>
    );
  }
};


const lightstyles = StyleSheet.create({
    containerContent: {
      marginBottom: 10,
    },
    container: {
      backgroundColor: "#FFF",
      height: "100%",
    },
    nav: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "10%",
    },
    nav2: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 0,
      left: "-60%",
    },
    inNav: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      marginHorizontal: 5,
      marginTop: 5,
    },
    text:{
      color: 'black',
      fontSize: 16,
    },
    text2:{
      color: 'black',
      fontSize: 16,
      marginLeft:'5%',
      marginRight:'5%',
    },
    center: {
      left: "auto",
      width: "80%",
      left: "10%" ,
      borderRadius: 20,
    },
    boxx: {
      justifyContent: "flex-start",
      alignItems: "center",
      height: 'auto',
      padding: 10,
      marginTop: 20,
      margin: 0,
      color: 'white',
      maxWidth: "80%",
      left: "10%" ,
      backgroundColor: "#ECECEC",
      borderRadius: 20,
    },
    logo: {
      width: 40,
      height: 40,
      marginTop: 0,
      borderColor: 'white',
    },
    logo2: {
      width: 100,
      height: 100,
      borderRadius: 30,
    },
    qa: {
      marginBottom: 20,
      borderWidth: 1,
      borderColor: "#ddd",
      padding: 10,
      borderRadius: 20,
    },
  });

const darkstyles = StyleSheet.create({
  containerContent: {
    marginBottom: 10,
  },
  container: {
    backgroundColor: "#1c1c1c",
    height: "100%",
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10%",
  },
  nav2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 0,
    left: "-60%",
  },
  inNav: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: 5,
    marginTop: 5,
  },
  text:{
    color: 'white',
    fontSize: 16,
  },
  text2:{
    color: 'white',
    fontSize: 16,
    marginLeft:'5%',
    marginRight:'5%',
  },
  center: {
    left: "auto",
    width: "80%",
    left: "10%" ,
    borderRadius: 20,
  },
  boxx: {
    justifyContent: "flex-start",
    alignItems: "center",
    height: 'auto',
    padding: 10,
    marginTop: 20,
    margin: 0,
    color: 'white',
    maxWidth: "80%",
    left: "10%" ,
    backgroundColor: "#606060",
    borderRadius: 20,
  },
  logo: {
    width: 40,
    height: 40,
    marginTop: 0,
    borderColor: 'white',
  },
  logo2: {
    width: 100,
    height: 100,
    borderRadius: 30,
  },
  qa: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 20,
  },
});

export default QandA;
