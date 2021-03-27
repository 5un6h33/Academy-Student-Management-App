import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import {AntDesign} from "@expo/vector-icons"

export default class TableModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['학년', '반', '이름', '과제'],
      widthArr: []
    }
  }

  render() {
    const state = this.state;
    const data = [];
    let len = 0;
    let list = this.props.list

    let completed = ""

    list.map(x => {
      let newlen = 0;
      x.todos.map(y => {
        newlen += 2
      })
      if(len < newlen) {
        len = newlen
      }
    })
    list.map(x => {
      let count = 0
      const dataRow = [];
      dataRow.push(x.grade)
      dataRow.push(x.rank)
      dataRow.push(x.name)
      // console.log(x.name)
      x.todos.map(y => {
        count += 2
        if(y.completed == true){
          completed = "O"
        }
        else if(y.completed == false){
          completed = "X"
        }
        dataRow.push(y.title)
        dataRow.push(completed)
      }) 
      let num = len - count
      var step
      // console.log(num)
      for(step = 0; step < num; step++) {
        dataRow.push("")
      }
      dataRow.push(x.datetime)
      data.push(dataRow)
    })

    len = len + 4
    // console.log(len)

    for(let i = 0; i < len; i++) {
      this.state.widthArr.push(120)
    }
    for(let i = 0; i < len - 5; i++) {
      this.state.tableHead.push("")
    }
    this.state.tableHead.push("시간")

    return (
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderColor: '#C1C0B9'}}>
              <Row data={state.tableHead} widthArr={state.widthArr} style={styles.head} textStyle={styles.text}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderColor: '#C1C0B9'}}>
                {
                  data.map((dataRow, index) => (
                    <Row
                      key={index}
                      data={dataRow}
                      widthArr={state.widthArr}
                      style={[styles.row, index%2 && {backgroundColor: '#ffffff'}]}
                      textStyle={styles.text}
                    />
                  ))
                }
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
        <TouchableOpacity style={{position: "absolute", top: 64, right: 32}} onPress={this.props.closeModal}>
          <AntDesign name="close" size={24} color={colors.black} />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    paddingTop: 100, 
    backgroundColor: '#ffffff' 
  },
  head: { 
    height: 50, 
    backgroundColor: '#6F7BD9' 
  },
  text: { 
    textAlign: 'center', 
    fontWeight: '200' 
  },
  dataWrapper: { 
    marginTop: -1 
  },
  row: { 
    height: 40, 
    backgroundColor: '#F7F8FA' 
  }
});