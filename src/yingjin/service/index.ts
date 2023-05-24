import jwt from 'jsonwebtoken'
import { getCacheConfig } from './storage/config'
import { UserRole } from './storage/model'
import { createUserByPhone, getUser } from '@/storage/mongo'
import { userDoLogin, userRegisterAccount } from '@/yingjin/api'

export async function userRegister(req, res) {
  const { phone, code, name } = req.body as { name; phone: string; code: string }
  const isRoot = phone.toLowerCase() === process.env.ROOT_USER
  // 通过手机号码跟验证码请求远程api
  // username 就是手机号

  if (getUser(phone))
    return res.send({ status: 'Fail', message: '账号已存在 | The email exists', data: null })

  try {
    const result = await userRegisterAccount({ phone, code, name })
    const { data: { msg, code, data: dt } } = result
    if (code !== 11000)
      throw new Error(msg)

	  await createUserByPhone(phone, isRoot)
	  res.send({ status: 'Success', message: '注册成功 | Register success', data: null })
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
    const { data: { msg, code, data: dt } } = apiResult
    if (code !== 11000)
      throw new Error(msg)

    const user = await getUser(phone)
    const token = jwt.sign({
      name: user.name ? user.name : user.email,
      avatar: user.avatar,
      description: user.description,
      userId: user._id,
      root: user.roles.includes(UserRole.Admin),
      config: user.config,
    }, config.siteConfig.loginSalt.trim())
    res.send({ status: 'Success', message: '登录成功 | Login successfully', data: { token } })
  }
  catch (error) {
    res.send({ status: 'Fail', message: error.message, data: null })
  }
}
