import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";

const Finish = () => {
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
    // Add more Q&A here
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={require("../picture/qa_icon.png")} />
        <Text style={styles.headerText}>Q&A</Text>
      </View>

      <ScrollView style={styles.content}>
        {questions.map((item, index) => (
          <View key={index} style={styles.questionContainer}>
            <Text style={styles.question}>{item.question}</Text>
            <Text style={styles.answer}>{item.answer}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    paddingVertical: 15,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginHorizontal: 5,
    marginTop: 5,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  questionContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  answer: {
    fontSize: 16,
  },
  logo: {
    width: 40,
    height: 40,
  },
});

export default Finish;
