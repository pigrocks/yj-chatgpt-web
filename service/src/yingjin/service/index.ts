import jwt from 'jsonwebtoken'
import { userDoLogin, userRegisterAccount } from '../api'
import { getCacheConfig } from '../../storage/config'
import { UserRole } from '../../storage/model'
import { createUserByPhone, getUserByPhone } from '../../storage/mongo'

export const CHATMODELS = ['gpt-3.5-turbo', 'gpt-4', 'gpt-4-32k']

// 我们使用固定的模型
export const chatModels = [
  {
    label: 'gpt-3.5-turbo',
    key: 'gpt-3.5-turbo',
    value: 'gpt-3.5-turbo',
  },
  { label: 'gpt-4', key: 'gpt-4', value: 'gpt-4' },
  { label: 'gpt-4-32k', key: 'gpt-4-32k', value: 'gpt-4-32k' },
]

export async function userRegister(req, res) {
  const { phone, code, name } = req.body as { name; phone: string; code: string }
  const isRoot = phone.toLowerCase() === process.env.ROOT_USER
  // 通过手机号码跟验证码请求远程api
  // username 就是手机号
  const userInfo = await getUserByPhone(phone)
  globalThis.console.log('userInfo', userInfo)
  if (userInfo)
    return res.send({ status: 'Fail', message: `账号已存在 | ${phone} | The phone exists`, data: null })

  try {
    const result = await userRegisterAccount({ phone, code, name })
    const { data: { msg, code: cd, data: dt } } = result
    globalThis.console.log(result)
    if (cd !== 11000)
      throw new Error(msg)

	  const user = await createUserByPhone(phone, isRoot)
	  // res.send({ status: 'Success', message: '注册成功 | Register success', data: dt })

    globalThis.console.log('user', user)
    const config = await getCacheConfig()
    const token = jwt.sign({
      accessKey: dt.accessKey,
      name: user.name ? user.name : user.email,
      avatar: user.avatar,
      description: user.description,
      userId: user._id,
      root: user.roles.includes(UserRole.Admin),
      config: user.config,
    }, config.siteConfig.loginSalt.trim())
    res.send({ status: 'Success', message: '注册成功 | Register successfully', data: { ...dt, accessToken: dt.token, token } })
  }
  catch (e) {
    res.send({ status: 'Fail', message: e.message, data: null })
  }
}

export async function userLogin(req, res) {
  const { phone, code } = req.body as { phone: string; code: string }
  try {
    const config = await getCacheConfig()
    const apiResult = await userDoLogin({ phone, code })
    const { data: { msg, code: cd, data: dt } } = apiResult
    if (cd !== 11000)
      throw new Error(msg)

    let user = await getUserByPhone(phone)

    // 手机号本地不存在
    if (!user) {
  		const isRoot = phone.toLowerCase() === process.env.ROOT_USER
      user = await createUserByPhone(phone, isRoot)
    }

    globalThis.console.log('user', user)
    const token = jwt.sign({
      accessKey: dt.accessKey,
      name: user.name ? user.name : user.email,
      avatar: user.avatar,
      description: user.description,
      userId: user._id,
      root: user.roles.includes(UserRole.Admin),
      config: user.config,
    }, config.siteConfig.loginSalt.trim())
    res.send({ status: 'Success', message: '登录成功 | Login successfully', data: { ...dt, accessToken: dt.token, token } })
  }
  catch (error) {
    res.send({ status: 'Fail', message: error.message, data: null })
  }
}
