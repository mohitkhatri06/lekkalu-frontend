export type User = {
  id: number
  email: string
  first_name: string
  is_subscribed_to_newsletter: string
  last_name: string
  preferred_currency: string
  profile: string
  username: string
}

export type GoogleUser = {
  email: string
  email_verified: boolean
  family_name: string
  given_name: string
  name: string
  picture: string
  sub: string
}
