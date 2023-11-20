import React, { useState } from "react"; 
import { 
	View, 
	Text, 
	TextInput, 
	TouchableOpacity, 
	FlatList, 
	StyleSheet, 
} from "react-native"; 

const App = () => { 
	const [task, setTask] = useState(""); 
	const [tasks, setTasks] = useState([]); 
  	const [donetasks, setDone] = useState([]); 
	const [editIndex, setEditIndex] = useState(-1); 

	const handleAddTask = () => { 
		if (task) { 
			if (editIndex !== -1) { 
				// Edit existing task 
				const updatedTasks = [...tasks]; 
				updatedTasks[editIndex] = task; 
				setTasks(updatedTasks); 
				setEditIndex(-1); 
			} else { 
				// Add new task 
				setTasks([...tasks, task]); 
			} 
			setTask(""); 
		} 
	}; 

	const handleEditTask = (index) => { 
		const taskToEdit = tasks[index]; 
		setTask(taskToEdit); 
		setEditIndex(index); 
	}; 
  
  	const handleDeleteTask = (index) => { 
    	const updatedTasks = [...tasks]; 
    	const [deletedTask] = updatedTasks.splice(index, 1); 
    	setTasks(updatedTasks); 
    	setDone([...donetasks,deletedTask]);
  	}; 

	const handleUndoTask = (index) => { 
		const updatedTasks = [...donetasks]; 
		const [undoneTask] = updatedTasks.splice(index, 1); 
		setDone(updatedTasks); 
		setTasks([...tasks,undoneTask])
	}; 
  

	const renderItem = ({ item, index }) => ( 
		<View style={styles.task}> 
			<Text 
				style={styles.itemList}>{item}</Text> 
			<View 
				style={styles.taskButtons}> 
				<TouchableOpacity 
					onPress={() => handleEditTask(index)}> 
					<Text 
						style={styles.editButton}>Edit</Text> 
				</TouchableOpacity> 
				<TouchableOpacity 
					onPress={() => handleDeleteTask(index)}> 
					<Text 
						style={styles.deleteButton}>Done</Text> 
				</TouchableOpacity> 
			</View> 
		</View> 
	); 
	const renderDoneItem = ({ item, index }) => ( 
	<View style={styles.task}> 
		<Text 
			style={styles.itemList}>{item}</Text> 
		<View 
			style={styles.taskButtons}> 
			<TouchableOpacity 
				onPress={() => handleUndoTask(index)}> 
				<Text 
					style={styles.deleteButton}>Undo</Text> 
			</TouchableOpacity> 
		</View> 
	</View> 
	); 

	return ( 
		<View style={styles.container}> 
			<Text style={styles.title}>Habit Tracker</Text> 
			<TextInput 
				style={styles.input} 
				placeholder="Enter task"
				value={task} 
				onChangeText={(text) => setTask(text)} 
			/> 
			<TouchableOpacity 
				style={styles.addButton} 
				onPress={handleAddTask}> 
				<Text style={styles.addButtonText}> 
					{editIndex !== -1 ? "Update Task" : "Add Task"} 
				</Text> 
			</TouchableOpacity> 
      <Text style={styles.sectionTitle}>Pending Tasks</Text>
			<FlatList 
				data={tasks} 
				renderItem={renderItem} 
				keyExtractor={(item, index) => index.toString()} 
			/> 
      <Text style={styles.sectionTitle}>Done Tasks</Text>
      <FlatList 
				data={donetasks} 
				renderItem={renderDoneItem} 
				keyExtractor={(item, index) => index.toString()} 
			/> 
		</View> 
	); 
}; 

const styles = StyleSheet.create({ 
	container: { 
		flex: 1, 
		padding: 40, 
		marginTop: 40, 
	}, 
	title: { 
		fontSize: 24, 
		fontWeight: "bold", 
		marginBottom: 20, 
	}, 
	heading: { 
		fontSize: 30, 
		fontWeight: "bold", 
		marginBottom: 7, 
		color: "green", 
	}, 
	input: { 
		borderWidth: 3, 
		borderColor: "#ccc", 
		padding: 10, 
		marginBottom: 10, 
		borderRadius: 10, 
		fontSize: 18, 
	}, 
	addButton: { 
		backgroundColor: "green", 
		padding: 10, 
		borderRadius: 5, 
		marginBottom: 10, 
	}, 
	addButtonText: { 
		color: "white", 
		fontWeight: "bold", 
		textAlign: "center", 
		fontSize: 18, 
	}, 
	task: { 
		flexDirection: "row", 
		justifyContent: "space-between", 
		alignItems: "center", 
		marginBottom: 15, 
		fontSize: 18, 
	}, 
	itemList: { 
		fontSize: 19, 
	}, 
	taskButtons: { 
		flexDirection: "row", 
	}, 
	editButton: { 
		marginRight: 10, 
		color: "green", 
		fontWeight: "bold", 
		fontSize: 18, 
	}, 
	deleteButton: { 
		color: "red", 
		fontWeight: "bold", 
		fontSize: 18, 
	}, 
	deletedTask: {
		backgroundColor: 'red',
	},
	deletedText: {
		color: 'white',
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
	},
}); 

export default App;

