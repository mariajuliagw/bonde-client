// eslint-disable-next-line
const regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const isValidEmail = email => regexEmail.test(email)

const regexDomain = /^(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
export const isValidDomain = domain => regexDomain.test(domain)

// Validates Google Analytics Code
const regexCodeGA = /(UA|YT|MO)-\d+-\d+/i
export const isValidCodeGA = codeGA => regexCodeGA.test(codeGA)

const regexDDMMYYYY = /^\d{2}\/\d{2}\/\d{4}$/ // 00/00/0000
export const date = value => ({
  ddmmyyyy: regexDDMMYYYY.test(value)
})

// Validate email from
export const isValidFromEmail = value => {
  const regex = /^[\w ]+<(.*)>$/
  if (regex.test(value)) {
    const email = value.match(regex)[1]
    return isValidEmail(email)
  }
  return false
}
