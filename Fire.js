import firebase from 'firebase'
import  { firestore } from '@firebase/firestore'
import { Alert } from 'react-native'

const firebaseConfig = {
    apiKey: "AIzaSyB88LGDl9bnJ1CRvKhVcbTBc1SrRn_rLrc",
    authDomain: "student-management-app-d40d0.firebaseapp.com",
    projectId: "student-management-app-d40d0",
    storageBucket: "student-management-app-d40d0.appspot.com",
    messagingSenderId: "47907647574",
    appId: "1:47907647574:web:8808cbcbd426417f120bf7"
}

class Fire {
    constructor(callback) {
        this.init(callback)
    }

    init(callback) {
        if(!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig)
        }

        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                callback(null, user);
            } else {
                firebase
                    .auth()
                    .signInAnonymously()
                    .catch(error => {
                        callback(error);
                    });
            }
        })
    }

    getLists(callback) {
        // let ref = this.ref.orderBy("grade");
        let ref = this.ref
        this.unsubscribe = ref.onSnapshot(snapshot => {
            lists = []

            snapshot.forEach(doc => {
                lists.push({ id: doc.id, ...doc.data() });
            });
            //multi sort 
            lists = Object.values(lists).sort((a, b) => {
                return a.grade < b.grade ? -1 : a.grade > b.grade ? 1 : a.rank < b.rank ? -1 : a.rank > b.rank ? 1 : a.name < b.name ? -1 : a.name > b.name ? 1 : 0 
            })
            // console.log(ordered)
            callback(lists);
        });
    }

    addList(list) {
        let ref = this.ref;

        ref.add(list);
    }

    addTask(grade, rank) {
        grade = '고3'
        firebase
        .firestore()
        .collection('users')
        .doc(this.userId)
        .collection('lists')
        .where('grade', '==', grade)
        .where('rank', '==', '1반')
        
    }

    delUser(id) {
        firebase
        .firestore()
        .collection('users')
        .doc(this.userId)
        .collection('lists')
        .doc(id)
        .delete()
        .then(() => {
            Alert.alert(
                '삭제 성공',
                '학생 데이터를 성공적으로 삭제했습니다 :D',
            );
        })
        .catch((e) => {
            console.log('Delete Error', e)
        })
    }

    updateList(list) {
        let ref = this.ref;

        ref.doc(list.id).update(list);
    }

    get userId() {
        // return firebase.auth().currentUser.uid
        return "yee" 
    }

    get ref() {
        return firebase
        .firestore()
        .collection('users')
        .doc(this.userId)
        .collection('lists');
    }

    detach() {
        this.unsubscribe();
    }
}

export default Fire;
