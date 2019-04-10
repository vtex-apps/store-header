export const safelyGetBlockClass = (blockClass: string) =>
  blockClass ? blockClass.split(' ')[0] : ''

export const generateBlockClass = (baseClass: string, blockClass?: string) =>
  blockClass
    ? `${baseClass} ${baseClass}--${safelyGetBlockClass(blockClass)}`
    : baseClass

export interface BlockClass {
  blockClass?: string
}
