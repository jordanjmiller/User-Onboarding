import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const MemberForm = ({values, touched, errors, status}) => {
  const [members, setMembers] = useState([]);
  useEffect(() => {
    status && setMembers(members => [...members, status]);
  }, [status]);


  return (
    <div>
      <Form className="memberForm">
        <Field className="field" type="text" name="name" placeholder="name" />
        {touched.name && errors.name && ( <p className="error">{errors.name}</p>)}
        <br/>
        <Field className="field" type="email" name="email" placeholder="email" />
        {touched.email && errors.email && ( <p className="error">{errors.email}</p>)}
        <br/>
        <Field className="field" type="password" name="password" placeholder="password" />
        {touched.password && errors.password && ( <p className="error">{errors.password}</p>)}
        <br/> <br/>
        <label> Role: <br/>
          <Field component="select"  name="role">
            <option>Please Choose an Option</option>
            <option value="Instructor">Instructor</option>
            <option value="Team Lead">Team Lead</option>
            <option value="Student">Student</option>
          </Field>
        </label>
        <br/> <br/>
        <label className="field">
          <Field
            type="checkbox"
            name="tos"
            checked={values.tos}
          />
          <span className="checkmark" />
          Terms of Service
        </label>
        <br/>
        <button type="submit">Submit!</button>
      </Form>

      {members.map((mem, index) => (
        <ul key={index}>
          <li>Name: {mem.name}</li>
          <li>Email: {mem.email}</li>
          <li>Password: {mem.password}</li>
          <li>Role: {mem.role}</li>
        </ul>
      ))}

    </div>
  );
}

const FormikMemberForm = withFormik({
  mapPropsToValues({name, email, password, role, tos}) {
    return {
      name: name || '',
      email: email || '',
      password: password || '',
      role: role || '',
      tos: tos || false,
    };
  },

  validationSchema: Yup.object().shape({ name: Yup.string().required("Enter member's name"), 
    email: Yup.string().required('Enter an email'), password: Yup.string().required('You need to enter a password')
    }),

  handleSubmit(values, { setStatus }) {
    axios
      // values is our object with all our data on it.
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        setStatus(res.data);
        console.log(res);
      })
      .catch(err => console.log(err.response));
  }
})(MemberForm);

export default FormikMemberForm;
