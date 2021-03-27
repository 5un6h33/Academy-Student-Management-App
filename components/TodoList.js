import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Modal} from 'react-native';
import colors from "../Colors";
import TodoModal from "./TodoModal";

export default class TodoList extends React.Component {
    state = {
        showListVisible: false,
    }
    toggleListModal() {
        this.setState({showListVisible: !this.state.showListVisible})
    }

    render() {
        const list = this.props.list
        const completedCount = list.todos.filter(todo => todo.completed).length;
        const remainingCount = list.todos.length - completedCount;

        return (
            <View>
                <Modal 
                    animationType="slide" 
                    visible={this.state.showListVisible} 
                    onRequestClose={() => this.toggleListModal()}
                >
                    <TodoModal 
                        list={list} closeModal={() => this.toggleListModal()} 
                        updateList={this.props.updateList}
                        remainingCount={remainingCount}
                    />
                </Modal>
                {/* <TouchableOpacity 
                    style={[styles.listContainer, {backgroundColor: remainingCount == 0 ? "#808080" : list.color}]}
                    onPress={() => this.toggleListModal()}
                >
                    <Text style={styles.listTitle} numberOfLines={1}>
                        {list.name}
                    </Text>
        
                    <View>
                        <View style={{alignItems: "center"}}>
                            <Text style={styles.count}>{remainingCount}</Text>
                            <Text style={styles.subtitle}>Remaining</Text>
                        </View>
                        <View style={{alignItems: "center"}}>
                            <Text style={styles.count}>{completedCount}</Text>
                            <Text style={styles.subtitle}>Completed</Text>
                        </View>
                    </View>
                </TouchableOpacity> */}
                <TouchableOpacity 
                style={{flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 8
                }}
                onPress={() => this.toggleListModal()}
                >
                <View style={{width: 30, height: 30, backgroundColor: remainingCount == 0 ? "#808080" : list.color}}></View>
                <View style={{flex: 1, marginLeft: 12}}>
                    <Text style={{fontSize: 16}}>
                    {list.name}
                    </Text>
                    <Text style={{color: "gray", fontSize: 14, marginTop: 2}}>
                    {list.datetime}
                    </Text>
                </View>
                <View style={{flexDirection: "row", height: '100%', alignItems: 'center'}}>
                    <Text style={{color: "gray", fontSize: 14}}>{list.rank}</Text>
                </View>
                </TouchableOpacity>
                <View style={{width: '100%', height: 1,
                backgroundColor: "#dbdbdb"}}>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 32,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginHorizontal: 12,
        alignItems: "center",
        width: 200
    },
    listTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: colors.white,
        marginBottom: 18
    },
    count: {
        fontSize: 48,
        fontWeight: "200",
        color: colors.white
    },
    subtitle: {
        fontSize: 12,
        fontWeight: "700",
        color: colors.white
    }
});