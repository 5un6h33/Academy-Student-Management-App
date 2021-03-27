import React, { Component } from 'react';
import { Text, View, StyleSheet, KeyboardAvoidingView, TouchableOpacity, TextInput, Modal } from 'react-native';
import AddListModal from './AddListModal';
import DeleteModal from './DeleteModal';
import HomeworkModal from './HomeworkModal';
import { AntDesign } from "@expo/vector-icons"
import colors from "../Colors"

export default class SettingModal extends Component {

    state = {
        homeworkVisible: false,
        addTodoVisible: false,
        deleteVisible: false,
        name: ""
    }

    toggleHomeworkModal() {
        this.setState({homeworkVisible: !this.state.homeworkVisible});
    }

    toggleAddTodoModal() {
        this.setState({addTodoVisible: !this.state.addTodoVisible});
      }

    toggleDeleteModal() {
        this.setState({deleteVisible: !this.state.deleteVisible});
      }
    
    render() {

        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Modal 
            animationType="slide" 
            visible={this.state.homeworkVisible} 
            onRequestClose={() => this.toggleHomeworkModal()}
            >
            <HomeworkModal closeModal={() => this.toggleHomeworkModal()} list={this.props.list} updateList={this.props.updateList}/>
            </Modal>

            <Modal 
            animationType="slide" 
            visible={this.state.addTodoVisible} 
            onRequestClose={() => this.toggleAddTodoModal()}
            >
            <AddListModal closeModal={() => this.toggleAddTodoModal()} addList={this.props.addList}/>
            </Modal>

            <Modal 
            animationType="slide" 
            visible={this.state.deleteVisible} 
            onRequestClose={() => this.toggleDeleteModal()}
            >
            <DeleteModal closeModal={() => this.toggleDeleteModal()} delList={this.props.delList} list={this.props.list}/>
            </Modal>

                <TouchableOpacity style={{position: "absolute", top: 64, right: 32}} onPress={this.props.closeModal}>
                    <AntDesign name="close" size={24} color={colors.black} />
                </TouchableOpacity>

                <View style={{alignSelf:"stretch", marginHorizontal: 32}}>
                    <Text style={styles.title}>숙제</Text>

                    <TouchableOpacity 
                        style={[styles.create, {backgroundColor: "#5CD859"}]} 
                        onPress={() => this.toggleHomeworkModal()}
                    >
                        <Text style={{color: colors.white, fontWeight: "600"}}>Homework</Text>
                    </TouchableOpacity>

                    <Text style={styles.title}>학생 추가</Text>

                    <TouchableOpacity 
                        style={[styles.create, {backgroundColor: "#24a6d9"}]} 
                        onPress={() => this.toggleAddTodoModal()}
                    >
                        <Text style={{color: colors.white, fontWeight: "600"}}>Add</Text>
                    </TouchableOpacity>

                    <Text style={styles.title}>학생 삭제</Text>

                    <TouchableOpacity 
                        style={[styles.create, {backgroundColor: "#F159D8"}]} 
                        onPress={() => this.toggleDeleteModal()}
                    >
                        <Text style={{color: colors.white, fontWeight: "600"}}>Delete</Text>
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
        fontSize: 30,
        fontWeight: "800",
        color: colors.black,
        alignSelf: "center",
        marginBottom: 16,
        marginTop: 30
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.blue,
        borderRadius: 6,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 18
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