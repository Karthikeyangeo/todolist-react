
import './App.css';
import {useState} from 'react';
import {TextInput} from './routes/TextInput';
import {ToDoList} from './routes/ToDoList';
import { Switch ,Route} from 'react-router-dom';
import { NotFound } from './NotFound';
import {temp_task} from './initialData'; 
import {createContext} from 'react';
import { FilteredList } from './routes/FilteredList';


export const listContext = createContext();


function App() {

  const [taskList,setTaskList] = useState(temp_task);
  const [compStatus,setCompStatus] = useState(false);
  const [activeStatus,setActiveStatus] = useState('');

  const setChecked = (id) => {
    let item = taskList.findIndex((d, index) => index === id);
    let temp = [...taskList];
    temp[item].isCompleted = !temp[item].isCompleted;
    console.log('status',id,temp[item].isCompleted);
    setTaskList(temp);
  };
  return (
    <div className="App">
      
      <listContext.Provider value ={{taskList,setTaskList,temp_task,compStatus,setCompStatus,setChecked,activeStatus,setActiveStatus}}>     
      <TextInput />

      <Switch>
        
          <Route path = '/activeTask'>
            <FilteredList />
          </Route>
          <Route path = '/completedTask'>
              <FilteredList />
          </Route>
          <Route exact path = '/'>
              <ToDoList  />
          </Route>
          <Route path="**">
              <NotFound />
          </Route>
        
      </Switch>
      </listContext.Provider>   
    </div>
  );
}
export default App;
