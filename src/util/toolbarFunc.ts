const getCursorPosition = (el: HTMLTextAreaElement) => {
  const { selectionStart, selectionEnd } = el
  return [selectionStart, selectionEnd]
}

const setSelectionRange = (
  el: HTMLTextAreaElement,
  selectionStart: number,
  selectionEnd: number,
  isFocus: boolean = true,
) => {
  const timer = setTimeout(() => {
    if (isFocus) {
      const { scrollTop } = el
      el.focus()
      el.scrollTop = scrollTop // 保持聚焦后页面不滚动到底部
    }
    el.setSelectionRange(selectionStart, selectionEnd) // 光标选中指定的文本
    clearTimeout(timer)
  }, 0)
}

export const handleTwoSideSymbol = (
  el: HTMLTextAreaElement,
  setValue: (value: string) => void,
  value: string,
  symbol: string,
  txt: string,
) => {
  const [start, end] = getCursorPosition(el)
  const newValue =
    start === end
      ? value.slice(0, start) + `${symbol}${txt}${symbol}` + value.slice(end)
      : value.slice(0, start) + symbol + value.slice(start, end) + symbol + value.slice(end)
  const selectionStart = start + symbol.length
  const selectionEnd = start === end ? end + symbol.length + txt.length : end + symbol.length
  setSelectionRange(el, selectionStart, selectionEnd)
  setValue(newValue)
}

export const addList = (
  el: HTMLTextAreaElement,
  setValue: (value: string) => void,
  value: string,
  symbol: string,
  txt: string,
) => {
  const [start, end] = getCursorPosition(el)
  const newValue =
    start === end
      ? `${value.slice(0, start)}\n${symbol} ${txt}\n${value.slice(end)}`
      : `${value.slice(0, start)}\n${symbol} ${value.slice(start, end)}\n${value.slice(end)}`
  const selectionStart = start + 2 + symbol.length
  const selectionEnd = start === end ? end + 2 + symbol.length + txt.length : end + 2 + symbol.length
  setSelectionRange(el, selectionStart, selectionEnd)
  setValue(newValue)
}

export const addLink = (el: HTMLTextAreaElement, setValue: (value: string) => void, value: string) => {
  const [start, end] = getCursorPosition(el)
  const newValue =
    start === end
      ? `${value.slice(0, start)}[链接描述文字](url)${value.slice(end)}`
      : `${value.slice(0, start)}[${value.slice(start, end)}](url)${value.slice(end)}`

  const selectionStart = start === end ? start + 9 : end + 3
  const selectionEnd = start === end ? end + 12 : end + 6

  setSelectionRange(el, selectionStart, selectionEnd)
  setValue(newValue)
}

export const addTable = (el: HTMLTextAreaElement, setValue: (value: string) => void, value: string) => {
  const [start, end] = getCursorPosition(el)
  const newValue =
    start === end
      ? `${value.slice(0, start)}\n|  |  |\n|---|---|\n|  |  |${value.slice(end)}`
      : `${value.slice(0, start)}\n| ${value.slice(start, end)} |  |\n|---|---|\n|  |  |${value.slice(end)}`

  const selectionStart = start + 3
  const selectionEnd = end + 3

  setSelectionRange(el, selectionStart, selectionEnd)
  setValue(newValue)
}

export const addPhoto = (el: HTMLTextAreaElement, setValue: (value: string) => void, value: string) => {
  const [start, end] = getCursorPosition(el)
  const newValue =
    start === end
      ? `${value.slice(0, start)}\n![图片描述](url)\n${value.slice(end)}`
      : `${value.slice(0, start)}\n![${value.slice(start, end)}](url)\n${value.slice(end)}`

  const selectionStart = start === end ? start + 9 : end + 5
  const selectionEnd = start === end ? end + 12 : end + 8

  setSelectionRange(el, selectionStart, selectionEnd)
  setValue(newValue)
}

export const addCodeBlock = (
  el: HTMLTextAreaElement,
  setValue: (value: string) => void,
  value: string,
  language: string,
) => {
  const [start, end] = getCursorPosition(el)

  const newValue =
    start === end
      ? `${value.slice(0, start)}\n\`\`\`${language}\n\n\`\`\`\n${value.slice(end)}`
      : `${value.slice(0, start)}\n\`\`\`${language}\n${value.slice(start, end)}\n\`\`\`\n${value.slice(end)}`

  const selectionStart = end + 5 + language.length
  const selectionEnd = end + 5 + language.length

  setSelectionRange(el, selectionStart, selectionEnd)
  setValue(newValue)
}

export const hash = () => {
  return Math.random().toString(36).slice(2)
}
