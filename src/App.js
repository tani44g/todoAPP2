import React, {Component} from 'react';
import "./app.css"
import AddItem from './AddItem'
import FlipMove from 'react-flip-move'
import TodoAPI from './apis/TodoAPI'
var Completed = require('./Completed').handleComplete;
var {Active,All,Complete} = require('./UI');
var Delete = require('./DeleteItem').handleDelete;

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      all: TodoAPI.getAll(),
      active:TodoAPI.getActive(),
      completed:TodoAPI.getComp(),
      count: TodoAPI.getCount()
    }
    
}

componentDidUpdate(){
  TodoAPI.setAll(this.state.all)
  TodoAPI.setActive(this.state.active)
  TodoAPI.setCompleted(this.state.completed)
  TodoAPI.setCount(this.state.count)
}

//Function to delete item when clicked on cross which appears on the right most of the item on haver
  handleDelete(key,task){
    var NewAll = Delete(key,task);
    var newCount = this.state.count;
    if(newCount>0){
    newCount--;
    }
    this.setState({
      all: NewAll,
      count: newCount
    })
    
  }


//function to handle toggle between selecting all items and none 
//logo appears beside the input
  handleAll(tasks){
    if(tasks[0].completed === true){
      this.setState({
        all :tasks,
        completed : tasks,
        active: [],
        count: 0
      })
      
      this.showCompleted();
    }
    else{
      var count1 = this.state.all.length;
      this.setState({
        all :tasks,
        active : tasks,
        completed: [],
        count: count1
        
      })
      this.showAll();
    }  
    }
    
    
  //function to add the completed tasks to completed list
  handleComplete(key){

    var all = this.state.all;
    var count = this.state.count;
    var comp = this.state.completed;
    var active = this.state.active;
    var newState = Completed(key,count, all,comp,active);

    this.setState({
      count : newState.count,
      active : newState.active,
      completed : newState.completed
    })
  }


  //function to show only active tasks when clicked on Active button
  showActive(){
    Active();
    this.state.all.forEach(function(item){
      if(item.completed === true){
        document.getElementById(item.id2).style.display = 'none';
      }
      else
        document.getElementById(item.id2).style.display='block'
    
    })
  }

  //function to show all tasks when clicked on All button
  showAll(){
    All();
    this.state.all.forEach(function(item){

        document.getElementById(item.id2).style.display = 'block';
    })
  }

  //function to show only completed tasks when clicked on Completed button
  showCompleted(){
    Complete();
    this.state.all.forEach(function(item){
      if(item.completed !== true){
        document.getElementById(item.id2).style.display = 'none';
      }
      else
        document.getElementById(item.id2).style.display='block'
    })
  }

  //function to delete all items of completed list
  clearComp(){
    var complete = []
    var that = this;
    var newAll = this.state.all.filter(function(todo){
      return !that.state.completed.includes(todo)
    })
    this.setState({
      all : newAll,
      completed: complete
    })
    this.showAll();
  }

  handleAddTask(newItem){

    var count = 0;
    count = this.state.count + 1;
      
    this.setState({
      count : count,
      all : [
        ...this.state.all,
        newItem
      ],
      active : [
        ...this.state.active,
        newItem
      ]

  })}


  render(){

    var task = this.state.all;
    var active = this.state.active;


    return (
      <div>
        <div className="heading">
          <p>todos</p>
        </div>
        {/* Add item component to add items to list */}
        <AddItem todo={task} active={active} allComplete={this.handleAll.bind(this)} onAddTask={this.handleAddTask.bind(this)} />  
          <div className="tabledata">
            {/* table to display all the items of the list */}
          <table>
            <tbody>
              {/* FlipMove for animation */}
              <FlipMove duration={90} easing="ease-out">
              {this.state.all.map (item => (
                <tr id={item.id2} key={item.key} >
                  <td><input type="checkbox" id={item.key}/><label for={item.key} onClick={()=>{this.handleComplete(item.key)}} ></label></td>
                  <td id={item.id} >{item.text}</td>
                  <td className="delete" onClick={()=>{this.handleDelete(item.key,task)}} >&#10006; </td>
                </tr>
              ))}
              </FlipMove>
            
            </tbody>
            {/* footer area of table contains information about left tasks and buttons */}
            <tfoot id="footer">
              <tr>
                {this.state.count>1 &&
                <td>{this.state.count} items left</td>
                }
                
                {this.state.count<=1 &&
                <td>{this.state.count} item left</td>
                }
                <td>
                <button id="all" onClick={()=>{this.showAll()}}>All</button>
                <button id="active" onClick={()=> {this.showActive()}} >Active</button>
                <button id="completed" onClick={()=> {this.showCompleted()}} >Completed</button>
                <button id="clear" onClick={()=>{this.clearComp()}} >Clear completed</button>
                </td>
              </tr>
            </tfoot>
          </table>
            <svg id="rect1">
                <rect width="540" height="5" />
          </svg>
          <svg id="rect2">
                <rect width="520" height="4" />
          </svg>
        </div>       
      </div>
    );
  }
  
}

export default App;
