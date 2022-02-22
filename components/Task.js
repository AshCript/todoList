import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'


const Task = (props) => {

  return(
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square}></View>
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
      <View style={props.isDone ? styles.circularDone : styles.circularUndone}></View>
    </View>
  )
}
const styles = StyleSheet.create({
  item: {
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: '#fff',
  },

  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#55bcf6',
    opacity: 0.4,
    marginRight: 15,
    borderRadius: 5,
    
  },
  itemText: {
    maxWidth: '80%',
    color: 'grey'
  },

  circularUndone: {
    width: 15,
    height: 15,
    borderColor: '#10c1d8',
    borderWidth: 3,
    borderRadius: 6,
  },
  circularDone: {
    width: 15,
    height: 15,
    borderColor: '#10c1d8',
    backgroundColor: '#10c1d8',
    borderWidth: 3,
    borderRadius: 6,
  },
})

export default Task
