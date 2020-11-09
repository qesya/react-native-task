import React, { useState, useRef, useEffect } from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, Alert, TouchableHighlight, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loading from 'react-native-whc-loading'
console.disableYellowBox = true;

//constant
import * as theme from '../constants/Theme'

//import services
import ApiServices from '../services/ApiServices';

export default function Home({ navigation }) {

    const loading_stt = useRef(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPostsData()
    }, [])

    //get post data
    const [dataPosts, setDataPosts] = useState([]);
    const getPostsData = () => {
        loading_stt.current.show()
        ApiServices.get('posts.json')
            .then((response) => {
            let res = response.data;
            setDataPosts(res);
        }).catch ((error) => {
            console.log(error)
        }).finally(() => {
            loading_stt.current.show(false)
            setLoading(false)
        })
    }


    return (
        <SafeAreaView style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <Loading ref={loading_stt} />

            <Text style={styles.txtHeader}>All Post</Text>
            <ScrollView>
                {
                    (!loading) ?
                    (dataPosts.length > 0) ?
                        dataPosts.map((post, index) => (
                            <TouchableHighlight style={styles.box} key={index.toString()} underlayColor="#0000000D" onPress={() => navigation.navigate('Detail', { id: post.id })}>
                                <View>
                                    <Text style={styles.txtTitle}>{post.title}</Text>
                                </View>
                            </TouchableHighlight>
                        ))
                        : <Text>Data is Empty</Text>
                      : null
                }
            </ScrollView>

        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    box: {
        paddingVertical: 16,
        paddingHorizontal: 12,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 8,
        backgroundColor: theme.colors.gray,
    },
    txtTitle: {
        lineHeight: 16 * 1.4,
        fontFamily: theme.fonts.lato,
        fontSize: 16,
    },
    txtHeader: {
        fontFamily: theme.fonts.latoBold,
        fontSize: 34,
        marginTop: 30,
        marginBottom: 24,
        marginHorizontal: 16,
        color: theme.colors.black
    }
});
