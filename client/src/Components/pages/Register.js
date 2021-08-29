import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const Register = () => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const onChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      console.log('Result = ', result);
    },
    onError(err) {
      console.log('GraphQL Errors:', err.graphQLErrors[0].extensions.errors);
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  const onSubmit = e => {
    e.preventDefault();
    addUser();
  };

  return (
    <div className='form-container'>
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Register</h1>
        <Form.Input
          label='Username'
          type='text'
          placeholder='Username..'
          name='username'
          value={values.username}
          onChange={onChange}
        />
        <Form.Input
          label='Email'
          type='email'
          placeholder='Email..'
          name='email'
          value={values.email}
          onChange={onChange}
        />
        <Form.Input
          label='Password'
          type='password'
          placeholder='Password..'
          name='password'
          value={values.password}
          onChange={onChange}
        />
        <Form.Input
          label='Confirm Password'
          type='password'
          placeholder='Confirm Password..'
          name='confirmPassword'
          value={values.confirmPassword}
          onChange={onChange}
        />
        <Button type='submit' primary>
          Register
        </Button>
      </Form>
      {typeof Object.keys(errors) !== 'undefined' &&
        Object.keys(errors).length > 0 && (
          <div className='ui error message'>
            <ul className='list'>
              {Object.values(errors).map(value => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
};

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
