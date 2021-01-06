/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
/*  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0*/
  const reg=/^[2,9]00121[0-9]{3}$/;
  return reg.test(str);
}

export function validPassword(str){
  const reg=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*#?&]{8,}$/;
  return reg.test(str)
}
