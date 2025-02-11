'use server';
import axios from "axios";

export async function handleSignUp(prevState, formData) {
  try {
    const name = formData.get('name')
    const email = formData.get('email');
    const password = formData.get('password');
    const bio = formData.get('bio')

    const data = {email, password, name, bio}
    const json = JSON.stringify(data);
    await axios.post('http://localhost:3000/api/users', json, {
      headers: { 'Content-type': 'application/json' }
    });

    return {success: true};
  } catch (error) {
    console.log('Something went wrong', error);
    const {message} = error.response.data;
    return {
      error: message || error.response?.data
    }
  }
}

export async function handleSignIn(prevState, formData) {
  try {
    const email = formData.get('email');
    const password = formData.get('password');
    const response = await axios.get(`http://localhost:3000/api/users?email=${email}&password=${password}`);
    const token = response.headers['set-cookie'][0];
    return {
      success: true,
      token
    }
  } catch (error) {
    return {
      error: error?.response?.data || 'Something went wrong. Please try again later.'
    }
  }
}