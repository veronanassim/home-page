import CredentialsProvider from 'next-auth/providers/credentials'
import { NuxtAuthHandler } from '#auth'

const {baseURL} = useRuntimeConfig().public;

export default NuxtAuthHandler({
  pages: {
    signIn:'/login',
  },
  providers: [
    CredentialsProvider.default({
      username: 'Credentials',
      async authorize (credentials: any) {
        const response = await $fetch(`${baseURL}/dashboard/auth/login`,
          {
            method: 'POST',
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
              g_recaptcha_response: credentials.g_recaptcha_response
            }),
            headers: { 'Content-Type': 'application/json', lang: credentials.lang  },
          }
        ).then((result) => {
          return result
        }).catch((error) => {
          return error.data
        })
        
        if(response.error === false){
          return await response
        }else{
          return null;
        }
      }
    })
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      return  token;
      
    },
    session: async ({ session, token }: any) => {
      session.user = token.user.user
      session.access_token = token.user.user.access_token
      session.error = token.user.error







      return session
    },
  },
  events: {}

})







