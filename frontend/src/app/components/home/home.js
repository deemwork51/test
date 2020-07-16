import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from "react-redux";
import * as todoActions from "../../redux/actions/todo-actions";
import { bindActionCreators } from "redux";
import AddTodoModal from "./add-todo.jsx"
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import CreateIcon from '@material-ui/icons/Create';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newTodo: '',
            todoList:[]
        }
        this.onDragEnd = this.onDragEnd.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
    }

    componentDidMount() {
        this.intialize()
    }

    componentWillReceiveProps(nextProps) {

      this.setState({ todoList: nextProps.todoList})
    
  }
    async intialize(){
        await this.props.getTodo()
        this.setState({todoList:this.props.todoList})
    }

    handleChange = (e) => {
        this.setState({ newTodo: e.target.value })
    }

    addNewTodo(row) {
        this.props.showAddTodoModal(row)
      }

      async onDragStart(fromIndex, toIndex) {
        this.state.startTime = new Date().getTime();
      }
    
      async onDragEnd(fromIndex, toIndex) {
        var that = this;
    
        if (fromIndex.oldIndex == fromIndex.newIndex) {
    
          return;
        }
        await that.props.reorderTodo(
          
            that.state.todoList[fromIndex.oldIndex].id,
            that.state.todoList[fromIndex.newIndex].id,
        )
      }

      _bindTodo(todoList) {
        const SortableContainer = sortableContainer(({ children }) => {
          return <div className="drag-list">{children}</div>;
        });
        const SortableItem = sortableElement(({ value,index}) => (
          <div>
          
          <li className="processDragList">
            <div className="listTypeName" >
              <div className="name">
                <span>{value.name}</span>
                
              </div>
              <Button onClick={(e) => this.addNewTodo(value)} ><CreateIcon/> </Button>
              
            </div>
            
          </li >
          </div>
        ))
        return (
          <SortableContainer
            useDragHandle={false}
            helperClass={"processDragList dragHelper"}
            axis={"y"}
            
            onSortEnd={(e) => { this.onDragEnd(e); }}
            onSortStart={this.onDragStart}
            pressDelay={200}
          >
             {todoList.map((todo, index) => (
             <SortableItem key={`item-${index}`} index={index}  value={todo} />
            ))}
          </SortableContainer>
        );
    
      }  
   
    render() {
      if(localStorage.getItem('taskUser')==null || localStorage.getItem('taskUser')=='' ){
        this.props.history.push('/login')
      }
        return (
            <div className="component-Home">
              <span style={{marginLeft:'646px'}}>
                <Button variant="contained" onClick={()=>this.addNewTodo()} size="medium" type="submit" >
                    Add New Todo
             </Button>
             </span>
             <div className="box_content">
              <h4>Todo List</h4>
             <ul className="dutyStatusList">
                {this.state.todoList && this.state.todoList.length > 0 ? (this._bindTodo(this.state.todoList)) : ('')}
              </ul>
                </div>

             <AddTodoModal/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        todoList:state.todo.todoList
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ ...todoActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps, null, { ref: true })(Home);