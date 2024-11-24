import { useState } from 'react'
import './App.css'

import {useTable} from "react-table";
import * as React from "react";
import axios from "axios";

function App() {

  const [tasks,setTasks]=useState([]);
  const columns=React.useMemo(()=>[
    {Header:"TaskId", accessor:"task_id"},
    {Header:"Category",accessor:"category"},
    {Header:"Description",accessor:"details"},
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ value }) => (value ? "Yes" : "No"), 
    },
    {
      Header: "Persistence",
      accessor: "persistence",
      Cell: ({ value }) => (value ? "Yes" : "No"), 
    }
  ],[]);
  const data=React.useMemo(()=>tasks,[tasks]);
  const {getTableProps,getTableBodyProps,headerGroups,rows,prepareRow}=useTable({columns,data:tasks});

  const getAllTasks=()=>{
    axios.get("http://localhost:8080/tasks").then((res)=>{
      console.log(res.data);
      setTasks(res.data);
    });
  }

  React.useEffect(()=>{
    getAllTasks();
  },[]);

  return (
    <>
     <div className="main-container">
      <h2>Task Trakcer</h2>
      <div className="add-panel">
        <div className="addpaneldiv">
          <label htmlFor="category">Category</label><br></br>
          <input className='addpanelinput' type="text" name="category" id="category" />
        </div>
        <div className="addpaneldiv">
          <label htmlFor="description">Description</label><br></br>
          <input className='addpanelinput descripton' type="text" name="description" id="description" />
        </div>
        <button className="Btn add">Add</button>
        <button className="Btn cancle">Cancle</button>
      </div>
      {/* <input className='searchinput' type="search" name="inputsearch" id="inputsearch" placeholder='Search here'/> */}
     </div>
     <table className='table' {...getTableProps()}>
      <thead>
        {headerGroups.map((hg)=>(
          <tr {...hg.getHeaderGroupProps()} key={hg.id}>
            {hg.headers.map((column)=>(
              <th {...column.getHeaderProps()} key={column.id}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
       {rows.map((row)=>{
        prepareRow(row);
        return (<tr {...row.getRowProps()} key={row.id}>
          {row.cells.map((cell)=>(
            <td {...cell.getCellProps()} key={cell.id}>{cell.render("Cell") }</td>
          ))}
        </tr>)
       })}
      </tbody>
     </table>
    </>
  )
}

export default App
