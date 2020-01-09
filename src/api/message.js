import { message } from 'antd'
export const addMessage = (code, info) => {
  if (code === 700) {
    message.success(info)
  } else if (code === 701) {
    message.error(info);
  }
}
export const editMessage = (code, info) => {
  if (code === 800) {
    message.success(info)
  } else if (code === 801) {
    message.error(info);
  }
}
export const deleteMessage = (code, info) => {
  if (code === 900) {
    message.success(info)
  }
}