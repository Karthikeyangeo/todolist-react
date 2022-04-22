import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import {IconButton} from '@mui/material';
import { useContext } from 'react';
import { listContext } from '../App';

export function FilteredList() {

    const {taskList,setTaskList,setChecked,compStatus,setCompStatus,activeStatus} = useContext(listContext);
    
    return(
        <div className="table_container">
           <table>
           <thead>
                <tr>
                    <th>Status</th>
                    <th>Task</th>
                    <th>Remove</th>
                </tr>
            </thead>
                {taskList.map((e,index) => {
                    //  Ternary operator is used to show based on the active status 
                    const hiddenStatus = activeStatus ? e.isCompleted : !e.isCompleted;
                   
                    
                return (
                    <tbody key={index}>
                    {/* using hidden element , list is displayed based on the completed status */}
                    <tr hidden={hiddenStatus}>
                    
                    <td><Checkbox 
                        defaultChecked={e.isCompleted}
                        onChange={() => {
                            setChecked(index)
                            setCompStatus(!compStatus)
                            console.log(index)
                            setTaskList(taskList)
                           
                        }}
                        
                    />
                    
                    </td>
                    <td
                        style={{
                            textDecoration: e.isCompleted ? "line-through" : "none"
                        }}
                    >
                            {e.newTask}</td>
                        <td>
                            <IconButton color='error'
                                onClick ={()=>{
                                    console.log(index);
                                    const removeIndex = index;
                                    const remainingTask = taskList.filter(
                                          (mv,id)=> id !== removeIndex);
                                        setTaskList(remainingTask);
                                }}>
                            < DeleteIcon />
                            </IconButton>
                        </td>
                    </tr>
                    </tbody>
                )
                })}
            </table>
        </div>
    )

    
}