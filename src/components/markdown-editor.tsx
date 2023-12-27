import { useState } from "react"

import "../styles/virgo.css" // 引入github的markdown主题样式
import hljs from "highlight.js"
import "../styles/markdown-editor.scss"
import "highlight.js/styles/github.css"

import markdownIt from "markdown-it"

const md = new markdownIt({
  // 设置代码高亮的配置
  highlight: (code: string, language: string) => {
    if (language && hljs.getLanguage(language)) {
      try {
        return (
          `<pre><code class="hljs language-${language}">` + hljs.highlight(code, { language }).value + "</code></pre>"
        )
      } catch (__) {
        return <div>__</div>
      }
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(code) + "</code></pre>"
  },
})

const MarkdownEditor = () => {
  const [htmlString, setHtmlString] = useState("")

  const parse = (text: string) => setHtmlString(md.render(text))

  return (
    <div className="mde-container">
      <div className="mde-toolbar"></div>
      <div className="mde-body">
        <textarea className="mde-edit" onChange={(e) => parse(e.target.value)} />
        <div
          className="mde-prev"
          id="content" // 新增write的ID名
          dangerouslySetInnerHTML={{ __html: htmlString }}
        />
      </div>
    </div>
  )
}

export default MarkdownEditor
