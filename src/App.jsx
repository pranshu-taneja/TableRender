import React, { useEffect, useState } from 'react'
import CustomTable from "./Components/CustomTable"
import "./App.css"

function MainApp() {
  const [tableData, setTableData] = useState([]); // Your table data fetched from API

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://assets.alippo.com/catalog/static/data.json");
        const data = await response.json();
        setTableData(data);
        return data;
      } catch (err) {
        alert("Error, Please Try again later!!")
        console.log("Error:", err)
      }
    }
    fetchData();
  }, [])


  return (
    <div className='mainWrapper'>
      <h1>Table being Rendered👇</h1>
      {tableData.length ?
        (<CustomTable
          tableData={tableData}
          setTableData={setTableData}
        />
        ):
        (<div>No Data!!</div>)}
    </div>
  );
}

export default MainApp;
