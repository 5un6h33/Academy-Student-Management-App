import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, ActivityIndicator, ScrollView, LogBox, TextInput} from 'react-native';
import colors from "./Colors";
import {AntDesign} from "@expo/vector-icons"
import TodoList from './components/TodoList'
import SettingModal from './components/SettingModal';
import Fire from './Fire';
import TableModal from './TableModal';;;
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
;

const Tab = createBottomTabNavigator();


export default class App extends React.Component {
  state = {
    settingVisible: false,
    tableVisible: false,
    lists: [],
    user: {},
    loading: true,
    alluser: ""
  };


  // React.useEffect(() => {
  //   LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
  // }, [])
  

  componentDidMount() {
    firebase = new Fire((error, user) => {
      if (error) {
        return alert("UH oh, something went wrong");
      }
      firebase.getLists(lists => {
        this.setState({lists, user}, () => {
          this.setState({ loading: false });
          this.setState({alluser: lists})
        });
      });

      this.setState({user});
    });
  }

  componentWillUnmount() {
    firebase.detach();
  }

  updateList = list => {
    firebase.updateList(list);
  }

  addList = list => {
    firebase.addList({
      name: list.name,
      color: list.color,
      grade: list.grade,
      rank: list.rank,
      datetime: "",
      todos: []
    });
  }

  delList = id => {
    firebase.delUser(id);
  }

  addTask = (grade, rank) => {
    firebase.addTask(grade, rank);
  }

  toggleSettingModal() {
    this.setState({settingVisible: !this.state.settingVisible});
  }

  toggleTableModal() {
    this.setState({tableVisible: !this.state.tableVisible})
  }

  renderList = (list, grade) => {
    if(list.grade != grade)
      return;

    return <TodoList list={list} updateList={this.updateList}/>
  }

  searchUser(text) {
    this.setState({lists: this.state.alluser.filter(i => {
        return i.name.indexOf(text) > -1
    })})
}

  render() {
    if(this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={colors.blue}/>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        {this.addTask('고3', 1)}
        <Modal 
          visible={this.state.settingVisible} 
          onRequestClose={() => this.toggleSettingModal()}
        >
          <SettingModal closeModal={() => this.toggleSettingModal()} addList={this.addList} delList={this.delList} list={this.state.lists} updateList={this.updateList}/>
        </Modal>

        <Modal 
          visible={this.state.tableVisible} 
          onRequestClose={() => this.toggleTableModal()}
        >
          <TableModal closeModal={() => this.toggleTableModal()} addList={this.addList} delList={this.delList} list={this.state.lists} updateList={this.updateList}/>
        </Modal>

      <ScrollView>
        <TextInput 
          style={[styles.input, {borderColor: '#fff', backgroundColor: 'white',marginTop: 100, alignItems: 'center', justifyContent: 'center', alignSelf: 'center'}]} 
          onChangeText={text => this.searchUser(text)} 
          placeholder="Search"
        />
        <View style={{
          // marginTop: 100,
          marginTop: 24,
          marginHorizontal: 24,
          padding: 20,
          borderRadius: 12,
          backgroundColor: '#fff',

        }}>
          <Text style={{fontSize: 22, lineHeight: 30}}>1학년</Text>
          <FlatList 
            contentContainerStyle={{ marginTop: 12}}
            scrollEnabled={false}
            data={this.state.lists}
            keyExtractor={item => item.id.toString()} 
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => this.renderList(item, '고1')} 
          />
        </View>

        <View style={{
          marginTop: 24,
          marginHorizontal: 24,
          padding: 20,
          borderRadius: 12,
          backgroundColor: '#fff',

        }}>
          <Text style={{fontSize: 22, lineHeight: 30}}>2학년</Text>
          <FlatList 
            contentContainerStyle={{ marginTop: 12}}
            scrollEnabled={false}
            data={this.state.lists}
            keyExtractor={item => item.id.toString()} 
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => this.renderList(item, '고2')} 
          />
        </View>

        <View style={{
          marginTop: 24,
          marginBottom: 60,
          marginHorizontal: 24,
          padding: 20,
          borderRadius: 12,
          backgroundColor: '#fff',

        }}>
          <Text style={{fontSize: 22, lineHeight: 30}}>3학년</Text>
          <FlatList 
            contentContainerStyle={{ marginTop: 12}}
            scrollEnabled={false}
            data={this.state.lists}
            keyExtractor={item => item.id.toString()} 
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => this.renderList(item, '고3')} 
          />
        </View>
        </ScrollView>

        <TouchableOpacity style={styles.setting} onPress={() => this.toggleSettingModal()}>
          <AntDesign name="setting" size={24} color={colors.black} />
        </TouchableOpacity>      
        <TouchableOpacity style={styles.table} onPress={() => this.toggleTableModal()}>
          <AntDesign name="table" size={24} color={colors.black} />
        </TouchableOpacity>
      </View>
      
    );
  }
}

// const TabNavi = () => {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen
//         name="TabFirstStackNavi"
//         component={App}
//         options={{
//           tabBarLabel: 'Frist',
//           tabBarIcon: ({color}) => <Icon name="home" color={color} size={26} />,
//         }}
//       />
//       <Tab.Screen
//         name="TabSecond"
//         component={Table}
//         options={{
//           tabBarLabel: 'Second',
//           tabBarIcon: ({color}) => (
//             <Icon name="people" color={color} size={26} />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  divider: {
    backgroundColor: colors.lightGray,
    height: 1,
    flex: 1,
    alignSelf: "center"
  },
  title: {
    fontSize: 28,
    fontWeight: "400",
    color: colors.black,
    paddingHorizontal: 64,
    paddingVertical: 64
  },
  addList: {
    borderWidth: 2,
    borderColor: colors.lightBlue,
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  add: {
    color: colors.blue,
    fontWeight: "600",
    fontSize: 14,
    marginTop: 8
  },
  setting: {
    position: "absolute", 
    top: 64, 
    right: 32
  },
  table: {
    position: "absolute", 
    top: 64,
    left: 32
  },
  input: {
        borderWidth: 1,
        borderRadius: 12,
        width: 380,
        height: 50,
        marginTop: 40,
        // marginBottom: 50,
        fontSize: 18,
        textAlign: 'center'
    },
});
