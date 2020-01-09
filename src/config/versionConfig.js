
export default function (projectId) {
  const versionList = [
    {
      title: '版本管理',
      key: `/product/project/${projectId}/version`,
      icon: 'switcher'
    },
    {
      title: '错误概览',
      key: `/product/project/${projectId}/error`,
      icon: 'switcher'
    },
  ]
  return versionList
}