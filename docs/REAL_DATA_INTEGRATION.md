# KYC平台真实数据接入方案

## 最终架构

当前平台采用三层结构：

1. **数据源层**：`kyc_app/providers.py`
   - 默认读取 `file_store/company_records.json`
   - 文件不存在时回退到 `MockCompanyProvider`
   - 后续可新增企查查、天眼查、行内客户系统等 Provider

2. **业务服务层**：`kyc_app/services.py`、`kyc_app/client_development.py`
   - 企业搜索
   - 企业画像
   - KYC报告
   - 存量客户深耕、增量获客、准入尽调策略

3. **前端工作台**：`kyc_platform.html`
   - 查询企业
   - 查看企业信息与评分
   - 查看客户开发策略
   - 查看KYC尽调报告

## 真实数据文件位置

将真实、合规取得的数据写入：

```text
file_store/company_records.json
```

也可以通过环境变量指定其他路径：

```powershell
$env:KYC_COMPANY_DATA="C:\secure\company_records.json"
python kyc_server.py
```

## JSON数据格式

```json
{
  "companies": [
    {
      "company_id": "client_001",
      "name": "某某制造有限公司",
      "code": "统一社会信用代码或客户编号",
      "aliases": ["简称", "股票代码"],
      "basic": {
        "legal": "法定代表人或待核实",
        "date": "成立日期",
        "capital": "注册资本量级",
        "status": "经营状态",
        "scope": "主营业务",
        "industry": "制造业 / 汽车零部件",
        "type": "有限责任公司",
        "term": "经营期限"
      },
      "shareholders": [
        {"name": "控股股东", "pct": 60, "color": "#C41230"}
      ],
      "risk": {
        "level": "medium",
        "lawsuit": "司法诉讼摘要",
        "penalty": "行政处罚摘要",
        "abnormal": "经营异常摘要",
        "dishonest": "失信记录摘要",
        "related": "关联企业摘要",
        "checks": [
          {"text": "需要核查应收账款集中度", "status": "warn"}
        ]
      },
      "finance": {
        "revenueData": [
          {"year": "2024", "revenue": 80000, "profit": 4200}
        ],
        "debtData": {
          "totalAssets": 120000,
          "totalDebt": 52000,
          "equity": 68000,
          "currentRatio": 1.3,
          "debtRatio": "约43%"
        }
      },
      "products": [
        {"name": "流动资金贷款", "fit": "高适配", "cls": "fit-high", "reason": "经营周转需求明确"}
      ],
      "actions": [
        "核实主要结算银行、回款路径和资金沉淀规模。"
      ],
      "sources": [
        {"name": "内部客户资料", "type": "bank_internal", "confidence": "high"}
      ],
      "manual_review_items": [
        "征信记录",
        "主要合同和流水"
      ]
    }
  ]
}
```

## 本地启动

### 无Python查看

当前前端已经加载：

```text
file_store/company_records.js
```

因此即使 Python 环境暂时不可用，也可以直接双击打开：

```text
kyc_platform.html
```

可搜索 `比亚迪`、`宁德时代`、`腾讯`、`中国建筑`、`顺丰`、`中国移动` 等公开披露样本。

### 后端接口查看

```powershell
python kyc_server.py
```

浏览器访问：

```text
http://127.0.0.1:8000/
```

## 后续部署建议

- 将 `JsonCompanyProvider` 替换或组合为正式 API Provider。
- 对真实客户数据文件加访问控制，不提交到公开仓库。
- 授信、贷款、贸易融资输出仅保留辅助分析定位，最终以行内审批结论为准。
