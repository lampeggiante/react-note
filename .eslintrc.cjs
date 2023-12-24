module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime', // jsx补充配置
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'eslint-config-prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint', 'react-refresh', 'import', 'prettier'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'import/order': [
      'error',
      {
        // 按照分组顺序进行排列
        groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'internal', 'object', 'type'],
        pathGroups: [
          {
            pattern: 'react*', // 对含 react 的包进行匹配
            group: 'builtin', // 将其定义为builtin模块
            position: 'before' // 定义在 builtin 模块中的优先级
          },
          {
            pattern: '@/components/**',
            group: 'parent',
            position: 'before'
          },
          {
            pattern: '@/utils/**',
            group: 'parent',
            position: 'after'
          },
          {
            pattern: '@/apis/**',
            group: 'parent',
            position: 'after'
          }
        ],
        // 将 react 包不进行排序，并放在前排，可以保证react包放在第一排
        pathGroupsExcludeImportTypes: ['react'],
        'newlines-between': 'always', // 每个分组之间进行换行
        // 根据字母顺序对每个组内的顺序进行排序
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ],
    '@typescript-eslint/no-explicit-any': ['off'], // 允许使用 any
    '@typescript-eslint/no-non-null-assertion': 'off', // 允许使用非空断言
    'no-console': [
      // 提交时不允许有 console.log
      'warn',
      {
        allow: ['warn', 'error']
      }
    ],
    'no-debugger': 'warn'
  }
}
