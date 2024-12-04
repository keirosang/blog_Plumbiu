import { isNumber, isString } from '..'

type ClassNameArg = any
export function cn(...args: ClassNameArg[]) {
  let classname = ''
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (isString(arg) || isNumber(arg)) {
      classname && (classname += ' ')
      classname += arg
    } else if (typeof arg === 'object') {
      for (const key in arg) {
        if (arg[key]) {
          classname && (classname += ' ')
          classname += key
        }
      }
    }
  }

  return classname
}
