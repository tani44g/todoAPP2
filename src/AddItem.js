import React , {Component} from 'react'
import "./app.css"
var uuid = require('uuid');

export default class AddItem extends Component{

    constructor(props){
        super(props);
        this.state = {
            even: true 
        }
        this.AddItem = this.AddItem.bind(this);
    }

    // making the css visible when page is reloaded
    componentDidMount(){
        if(this.props.active.length){
            document.getElementById('chevronDown').style.visibility = "visible"
            }
        if(this.props.todo.length){
           document.getElementById('rect1').style.display = "inline-block"
            document.getElementById('rect2').style.display = "inline-block"
            document.getElementById('footer').style.display = "block"
      }
        
  for(let i=0;i<this.props.todo.length;i++){
    if(this.props.todo[i].completed === false){
        document.getElementById(this.props.todo[i].key).checked = false;
        var el1 = document.getElementById(this.props.todo[i].id);
        el1.style.textDecoration = "none"
        el1.style.color = "black"
    }
    else{
        document.getElementById(this.props.todo[i].key).checked = true;
      var el = document.getElementById(this.props.todo[i].id);
      el.style.textDecoration = "line-through"
      el.style.color = "grey"

    }
    }
    }

    //function to tick all the tasks or none
    allCompleted(){
        var todo = this.props.todo;
        if(this.state.even === true){
            for(let i=0;i<todo.length;i++){
                if(todo[i].completed === false){
                    todo[i].completed = true
                    document.getElementById(todo[i].key).checked = true
                    var el1 = document.getElementById(todo[i].id);
                    el1.style.textDecoration = "line-through"
                    el1.style.color = "grey"
                }
            }
            this.setState({
                even: false
            })
        }
        else{
            for(let i=0;i<todo.length;i++){
                if(todo[i].completed === true){
                    todo[i].completed = false
                    document.getElementById(todo[i].key).checked = false
                    var el3 = document.getElementById(todo[i].id);
                    el3.style.textDecoration = "none"
                    el3.style.color = "black"
                }
            }
            this.setState({
                even: true
            })
        }
        
        this.props.allComplete(todo);
    } 

    //function to search a task as soon as one types a letter in the input field it starts searching
    Searchitem(){
        var q = this.refs.task.value
        if(this.refs.task.value !== ""){
            this.props.todo.forEach(function(itemp){
                if(!itemp.text.includes(q)){
                    document.getElementById(`${itemp.id2}`).style.display='none' 
                }
                else {
                    document.getElementById(`${itemp.id2}`).style.display='block'
                }
                
            })
            
    
        }
        else{
            
            this.props.todo.forEach(function(itemx){
                document.getElementById(`${itemx.id2}`).style.display = 'block'
            })
        }
    }
    
    //function to add items in the list
    AddItem(e){
        e.preventDefault();

            if(this.refs.task.value !== ""){
                var newItem = {
                    text: this.refs.task.value,
                    key: Date.now(),
                    id: uuid(),
                    id2: uuid(),
                    completed: false
                }
                this.refs.task.value="";
                this.props.onAddTask(newItem);
            }
            document.getElementById('footer').style.display = "block"
            document.getElementById('chevronDown').style.visibility = "visible"
            document.getElementById('rect1').style.display = "inline-block"
            document.getElementById('rect2').style.display = "inline-block"
      }


    render(){

        return(
            <div className='main'>
          
        <form onSubmit = {this.AddItem} autoComplete="off">
        <span onClick={()=>{this.allCompleted()}} id="chevronDown" class="glyphicon glyphicon-chevron-down"></span>
          <input id="task" type="text" ref="task" placeholder="What needs to be done?" onKeyUp={()=>{this.Searchitem()}} />
        </form>
          </div>
        )
    }
}
