import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from  "formik";
import * as yup from 'yup';
import {useHistory} from 'react-router-dom';
import { useContext } from 'react';
import { listContext } from '../App';



const formValidationSchema = yup.object({
    newTask: yup.string().required("Mandatory Field").min(2,"Please tell us more 😊 ")
})

function TextInput(){
    const {taskList,setTaskList,setActiveStatus} = useContext(listContext);  
  

    const {handleSubmit,values,handleBlur,handleChange,errors,touched,resetForm,setFieldValue} = useFormik({
        initialValues : {id:taskList.length,newTask:"",isCompleted:false},
        validationSchema:formValidationSchema,
        onSubmit :(values) => {
         
            setFieldValue('newTask',values.newTask);
            let temp = [...taskList,JSON.parse(JSON.stringify(values))]
            console.log(`temp`,temp);
            setTaskList(temp);
            console.log('taskList',taskList)
            resetForm(); // To reset the form
            
        },
    });
  

   

    // To display the active task
      const activeTask =()=>{      
        setActiveStatus(true);
        history.push('/activeTask');
      }

      // To display the completed task
      const completedTask =()=>{
        setActiveStatus(false);
        history.push('/completedTask');
    }

    const allTask =()=>{
        history.push('/');
    }

    const history = useHistory();
    return (
        <div className='container'>
            <h1 className='heading'>To Do List</h1>
            <form className='form' onSubmit={handleSubmit}>
                
                <TextField id="newTask"
                    label="New Task"
                    variant="outlined"
                    value={values.newTask}
                    onChange={handleChange}
                    onBlur = {handleBlur}
                    placeholder="Please enter new task"
                    error={errors.newTask && touched.newTask}
                    helperText = {errors.newTask && touched.newTask ? errors.newTask : ""} />  

                <Button type="submit" variant="contained" className="formButton">Add Task</Button> 
                
            </form>
            <div className='result'>
                <div className='routeButtons'>
                    <Button variant="text" size="large" onClick={()=>{allTask()}}>All</Button>
                    <Button variant="text" size="large"  onClick={()=>activeTask()}>Active</Button>
                    <Button variant="text" size="large"  onClick={()=>completedTask()}>Completed</Button>
                </div>
               
                
            </div>
            
        </div>
    );
}

export{TextInput};