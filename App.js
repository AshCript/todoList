import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { Platform } from 'react-native-web';
import Task from './components/Task';
import React, {useEffect, useState} from 'react';

export default function App() {
  const [tasks, setTasks] = useState([
    {
      id: 0,
      item: 'Shopping',
      isDone: false,
    },
    {
      id: 1,
      item: 'Nettoyge',
      isDone: false,
    },
    {
      id: 2,
      item: 'Révision',
      isDone: true,
    }
  ])
  useEffect(() => {
    // alert("tasks changed")
    // reloadTaskList()
  }, [tasks])
  const getLastIndex = () => {
    var i = 0
    tasks.forEach(t => {
      i = t.id > i ? t.id : i
    })
    return ++i
  }

  const [task, setTask] = useState({
    id: getLastIndex(),
    item: null,
    isDone: false
  })

  const handleAddTask = () => {
    // const copyTasks = [...tasks]
    // copyTasks.push(task)
    // setTasks(copyTasks)
    if(task.item == '' || task.item == null){
      alert("Veuillez insérer une tâche")
    }else{
      setTasks([...tasks, task])
      
      setTask({
        id: getLastIndex(),
        item: null,
        isDone: false
      })
    }
  }

  const sort = ts => {
    for(var i = 0 ; i < ts.length ; i++){
      for(var j = i ; j < ts.length ; j++){
        if(ts[i].id > ts[j].id){
          var temp = ts[i]
          ts[i] = ts[j]
          ts[j] = temp
        }
      }
    }
    return ts
  }
  const completeTask = (t) => {
    let copyTasks = [...tasks]
    const index = copyTasks.indexOf(t)
    var tsk = copyTasks.find((tt, i) => {
      if(i == index){
        tt.isDone = !tt.isDone
        if(tt.isDone){
        	alert(tt.item + " completed")
        } else{
        	alert(tt.item + " unchecked")
        }
        return tt
      }
    })
    // alert(tsk.isDone)
    // console.log("t : " + t.isDone)
    copyTasks.splice(index, 1)
    copyTasks.push(tsk)
    copyTasks = sort(copyTasks)
    console.log(copyTasks)
    
    // copyTasks.splice(index, 1)
    setTasks(sort(copyTasks))

  }

  return (
		<View style={styles.container}>
      <StatusBar style='auto' />
      
      {/* Today's Tasks */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Mes tâches aujourd'hui</Text>
        <View style={styles.items}>
          {/* This is where the tasks will go! */}
          {tasks.map((t, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => completeTask(t)}>
                <Task text={t.item} isDone={t.isDone}></Task>
              </TouchableOpacity>
            )
          })}
          {/* <Task text="Natation"/>
          <Task text="Homework"/>
          <Task text="Recherche"/> */}
        </View>
      </View>

      {/* Write a task */}
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.writeTaskWrapper}>
        <TextInput style={styles.input} placeholder={'Write a task...'} value={task.item} onChangeText={text => {setTask({id : getLastIndex(), item: text, isDone: false})}} />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

		</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebeaed',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'grey',
  },
  items: {
    marginTop: 30,
  },

  writeTaskWrapper: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#c0c0c0',
    borderWidth: 1,
    borderRadius: 40,
    padding: 8,
    width: '80%',
    marginRight: 15,
  },
  addWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#c0c0c0',
    borderWidth: 1,
  },
  addText: {
    fontSize: 24,
    // textAlign: 'center',
    color: 'grey',
  },
});
