import "../styles/alice.css" // 引入github的markdown主题样式
import "../styles/markdown-editor.scss"
import "highlight.js/styles/github.css"

import hljs from "highlight.js"
import markdownIt from "markdown-it"
import MarkdownItTaskCheckbox from "markdown-it-task-lists"
import PropTypes from "prop-types"

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

interface PropsType {
  value: string
}

const MarkdownViewer: React.FC<PropsType> = ({ value }) => {
  const htmlString = md.render(value)
  return <div id="write" dangerouslySetInnerHTML={{ __html: htmlString }}></div>
}

MarkdownViewer.propTypes = {
  value: PropTypes.string.isRequired,
}

export default MarkdownViewer
