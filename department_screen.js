import React from 'react';
import { useParams } from 'react-router-dom';

function DepartmentScreen() {
  const { id } = useParams();
  return <h2>Items in Department {id}</h2>;
}

export default DepartmentScreen;
