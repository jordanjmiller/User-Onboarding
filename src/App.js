import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import Forms from './Components/Forms.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <p>Add new Member</p>
      <Forms />
    </div>
  );
}

export default App;
