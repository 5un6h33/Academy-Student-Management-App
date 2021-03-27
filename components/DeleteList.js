import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Modal, Alert} from 'react-native';
import colors from "../Colors";

export default class DeleteList extends React.Component {
    state = {
        showListVisible: false,
        id: this.props.list.id
    }
    toggleListModal() {
        this.setState({showListVisible: !this.state.showListVisible})
    }



    deleteAlert = () => 
        Alert.alert(
            '학생 삭제',
            '정말로 삭제하시겠습니까?',
            [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                { text: "OK", onPress: () => this.props.delList(this.state.id) }
              ],
              { cancelable: false }
        );

    render() {
        const list = this.props.list

        return (
            <View style={styles.container} behavior="padding">
                <TouchableOpacity 
                    style={[styles.listContainer, {backgroundColor: list.color}]}
                    onPress={this.deleteAlert}
                >
                    <Text style={styles.listTitle} numberOfLines={1}>
                        {list.name}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    listContainer: {
        height: 50,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginHorizontal: 12,
        alignItems: "center",
        width: 250
    },
    listTitle: {
        marginTop: 12,
        fontSize: 24,
        fontWeight: "700",
        color: colors.white,
    },
    container: {
        flex: 1,
        marginTop: 5,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10
    }
});