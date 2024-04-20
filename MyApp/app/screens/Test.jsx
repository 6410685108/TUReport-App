import React, { useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { db } from "../system/db";

const Test = () => {

    const btnHandler = () => {
        // db.collectPost("testTitle", "testContent", "testAuthor"); done
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await db.getAllPosts();
                const testData = data[0];
                console.log(testData);
            } catch (error) {
                console.error('Error fetching posts: ', error);
            }
        };
    
        fetchData(); // Call the fetchData function here
    
        // Clean up function (if needed)
        return () => {
            // Any cleanup logic
        };
    }, []);

   
    return (
        <View style={styles.container}>
            <Text>Test</Text>
            <Button title="Test func" onPress={btnHandler} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default Test;
