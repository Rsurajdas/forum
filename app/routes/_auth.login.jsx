import { PasswordInput, TextInput } from '@mantine/core';
import { Form, Link, useActionData } from '@remix-run/react';
import { IconAt } from '@tabler/icons-react';
import { validateUser } from '../utils/validate.server';
import { loginUser } from '../utils/auth.server';

export default function LoginPage() {
  const data = useActionData()

  return (
    <div className="w-1/3 mx-auto flex items-center justify-center">
      <Form className="w-full" method='post'>
        <div className="text-center mb-10">
          <h1 className="text-5xl font-medium">Login</h1>
        </div>

        <TextInput placeholder="Email" name='email' rightSection={<IconAt />} error={data?.credentials} />

        <PasswordInput placeholder="Password" mt="lg" variant="default" name='password' error={data?.credentials} />

        <div className="mt-2">
          <Link to="/forgotpassword" className='text-stone-700 hover:underline'>
            Forgot Password?
          </Link>
        </div>

        <div className="mt-5">
          <button type="submit" className='bg-indigo-700 w-full py-1.5 rounded-sm text-white hover:scale-101 transition-all ease-in-out active:scale-100 hover:shadow-md active:shadow-sm hover:shadow-stone-400 active:shadow-stone-300'>Login</button>
        </div>

        <div className="mt-2 text-center">
          <Link to="/signup" className='text-stone-700 hover:underline'>
            Create account
          </Link>
        </div>
      </Form>
    </div>
  );
}

export const action = async ({ request }) => {
  const formData = await request.formData()
  const credentials = Object.fromEntries(formData)

  try {
    validateUser(credentials)
  } catch (error) {
    return error
  }

  try {
    return await loginUser(credentials)
  } catch (error) {
    if (error.statusCode === 401) {
      return { credentials: error.message }
    }
  }
}
