export function userRegister(req, res) {
  await createUser(username, newPassword, isRoot)

  if (isRoot)
    res.send({ status: 'Success', message: '注册成功 | Register success', data: null })
}

export function loginUser() {

}

export function logoutUser() {
}
