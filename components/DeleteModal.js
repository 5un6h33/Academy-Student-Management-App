import React, { Component } from 'react';
import { Text, View, StyleSheet, KeyboardAvoidingView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { AntDesign } from "@expo/vector-icons"
import RNPickerSelect from "react-native-picker-select";
import DeleteList from './DeleteList';
import colors from "../Colors"

export default class DeleteModal extends Component {

    state = {
        id: "",
        allUser: this.props.list,
        searchKeyword: this.props.list
    }

    searchUser(text) {
        this.setState({searchKeyword: this.state.allUser.filter(i => {
            return i.name.indexOf(text) > -1
        })})
    }

    renderList = list => {
        return (
            <DeleteList list={list} delList={this.props.delList} updateList={this.updateList}/>
        )
    }

    render() {

        return (
                <KeyboardAvoidingView style={styles.container} behavior="padding">
                {/* <Text style={{position: "absolute", top: 64, left: 32, fontSize: 18}}>삭제</Text> */}
                <FlatList 
                style={styles.items}
                data={this.state.searchKeyword} 
                keyExtractor={item => item.id.toString()} 
                renderItem={({item}) => this.renderList(item)}
                keyboardShouldPersistTaps="always"
                />
                <TextInput 
                            style={[styles.input, {borderColor: 'gray'}]} 
                            onChangeText={text => this.searchUser(text)} 
                            placeholder="Search"
                        />
                <TouchableOpacity style={{position: "absolute", top: 64, right: 32}} onPress={this.props.closeModal}>
                    <AntDesign name="close" size={24} color={colors.black} />
                </TouchableOpacity>
                </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 32,
        fontWeight: "900",
        color: colors.black,
        alignSelf: "center",
        marginBottom: 30
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.blue,
        borderRadius: 6,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 18,
        textAlign: "center"
    },
    create: {
        marginTop: 24,
        height: 50,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center"
    },
    colorSelect: {
        width: 30,
        height: 30,
        borderRadius: 4
    },
    items: {
        marginTop: 100
    },
    input: {
        borderWidth: 1,
        borderRadius: 6,
        width: 300,
        height: 50,
        marginTop: 40,
        marginBottom: 50,
        fontSize: 18,
        textAlign: 'center'
    },
});