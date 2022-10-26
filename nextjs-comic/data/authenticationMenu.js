import LoginModal from '@/components/Menu/LoginModal'
import Menu from '@/components/Menu/Menu'
import SignupModal from '@/components/Menu/SignupModal'
import { publicRoutes } from '@/lib/utils/getRoutes'
import { FaFacebook, FaGoogle, FaUser, FaUserPlus } from 'react-icons/fa'

export const LOGIN_MODAL = {
  title: 'Login',
  data: [
    {
      type: 'LOGIN MODAL',
      comp: LoginModal,
    },
  ],
}
export const SIGNUP_MODAL = {
  title: 'Signup',
  data: [
    {
      type: 'SIGNUP MODAL',
      comp: SignupModal,
    },
  ],
}

export const DEFAULT_MENU_ITEMS = [
  {
    title: 'Login',
    type: 'modal',
    comp: Menu,
    children: {
      title: 'Login',
      data: [
        {
          title: 'Use username',
          icon: <FaUser size={16}></FaUser>,
          parentType: 'modal',
          type: 'LOGIN BY USERNAME',
          children: LOGIN_MODAL,
        },
        {
          title: 'Continue with Google',
          icon: <FaGoogle size={16}></FaGoogle>,
          parentType: 'modal',
          type: 'LOGIN BY GOOGLE',
        },
        {
          title: 'Continue with Facebook',
          icon: <FaFacebook size={16}></FaFacebook>,
          parentType: 'modal',
          type: 'LOGIN BY FACEBOOK',
        },
      ],
    },
  },
  {
    title: 'Register',
    type: 'modal',
    comp: Menu,
    children: {
      title: 'Register',
      data: [
        {
          title: 'Signup by username',
          icon: <FaUserPlus size={16}></FaUserPlus>,
          parentType: 'modal',
          type: 'SIGNUP BY USERNAME',
          children: SIGNUP_MODAL,
        },
        {
          title: 'Continue with Google',
          icon: <FaGoogle size={16}></FaGoogle>,
          parentType: 'modal',
          type: 'SIGNUP BY GOOGLE',
        },
        {
          title: 'Continue with Facebook',
          icon: <FaFacebook size={16}></FaFacebook>,
          parentType: 'modal',
          type: 'SIGNUP BY FACEBOOK',
        },
      ],
    },
  },
  {
    title: 'Settings',
  },
]

export const USER_ITEMS = [
  {
    title: 'Your Profile',
    to: publicRoutes.profile.path,
  },
  {
    title: 'Buy Coin',
    to: publicRoutes.buycoin.path,
  },
  {
    title: 'Sign Out',
    type: 'LOGOUT',
  },
]
