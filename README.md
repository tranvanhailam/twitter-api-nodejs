# Setup Dự Án Node.js với TypeScript, ESLint và Prettier

ESLint giúp chuẩn hóa tiêu chuẩn code, còn Prettier định dạng code đẹp hơn. Trong một dự án nhiều người tham gia, việc sử dụng các công cụ này là rất cần thiết để đảm bảo sự thống nhất trong code.

---

## 🥇 Cấu Trúc Thư Mục Dự Án

```
📦nodejs-typescript
┣ 📂dist
┣ 📂src
┃ ┣ 📂constants
┃ ┃ ┣ 📜enum.ts
┃ ┃ ┣ 📜httpStatus.ts
┃ ┃ ┗ 📜message.ts
┃ ┣ 📂controllers
┃ ┃ ┗ 📜users.controllers.ts
┃ ┣ 📂middlewares
┃ ┃ ┣ 📜error.middlewares.ts
┃ ┃ ┣ 📜file.middlewares.ts
┃ ┃ ┣ 📜users.middlewares.ts
┃ ┃ ┗ 📜validation.middlewares.ts
┃ ┣ 📂models
┃ ┃ ┣ 📂database
┃ ┃ ┃ ┣ 📜Blacklist.ts
┃ ┃ ┃ ┣ 📜Bookmark.ts
┃ ┃ ┃ ┣ 📜Follower.ts
┃ ┃ ┃ ┣ 📜Hashtag.ts
┃ ┃ ┃ ┣ 📜Like.ts
┃ ┃ ┃ ┣ 📜Media.ts
┃ ┃ ┃ ┣ 📜Tweet.ts
┃ ┃ ┃ ┗ 📜User.ts
┃ ┃ ┣ 📜Error.ts
┃ ┃ ┗ 📜Success.ts
┃ ┣ 📂routes
┃ ┃ ┗ 📜users.routes.ts
┃ ┣ 📂services
┃ ┃ ┣ 📜bookmarks.services.ts
┃ ┃ ┣ 📜database.services.ts
┃ ┃ ┣ 📜followers.services.ts
┃ ┃ ┣ 📜hashtags.services.ts
┃ ┃ ┣ 📜likes.services.ts
┃ ┃ ┣ 📜medias.services.ts
┃ ┃ ┣ 📜tweets.services.ts
┃ ┃ ┗ 📜users.services.ts
┃ ┣ 📂utils
┃ ┃ ┣ 📜crypto.ts
┃ ┃ ┣ 📜email.ts
┃ ┃ ┣ 📜file.ts
┃ ┃ ┣ 📜helpers.ts
┃ ┃ ┗ 📜jwt.ts
┃ ┣ 📜index.ts
┃ ┗ 📜type.d.ts
┣ 📜.editorconfig
┣ 📜.env
┣ 📜.eslintignore
┣ 📜.eslintrc
┣ 📜.gitignore
┣ 📜.prettierignore
┣ 📜.prettierrc
┣ 📜nodemon.json
┣ 📜package.json
┣ 📜tsconfig.json
┗ 📜yarn.lock
```

### Giải Thích:
- **dist**: Chứa các file build.
- **src**: Chứa mã nguồn:
  - **constants**: Các file chứa hằng số.
  - **middlewares**: Các middleware (validate, check token,...).
  - **controllers**: Nhận request, gọi service để xử lý logic, trả về response.
  - **services**: Các hàm xử lý logic nghiệp vụ.
  - **models**: Các model dữ liệu.
  - **routes**: Các file định nghĩa route.
  - **utils**: Các hàm tiện ích.
- Các file khác:
  - `.editorconfig`: Cấu hình editor.
  - `.eslint*`, `.prettier*`: Cấu hình ESLint, Prettier.
  - `nodemon.json`: Cấu hình Nodemon.
  - `package.json`, `tsconfig.json`: Cấu hình chính cho dự án.

---

## 🥇 Khởi Tạo Dự Án

### 1. Tạo thư mục và khởi tạo `package.json`:
```bash
mkdir nodejs-typescript
cd nodejs-typescript
npm init -y
```

### 2. Cài đặt TypeScript:
```bash
npm install typescript --save-dev
```

