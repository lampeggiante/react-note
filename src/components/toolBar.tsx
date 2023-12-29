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
import { Tooltip, Dropdown, MenuProps } from "antd"
import PropTypes from "prop-types"

import { CODELANGUAGE } from "@/const/var"
import { handleTwoSideSymbol, addList, addLink, addTable, addPhoto, addCodeBlock } from "@/util/toolbarFunc"
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
        <UploadOutlined onClick={() => {}} />
      </Tooltip>
      <Tooltip title="下载MarkDown">
        <DownloadOutlined onClick={() => {}} />
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
