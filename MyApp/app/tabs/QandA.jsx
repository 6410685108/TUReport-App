import React, { useState, useEffect, useContext } from "react";
import { SettingContext } from "../system/setting";

import {
  View,
  Button,
  StyleSheet,
  Image,
  Text,
  ScrollView,
} from "react-native";
import { data } from "../system/data";
import { db } from "../system/db";
import { useNavigation } from "@react-navigation/native";

const QandA = () => {
  const { setting } = useContext(SettingContext);
  const { theme, language } = setting;
  const styles = theme === "light" ? lightstyles : darkstyles;
  const [questions, setQuestions] = useState(() => {
    if (language === "EN") {
      return [
        {
          question: "How many days does the operation take approximately?",
          answer:
            "We will escalate the issue to the party responsible for the resolution within 1-3 days, after which they will notify us of the time required for the resolution. We will update the status.",
        },
        // {
        //   question: "BBBBB",
        //   answer:
        //     "Aenean est quam, auctor vel rutrum ac, convallis eget ipsum. Nullam a venenatis purus, a dictum diam. Aliquam malesuada rutrum enim vitae maximus. In vitae mattis erat.",
        // },
        // {
        //   question: "BBBBB",
        //   answer:
        //     "Aenean est quam, auctor vel rutrum ac, convallis eget ipsum. Nullam a venenatis purus, a dictum diam. Aliquam malesuada rutrum enim vitae maximus. In vitae mattis erat.",
        // },
        // {
        //   question: "BBBBB",
        //   answer:
        //     "Aenean est quam, auctor vel rutrum ac, convallis eget ipsum. Nullam a venenatis purus, a dictum diam. Aliquam malesuada rutrum enim vitae maximus. In vitae mattis erat.",
        // },
        // {
        //   question: "เทสๆ",
        //   answer: "ตอบๆเว้ย",
        // },
        // Add more Q&A here
      ]
    }else{ 
      return[
        {question: "การดำเนินการใช้เวลากี่วันโดยประมาณ",
        answer:
          "เราจะเพิ่มความสำคัญให้กับปัญหาและส่งต่อไปยังฝ่ายที่รับผิดชอบในการแก้ไขภายใน 1-3 วัน หลังจากนั้นพวกเขาจะแจ้งให้เราทราบเกี่ยวกับเวลาที่ต้องใช้ในการแก้ไข และเราจะอัปเดตสถานะ",}
      ]
    }
  });
  const [sw, setSw] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    setReloadKey((prevKey) => prevKey + 1);
  }, [sw, navigation]);

  const handleSw = (bool) => {
    setSw(bool);
    setReloadKey((prevKey) => prevKey + 1);
  };

  const user = db.getCurrentUser();
  const navigation = useNavigation();

  const qa_iconImage =
    theme === "light"
      ? require("../picture/qa_icon.png")
      : require("../picture/qa_icon_w.png");
  const qaImage =
    theme === "light"
      ? require("../picture/qa.png")
      : require("../picture/qa_w.png");
      
  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <View style={styles.inNav}>
          <Image style={[styles.logo]} source={qa_iconImage} />
          <Text style={[styles.textHeader, { marginLeft: 5, fontSize: 25 }]}>
            {language === 'EN' ? "Q & A" : "ช่วยเหลือ"}
          </Text>
        </View>
      </View>

      <View style={styles.boxx}>
        <View style={styles.contactAdminContainer}>
          <Image style={styles.logo2} source={qaImage} />
          <View style={styles.contactAdminInfo}>
            <Text style={styles.contactAdminTitle}>{language === 'EN' ? "Contact Admin" : "ติดต่อ แอดมิน"}</Text>
            <Text style={styles.contactAdminText}>{language === 'EN' ? "Tel: 00000000" : "โทรศัพท์: 00000000"}</Text>
            <Text style={styles.contactAdminText}>{language === 'EN' ? "Line: BBBBBB" : "ไลน์: BBBBBB"}</Text>
          </View>
        </View>
      </View>

      <ScrollView style={[styles.center, { marginLeft: 0 }]}>
        {questions.map((item, index) => (
          <View key={index} style={styles.qa}>
            <Text style={styles.questionText}>Q: {item.question}</Text>
            <Text style={styles.answerText}>A: {item.answer}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
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
  textHeader: {
    color: "black",
  },
  text: {
    color: "black",
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0.5,
    marginLeft: "5%",
    marginRight: "5%",
  },
  questionText: {
    color: "black",
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.5,
    marginLeft: "5%",
    marginRight: "5%",
    fontWeight: "bold",
  },
  answerText: {
    color: "black",
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.5,
    marginLeft: "5%",
    marginRight: "5%",
  },
  center: {
    left: "auto",
    width: "80%",
    left: "10%",
    borderRadius: 20,
  },
  boxx: {
    justifyContent: "flex-start",
    alignItems: "center",
    height: "auto",
    padding: 10,
    marginTop: 20,
    margin: 0,
    color: "black",
    maxWidth: "80%",
    left: "10%",
    backgroundColor: "#ECECEC",
    borderRadius: 20,
    marginBottom: 15,
  },
  logo: {
    width: 50,
    height: 50,
    marginTop: 0,
    borderColor: "white",
  },
  logo2: {
    width: 100,
    height: 100,
    borderRadius: 30,
  },
  qa: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    borderRadius: 20,
  },
  contactAdminContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  contactAdminInfo: {
    marginLeft: 20,
  },
  contactAdminTitle: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  contactAdminText: {
    color: "black",
    fontSize: 16,
    marginTop: 5,
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
  textHeader: {
    color: "white",
  },
  text: {
    color: "black",
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0.5,
    marginLeft: "5%",
    marginRight: "5%",
  },
  questionText: {
    color: "white",
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.5,
    marginLeft: "5%",
    marginRight: "5%",
    fontWeight: "bold",
  },
  answerText: {
    color: "white",
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.5,
    marginLeft: "5%",
    marginRight: "5%",
  },
  center: {
    left: "auto",
    width: "80%",
    left: "10%",
    borderRadius: 20,
  },
  boxx: {
    justifyContent: "flex-start",
    alignItems: "center",
    height: "auto",
    padding: 10,
    marginTop: 20,
    margin: 0,
    color: "white",
    maxWidth: "80%",
    left: "10%",
    backgroundColor: "#606060",
    borderRadius: 20,
    marginBottom: 15,
  },
  logo: {
    width: 50,
    height: 50,
    marginTop: 0,
    borderColor: "white",
  },
  logo2: {
    width: 100,
    height: 100,
    borderRadius: 30,
  },
  qa: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 20,
  },
  contactAdminContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  contactAdminInfo: {
    marginLeft: 20,
  },
  contactAdminTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  contactAdminText: {
    color: "white",
    fontSize: 16,
    marginTop: 5,
  },
});

export default QandA;
