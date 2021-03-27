import React, { Component } from 'react';
import { Text, View, StyleSheet, KeyboardAvoidingView, TouchableOpacity, TextInput } from 'react-native';
import { AntDesign } from "@expo/vector-icons"
import RNPickerSelect from "react-native-picker-select";
import colors from "../Colors"

export default class AddListModal extends Component {
    backgroundColors = ["#5CD859", "#24a6d9", "#595BD9", "#8022D9", "#D159D8", "#D85963", "#D88559"]

    state = {
        name: "",
        grade: "",
        rank: "",
        color: this.backgroundColors[0]
    }

    createTodo = () => {
        const { name, color, grade, rank } = this.state;

        const list = {name, color, grade, rank}

        this.props.addList(list);

        this.setState({ name: "", grade: "", rank: "" });
        this.props.closeModal();
    }

    renderColors() {
        return this.backgroundColors.map(color => {
            return (
                <TouchableOpacity
                    key={color}
                    style={[styles.colorSelect, {backgroundColor: color}]}
                    onPress={() => this.setState({color})}
                />
            )
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

                <View style={{alignSelf:"stretch", marginHorizontal: 32}}>
                    <Text style={styles.title}>학생 추가</Text>

                    <TextInput 
                        style={styles.input} 
                        placeholder="이름" 
                        onChangeText={text => this.setState({name: text})}
                    />

                    <View style={{flexDirection: "column", justifyContent: "center", alignSelf: "center", marginTop: 20, marginBottom: 15}}>
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

                    <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 12}}>
                        {this.renderColors()}
                    </View>

                    <TouchableOpacity 
                        style={[styles.create, {backgroundColor: this.state.color}]} 
                        onPress={this.createTodo}
                    >
                        <Text style={{color: colors.white, fontWeight: "600"}}>Create!</Text>
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
    }
});