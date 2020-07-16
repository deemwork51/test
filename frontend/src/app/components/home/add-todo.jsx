import React, { Component } from 'react';
import { connect } from "react-redux";
import * as todoActions from "../../redux/actions/todo-actions";

import { bindActionCreators } from "redux";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { isEmpty } from "lodash"
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
class addTodoDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            order: '',
            eventModalData: {},
            isshowModal:false
        };
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addUser = this.addUser.bind(this);
    }

    handleChange(e) {
        if (e.target.id === 'name') {
            this.setState({ name: e.target.value })
        }
     
        else if (e.target.id == 'order') {
            this.setState({ order: e.target.value })
        }
        else {

        }

    }
    async addUser(action) {
        const { name ,order} = this.state
        var data = {"todoName": name ,"order":order}
        if (action === "add") {
            await this.props.addTodo(data)
        }
        else {
            await this.props.updateTodo(data, this.state.todoModalData.id)
        }
        this.setState({ name: '', description: '' })
        this.handleModalClose()
    }
    async handleModalClose() {

        await this.props.hideAddTodoModal()

        this.setState({ name: '', description: "", })


    }
    componentWillReceiveProps(nextProps) {

        this.setState({ todoModalData: nextProps.todoModalData,name:nextProps.todoModalData!=undefined?nextProps.todoModalData.name:"",order:nextProps.todoModalData!=undefined? nextProps.todoModalData.sequence :""})
        this.setState({ isshowModal: nextProps.isshowModal });
    }

    render() {
        return (
            isEmpty(this.state.todoModalData) !== true ?
                <div>
                    <Dialog
                        open={this.state.isshowModal}
                        onClose={this.handleModalClose}
                        aria-labelledby="form-dialog-title"

                    >
                        <div style={{ width: 500 }}>
                            <DialogTitle id="form-dialog-title"><Grid container>
                                <Grid item xs={10}>Update Todo</Grid>
                                <Grid item xs={2}>
                                    <Tooltip title="Cancel"><IconButton onClick={this.handleModalClose} ><CancelIcon /></IconButton></Tooltip>
                                </Grid></Grid>
                            </DialogTitle>
                            <ValidatorForm
                                ref="form"
                                onSubmit={(e) => this.addUser('update')}
                                onError={errors => console.log(errors)}
                            >
                                <DialogContent>

                                <TextValidator
                                        //autoFocus
                                        margin="dense"
                                        id="name"
                                        value={this.state.name}
                                        label="Name"
                                        type="text"
                                        validators={['required']}
                                        errorMessages={['This field is required']}
                                        
                                        fullWidth
                                        onChange={this.handleChange}
                                    />
                                    <TextValidator
                                        //autoFocus
                                        margin="dense"
                                        id="order"
                                        disabled
                                        value={this.state.order}
                                        label="Order"
                                        type="number"
                                        validators={['required']}
                                        errorMessages={['This field is required']}
                                        fullWidth
                                        InputProps={{ inputProps: { min: 1} }}
                                        onChange={this.handleChange}
                                    />

                                </DialogContent>
                                <DialogActions>
                                    <Grid xs={7}>
                                        <Button style={{ marginLeft: '-30px' }} variant="contained"  size="medium" type="submit"  >Update Todo</Button>
                                    </Grid>

                                </DialogActions> </ValidatorForm></div>
                    </Dialog>
                </div> : <div>
                    <Dialog
                        open={this.state.isshowModal}
                        onClose={this.handleModalClose}
                        aria-labelledby="form-dialog-title"

                    >
                        <div style={{ width: 500 }}>
                            <DialogTitle id="form-dialog-title"><Grid container>
                                <Grid item xs={10}>Add Todo</Grid>
                                <Grid item xs={2}>
                                    <Tooltip title="Cancel"><IconButton onClick={this.handleModalClose} ><CancelIcon /></IconButton></Tooltip>
                                </Grid></Grid>
                            </DialogTitle>
                            <ValidatorForm
                                ref="form"
                                onSubmit={(e) => this.addUser('add')}
                                onError={errors => console.log(errors)}
                            >
                                <DialogContent>
                                    <TextValidator
                                        //autoFocus
                                        margin="dense"
                                        id="name"
                                        value={this.state.name}
                                        label="Name"
                                        type="text"
                                        validators={['required']}
                                        errorMessages={['This field is required']}
                                        fullWidth
                                        onChange={this.handleChange}
                                    />
                                    <TextValidator
                                        //autoFocus
                                        margin="dense"
                                        id="order"
                                        value={this.state.order}
                                        label="Order"
                                        type="number"
                                        validators={['required']}
                                        errorMessages={['This field is required']}
                                        InputProps={{ inputProps: { min: 1 } }}
                                        fullWidth
                                        onChange={this.handleChange}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Grid xs={7}>
                                        <Button style={{ marginLeft: '-30px' }} variant="contained"  size="medium" type="submit" >Add Todo</Button>
                                    </Grid>

                                </DialogActions></ValidatorForm></div>
                    </Dialog>
                </div>
        )

    }

}
addTodoDialog.propTypes = {
};
function mapStateToProps(state) {
    return {
        isshowModal: state.todo.isshowModal,
        todoModalData: state.todo.todoModalData
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ ...todoActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps, null, { ref: true })((addTodoDialog));