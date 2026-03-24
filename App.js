import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, FlatList, View, Platform } from 'react-native';
import { ThemeProvider, Text, Input, Button, CheckBox } from '@rneui/themed';

export default function App() {
  const [tasks, setTasks] = useState([
    {
      key: '1',
      completed: false,
      description: 'Finish Writing Assignment',
      deadline: '11 PM',
      details:
        'The essay is due by tonight at 11:59 pm. Make sure you get it done an hour before so you can double check it.',
    },
    {
      key: '2',
      completed: true,
      description: 'Do the Dishes',
      deadline: '5 PM',
      details:
        'Finish the dirty dishes inside the sink. Make sure to get it done before mom gets home.',
    },
    {
      key: '3',
      completed: true,
      description: 'Fold Laundry',
      deadline: '3 PM',
      details:
        'Fold the laundry and make sure to do it right instead of messing it up.',
    },
  ]);

  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    const trimmedTask = newTask.trim();
    if (trimmedTask === '') return;

    const taskObject = {
      key: Date.now().toString(),
      completed: false,
      description: trimmedTask,
      deadline: 'Anytime',
      details: 'New task added by user.',
    };

    setTasks([taskObject, ...tasks]);
    setNewTask('');
  };

  const toggleCompleted = (key) => {
    const updatedTasks = tasks.map((task) =>
      task.key === key ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (key) => {
    const updatedTasks = tasks.filter((task) => task.key !== key);
    setTasks(updatedTasks);
  };

  const sortedTasks = [...tasks].sort((a, b) => Number(a.completed) - Number(b.completed));

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardTopRow}>
          <Text
            style={[
              styles.taskTitle,
              item.completed && styles.completedText
            ]}
          >
            {item.description}
          </Text>

          <Text style={styles.deleteText} onPress={() => deleteTask(item.key)}>
            Delete Task
          </Text>
        </View>

        <Text
          style={[
            styles.taskDetails,
            item.completed && styles.completedText
          ]}
        >
          {item.details}
        </Text>

        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Deadline: {item.deadline}</Text>

          <View style={styles.statusRow}>
            <Text style={styles.metaLabel}>Task Status</Text>
            <CheckBox
              checked={item.completed}
              onPress={() => toggleCompleted(item.key)}
              checkedIcon="check"
              uncheckedIcon="close"
              checkedColor="#d10f3a"
              uncheckedColor="#d10f3a"
              size={22}
              containerStyle={styles.checkboxContainer}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <ThemeProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.appShell}>
          <View style={styles.hero}>
            <Text style={styles.heroTitle}>TASK-LY</Text>

            <View style={styles.inputRow}>
              <Input
                placeholder="Create Task"
                value={newTask}
                onChangeText={setNewTask}
                onSubmitEditing={addTask}
                containerStyle={styles.inputContainer}
                inputContainerStyle={styles.inputInnerContainer}
                inputStyle={styles.inputText}
                placeholderTextColor="#b8b8b8"
              />
              <Button
                title="Add"
                onPress={addTask}
                buttonStyle={styles.addButton}
                titleStyle={styles.addButtonText}
              />
            </View>
          </View>

          <View style={styles.topInfoRow}>
            <Text style={styles.welcomeText}>Welcome User</Text>
            <Text style={styles.signOutText}>Sign out</Text>
          </View>

          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Task List</Text>
            <Text style={styles.locationText}>Orlando FL, 33182</Text>
          </View>

          <Text style={styles.sortText}>Sort by Complete ↕</Text>

          <FlatList
            data={sortedTasks}
            renderItem={renderItem}
            keyExtractor={(item) => item.key}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cfcfcf',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  appShell: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 18,
    backgroundColor: '#f8f8f8',
    borderRadius: 0,
    overflow: 'hidden',
  },
  hero: {
    backgroundColor: '#c90d35',
    paddingTop: 8,
    paddingHorizontal: 18,
    paddingBottom: 16,
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
  },
  heroTitle: {
    color: '#ffffff',
    fontSize: 34,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  inputContainer: {
    flex: 1,
    marginBottom: 0,
    paddingHorizontal: 0,
  },
  inputInnerContainer: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 0,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 38,
  },
  inputText: {
    fontSize: 13,
    color: '#333333',
  },
  addButton: {
    backgroundColor: '#8d0826',
    borderRadius: 10,
    height: 38,
    paddingHorizontal: 16,
  },
  addButtonText: {
    fontWeight: '700',
    fontSize: 13,
  },
  topInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingHorizontal: 12,
  },
  welcomeText: {
    fontSize: 14,
    color: '#666666',
  },
  signOutText: {
    fontSize: 14,
    color: '#666666',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
    paddingHorizontal: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e7e7e7',
  },
  sectionTitle: {
    fontSize: 27,
    fontWeight: '800',
    color: '#111111',
  },
  locationText: {
    fontSize: 11,
    color: '#d10f3a',
    fontWeight: '700',
  },
  sortText: {
    textAlign: 'right',
    color: '#d10f3a',
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 14,
    marginTop: 8,
    marginBottom: 4,
  },
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    paddingHorizontal: 10,
    paddingTop: 12,
    paddingBottom: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
  },
  taskTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '800',
    color: '#111111',
    marginBottom: 8,
  },
  deleteText: {
    fontSize: 10,
    color: '#e05577',
    fontWeight: '500',
    marginTop: 2,
  },
  taskDetails: {
    fontSize: 11,
    lineHeight: 16,
    color: '#9a9a9a',
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#202020',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  checkboxContainer: {
    margin: 0,
    padding: 0,
    marginLeft: 4,
    backgroundColor: 'transparent',
  },
  completedText: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: '#888888',
  },
});