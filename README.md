# mind-map-collaborative

vue3 + ts 项目, mindMap链接协同

## 推荐的 IDE 设置 

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (禁用 Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## TS 中对.vue导入的类型支持

默认情况下，TypeScript 无法处理导入的.vue类型信息，因此我们将 tsc CLI 替换为vue-tsc用于类型检查。在编辑器中，我们需要 [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) 来使 TypeScript 语言服务能够.vue识别类型。

## 自定义配置

见 [Vite 配置](https://vitejs.dev/config/).

## 项目启动

```sh
pnpm install
```

### 热启动编译开发

```sh
pnpm dev
```

### 类型检测,生产打包

```sh
pnpm build
```

### 使用 [Vitest](https://vitest.dev/) 运行单元测试

```sh
pnpm test:unit
```

### 使用 [ESLint](https://eslint.org/) 进行代码检测

```sh
pnpm lint
```

### 安装本地自签名证书

#### install mkcert
```bash
npm i mkcert -g
```

#### 生成ca证书

```bash
cd [project folder]

mkdir keys

cd keys
mkcert create-ca --organization KooMinder --country-code CN
```
> 上面的 `options` 参见[mkcert](https://github.com/liuweiGL/vite-plugin-mkcert/blob/HEAD/README-zh_CN.md)的npm文档

#### 再根据ca证书生成cert证书

```bash
# mkcert create-cert [options] # options 参见npm文档

# 如下，设置domains 注意后面一串改为自己的ip
mkcert create-cert --organization KooMinder --domains 192.168.110.13
```

#### 安装证书

- 双击ca.crt，在弹出对话框中点击“安装证书”

修改vite.config.ts

```javascript
const fs = require('node:fs')

devServer: {
  https: {
    cert: fs.readFileSync(path.join(__dirname, 'keys/cert.crt')),
    key: fs.readFileSync(path.join(__dirname, 'keys/cert.key'))
  }
}
```

####  启动本地服务
```bash
# welinkpro 和mind-map-vue3 都要安装，且使用同一个keys配置文件
npm run sever
```