import React, { useState } from 'react';
import "./styles/CustomTable.css";
import { v4 as uuidv4 } from 'uuid';
import Modal from './Modal';
import ReactDOM from 'react-dom'; // Import ReactDOM to use React Portals

const modalRoot = document.getElementById('modal-root') || document.body;

function CustomTable({ tableData, setTableData }) {
  // Modal state management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  // Modal utilities
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingRowIndex(null);
    document.getElementsByTagName('body')[0].style.overflow = 'scroll';
  };

  const openModal = (rowIndex, deleteMode) => {
    setIsModalOpen(true);
    setIsDeleteMode(deleteMode);
    setEditingRowIndex(rowIndex);
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
  };

  const handleModalSubmit = (newValue) => {
    setTableData((prevData) => {
      const editedData = [...prevData];
      editedData[editingRowIndex] = { ...editedData[editingRowIndex], name: newValue };
      return editedData;
    });
    closeModal();
  };

  const handleDeleteData = () => {
    setTableData((prevData) => {
      const editedData = [...prevData];
      editedData.splice(editingRowIndex, 1);
      return editedData;
    });
    closeModal();
  };

  // Table rendering utilities
  function renderHeader() {
    const HeaderArray = ['SL No.', ...Object.keys(tableData[0]), 'action'];
    const HeaderComp = HeaderArray.map((val) => (
      <th key={uuidv4()}>{val}</th>
    ));
    return HeaderComp;
  }

  function createEditDelButton(index) {
    return (
      <td className='EditDeleteBtn'>
        <button onClick={() => { openModal(index, false); }}>Edit</button>
        <button onClick={() => { openModal(index, true); }}>Delete</button>
      </td>
    );
  }

  function renderTableData() {
    let AllTablesRow = [];

    for (let i = 0; i < tableData.length; i++) {
      const TableDataWithSN = [i + 1, ...Object.values(tableData[i])];
      const TableRowComp = TableDataWithSN.map((val) => (
        <td key={uuidv4()}>{val ? val : "-"}</td>
      ));

      TableRowComp.push(createEditDelButton(i)); // Add create and delete buttons to the last column

      const RowWrapper = <tr key={uuidv4()}>{TableRowComp}</tr>;
      AllTablesRow.push(RowWrapper);
    }
    return AllTablesRow;
  }

  // Render the table and modal using React Portals
  return (
    <div>
      <div className='renderModal'>
        {isModalOpen &&
          ReactDOM.createPortal(
            <Modal
              editingRowIndex={editingRowIndex}
              closeModal={closeModal}
              handleModalSubmit={handleModalSubmit}
              isDeleteMode={isDeleteMode}
              handleDeleteData={handleDeleteData}
              curIndexValue={{ index: editingRowIndex, value: tableData[editingRowIndex]?.name }}
            />,
            modalRoot
          )
        }
      </div>

      <div className='customTableMainWrapper'>
        <table>
          <thead>
            <tr>
              {renderHeader()}
            </tr>
          </thead>
          <tbody>
            {tableData.length ? renderTableData() : "No Data Available"}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomTable;
