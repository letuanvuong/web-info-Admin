import momentjs from 'moment'

function moment(timestamp?: any, format?: any) {
  if (timestamp) {
    if (format) {
      return momentjs(timestamp, format).utcOffset('+07:00')
    }
    return momentjs(timestamp).utcOffset('+07:00')
  }
  if (format) {
    return momentjs(format).utcOffset('+07:00')
  }
  return momentjs().utcOffset('+07:00')
}

export default moment
