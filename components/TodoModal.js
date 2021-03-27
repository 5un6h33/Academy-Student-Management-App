import React, { Component, useState} from 'react'
import { Text, StyleSheet, View, SafeAreaView, TouchableOpacity, FlatList, KeyboardAvoidingView, TextInput, Keyboard, Animated, Modal, Button, Platform } from 'react-native'
import {AntDesign, Ionicons} from "@expo/vector-icons";
import colors from "../Colors";
import {Swipeable} from 'react-native-gesture-handler';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default class TodoModal extends Component {
    state = {
        newTodo: "",
        editTodo: "",
        index: "",
        isVisible: false,
        modalVisible: false,
        datetime: this.props.list.datetime,
        mode: ""
    };


    toggleTodoCompleted = index => {
        let list = this.props.list;
        list.todos[index].completed = !list.todos[index].completed;

        this.props.updateList(list);
    };

    toggleEditModal() {
        this.setState({modalVisible: !this.state.modalVisible});
    }

    toggleEdit = () => {

        let list = this.props.list;
        let index = this.state.index;
        list.todos[index].title = this.state.editTodo;
        this.setState({modalVisible: !this.state.modalVisible});
        this.props.updateList(list)
    }

    addTodo = () => {
        let list = this.props.list

        if(!list.todos.some(todo => todo.title === this.state.newTodo)) {
            list.todos.push({title: this.state.newTodo, completed: false})

            this.props.updateList(list);
        }

        this.setState({ newTodo: "" });
        Keyboard.dismiss();
    }

    deleteTodo = index => {
        let list = this.props.list;
        list.todos.splice(index, 1);

        this.props.updateList(list);
    }

    renderTodo = (todo, index) => {
        const list = this.props.list
        return (
            <Swipeable renderRightActions={(_, dragX) => this.rightActions(dragX, index)}>
                <Modal 
                animationType="slide" 
                visible={this.state.modalVisible} 
                onRequestClose={() => this.toggleEditModal()}
                >
                        <TouchableOpacity style={{position: "absolute", top: 64, right: 32}} onPress={() => this.toggleEditModal()}>
                        <AntDesign name="close" size={24} color={colors.black} />
                        </TouchableOpacity>
                        <View style={[styles.section, styles.footer, styles.containertwo]}>
                        <TextInput 
                            style={[styles.input, {borderColor: list.color}]} 
                            onChangeText={text => this.setState({editTodo: text})} 
                            value={this.state.editTodo}
                        />
                        <TouchableOpacity style={[styles.addTodo, {backgroundColor: list.color}]} onPress={() => this.toggleEdit()}>
                            <AntDesign name="plus" size={16} color={colors.white} />
                        </TouchableOpacity>
                </View>
                </Modal>
                <View style={styles.todoContainer}>
                    <TouchableOpacity onPress={() => this.toggleTodoCompleted(index)}>
                        <Ionicons 
                            name={todo.completed ? 'ios-square' : 'ios-square-outline'}
                            size={24}
                            color={colors.gray}
                            style={{ width: 32 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {this.setState({index: index, editTodo: todo.title});this.toggleEditModal()}}>
                    <Text 
                        style={[
                            styles.todo, 
                            { 
                                textDecorationLine: todo.completed ? "line-through" : "none",
                                color: todo.completed ? colors.gray : colors.black
                            }
                        ]}
                    >
                        {todo.title}
                    </Text>
                    </TouchableOpacity>
                </View>
            </Swipeable>
        )
    }

    rightActions = (dragX, index) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0.9],
            extrapolate: "clamp"
        })

        const opacity = dragX.interpolate({
            inputRange: [-100, -20, 0],
            outputRange: [1, 0.9, 0],
            extrapolate: "clamp"
        })

        return (
            <TouchableOpacity onPress={() => this.deleteTodo(index)}>
                <Animated.View style={[styles.deleteButton, {opacity: opacity}]}>
                    <Animated.Text style={{ color: colors.white, fontWeight: "800", transform: [{ scale }] }}>
                        Delete
                    </Animated.Text>
                </Animated.View>
            </TouchableOpacity>
        )
    }

    render() {
        const list = this.props.list
        const taskCount = list.todos.length
        const completedCount = list.todos.filter(todo => todo.completed).length

        const showDatePicker = () => {
            this.setState({isVisible: true})
          };
        
          const hideDatePicker = () => {
            this.setState({isVisible: false})
          };
        
          const handleConfirm = (date) => {
            date = String(date)
            let monthlist = {Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6, Jul: 7, Aug: 8, Sep:9, Oct: 10, Nov: 11, Dec: 12}
            let dayofweeklist = {Sun: '일요일', Mon: '월요일', Tue: '화요일', Wed: '수요일', Thu: '목요일', Fri: '금요일', Sat: '토요일'}
            let datetime = "";
            let year =  date.substring(11, 15)
            let month = date.substring(4, 7) 
            let day = date.substring(7, 10)
            let dayofweek = date.substring(0, 3)
            let hour = date.substring(16, 18)
            let min = date.substring(19, 21) 
            for(var key in monthlist) {
                if(key == month) {
                    month = monthlist[key]
                }
            }
            for(var key in dayofweeklist) {
                if(key == dayofweek) {
                    dayofweek = dayofweeklist[key]
                }
            } 
            datetime = month + "월 " + day + "일 " + dayofweek + " " + hour + "시 " + min + "분"
            this.setState({datetime: datetime})

            let list = this.props.list;
            list.datetime = datetime;

            this.props.updateList(list);

            hideDatePicker();
          };
        return (
            <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
            <SafeAreaView style={styles.container}>
                <TouchableOpacity 
                    style={{ position: "absolute", top: 64, right: 32, zIndex: 10}} 
                    onPress={this.props.closeModal}
                >
                        <AntDesign name="close" size={24} color={colors.black} />
                </TouchableOpacity>

                <View style={[styles.section, styles.header, {borderColor: this.props.remainingCount == 0 ? "#808080" : list.color}]}>
                    <Text style={styles.title}>{list.name}</Text>
                    <Text style={styles.taskCount}>
                            {completedCount} of {taskCount} tasks
                    </Text>
                </View>
                <Text style={{alignSelf: "center", fontWeight: "600", fontSize: 20, marginTop: 15}}>{this.state.datetime}</Text>
                <View style={[styles.section, { flex: 3, marginVertical: 16 }]}>
                    <FlatList 
                        data={list.todos}
                        renderItem={({item, index}) => this.renderTodo(item, index)}
                        keyExtractor={item => item.title}
                        showsVerticalScrollIndicator={false}
                    />
                </View>

                <Button onPress={showDatePicker} title="시간 설정" /> 
                
                <DateTimePickerModal 
                isVisible={this.state.isVisible}
                value={this.state.datetime}
                mode="datetime"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                />
                <View style={[styles.section, styles.footer]}>
                        <TextInput 
                            style={[styles.input, {borderColor: this.props.remainingCount == 0 ? "#808080" : list.color}]} 
                            onChangeText={text => this.setState({newTodo: text})} 
                            value={this.state.newTodo}
                        />
                        <TouchableOpacity style={[styles.addTodo, {backgroundColor: this.props.remainingCount == 0 ? "#808080" : list.color}]} onPress={() => this.addTodo()}>
                            <AntDesign name="plus" size={16} color={colors.white} />
                        </TouchableOpacity>
                </View>

            </SafeAreaView>
        </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    containertwo: {
        alignItems: 'center',
        marginTop: 200,
        justifyContent: 'center',
        height: 500,
    },
    section: {
        alignSelf: "stretch"
    },
    header: {
        justifyContent: "flex-end",
        marginLeft: 64,
        borderBottomWidth: 3,
        paddingTop: 16
    },
    title: {
        fontSize: 30,
        fontWeight: "800",
        color: colors.black
    },
    taskCount: {
        marginTop: 4,
        marginBottom: 16,
        color: colors.gray,
        fontWeight: "600"
    },
    footer: {
        paddingHorizontal: 32,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16
    },
    input: {
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
    },
    todoContainer: {
        paddingVertical: 16,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 32
    },
    todo: {
        color: colors.black,
        fontWeight: "700",
        fontSize: 16
    },
    deleteButton: {
        flex: 1,
        backgroundColor: colors.red,
        justifyContent: 'center',
        alignItems: "center",
        width: 80
    }
});
