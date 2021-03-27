import React, { Component } from 'react';
import { Text, View, StyleSheet, KeyboardAvoidingView, TouchableOpacity, TextInput, Keyboard, Alert } from 'react-native';
import { AntDesign } from "@expo/vector-icons"
import RNPickerSelect from "react-native-picker-select";
import colors from "../Colors"

export default class HomeworkModal extends Component {

    state = {
        grade: "",
        rank: "",
        newTodo: ""
    }

    addTodo = () => {
        let list = this.props.list
        let grade = this.state.grade
        let rank = this.state.rank

        list.map(x => {
            if(x.grade == grade && x.rank == rank)
            {
                if(!x.todos.some(todo => todo.title === this.state.newTodo)) {
                    x.todos.push({title: this.state.newTodo, completed: false})
                    this.props.updateList(x);
                }
        
                this.setState({ newTodo: "" });
                Keyboard.dismiss();
                Alert.alert(
                    '완료!',
                    '성공적으로 학생에게 숙제를 주었습니다 :D',
                );
            }
        })
    }

    render() {
        const gradeText = "학년을 선택해 주세요!"
        const rankText = '반을 선택해주세요!'
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <TouchableOpacity style={{position: "absolute", top: 64, right: 32}} onPress={this.props.closeModal}>
                    <AntDesign name="close" size={24} color={colors.black} />
                </TouchableOpacity>
            <Text style={styles.title}>숙제 추가!</Text>
            <View style={{flexDirection: "column", justifyContent: "center", alignSelf: "center", marginTop: 5, marginBottom: 20}}>
                        <RNPickerSelect
                            onValueChange={(value) => this.setState({grade: value})}
                            items={[
                                { label: "중1", value: "중1" },
                                { label: "중2", value: "중2" },
                                { label: "중3", value: "중3" },
                                { label: "고1", value: "고1" },
                                { label: "고2", value: "고2" },
                                { label: "고3", value: "고3" },
                            ]}
                            useNativeAndroidPickerStyle={false}
                            placeholder={{ 
                                label: gradeText,
                                value: null,
                            }}
                        />
                    </View>

                    <View style={{flexDirection: "column", justifyContent: "center", alignSelf: "center", marginTop: 5, marginBottom: 20}}>
                        <RNPickerSelect
                            onValueChange={(value) => this.setState({rank: value})}
                            items={[
                                    { label: "1반", value: "1반" },
                                    { label: "2반", value: "2반" },
                                    { label: "3반", value: "3반" },
                                    { label: "4반", value: "4반" }
                                ]}
                                useNativeAndroidPickerStyle={false}
                                placeholder={{
                                    label: rankText,
                                    value: null,
                                }}
                        />
                    </View>
            <View style={[styles.section, styles.footer]}>
                        <TextInput 
                            style={[styles.input1, {borderColor: 'gray'}]} 
                            onChangeText={text => this.setState({newTodo: text})} 
                            value={this.state.newTodo}
                        />
                        <TouchableOpacity style={[styles.addTodo, {backgroundColor: 'blue'}]} onPress={() => this.addTodo()}>
                            <AntDesign name="plus" size={16} color={colors.white} />
                        </TouchableOpacity>
            </View>
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
    section: {
        alignSelf: "stretch"
    },
    footer: {
        paddingHorizontal: 32,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16
    },
    input1: {
        flex: 1,
        height: 48,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 6,
        marginRight: 8,
        paddingHorizontal: 8
    },
    addTodo: {
        borderRadius: 4,
        padding: 16,
        alignItems: "center",
        justifyContent: "center"
    }
});