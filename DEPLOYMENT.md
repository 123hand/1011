# KYC 平台静态部署说明

## 本地构建

```powershell
npm run build
```

构建产物位于 `dist/`，线上部署只需要发布这个目录。

## 本地预览

```powershell
npm run preview
```

浏览器打开终端输出的地址，默认是：

```text
http://127.0.0.1:4173
```

## 部署到 Netlify

1. 新建站点并连接当前项目仓库。
2. Build command 填写：`node scripts/build_static.js`
3. Publish directory 填写：`dist`
4. 部署完成后访问 Netlify 分配的域名。

也可以先执行 `npm run build`，再把 `dist/` 文件夹拖到 Netlify Drop。

## 部署到 Vercel

1. 新建项目并导入当前项目仓库。
2. Framework Preset 选择 Other。
3. Build Command 填写：`node scripts/build_static.js`
4. Output Directory 填写：`dist`
5. 部署完成后访问 Vercel 分配的域名。

## 部署到内网或自有服务器

执行：

```powershell
npm run build
```

然后将 `dist/` 目录中的文件上传到 Nginx、Apache、IIS 或对象存储静态网站目录。

## 当前发布内容

- `dist/index.html`：KYC 智能尽调平台前端页面
- `dist/file_store/company_records.js`：前端直接读取的公开企业样例数据
- `dist/file_store/company_records.json`：公开企业数据源归档

`memory/`、`sessions/`、`.agents/`、`.git/` 等本地工作文件不会进入 `dist/`，不要把整个项目根目录直接部署到公网。
