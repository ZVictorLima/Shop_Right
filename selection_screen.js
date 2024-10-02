import React from 'react';
import { Link } from 'react-router-dom';

function SelectionScreen() {
  return (
    <div>
      <h2>Select a Department</h2>
      <Link to="/departments/1">Groceries</Link>
      <Link to="/departments/2">Dairy</Link>
      {/* Add more departments as needed */}
    </div>
  );
}

export default SelectionScreen;