### 3. Cài đặt kiểu dữ liệu cho Node.js:
```bash
npm install @types/node --save-dev
```

---

## 🥈 Cài Đặt ESLint

### 1. Chạy lệnh cài đặt ESLint:
```bash
npm init @eslint/config@latest
```

### 2. Chọn các option như sau:
- **How would you like to use ESLint?**: To check syntax and find problems.
- **What type of modules does your project use?**: JavaScript modules (import/export).
- **Which framework does your project use?**: None of these.
- **Does your project use TypeScript?**: Yes.
- **Where does your code run?**: Node.

### 3. Sau khi cài đặt, cấu hình sẽ được lưu trong file `eslint.config.mjs`:
```javascript
import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended
]
```

---

## 🥈 Cài Đặt Prettier và Các Package Khác

```bash
npm install prettier eslint-config-prettier eslint-plugin-prettier tsx tsc-alias rimraf nodemon --save-dev
```

- **prettier**: Code formatter chính.
- **eslint-config-prettier**: Tránh xung đột giữa ESLint và Prettier.
- **eslint-plugin-prettier**: Kết hợp rule của Prettier vào ESLint.
- **tsx**: Chạy TypeScript trực tiếp.
- **tsc-alias**: Xử lý alias khi build.
- **rimraf**: Xóa folder.
- **nodemon**: Tự động restart server.

---

## 🥈 Cấu Hình Các File

### 1. `tsconfig.json`
```json
{
  "compilerOptions": {
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "target": "ES2023",
    "outDir": "dist",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "baseUrl": ".",
    "paths": {
      "~/*": ["src/*"]
    }
  },
  "files": ["src/type.d.ts"],
  "include": ["src/**/*"]
}
```

### 2. `eslint.config.mjs`
```javascript
import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginPrettier from 'eslint-plugin-prettier'

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      prettier: eslintPluginPrettier
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      'prettier/prettier': [
        'warn',
        {
          arrowParens: 'always',
          semi: false,
          trailingComma: 'none',
          tabWidth: 2,
          endOfLine: 'auto',
          useTabs: false,
          singleQuote: true,
          printWidth: 120,
          jsxSingleQuote: true
        }
      ]
    },
    ignores: ['**/node_modules/', '**/dist/']
  }
]
```

### 3. `.prettierrc`
```json
{
  "arrowParens": "always",
  "semi": false,
  "trailingComma": "none",
  "tabWidth": 2,
  "endOfLine": "auto",
  "useTabs": false,
  "singleQuote": true,
  "printWidth": 120,
  "jsxSingleQuote": true
}
```

### 4. `.editorconfig`
```ini
[*]
indent_size = 2
indent_style = space
```

### 5. `nodemon.json`
```json
{
  "watch": ["src", ".env"],
  "ext": ".ts,.js",
  "ignore": [],
  "exec": "tsx ./src/index.ts"
}
```

### 6. Scripts trong `package.json`
```json
"scripts": {
  "dev": "npx nodemon",
  "build": "rimraf ./dist && tsc && tsc-alias",
  "start": "node dist/index.js",
  "lint": "eslint .",
  "lint:fix": "eslint . --fix",
  "prettier": "prettier --check .",
  "prettier:fix": "prettier --write ."
}
```

---

## 🥇 Chạy Dự Án

### 1. Chạy ở môi trường dev:
```bash
npm run dev
```

### 2. Build dự án:
```bash
npm run build
```

### 3. Kiểm tra lỗi:
- **ESLint**:
  ```bash
  npm run lint
  npm run lint:fix
  ```
- **Prettier**:
  ```bash
  npm run prettier
  npm run prettier:fix
  ```

---

## 🥇 Một Số Lưu Ý

1. **Skip kiểm tra lỗi TypeScript khi build:**
   ```json
   "build": "rimraf ./dist && tsc --noCheck && tsc-alias"
   ```

2. **Cài @types cho thư viện:**
   ```bash
   npm i @types/tên-thư-viện -D
   ```

3. **Dùng thư viện ES Module:**
   ```typescript
   const formidable = (await import('formidable')).default
   
