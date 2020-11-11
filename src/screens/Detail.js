import React, { useState, useRef, useEffect } from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, Alert, TouchableHighlight, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { filter } from "lodash";
import Loading from 'react-native-whc-loading'
console.disableYellowBox = true;
//constant
import * as theme from '../constants/Theme'
import Icon from 'react-native-vector-icons/AntDesign';

//import services
import ApiServices from '../services/ApiServices';

export default function Detail({ navigation, route }) {

    //id route
    const { id } = route.params;

    const loading_stt = useRef(null);

    useEffect(() => {
        getData()
    }, [])

    //get detail data
    const [detail, setDetail] = useState([]);
    const [author, setAuthor] = useState([]);
    const [comments, setComments] = useState([]);

    const getData = () => {
        loading_stt.current.show()
        ApiServices.get('posts.json')
            .then((response) => {
                let res = response.data;
                let post = filter(res, data => data.id === id);
                setDetail(post)
                getAuthor(post[0].userId)
                getComment(post[0].id)
            }).catch((error) => {
                console.log(error)
            }).finally(() => {
                loading_stt.current.show(false)
            })
    }

    //get author
    const getAuthor = (userId) => {
        ApiServices.get('users.json')
            .then((response) => {
                let res = response.data;
                let author = filter(res, data => data.id === userId)
                setAuthor(author);
            }).catch((error) => {
                console.log(error)
            })
    }

    //get comment
    const getComment = (postId) => {
        ApiServices.get('comments.json')
            .then((response) => {
                let res = response.data;
                let comments = filter(res, data => data.postId === postId);
                setComments(comments);
            })
    }


    return (
        <SafeAreaView style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <Loading ref={loading_stt} />

            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 16 }}>
                <TouchableHighlight underlayColor="#0000000D" onPress={() => navigation.goBack()}>
                    <Icon name="left" size={30} />
                </TouchableHighlight>
                <Text style={styles.txtHeader}>Detail Post</Text>
            </View>
            <ScrollView contentContainerStyle={{
                paddingHorizontal: 16
            }}>
                {
                    (detail.length && author.length && comments.length > 0) ?
                        <View style={{paddingBottom: 30}}>
                            <Text style={styles.txtTitle}>{detail[0].title}</Text>
                            <Text style={styles.txtAuthor}>author : {author[0].name}</Text>
                            <Text style={styles.txtbody}>{detail[0].body}</Text>

                            <Text style={styles.txtComment}>Comments ( {comments.length} ) </Text>
                            {
                                comments.map((comment, index) => (
                                    <View key={index.toString()} style={styles.boxComment}>
                                        <Text style={styles.txtCName}>{comment.name}</Text>
                                        <Text style={styles.txtCBody}>{comment.body}</Text>
                                    </View>

                                ))
                            }
                        </View>
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
    boxComment: {
        paddingVertical: 24,
        paddingHorizontal: 16,
        marginVertical: 10,
        marginHorizontal: 12,
        borderRadius: 8,
        backgroundColor: theme.colors.gray
    },
    txtTitle: {
        fontFamily: theme.fonts.latoBold,
        lineHeight: 20 * 1.4,
        fontSize: 20,
        color: theme.colors.black,
        marginBottom: 0
    },
    txtbody: {
        fontFamily: theme.fonts.lato,
        lineHeight: 16 * 1.4,
        fontSize: 16,
        color: theme.colors.black
    },
    txtHeader: {
        fontFamily: theme.fonts.latoBold,
        fontSize: 34,
        marginTop: 30,
        marginBottom: 24,
        marginHorizontal: 16,
        color: theme.colors.black
    },
    txtAuthor: {
        marginTop: 16,
        marginBottom: 20,
        fontFamily: theme.fonts.latoBold,
        lineHeight: 16 * 1.4,
        fontSize: 16,
        color: theme.colors.black
    },
    txtComment: {
        fontFamily: theme.fonts.latoBold,
        fontSize: 18,
        marginTop: 30,
        marginBottom: 24,
        color: theme.colors.black
    },
    txtCName:{
        fontFamily: theme.fonts.latoBold,
        fontSize: 16,
        marginBottom: 16,
        color: theme.colors.black
    },
    txtCBody:{
        fontFamily: theme.fonts.lato,
        fontSize: 16,
        lineHeight: 16 * 1.4,
        color: theme.colors.black
    }
});
