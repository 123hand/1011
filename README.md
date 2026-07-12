# KYC 对公客户经理智能尽调平台

这是一个面向对公客户经理的 KYC 智能尽调与客户开发工作台，支持企业查询、客户画像、客户开发策略、访前学习调查报告打印、培训训练和静态部署。

## 本地运行

```powershell
cd <项目目录>
& "G:\大创\python.exe" kyc_server.py
```

浏览器打开：

```text
http://127.0.0.1:8000/
```

## 静态部署

```powershell
npm run build
```

发布 `dist/` 目录，或上传 `kyc_platform_static.zip`。

## 说明

- `file_store/company_records.json` 与 `file_store/company_records.js` 为公开企业样例数据。
- 本平台仅用于业务辅助分析，最终业务决策须以行内审批结论为准。
