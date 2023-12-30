import {
  BoldOutlined,
  ItalicOutlined,
  StrikethroughOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  PlusSquareOutlined,
  CarryOutOutlined,
  LinkOutlined,
  TableOutlined,
  PictureOutlined,
  CodeOutlined,
  UploadOutlined,
  DownloadOutlined,
} from "@ant-design/icons"
import { Tooltip, Dropdown, MenuProps, message } from "antd"
import PropTypes from "prop-types"

import { CODELANGUAGE } from "@/const/var"
import { hash, handleTwoSideSymbol, addList, addLink, addTable, addPhoto, addCodeBlock } from "@/util/toolbarFunc"
import "@/styles/toolbar.scss"

interface PropsType {
  value: string
  setValue: (value: string) => void
  editElement: any
}

const ToolBar: React.FC<PropsType> = (props) => {
  const { value, setValue, editElement } = props
  const items: MenuProps["items"] = [...CODELANGUAGE]
  const onClick: MenuProps["onClick"] = ({ key }) => {
    addCodeBlock(editElement, setValue, value, key)
  }
  // 导入md文件
  const importMd = () => {
    if (!FileReader) return message.error("浏览器不支持导入md文件，请更换浏览器再试")
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".md"
    input.click()
    input.addEventListener("change", () => {
      const files = input.files as FileList
      if (!files.length) return

      const reader = new FileReader()
      reader.readAsText(files[0])
      reader.onload = () => {
        setValue(reader.result as string)
        message.success("导入成功")
      }
    })
  }
  const exportMd = () => {
    if (!Blob || !URL) return message.error("浏览器不支持导出md文件，请更换浏览器再试")
    if (!value) return message.warning("当前内容为空，无需导出")
    const blob = new Blob([value])
    const a = document.createElement("a")
    const downloadURL = URL.createObjectURL(blob)
    a.href = downloadURL
    a.download = `${hash()}.md`
    a.click()
    URL.revokeObjectURL(downloadURL)
  }
  return (
    <nav>
      <Tooltip title="加粗">
        <BoldOutlined
          className="item"
          onClick={() => handleTwoSideSymbol(editElement, setValue, value, "**", "加粗字体")}
        />
      </Tooltip>
      <Tooltip title="斜体">
        <ItalicOutlined
          className="item"
          onClick={() => handleTwoSideSymbol(editElement, setValue, value, "*", "倾斜字体")}
        />
      </Tooltip>
      <Tooltip title="删除线">
        <StrikethroughOutlined
          className="item"
          onClick={() => handleTwoSideSymbol(editElement, setValue, value, "~~", "删除文本")}
        />
      </Tooltip>
      <Tooltip title="有序列表">
        <OrderedListOutlined className="item" onClick={() => addList(editElement, setValue, value, "1.", "有序列表")} />
      </Tooltip>
      <Tooltip title="无序列表">
        <UnorderedListOutlined
          className="item"
          onClick={() => addList(editElement, setValue, value, "-", "无序列表")}
        />
      </Tooltip>
      <Tooltip title="清单列表">
        <PlusSquareOutlined
          className="item"
          onClick={() => addList(editElement, setValue, value, "- [ ]", "清单列表")}
        />
      </Tooltip>
      <Tooltip title="任务列表">
        <CarryOutOutlined className="item" onClick={() => addList(editElement, setValue, value, "- [x]", "任务列表")} />
      </Tooltip>
      <Tooltip title="超链接">
        <LinkOutlined className="item" onClick={() => addLink(editElement, setValue, value)} />
      </Tooltip>
      <Tooltip title="表格">
        <TableOutlined className="item" onClick={() => addTable(editElement, setValue, value)} />
      </Tooltip>
      <Tooltip title="图片">
        <PictureOutlined className="item" onClick={() => addPhoto(editElement, setValue, value)} />
      </Tooltip>
      <Dropdown menu={{ items, onClick }} overlayStyle={{ height: "30vh", overflow: "auto" }} placement="bottom">
        <CodeOutlined />
      </Dropdown>
      <Tooltip title="上传MarkDown">
        <UploadOutlined onClick={() => importMd()} />
      </Tooltip>
      <Tooltip title="下载MarkDown">
        <DownloadOutlined onClick={() => exportMd()} />
      </Tooltip>
    </nav>
  )
}

ToolBar.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  editElement: PropTypes.any,
}

export default ToolBar
