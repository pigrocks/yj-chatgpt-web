export default {
  common: {
    add: '添加',
    addSuccess: '添加成功',
    edit: '编辑',
    editSuccess: '编辑成功',
    delete: '删除',
    deleteSuccess: '删除成功',
    save: '保存',
    test: '测试',
    saveSuccess: '保存成功',
    reset: '重置',
    action: '操作',
    export: '导出',
    exportSuccess: '导出成功',
    import: '导入',
    importSuccess: '导入成功',
    clear: '清空',
    clearSuccess: '清空成功',
    yes: '是',
    no: '否',
    confirm: '确定',
    download: '下载',
    noData: '暂无数据',
    wrong: '好像出错了，请稍后再试。',
    success: '操作成功',
    failed: '操作失败',
    register: '注册',
    login: '登录',
    notLoggedIn: '登录 / 注册',
    logOut: '退出登录',
    unauthorizedTips: '未经授权，请先进行验证。',
    email: '邮箱',
    password: '密码',
    passwordConfirm: '确认密码',
    resetPassword: '重置密码',
    resetPasswordMail: '发送重置密码邮件',
  },
  chat: {
    newChatButton: '新建聊天',
    placeholder: '来说点什么吧...（Shift + Enter = 换行，"/" 触发提示词）',
    placeholderMobile: '来说点什么...',
    copy: '复制',
    copied: '复制成功',
    copyCode: '复制代码',
    clearChat: '清空会话',
    clearChatConfirm: '是否清空会话?',
    exportImage: '保存会话到图片',
    exportImageConfirm: '是否将会话保存为图片?',
    exportSuccess: '保存成功',
    exportFailed: '保存失败',
    usingContext: '上下文模式',
    turnOnContext: '当前模式下, 发送消息会携带之前的聊天记录',
    turnOffContext: '当前模式下, 发送消息不会携带之前的聊天记录',
    deleteMessage: '删除消息',
    deleteMessageConfirm: '是否删除此消息?',
    deleteHistoryConfirm: '确定删除此记录?',
    clearHistoryConfirm: '确定清空聊天记录?',
    preview: '预览',
    showRawText: '显示原文',
    usageEstimate: '预估',
    usagePrompt: '提问',
    usageResponse: '回复',
    usageTotal: '总消耗 token',
    deleteUser: '删除用户',
    setUserRole: '设置权限',
    deleteUserConfirm: '你确定要删除这个用户吗?',
    verifiedUser: '通过验证',
    deleteKey: '删除 Key',
    editKeyButton: '编辑 Key',
    deleteKeyConfirm: '你确定要删除这个 key 吗?',
  },
  setting: {
    setting: '设置',
    general: '总览',
    advanced: '高级',
    statistics: '统计',
    config: '基本配置',
    siteConfig: '网站配置',
    mailConfig: '邮箱配置',
    auditConfig: '敏感词审核',
    avatarLink: '头像链接',
    name: '名称',
    description: '描述',
    role: '角色设定',
    temperature: '思维发散程度',
    saveUserInfo: '保存用户信息',
    top_p: 'Top_p',
    chatHistory: '聊天记录',
    theme: '主题',
    language: '语言',
    api: 'API',
    reverseProxy: '反向代理',
    timeout: '超时(ms)',
    socks: 'Socks',
    socksAuth: 'Socks 授权',
    httpsProxy: 'HTTPS Proxy',
    balance: 'API余额',
    statisticsPeriod: '统计时间段',
    statisticsPeriodLastMonth: '上月',
    statisticsPeriodCurrentMonth: '本月',
    statisticsPeriodLast30Days: '最近30天',
    statisticsPrompt: '提问',
    statisticsCompletion: '回答',
    statisticsTotal: '总计',
    smtpHost: 'Host',
    smtpPort: 'Port',
    smtpTsl: 'Tsl',
    smtpUserName: '账号',
    smtpPassword: '密码/专用密码',
    siteTitle: '网站标题',
    siteDomain: '域名 不含/',
    registerEnabled: '新用户',
    registerReview: '新用户审核',
    registerMails: '邮箱后缀',
    apiBaseUrl: '接口地址',
    apiModel: '接口类型',
    accessToken: 'Access Token',
    loginEnabled: '注册登录',
    loginSalt: '登录混淆盐',
    loginSaltTip: '变更会导致所有已登录失效',
    monthlyUsage: '本月使用量',
    auditEnabled: '第三方',
    auditProvider: '提供商',
    auditApiKey: 'Api Key',
    auditApiSecret: 'Api Secret',
    auditTest: '测试文本',
    auditBaiduLabel: '二级分类',
    auditBaiduLabelTip: '英文逗号分隔, 如果空, 仅政治',
    auditBaiduLabelLink: '查看细分类型',
    auditCustomizeEnabled: '自定义',
    auditCustomizeWords: '敏感词',
    accessTokenExpiredTime: '过期时间',
    userConfig: '用户管理',
    keysConfig: 'Keys 管理',
    userRoles: '用户权限',
    status: '状态',
    chatModels: '对话模型',
  },
  store: {
    siderButton: '提示词商店',
    local: '本地',
    online: '在线',
    title: '标题',
    description: '描述',
    clearStoreConfirm: '是否清空数据？',
    importPlaceholder: '请粘贴 JSON 数据到此处',
    addRepeatTitleTips: '标题重复，请重新输入',
    addRepeatContentTips: '内容重复：{msg}，请重新输入',
    editRepeatTitleTips: '标题冲突，请重新修改',
    editRepeatContentTips: '内容冲突{msg} ，请重新修改',
    importError: '键值不匹配',
    importRepeatTitle: '标题重复跳过：{msg}',
    importRepeatContent: '内容重复跳过：{msg}',
    onlineImportWarning: '注意：请检查 JSON 文件来源！',
    downloadError: '请检查网络状态与 JSON 文件有效性',
  },
}
