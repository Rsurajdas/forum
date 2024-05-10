import { PasswordInput, TextInput } from '@mantine/core';
import { Form, Link, useActionData } from '@remix-run/react';
import { IconAt, IconUser } from '@tabler/icons-react';
import { createUser } from '../utils/auth.server';

export default function SignupPage() {
  const data = useActionData()

  return (
    <>
      <div className="w-1/3 mx-auto flex items-center justify-center">
        <Form className="w-full" method='post'>
          <div className="text-center mb-10">
            <h1 className="text-5xl font-medium">Sign up</h1>
          </div>

          <TextInput placeholder="Full name" name='username' rightSection={<IconUser />} error={data?.username} />

          <TextInput placeholder="Email" name='email' rightSection={<IconAt />} mt="lg" error={data?.credential || data?.email} />

          <PasswordInput placeholder="Password" mt="lg" variant="default" name='password' error={data?.password} />

          <PasswordInput placeholder="Confirm Password" mt="lg" variant="default" name='confirmpassword' error={data?.confirmpassword} />

          <div className="mt-5">
            <button type="submit" className='bg-indigo-700 w-full py-1.5 rounded-sm text-white hover:scale-101 transition-all ease-in-out active:scale-100 hover:shadow-md active:shadow-sm hover:shadow-stone-400 active:shadow-stone-300'>Submit</button>
          </div>

          <div className="mt-2 text-center">
            <Link to="/signup" className='text-stone-700 hover:underline'>
              Create account
            </Link>
          </div>
        </Form>
      </div>
    </>
  );
}

export const action = async ({ request }) => {
  const formData = await request.formData()
  const credentials = { ...Object.fromEntries(formData), role: "User" }

  try {
    return await createUser(credentials, "User");
  } catch (error) {
    return error
  }
}