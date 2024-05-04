import { PasswordInput, TextInput } from '@mantine/core';
import { Form, Link } from '@remix-run/react';
import { IconAt } from '@tabler/icons-react';
import { useState } from 'react';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }
  return (
    <div className="w-1/3 mx-auto flex items-center justify-center">
      <Form className="w-full">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-medium">Login</h1>
        </div>
        <TextInput placeholder="Email" name='email' rightSection={<IconAt />} value={formData.email} onChange={(e) => handleChange(e)} />
        <PasswordInput placeholder="Password" mt="lg" variant="default" value={formData.password} onChange={(e) => handleChange(e)} name='password' />
        <div className="mt-2">
          <Link to="/forgotpassword" className='text-stone-700 hover:underline'>
            Forgot Password?
          </Link>
        </div>
        <div className="mt-5">
          <button type="submit" className='bg-indigo-700 w-full py-1.5 rounded-sm text-white hover:scale-101 transition-all ease-in-out active:scale-100 hover:shadow-md active:shadow-sm hover:shadow-stone-400 active:shadow-stone-300'>Login</button>
        </div>
      </Form>
    </div>
  );
}
