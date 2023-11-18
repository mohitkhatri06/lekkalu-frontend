import * as React from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import { useAuthContext } from '@/hooks/use-auth'
import { Button } from '../ui/button'
import { getUserProfile } from '@/queries/auth'

export default function GoogleAuth() {
  const { signupMutation } = useAuthContext()

  const login = useGoogleLogin({
    onSuccess: async ({ access_token }) => {
      const profile = await getUserProfile(access_token)
      const dataToSubmit = {
        username: '',
        email: profile.email,
        password: '',
        first_name: profile.given_name,
        last_name: profile.family_name ?? '',
        google_id: profile.sub,
        post_type: 2,
      }

      signupMutation.mutate(dataToSubmit)
    },
  })

  return (
    <Button
      variant='outline'
      onClick={() => {
        login()
      }}
      className='w-full'
    >
      <img src='/google-icon.svg' alt='google' className='w-4 h-4 mr-2' />
      Login with Google
    </Button>
  )
}
