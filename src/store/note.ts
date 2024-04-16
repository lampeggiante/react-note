import { produce } from "immer"
import { create } from "zustand"
import { persist, devtools, createJSONStorage } from "zustand/middleware"

export interface NoteType {
  user_id: number | undefined
  noteId: number | undefined
  noteTitle: string | undefined
  noteContent: string | undefined
  isStar: boolean | undefined
  isTrash: boolean | undefined
}

interface NoteState {
  user_id: number | undefined
  username: string | undefined
  email: string | undefined
  latestNoteId: number
  noteArray: NoteType[]
  initUserInfo: (params: {
    user_id: number | undefined
    username: string | undefined
    email: string | undefined
    latestNoteId: number
    noteArray: NoteType[]
  }) => void
  updateLatestId: (params: number) => void
  addNote: (params: NoteType) => void
  editNote: (params: NoteType) => void
  delNote: (params: number) => void
}

const useNoteStore = create<NoteState>()(
  devtools(
    persist(
      (set: (produce: any) => void) => ({
        user_id: undefined,
        username: undefined,
        email: undefined,
        latestNoteId: 0,
        noteArray: [
          {
            user_id: undefined,
            noteId: 0,
            noteTitle: "项目介绍",
            noteContent:
              "###### 写在前面\n\n本项目是一个纯前端项目，用于练手 `react` ，写这个项目参考了几篇掘金的文章，如下：\n\n* 首先是，在掘金上看到了这个项目，于是就拉下来看了一下，总体来说涵盖了各类 `React` 钩子函数，适合用来练手。[📝 ‎ A web-based notes app for developers.](https://github.com/taniarascia/takenote)\n* 但是这个项目的技术栈相对来说比较老了，最新的 `Vite` 工具能够帮助我们更好地开发，于是我就参考了一篇掘金的文章，根据他的介绍搭建了这个项目。[Vite5.0+Typescript+React18+Zustand 最新搭建企业级前端项目](https://juejin.cn/post/7306033185934802955)\n* 在这个过程中我遇到了一个难题，也就是 `怎么去写一个MarkDown` 编辑器，相对来说还是比较困难的，于是我又参考了另外一个大佬的文章，根据 `markdown-it` 开源库搭了一个自己的 `MarkDown` 编辑和预览环境。\n* 项目中还有涉及到生成ID问题，每一个笔记需要使用ID区分，由于没有后端支持，本项目使用JS自带的 `new Date()` 函数生成了初始ID，并自增用以生成唯一ID，参考了这篇文章。[js 唯一id生成](https://juejin.cn/s/js%20%E5%94%AF%E4%B8%80id%E7%94%9F%E6%88%90)\n* 之后就是按部就班地搭建项目，最后把项目放在了 `gh-pages` 上面，参考了这两篇文章。[GitHub Pages如何部署Vite项目](https://juejin.cn/post/7077143588093558815#heading-1)、\n[github push 代码出现fatal: Authentication failed for ‘https://github.com/xxx/xxx.git/'](https://www.cnblogs.com/gentlescholar/p/16541434.html)\n\n# 项目技术栈\n\n- [x] `React 18`: 这个没什么好说的了，里面用了几个钩子函数，`useState`，`useEffect`，`useCallback`，`useRef`\n\n- [x] `react-router-dom`，主要使用 `react-router-dom` 作为导航实现跳转\n\n- [x] `zustand` 听说这个相较于 `redux` 会更加的轻量，所以就使用了 `zustand` 结合 `immer` 构成了状态管理工具\n\n- [x] `vite 5.0` 写这个项目的时候刚好看到了使用 `vite` 搭建的教程，就使用 `vite` 尝试一下，最终也是发现 `vite` 的搭建速度相较于 `webpack` 快了不止一星半点，而且对于电脑性能要求也比较低，我的轻薄本CPU的型号是 `i5-1135G7`， 在项目编译打包的过程中也没有任何发热情况。\n\n- [x] `sass` 因为之前写的项目使用的是 `sass`，对这个比较熟悉，于是就用这个来编写样式\n\n- [x] 最后就是说一下本项目之所以为纯前端项目，是因为数据仅保留在 `localStorage` 中，并没有为这个项目专门搭建后端，所有数据都会保留在浏览器端。\n\n# 项目功能\n\n## 基础功能\n\n使用 `MarkDown` 记录笔记，管理笔记，实现了收藏和回收的功能，可以在笔记和收藏页面对笔记进行预览。\n\n## 编辑器功能\n\n- 编辑器采用了 Typora 自定义主题 `Alise.css`，有兴趣可以去 `Typora Theme` 官网查看更多的主题\n\n- 编辑器最后采取的是左编辑右预览的界面，纯编辑和纯预览或者是全屏展示需要进一步完善...\n\n- 加粗、倾斜、删除线等功能可以包裹文字，实现对应特效\n\n- 还可以通过点击按钮实现无序列表和有序列表、任务清单、已完成任务的编辑\n\n- 图片和超链接，可以通过点击按钮实现，再编辑文字和超链接即可在右侧展示对应效果\n\n- 代码块，写了一些常见的代码块名称，如果里面的要求不能实现可以自己用```包裹\n\n- 下载和上传md文件，上传后将会直接替代当前在编辑的MD，请谨慎上传，同时支持下载当前MD到本地\n\n## 待实现的功能\n\n- 切换主题\n- 切换 MD 预览风格\n",
            isStar: false,
            isTrash: false,
          },
          {
            user_id: undefined,
            noteId: 1,
            noteTitle: "demo",
            noteContent: "Hello world!",
            isStar: false,
            isTrash: false,
          },
        ],
        initUserInfo: (params: any) =>
          set(
            produce((state: any) => {
              state.user_id = params.user_id || undefined
              state.username = params.username || undefined
              state.email = params.email || undefined
              state.latestNoteId = params.latestNoteId || undefined
              state.noteArray = [...params.noteArray] || []
              state.updateLatestId(params.latestNoteId)
            }),
          ),
        updateLatestId: (latestNoteId: number) =>
          set(
            produce((state: any) => {
              state.latestNoteId = latestNoteId
            }),
          ),
        addNote: (params: NoteType) => {
          set(
            produce((state: any) => {
              state.noteArray.push(params)
            }),
          )
        },
        editNote: (note: NoteType) => {
          set(
            produce((state: any) => {
              for (let i = 0; i < state.noteArray.length; i++) {
                if (state.noteArray[i].noteId === note.noteId) {
                  state.noteArray[i] = note
                }
              }
            }),
          )
        },
        delNote: (id: number) => {
          set(
            produce((state: any) => {
              for (let i = 0; i < state.noteArray.length; i++) {
                if (state.noteArray[i].noteId === id) {
                  state.noteArray.splice(i, 1)
                }
              }
            }),
          )
        },
      }),
      {
        name: "NOTESTORE",
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
)

export default useNoteStore
