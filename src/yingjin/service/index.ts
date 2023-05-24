import jwt from 'jsonwebtoken'
import { getCacheConfig } from './storage/config'
import { UserRole } from './storage/model'
import { createUser, getUser } from '@/storage/mongo'
import { md5 } from '@/utils/security'

export async function userRegister(req, res) {
  const { phone, code } = req.body as { phone: string; code: string }
  const isRoot = phone.toLowerCase() === process.env.ROOT_USER
  // 通过手机号码跟验证码请求远程api
  // username 就是手机号
  // password 随机生成
  const newPassword = md5(new Date().toString()).splice(0, 16).join('')

  if (getUser(phone))
    return res.send({ status: 'Fail', message: '账号已存在 | The email exists', data: null })

  try {
	  await createUser(phone, newPassword, isRoot)
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
