import { useState, useRef, useEffect } from "react"

import "../styles/alice.css" // 引入github的markdown主题样式
import "../styles/markdown-editor.scss"
import "highlight.js/styles/github.css"

import hljs from "highlight.js"
import markdownIt from "markdown-it"
import MarkdownItTaskCheckbox from "markdown-it-task-lists"

import NavBar from "./toolBar"

const md = new markdownIt({
  break: true,
  highlight: (code: string, language: string) => {
    if (language && hljs.getLanguage(language)) {
      try {
        return (
          `<pre><code class="hljs language-${language}">` + hljs.highlight(code, { language }).value + "</code></pre>"
        )
      } catch (__) {
        return <>{__}</>
      }
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(code) + "</code></pre>"
  },
}).use(MarkdownItTaskCheckbox, {
  // 任务列表插件
  disabled: true,
  divWrap: false,
  divClass: "checkbox",
  idPrefix: "cbx_",
  ulClass: "task-list",
  liClass: "task-list-item",
})

let scrolling: 0 | 1 | 2 = 0
let scrollTimer: ReturnType<typeof setTimeout>

const MarkdownEditor: React.FC = () => {
  const [htmlString, setHtmlString] = useState("")
  const [value, setValue] = useState("")
  const editRef = useRef<HTMLTextAreaElement>(null)
  const showRef = useRef<HTMLDivElement>(null)

  const handleEditChange = (val: string) => {
    setValue(val)
    setHtmlString(md.render(val))
  }

  const handleScroll = (block: number, event: any) => {
    const { scrollHeight, scrollTop, clientHeight } = event.target
    const scale = scrollTop / (scrollHeight - clientHeight) // 改进后的计算滚动比例的方法

    if (block === 1) {
      if (scrolling === 0) scrolling = 1
      if (scrolling === 2) return

      driveScroll(scale, showRef.current as HTMLElement)
    } else if (block === 2) {
      if (scrolling === 0) scrolling = 2
      if (scrolling === 1) return

      driveScroll(scale, editRef.current as HTMLElement)
    }
  }

  // 驱动一个元素进行滚动
  const driveScroll = (scale: number, el: HTMLElement) => {
    const { scrollHeight, clientHeight } = el
    el.scrollTop = (scrollHeight - clientHeight) * scale // scrollTop的同比例滚动

    if (scrollTimer) clearTimeout(scrollTimer)
    scrollTimer = setTimeout(() => {
      scrolling = 0
      clearTimeout(scrollTimer)
    }, 200)
  }

  useEffect(() => {
    handleEditChange(value)
  }, [value])

  return (
    <div className="mde-container">
      <NavBar value={value} setValue={setValue} editElement={editRef} />
      <div className="mde-body">
        <textarea
          className="mde-edit"
          onChange={(e) => setValue(e.target.value)}
          ref={editRef}
          onScroll={(e) => handleScroll(1, e)}
          value={value}
        />
        <div
          ref={showRef}
          className="mde-prev"
          id="write" // 新增write的ID名
          dangerouslySetInnerHTML={{ __html: htmlString }}
          onScroll={(e) => handleScroll(2, e)}
        />
      </div>
    </div>
  )
}

export default MarkdownEditor
