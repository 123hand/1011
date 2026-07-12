window.COMPANY_RECORDS = {
  "companies": [
    {
      "company_id": "byd",
      "name": "比亚迪股份有限公司",
      "code": "002594.SZ / 1211.HK",
      "aliases": ["比亚迪", "BYD", "002594", "1211", "新能源汽车", "制造"],
      "basic": {
        "legal": "上市公司公开披露主体",
        "date": "1995年",
        "capital": "公开披露口径",
        "status": "正常经营",
        "scope": "新能源汽车、动力电池、电子制造及轨道交通相关业务",
        "industry": "制造业 / 新能源汽车",
        "type": "A+H股上市公司",
        "term": "长期经营"
      },
      "shareholders": [
        {"name": "创始人及一致行动人", "pct": 21, "color": "#C41230"},
        {"name": "公众及机构股东", "pct": 79, "color": "#2B6CB0"}
      ],
      "risk": {
        "level": "medium",
        "lawsuit": "大型制造企业公开诉讼需按商业风控接口复核",
        "penalty": "行政处罚需按公开监管与行内系统复核",
        "abnormal": "公开披露主体持续经营",
        "dishonest": "需通过执行公开信息复核",
        "related": "上下游供应链、子公司和海外主体较多",
        "checks": [
          {"text": "上市公司披露完整，主体识别基础较好", "status": "pass"},
          {"text": "新能源汽车行业竞争加剧，毛利率和库存需持续跟踪", "status": "warn"},
          {"text": "海外业务和供应链合规材料需补充核验", "status": "warn"}
        ]
      },
      "finance": {
        "revenueData": [
          {"year": "2022", "revenue": 4241, "profit": 166},
          {"year": "2023", "revenue": 6023, "profit": 300},
          {"year": "2024", "revenue": 7771, "profit": 403}
        ],
        "debtData": {"totalAssets": 7800, "totalDebt": 5400, "equity": 2400, "currentRatio": 1.1, "debtRatio": "约69%"}
      },
      "products": [
        {"name": "供应链金融", "fit": "高适配", "cls": "fit-high", "reason": "上下游供应商和经销体系规模大"},
        {"name": "票据池", "fit": "高适配", "cls": "fit-high", "reason": "制造业结算与账期管理需求强"},
        {"name": "跨境结算", "fit": "高适配", "cls": "fit-high", "reason": "海外市场扩张带来收付汇需求"},
        {"name": "薪福通代发", "fit": "中适配", "cls": "fit-medium", "reason": "员工规模大，适合公私联动"}
      ],
      "actions": [
        "优先核实本地关联主体、供应商账期和票据使用情况。",
        "围绕海外订单了解跨境结算、汇率避险和资金归集需求。",
        "梳理上下游核心名单，评估供应链金融批量获客机会。"
      ],
      "sources": [
        {"name": "公司年报/公告公开披露", "type": "public_disclosure", "confidence": "high"},
        {"name": "交易所公开信息", "type": "exchange_public", "confidence": "high"}
      ],
      "manual_review_items": ["本地开户及结算流水", "供应商合同与发票", "商业风控司法/失信结果"]
    },
    {
      "company_id": "catl",
      "name": "宁德时代新能源科技股份有限公司",
      "code": "300750.SZ",
      "aliases": ["宁德时代", "CATL", "300750", "动力电池", "制造"],
      "basic": {
        "legal": "上市公司公开披露主体",
        "date": "2011年",
        "capital": "公开披露口径",
        "status": "正常经营",
        "scope": "动力电池、储能电池系统及新能源应用解决方案",
        "industry": "制造业 / 动力电池",
        "type": "A股上市公司",
        "term": "长期经营"
      },
      "shareholders": [
        {"name": "控股及核心股东", "pct": 24, "color": "#C41230"},
        {"name": "公众及机构股东", "pct": 76, "color": "#2B6CB0"}
      ],
      "risk": {
        "level": "medium",
        "lawsuit": "大型科技制造企业公开诉讼需复核",
        "penalty": "需按监管处罚库复核",
        "abnormal": "公开披露主体持续经营",
        "dishonest": "需通过执行公开信息复核",
        "related": "境内外生产基地、客户和供应商网络广",
        "checks": [
          {"text": "行业龙头地位强，财报披露完整", "status": "pass"},
          {"text": "新能源价格周期和客户集中度需持续关注", "status": "warn"},
          {"text": "海外产能、环保和贸易合规需复核", "status": "warn"}
        ]
      },
      "finance": {
        "revenueData": [
          {"year": "2022", "revenue": 3286, "profit": 307},
          {"year": "2023", "revenue": 4009, "profit": 441},
          {"year": "2024", "revenue": 3620, "profit": 507}
        ],
        "debtData": {"totalAssets": 7200, "totalDebt": 4200, "equity": 3000, "currentRatio": 1.4, "debtRatio": "约58%"}
      },
      "products": [
        {"name": "供应链金融", "fit": "高适配", "cls": "fit-high", "reason": "上游材料和下游整车厂链条完整"},
        {"name": "现金管理", "fit": "高适配", "cls": "fit-high", "reason": "集团资金归集与多主体管理需求强"},
        {"name": "跨境结算", "fit": "高适配", "cls": "fit-high", "reason": "海外产能和客户结算场景明确"}
      ],
      "actions": [
        "核实本地子公司、项目公司和供应商链条。",
        "了解储能项目回款周期、保函和跨境收付需求。",
        "围绕核心供应商设计供应链金融白名单。"
      ],
      "sources": [
        {"name": "公司年报/公告公开披露", "type": "public_disclosure", "confidence": "high"},
        {"name": "交易所公开信息", "type": "exchange_public", "confidence": "high"}
      ],
      "manual_review_items": ["本地项目公司清单", "供应商付款周期", "环保及跨境合规材料"]
    },
    {
      "company_id": "moutai",
      "name": "贵州茅台酒股份有限公司",
      "code": "600519.SH",
      "aliases": ["贵州茅台", "茅台", "600519", "消费", "制造"],
      "basic": {
        "legal": "上市公司公开披露主体",
        "date": "1999年",
        "capital": "公开披露口径",
        "status": "正常经营",
        "scope": "茅台酒及系列酒生产、销售",
        "industry": "制造业 / 白酒消费",
        "type": "A股上市公司",
        "term": "长期经营"
      },
      "shareholders": [
        {"name": "国有控股股东", "pct": 54, "color": "#C41230"},
        {"name": "公众及机构股东", "pct": 46, "color": "#2B6CB0"}
      ],
      "risk": {
        "level": "low",
        "lawsuit": "公开重大异常需按风控接口复核",
        "penalty": "需按监管处罚库复核",
        "abnormal": "公开披露主体持续经营",
        "dishonest": "需通过执行公开信息复核",
        "related": "经销体系和上下游服务商较多",
        "checks": [
          {"text": "现金流和品牌优势较强", "status": "pass"},
          {"text": "经销商资金流和真实贸易背景需核验", "status": "warn"}
        ]
      },
      "finance": {
        "revenueData": [
          {"year": "2022", "revenue": 1276, "profit": 627},
          {"year": "2023", "revenue": 1506, "profit": 747},
          {"year": "2024", "revenue": 1741, "profit": 862}
        ],
        "debtData": {"totalAssets": 2900, "totalDebt": 450, "equity": 2450, "currentRatio": 3.0, "debtRatio": "约16%"}
      },
      "products": [
        {"name": "对公存款", "fit": "高适配", "cls": "fit-high", "reason": "经营现金流和资金沉淀能力强"},
        {"name": "财资管理", "fit": "高适配", "cls": "fit-high", "reason": "集团资金管理和经销体系协同需求明确"},
        {"name": "经销商供应链金融", "fit": "中适配", "cls": "fit-medium", "reason": "可围绕真实订单和回款闭环设计"}
      ],
      "actions": [
        "识别本地经销商和配套服务商名单。",
        "核实资金沉淀、对公存款和财资管理合作空间。",
        "围绕经销商订单和回款闭环评估供应链金融。"
      ],
      "sources": [
        {"name": "公司年报/公告公开披露", "type": "public_disclosure", "confidence": "high"},
        {"name": "交易所公开信息", "type": "exchange_public", "confidence": "high"}
      ],
      "manual_review_items": ["本地经销商授权材料", "真实订单和回款记录", "商业风控复核"]
    },
    {
      "company_id": "midea",
      "name": "美的集团股份有限公司",
      "code": "000333.SZ",
      "aliases": ["美的集团", "美的", "Midea", "000333", "家电", "制造"],
      "basic": {
        "legal": "上市公司公开披露主体",
        "date": "1968年起步，上市主体公开披露",
        "capital": "公开披露口径",
        "status": "正常经营",
        "scope": "智能家居、楼宇科技、机器人与自动化、工业技术",
        "industry": "制造业 / 家电与工业科技",
        "type": "A股上市公司",
        "term": "长期经营"
      },
      "shareholders": [
        {"name": "核心及机构股东", "pct": 36, "color": "#C41230"},
        {"name": "公众股东", "pct": 64, "color": "#2B6CB0"}
      ],
      "risk": {
        "level": "low",
        "lawsuit": "公开诉讼需按商业风控接口复核",
        "penalty": "需按监管处罚库复核",
        "abnormal": "公开披露主体持续经营",
        "dishonest": "需通过执行公开信息复核",
        "related": "境内外销售和生产主体较多",
        "checks": [
          {"text": "收入规模和现金流稳定性较强", "status": "pass"},
          {"text": "海外销售、汇率和供应链价格波动需关注", "status": "warn"}
        ]
      },
      "finance": {
        "revenueData": [
          {"year": "2022", "revenue": 3457, "profit": 296},
          {"year": "2023", "revenue": 3737, "profit": 337},
          {"year": "2024", "revenue": 4091, "profit": 385}
        ],
        "debtData": {"totalAssets": 5200, "totalDebt": 3300, "equity": 1900, "currentRatio": 1.3, "debtRatio": "约63%"}
      },
      "products": [
        {"name": "票据池", "fit": "高适配", "cls": "fit-high", "reason": "制造业上下游结算频繁"},
        {"name": "跨境结算", "fit": "高适配", "cls": "fit-high", "reason": "海外销售和采购场景明确"},
        {"name": "薪福通代发", "fit": "中适配", "cls": "fit-medium", "reason": "员工规模和园区管理场景适配"}
      ],
      "actions": [
        "梳理区域供应商和经销商清单。",
        "了解票据、跨境结算和资金归集使用情况。",
        "从代发和园区综合服务切入公私联动。"
      ],
      "sources": [
        {"name": "公司年报/公告公开披露", "type": "public_disclosure", "confidence": "high"},
        {"name": "交易所公开信息", "type": "exchange_public", "confidence": "high"}
      ],
      "manual_review_items": ["本地供应商名单", "票据使用情况", "跨境收付资料"]
    },
    {
      "company_id": "haier",
      "name": "海尔智家股份有限公司",
      "code": "600690.SH / 6690.HK",
      "aliases": ["海尔智家", "海尔", "Haier", "600690", "6690", "制造"],
      "basic": {
        "legal": "上市公司公开披露主体",
        "date": "上市主体公开披露",
        "capital": "公开披露口径",
        "status": "正常经营",
        "scope": "智慧家庭、家电制造、海外品牌运营",
        "industry": "制造业 / 家电",
        "type": "A+H股上市公司",
        "term": "长期经营"
      },
      "shareholders": [
        {"name": "核心及机构股东", "pct": 35, "color": "#C41230"},
        {"name": "公众股东", "pct": 65, "color": "#2B6CB0"}
      ],
      "risk": {
        "level": "low",
        "lawsuit": "公开诉讼需复核",
        "penalty": "需按监管处罚库复核",
        "abnormal": "公开披露主体持续经营",
        "dishonest": "需通过执行公开信息复核",
        "related": "全球生产、销售和服务主体较多",
        "checks": [
          {"text": "全球化布局和品牌体系成熟", "status": "pass"},
          {"text": "海外主体和汇率波动需关注", "status": "warn"}
        ]
      },
      "finance": {
        "revenueData": [
          {"year": "2022", "revenue": 2435, "profit": 147},
          {"year": "2023", "revenue": 2614, "profit": 166},
          {"year": "2024", "revenue": 2859, "profit": 187}
        ],
        "debtData": {"totalAssets": 2700, "totalDebt": 1600, "equity": 1100, "currentRatio": 1.2, "debtRatio": "约59%"}
      },
      "products": [
        {"name": "跨境结算", "fit": "高适配", "cls": "fit-high", "reason": "全球销售和海外品牌运营需求强"},
        {"name": "票据池", "fit": "中适配", "cls": "fit-medium", "reason": "供应商结算和账期管理场景适配"},
        {"name": "供应链金融", "fit": "中适配", "cls": "fit-medium", "reason": "可围绕供应商和经销商链条设计"}
      ],
      "actions": [
        "核实区域供应商和经销商结算链条。",
        "了解海外主体资金归集和汇率避险需求。",
        "评估票据池与供应链金融组合方案。"
      ],
      "sources": [
        {"name": "公司年报/公告公开披露", "type": "public_disclosure", "confidence": "high"},
        {"name": "交易所公开信息", "type": "exchange_public", "confidence": "high"}
      ],
      "manual_review_items": ["海外主体清单", "供应商合同", "票据和结算流水"]
    },
    {
      "company_id": "sany",
      "name": "三一重工股份有限公司",
      "code": "600031.SH",
      "aliases": ["三一重工", "三一", "SANY", "600031", "工程机械", "制造"],
      "basic": {
        "legal": "上市公司公开披露主体",
        "date": "上市主体公开披露",
        "capital": "公开披露口径",
        "status": "正常经营",
        "scope": "工程机械研发、制造和销售",
        "industry": "制造业 / 工程机械",
        "type": "A股上市公司",
        "term": "长期经营"
      },
      "shareholders": [
        {"name": "控股及核心股东", "pct": 30, "color": "#C41230"},
        {"name": "公众股东", "pct": 70, "color": "#2B6CB0"}
      ],
      "risk": {
        "level": "medium",
        "lawsuit": "工程机械销售和融资租赁相关诉讼需复核",
        "penalty": "需按监管处罚库复核",
        "abnormal": "公开披露主体持续经营",
        "dishonest": "需通过执行公开信息复核",
        "related": "经销商、租赁公司和海外主体较多",
        "checks": [
          {"text": "装备制造行业地位较强", "status": "pass"},
          {"text": "周期性、应收账款和海外回款需关注", "status": "warn"}
        ]
      },
      "finance": {
        "revenueData": [
          {"year": "2022", "revenue": 808, "profit": 43},
          {"year": "2023", "revenue": 740, "profit": 45},
          {"year": "2024", "revenue": 783, "profit": 60}
        ],
        "debtData": {"totalAssets": 1700, "totalDebt": 950, "equity": 750, "currentRatio": 1.5, "debtRatio": "约56%"}
      },
      "products": [
        {"name": "工程机械供应链金融", "fit": "高适配", "cls": "fit-high", "reason": "经销商和租赁链条明显"},
        {"name": "保函业务", "fit": "中适配", "cls": "fit-medium", "reason": "海外工程和设备销售可能涉及履约保障"},
        {"name": "跨境结算", "fit": "高适配", "cls": "fit-high", "reason": "国际化销售带来收付汇需求"}
      ],
      "actions": [
        "核实经销商账期、融资租赁和应收账款质量。",
        "了解海外销售回款、保函和跨境结算需求。",
        "围绕工程机械客户群做链式获客。"
      ],
      "sources": [
        {"name": "公司年报/公告公开披露", "type": "public_disclosure", "confidence": "high"},
        {"name": "交易所公开信息", "type": "exchange_public", "confidence": "high"}
      ],
      "manual_review_items": ["经销商回款周期", "应收账款明细", "海外合同与保函材料"]
    },
    {
      "company_id": "sf_holding",
      "name": "顺丰控股股份有限公司",
      "code": "002352.SZ",
      "aliases": ["顺丰控股", "顺丰", "SF", "002352", "物流"],
      "basic": {
        "legal": "上市公司公开披露主体",
        "date": "上市主体公开披露",
        "capital": "公开披露口径",
        "status": "正常经营",
        "scope": "综合物流、快递、供应链及国际业务",
        "industry": "物流 / 综合物流",
        "type": "A股上市公司",
        "term": "长期经营"
      },
      "shareholders": [
        {"name": "控股及核心股东", "pct": 55, "color": "#C41230"},
        {"name": "公众股东", "pct": 45, "color": "#2B6CB0"}
      ],
      "risk": {
        "level": "medium",
        "lawsuit": "运输服务纠纷需按风控接口复核",
        "penalty": "需按监管处罚库复核",
        "abnormal": "公开披露主体持续经营",
        "dishonest": "需通过执行公开信息复核",
        "related": "航空、仓储、冷链、国际物流主体较多",
        "checks": [
          {"text": "物流网络和客户基础较强", "status": "pass"},
          {"text": "燃油、人工成本及跨境物流合规需关注", "status": "warn"}
        ]
      },
      "finance": {
        "revenueData": [
          {"year": "2022", "revenue": 2675, "profit": 62},
          {"year": "2023", "revenue": 2584, "profit": 82},
          {"year": "2024", "revenue": 2844, "profit": 102}
        ],
        "debtData": {"totalAssets": 2500, "totalDebt": 1350, "equity": 1150, "currentRatio": 1.1, "debtRatio": "约54%"}
      },
      "products": [
        {"name": "现金管理", "fit": "高适配", "cls": "fit-high", "reason": "直营网点和多主体回款路径复杂"},
        {"name": "跨境结算", "fit": "高适配", "cls": "fit-high", "reason": "国际物流业务带来结算需求"},
        {"name": "车辆/设备融资", "fit": "中适配", "cls": "fit-medium", "reason": "运输资产和仓储设备投入较大"}
      ],
      "actions": [
        "了解区域网点回款路径和资金归集方式。",
        "核实车辆、仓储和航空相关资产投入需求。",
        "围绕供应链客户做批量结算和现金管理方案。"
      ],
      "sources": [
        {"name": "公司年报/公告公开披露", "type": "public_disclosure", "confidence": "high"},
        {"name": "交易所公开信息", "type": "exchange_public", "confidence": "high"}
      ],
      "manual_review_items": ["区域直营网点清单", "车辆资产清单", "主要客户合同"]
    },
    {
      "company_id": "jd_logistics",
      "name": "京东物流股份有限公司",
      "code": "2618.HK",
      "aliases": ["京东物流", "JD Logistics", "2618", "物流", "供应链"],
      "basic": {
        "legal": "上市公司公开披露主体",
        "date": "上市主体公开披露",
        "capital": "公开披露口径",
        "status": "正常经营",
        "scope": "一体化供应链物流、仓配、快递快运和国际物流",
        "industry": "物流 / 供应链物流",
        "type": "港股上市公司",
        "term": "长期经营"
      },
      "shareholders": [
        {"name": "京东集团及关联股东", "pct": 63, "color": "#C41230"},
        {"name": "公众股东", "pct": 37, "color": "#2B6CB0"}
      ],
      "risk": {
        "level": "medium",
        "lawsuit": "物流服务纠纷需复核",
        "penalty": "需按监管处罚库复核",
        "abnormal": "公开披露主体持续经营",
        "dishonest": "需通过执行公开信息复核",
        "related": "仓储、运输、客户供应链合作主体较多",
        "checks": [
          {"text": "供应链物流能力较强", "status": "pass"},
          {"text": "资本开支、仓储租赁和客户集中度需关注", "status": "warn"}
        ]
      },
      "finance": {
        "revenueData": [
          {"year": "2022", "revenue": 1374, "profit": -14},
          {"year": "2023", "revenue": 1666, "profit": 6},
          {"year": "2024", "revenue": 1828, "profit": 34}
        ],
        "debtData": {"totalAssets": 1100, "totalDebt": 550, "equity": 550, "currentRatio": 1.2, "debtRatio": "约50%"}
      },
      "products": [
        {"name": "供应链金融", "fit": "高适配", "cls": "fit-high", "reason": "仓配客户和供应链场景明确"},
        {"name": "现金管理", "fit": "中适配", "cls": "fit-medium", "reason": "多仓多主体资金归集需求"},
        {"name": "跨境结算", "fit": "中适配", "cls": "fit-medium", "reason": "国际物流业务可拓展"}
      ],
      "actions": [
        "核实本地仓储、运输合作商和客户结算方式。",
        "围绕供应链客户提供结算和融资组合方案。",
        "了解国际物流和跨境收付款需求。"
      ],
      "sources": [
        {"name": "公司年报/公告公开披露", "type": "public_disclosure", "confidence": "high"},
        {"name": "港交所公开信息", "type": "exchange_public", "confidence": "high"}
      ],
      "manual_review_items": ["仓储租赁合同", "主要客户账期", "运输合作商名单"]
    },
    {
      "company_id": "cscec",
      "name": "中国建筑股份有限公司",
      "code": "601668.SH",
      "aliases": ["中国建筑", "中建", "CSCEC", "601668", "建筑", "央企"],
      "basic": {
        "legal": "上市公司公开披露主体",
        "date": "2007年",
        "capital": "公开披露口径",
        "status": "正常经营",
        "scope": "房屋建筑、基础设施、房地产开发和投资运营",
        "industry": "建筑 / 基础设施",
        "type": "央企控股A股上市公司",
        "term": "长期经营"
      },
      "shareholders": [
        {"name": "中国建筑集团", "pct": 56, "color": "#C41230"},
        {"name": "公众及机构股东", "pct": 44, "color": "#2B6CB0"}
      ],
      "risk": {
        "level": "medium",
        "lawsuit": "建筑工程诉讼和项目纠纷需重点复核",
        "penalty": "需按监管处罚库复核",
        "abnormal": "公开披露主体持续经营",
        "dishonest": "需通过执行公开信息复核",
        "related": "项目公司、分包商和地方平台客户较多",
        "checks": [
          {"text": "央企背景和项目获取能力强", "status": "pass"},
          {"text": "应收账款、合同资产和地产敞口需关注", "status": "warn"},
          {"text": "项目真实性和回款来源需穿透核验", "status": "warn"}
        ]
      },
      "finance": {
        "revenueData": [
          {"year": "2022", "revenue": 20551, "profit": 509},
          {"year": "2023", "revenue": 22655, "profit": 542},
          {"year": "2024", "revenue": 22800, "profit": 520}
        ],
        "debtData": {"totalAssets": 30000, "totalDebt": 22500, "equity": 7500, "currentRatio": 1.1, "debtRatio": "约75%"}
      },
      "products": [
        {"name": "保函业务", "fit": "高适配", "cls": "fit-high", "reason": "投标、履约、预付款保函需求高频"},
        {"name": "项目贷款/银团", "fit": "中适配", "cls": "fit-medium", "reason": "基础设施和重大项目资金需求大"},
        {"name": "薪福通代发", "fit": "高适配", "cls": "fit-high", "reason": "项目人员和分包场景复杂"}
      ],
      "actions": [
        "优先核实本地在建项目、中标通知和回款安排。",
        "梳理保函需求、保证金沉淀和代发场景。",
        "穿透分包商和项目公司资金往来。"
      ],
      "sources": [
        {"name": "公司年报/公告公开披露", "type": "public_disclosure", "confidence": "high"},
        {"name": "交易所公开信息", "type": "exchange_public", "confidence": "high"}
      ],
      "manual_review_items": ["在建项目合同", "回款来源", "保函台账", "分包商名单"]
    },
    {
      "company_id": "china_railway",
      "name": "中国中铁股份有限公司",
      "code": "601390.SH / 0390.HK",
      "aliases": ["中国中铁", "中铁", "CREC", "601390", "0390", "建筑", "央企"],
      "basic": {
        "legal": "上市公司公开披露主体",
        "date": "2007年上市",
        "capital": "公开披露口径",
        "status": "正常经营",
        "scope": "铁路、公路、市政、城市轨道等工程承包和投资运营",
        "industry": "建筑 / 交通基建",
        "type": "央企控股A+H股上市公司",
        "term": "长期经营"
      },
      "shareholders": [
        {"name": "中国铁路工程集团", "pct": 47, "color": "#C41230"},
        {"name": "公众及机构股东", "pct": 53, "color": "#2B6CB0"}
      ],
      "risk": {
        "level": "medium",
        "lawsuit": "工程纠纷和应收款诉讼需复核",
        "penalty": "需按监管处罚库复核",
        "abnormal": "公开披露主体持续经营",
        "dishonest": "需通过执行公开信息复核",
        "related": "项目公司、物资公司和分包商较多",
        "checks": [
          {"text": "央企基建订单基础较强", "status": "pass"},
          {"text": "项目回款周期、合同资产和地方财政支付能力需关注", "status": "warn"}
        ]
      },
      "finance": {
        "revenueData": [
          {"year": "2022", "revenue": 11544, "profit": 313},
          {"year": "2023", "revenue": 12634, "profit": 334},
          {"year": "2024", "revenue": 11600, "profit": 320}
        ],
        "debtData": {"totalAssets": 19000, "totalDebt": 14500, "equity": 4500, "currentRatio": 1.0, "debtRatio": "约76%"}
      },
      "products": [
        {"name": "保函业务", "fit": "高适配", "cls": "fit-high", "reason": "基建投标与履约保函需求明确"},
        {"name": "供应链金融", "fit": "高适配", "cls": "fit-high", "reason": "物资采购、分包商账期管理需求强"},
        {"name": "项目资金监管", "fit": "中适配", "cls": "fit-medium", "reason": "项目公司和专项资金管理场景适配"}
      ],
      "actions": [
        "核实本地项目清单、业主单位和回款节点。",
        "从保函、保证金和供应链金融切入。",
        "关注地方平台客户付款能力和合同资产变化。"
      ],
      "sources": [
        {"name": "公司年报/公告公开披露", "type": "public_disclosure", "confidence": "high"},
        {"name": "交易所公开信息", "type": "exchange_public", "confidence": "high"}
      ],
      "manual_review_items": ["本地项目合同", "业主回款安排", "分包商和供应商清单"]
    },
    {
      "company_id": "crrc",
      "name": "中国中车股份有限公司",
      "code": "601766.SH / 1766.HK",
      "aliases": ["中国中车", "中车", "CRRC", "601766", "1766", "制造", "轨道交通"],
      "basic": {
        "legal": "上市公司公开披露主体",
        "date": "上市主体公开披露",
        "capital": "公开披露口径",
        "status": "正常经营",
        "scope": "轨道交通装备、机车车辆、城轨装备及相关服务",
        "industry": "制造业 / 轨道交通装备",
        "type": "央企控股A+H股上市公司",
        "term": "长期经营"
      },
      "shareholders": [
        {"name": "中国中车集团", "pct": 51, "color": "#C41230"},
        {"name": "公众及机构股东", "pct": 49, "color": "#2B6CB0"}
      ],
      "risk": {
        "level": "medium",
        "lawsuit": "装备销售和项目交付纠纷需复核",
        "penalty": "需按监管处罚库复核",
        "abnormal": "公开披露主体持续经营",
        "dishonest": "需通过执行公开信息复核",
        "related": "子公司和海外项目主体较多",
        "checks": [
          {"text": "轨道交通装备行业地位突出", "status": "pass"},
          {"text": "海外项目回款、汇率和履约风险需关注", "status": "warn"}
        ]
      },
      "finance": {
        "revenueData": [
          {"year": "2022", "revenue": 2229, "profit": 117},
          {"year": "2023", "revenue": 2343, "profit": 118},
          {"year": "2024", "revenue": 2410, "profit": 128}
        ],
        "debtData": {"totalAssets": 4800, "totalDebt": 3100, "equity": 1700, "currentRatio": 1.3, "debtRatio": "约65%"}
      },
      "products": [
        {"name": "保函业务", "fit": "中适配", "cls": "fit-medium", "reason": "装备交付和海外项目存在履约保障需求"},
        {"name": "跨境结算", "fit": "高适配", "cls": "fit-high", "reason": "海外项目和出口业务场景明确"},
        {"name": "供应链金融", "fit": "高适配", "cls": "fit-high", "reason": "上游零部件供应商链条长"}
      ],
      "actions": [
        "核实区域子公司和供应商业务规模。",
        "了解海外项目合同、收付汇和保函需求。",
        "围绕上游零部件供应商设计供应链金融方案。"
      ],
      "sources": [
        {"name": "公司年报/公告公开披露", "type": "public_disclosure", "confidence": "high"},
        {"name": "交易所公开信息", "type": "exchange_public", "confidence": "high"}
      ],
      "manual_review_items": ["海外项目合同", "供应商清单", "保函需求台账"]
    },
    {
      "company_id": "china_mobile",
      "name": "中国移动有限公司",
      "code": "600941.SH / 0941.HK",
      "aliases": ["中国移动", "China Mobile", "600941", "0941", "通信", "央企"],
      "basic": {
        "legal": "上市公司公开披露主体",
        "date": "上市主体公开披露",
        "capital": "公开披露口径",
        "status": "正常经营",
        "scope": "移动通信、宽带、DICT、云和数字化服务",
        "industry": "通信 / 数字基础设施",
        "type": "央企控股A+H股上市公司",
        "term": "长期经营"
      },
      "shareholders": [
        {"name": "中国移动通信集团", "pct": 69, "color": "#C41230"},
        {"name": "公众及机构股东", "pct": 31, "color": "#2B6CB0"}
      ],
      "risk": {
        "level": "low",
        "lawsuit": "公开重大异常需复核",
        "penalty": "需按监管处罚库复核",
        "abnormal": "公开披露主体持续经营",
        "dishonest": "需通过执行公开信息复核",
        "related": "省公司、专业公司和产业链合作伙伴较多",
        "checks": [
          {"text": "央企通信基础设施主体，现金流稳定", "status": "pass"},
          {"text": "大型资本开支、DICT项目回款和供应商账期需关注", "status": "warn"}
        ]
      },
      "finance": {
        "revenueData": [
          {"year": "2022", "revenue": 9373, "profit": 1255},
          {"year": "2023", "revenue": 10093, "profit": 1318},
          {"year": "2024", "revenue": 10408, "profit": 1384}
        ],
        "debtData": {"totalAssets": 21000, "totalDebt": 7000, "equity": 14000, "currentRatio": 1.6, "debtRatio": "约33%"}
      },
      "products": [
        {"name": "财资管理", "fit": "高适配", "cls": "fit-high", "reason": "集团和省公司资金归集需求强"},
        {"name": "供应链金融", "fit": "中适配", "cls": "fit-medium", "reason": "设备商、工程商和ICT服务商链条完整"},
        {"name": "薪福通代发", "fit": "中适配", "cls": "fit-medium", "reason": "员工和合作伙伴服务场景适配"}
      ],
      "actions": [
        "梳理本地省市公司、DICT项目和供应商名单。",
        "了解账户体系、资金归集和保证金沉淀情况。",
        "围绕ICT供应商做链式获客。"
      ],
      "sources": [
        {"name": "公司年报/公告公开披露", "type": "public_disclosure", "confidence": "high"},
        {"name": "交易所公开信息", "type": "exchange_public", "confidence": "high"}
      ],
      "manual_review_items": ["本地项目合同", "供应商清单", "账户及保证金情况"]
    },
    {
      "company_id": "petrochina",
      "name": "中国石油天然气股份有限公司",
      "code": "601857.SH / 0857.HK",
      "aliases": ["中国石油", "PetroChina", "601857", "0857", "能源", "央企"],
      "basic": {
        "legal": "上市公司公开披露主体",
        "date": "1999年",
        "capital": "公开披露口径",
        "status": "正常经营",
        "scope": "油气勘探开发、炼化销售、天然气和新能源业务",
        "industry": "能源 / 油气",
        "type": "央企控股A+H股上市公司",
        "term": "长期经营"
      },
      "shareholders": [
        {"name": "中国石油集团", "pct": 80, "color": "#C41230"},
        {"name": "公众及机构股东", "pct": 20, "color": "#2B6CB0"}
      ],
      "risk": {
        "level": "low",
        "lawsuit": "能源央企公开重大异常需复核",
        "penalty": "环保、安全生产及监管处罚需复核",
        "abnormal": "公开披露主体持续经营",
        "dishonest": "需通过执行公开信息复核",
        "related": "销售公司、工程服务和供应链主体较多",
        "checks": [
          {"text": "央企能源主体，行业地位和现金流基础强", "status": "pass"},
          {"text": "油价周期、环保安全和海外业务风险需关注", "status": "warn"}
        ]
      },
      "finance": {
        "revenueData": [
          {"year": "2022", "revenue": 32392, "profit": 1494},
          {"year": "2023", "revenue": 30110, "profit": 1611},
          {"year": "2024", "revenue": 29300, "profit": 1640}
        ],
        "debtData": {"totalAssets": 27000, "totalDebt": 11000, "equity": 16000, "currentRatio": 1.0, "debtRatio": "约41%"}
      },
      "products": [
        {"name": "现金管理", "fit": "高适配", "cls": "fit-high", "reason": "销售体系和多主体资金归集场景强"},
        {"name": "供应链金融", "fit": "中适配", "cls": "fit-medium", "reason": "工程服务商和供应商链条完整"},
        {"name": "跨境结算", "fit": "中适配", "cls": "fit-medium", "reason": "国际能源采购和贸易场景适配"}
      ],
      "actions": [
        "识别本地销售公司、加油站和供应商合作场景。",
        "了解资金归集、保证金和结算账户合作空间。",
        "核实环保安全相关合规材料。"
      ],
      "sources": [
        {"name": "公司年报/公告公开披露", "type": "public_disclosure", "confidence": "high"},
        {"name": "交易所公开信息", "type": "exchange_public", "confidence": "high"}
      ],
      "manual_review_items": ["本地销售主体清单", "环保安全记录", "供应商合同"]
    },
    {
      "company_id": "tencent",
      "name": "腾讯控股有限公司",
      "code": "0700.HK",
      "aliases": ["腾讯", "Tencent", "0700", "互联网", "科技"],
      "basic": {
        "legal": "上市公司公开披露主体",
        "date": "1998年",
        "capital": "公开披露口径",
        "status": "正常经营",
        "scope": "互联网增值服务、金融科技与企业服务、广告、云服务",
        "industry": "科技 / 互联网平台",
        "type": "港股上市公司",
        "term": "长期经营"
      },
      "shareholders": [
        {"name": "主要机构及创始团队相关股东", "pct": 35, "color": "#C41230"},
        {"name": "公众及机构股东", "pct": 65, "color": "#2B6CB0"}
      ],
      "risk": {
        "level": "low",
        "lawsuit": "互联网知识产权和业务纠纷需复核",
        "penalty": "平台经济监管处罚需按公开库复核",
        "abnormal": "公开披露主体持续经营",
        "dishonest": "需通过执行公开信息复核",
        "related": "投资企业、云客户和生态伙伴较多",
        "checks": [
          {"text": "现金流和生态资源较强", "status": "pass"},
          {"text": "平台监管、数据合规和投资组合波动需关注", "status": "warn"}
        ]
      },
      "finance": {
        "revenueData": [
          {"year": "2022", "revenue": 5546, "profit": 1882},
          {"year": "2023", "revenue": 6090, "profit": 1577},
          {"year": "2024", "revenue": 6603, "profit": 1965}
        ],
        "debtData": {"totalAssets": 16000, "totalDebt": 6500, "equity": 9500, "currentRatio": 1.5, "debtRatio": "约41%"}
      },
      "products": [
        {"name": "对公存款", "fit": "高适配", "cls": "fit-high", "reason": "现金流和平台结算沉淀空间大"},
        {"name": "财资管理", "fit": "高适配", "cls": "fit-high", "reason": "投资主体和业务主体较多"},
        {"name": "生态客户拓展", "fit": "中适配", "cls": "fit-medium", "reason": "云和企业服务客户可协同获客"}
      ],
      "actions": [
        "识别本地云客户、生态合作商和平台结算场景。",
        "了解集团账户、资金归集和公私联动机会。",
        "对投资关联企业保持穿透识别。"
      ],
      "sources": [
        {"name": "公司年报/公告公开披露", "type": "public_disclosure", "confidence": "high"},
        {"name": "港交所公开信息", "type": "exchange_public", "confidence": "high"}
      ],
      "manual_review_items": ["本地生态客户名单", "平台资金流场景", "数据合规材料"]
    },
    {
      "company_id": "alibaba",
      "name": "阿里巴巴集团控股有限公司",
      "code": "BABA.N / 9988.HK",
      "aliases": ["阿里巴巴", "Alibaba", "BABA", "9988", "电商", "科技", "商贸"],
      "basic": {
        "legal": "上市公司公开披露主体",
        "date": "1999年",
        "capital": "公开披露口径",
        "status": "正常经营",
        "scope": "电商、云计算、本地生活、国际数字商业和物流生态",
        "industry": "商贸 / 互联网平台",
        "type": "美股+港股上市公司",
        "term": "长期经营"
      },
      "shareholders": [
        {"name": "公众及机构股东", "pct": 100, "color": "#2B6CB0"}
      ],
      "risk": {
        "level": "medium",
        "lawsuit": "平台经营、知识产权和商户纠纷需复核",
        "penalty": "平台经济监管处罚需按公开库复核",
        "abnormal": "公开披露主体持续经营",
        "dishonest": "需通过执行公开信息复核",
        "related": "多业务集团和生态投资主体较多",
        "checks": [
          {"text": "平台交易生态和客户资源丰富", "status": "pass"},
          {"text": "监管、数据合规和跨境业务需关注", "status": "warn"}
        ]
      },
      "finance": {
        "revenueData": [
          {"year": "FY2023", "revenue": 8687, "profit": 725},
          {"year": "FY2024", "revenue": 9412, "profit": 713},
          {"year": "FY2025", "revenue": 9963, "profit": 1295}
        ],
        "debtData": {"totalAssets": 18000, "totalDebt": 6500, "equity": 11500, "currentRatio": 1.6, "debtRatio": "约36%"}
      },
      "products": [
        {"name": "商户经营贷生态", "fit": "中适配", "cls": "fit-medium", "reason": "平台商户经营和结算场景明确"},
        {"name": "跨境结算", "fit": "高适配", "cls": "fit-high", "reason": "国际数字商业和跨境电商场景强"},
        {"name": "现金管理", "fit": "高适配", "cls": "fit-high", "reason": "集团多业务主体资金管理需求强"}
      ],
      "actions": [
        "识别本地平台招商、商户和跨境电商客户。",
        "围绕商户结算、跨境收付和资金归集设计方案。",
        "平台相关业务坚持真实贸易背景核验。"
      ],
      "sources": [
        {"name": "公司年报/公告公开披露", "type": "public_disclosure", "confidence": "high"},
        {"name": "港交所/SEC公开信息", "type": "exchange_public", "confidence": "high"}
      ],
      "manual_review_items": ["本地商户清单", "跨境交易背景", "平台资金流合规材料"]
    },
    {
      "company_id": "jd",
      "name": "京东集团股份有限公司",
      "code": "JD.O / 9618.HK",
      "aliases": ["京东", "JD.com", "JD", "9618", "零售", "商贸"],
      "basic": {
        "legal": "上市公司公开披露主体",
        "date": "1998年起步，上市主体公开披露",
        "capital": "公开披露口径",
        "status": "正常经营",
        "scope": "零售、电商平台、供应链和技术服务",
        "industry": "商贸 / 零售电商",
        "type": "美股+港股上市公司",
        "term": "长期经营"
      },
      "shareholders": [
        {"name": "创始人及机构股东", "pct": 20, "color": "#C41230"},
        {"name": "公众及机构股东", "pct": 80, "color": "#2B6CB0"}
      ],
      "risk": {
        "level": "medium",
        "lawsuit": "商贸平台和供应链服务纠纷需复核",
        "penalty": "需按监管处罚库复核",
        "abnormal": "公开披露主体持续经营",
        "dishonest": "需通过执行公开信息复核",
        "related": "供应商、物流、科技和金融生态主体较多",
        "checks": [
          {"text": "零售供应链能力较强", "status": "pass"},
          {"text": "库存、供应商账期和平台监管需关注", "status": "warn"}
        ]
      },
      "finance": {
        "revenueData": [
          {"year": "2022", "revenue": 10462, "profit": 104},
          {"year": "2023", "revenue": 10847, "profit": 242},
          {"year": "2024", "revenue": 11588, "profit": 414}
        ],
        "debtData": {"totalAssets": 6800, "totalDebt": 3600, "equity": 3200, "currentRatio": 1.4, "debtRatio": "约53%"}
      },
      "products": [
        {"name": "供应链金融", "fit": "高适配", "cls": "fit-high", "reason": "供应商和平台商户账期场景明显"},
        {"name": "现金管理", "fit": "高适配", "cls": "fit-high", "reason": "零售回款和多主体资金归集需求强"},
        {"name": "跨境结算", "fit": "中适配", "cls": "fit-medium", "reason": "进口和国际业务可拓展"}
      ],
      "actions": [
        "梳理本地供应商、平台招商和仓储合作商名单。",
        "核实供应商账期、回款和应收账款情况。",
        "围绕零售生态客户做批量获客。"
      ],
      "sources": [
        {"name": "公司年报/公告公开披露", "type": "public_disclosure", "confidence": "high"},
        {"name": "港交所/SEC公开信息", "type": "exchange_public", "confidence": "high"}
      ],
      "manual_review_items": ["供应商账期", "库存和应收明细", "平台招商客户清单"]
    },
    {
      "company_id": "pdd",
      "name": "拼多多控股公司",
      "code": "PDD.O",
      "aliases": ["拼多多", "PDD", "PDD Holdings", "Temu", "电商", "商贸"],
      "basic": {
        "legal": "上市公司公开披露主体",
        "date": "上市主体公开披露",
        "capital": "公开披露口径",
        "status": "正常经营",
        "scope": "电商平台、农产品上行、跨境电商业务",
        "industry": "商贸 / 电商平台",
        "type": "美股上市公司",
        "term": "长期经营"
      },
      "shareholders": [
        {"name": "创始及机构相关股东", "pct": 30, "color": "#C41230"},
        {"name": "公众及机构股东", "pct": 70, "color": "#2B6CB0"}
      ],
      "risk": {
        "level": "medium",
        "lawsuit": "平台商户、知识产权和跨境纠纷需复核",
        "penalty": "平台监管处罚需按公开库复核",
        "abnormal": "公开披露主体持续经营",
        "dishonest": "需通过执行公开信息复核",
        "related": "平台商户、跨境卖家和服务商众多",
        "checks": [
          {"text": "平台增长和现金能力较强", "status": "pass"},
          {"text": "跨境平台监管、知识产权和商户真实性需关注", "status": "warn"}
        ]
      },
      "finance": {
        "revenueData": [
          {"year": "2022", "revenue": 1316, "profit": 315},
          {"year": "2023", "revenue": 2476, "profit": 600},
          {"year": "2024", "revenue": 3938, "profit": 1124}
        ],
        "debtData": {"totalAssets": 5200, "totalDebt": 900, "equity": 4300, "currentRatio": 3.0, "debtRatio": "约17%"}
      },
      "products": [
        {"name": "跨境结算", "fit": "高适配", "cls": "fit-high", "reason": "跨境电商卖家和平台收付场景明确"},
        {"name": "商户经营贷生态", "fit": "中适配", "cls": "fit-medium", "reason": "平台商户经营资金需求可筛选"},
        {"name": "现金管理", "fit": "高适配", "cls": "fit-high", "reason": "平台交易资金和现金管理需求强"}
      ],
      "actions": [
        "筛选本地跨境卖家和平台商户名单。",
        "核实真实贸易背景、退货率和平台流水。",
        "优先从跨境结算和商户经营服务切入。"
      ],
      "sources": [
        {"name": "公司年报/公告公开披露", "type": "public_disclosure", "confidence": "high"},
        {"name": "SEC公开信息", "type": "exchange_public", "confidence": "high"}
      ],
      "manual_review_items": ["商户真实经营材料", "跨境收付合规材料", "平台流水"]
    },
    {
      "company_id": "xiaomi",
      "name": "小米集团",
      "code": "1810.HK",
      "aliases": ["小米", "Xiaomi", "1810", "智能制造", "消费电子"],
      "basic": {
        "legal": "上市公司公开披露主体",
        "date": "2010年",
        "capital": "公开披露口径",
        "status": "正常经营",
        "scope": "智能手机、IoT与生活消费产品、互联网服务及智能电动汽车",
        "industry": "制造业 / 消费电子与智能汽车",
        "type": "港股上市公司",
        "term": "长期经营"
      },
      "shareholders": [
        {"name": "创始团队及相关股东", "pct": 24, "color": "#C41230"},
        {"name": "公众及机构股东", "pct": 76, "color": "#2B6CB0"}
      ],
      "risk": {
        "level": "medium",
        "lawsuit": "知识产权、海外销售和供应链纠纷需复核",
        "penalty": "需按监管处罚库复核",
        "abnormal": "公开披露主体持续经营",
        "dishonest": "需通过执行公开信息复核",
        "related": "生态链企业、供应商和海外销售主体较多",
        "checks": [
          {"text": "消费电子和智能汽车生态协同明显", "status": "pass"},
          {"text": "汽车业务资本开支、库存和海外合规需关注", "status": "warn"}
        ]
      },
      "finance": {
        "revenueData": [
          {"year": "2022", "revenue": 2800, "profit": 85},
          {"year": "2023", "revenue": 2710, "profit": 193},
          {"year": "2024", "revenue": 3659, "profit": 272}
        ],
        "debtData": {"totalAssets": 3600, "totalDebt": 1900, "equity": 1700, "currentRatio": 1.7, "debtRatio": "约53%"}
      },
      "products": [
        {"name": "供应链金融", "fit": "高适配", "cls": "fit-high", "reason": "手机、IoT和汽车供应商链条长"},
        {"name": "跨境结算", "fit": "高适配", "cls": "fit-high", "reason": "海外销售占比较高"},
        {"name": "薪福通代发", "fit": "中适配", "cls": "fit-medium", "reason": "研发和制造人员规模适配"}
      ],
      "actions": [
        "核实本地生态链企业和供应商名单。",
        "了解智能汽车供应商账期和票据使用情况。",
        "围绕海外销售收付汇和汇率管理切入。"
      ],
      "sources": [
        {"name": "公司年报/公告公开披露", "type": "public_disclosure", "confidence": "high"},
        {"name": "港交所公开信息", "type": "exchange_public", "confidence": "high"}
      ],
      "manual_review_items": ["生态链企业清单", "汽车业务供应商账期", "跨境收付资料"]
    },
    {
      "company_id": "meituan",
      "name": "美团",
      "code": "3690.HK",
      "aliases": ["美团", "Meituan", "3690", "本地生活", "平台"],
      "basic": {
        "legal": "上市公司公开披露主体",
        "date": "2010年",
        "capital": "公开披露口径",
        "status": "正常经营",
        "scope": "本地生活服务、外卖、到店酒旅、新业务",
        "industry": "商贸 / 本地生活平台",
        "type": "港股上市公司",
        "term": "长期经营"
      },
      "shareholders": [
        {"name": "创始及机构相关股东", "pct": 20, "color": "#C41230"},
        {"name": "公众及机构股东", "pct": 80, "color": "#2B6CB0"}
      ],
      "risk": {
        "level": "medium",
        "lawsuit": "平台商户、劳动用工和消费者纠纷需复核",
        "penalty": "平台监管处罚需按公开库复核",
        "abnormal": "公开披露主体持续经营",
        "dishonest": "需通过执行公开信息复核",
        "related": "平台商户、骑手生态和本地服务伙伴众多",
        "checks": [
          {"text": "本地生活场景和商户触点丰富", "status": "pass"},
          {"text": "监管、用工合规和平台商户真实性需关注", "status": "warn"}
        ]
      },
      "finance": {
        "revenueData": [
          {"year": "2022", "revenue": 2200, "profit": -67},
          {"year": "2023", "revenue": 2767, "profit": 139},
          {"year": "2024", "revenue": 3376, "profit": 359}
        ],
        "debtData": {"totalAssets": 3100, "totalDebt": 1100, "equity": 2000, "currentRatio": 2.2, "debtRatio": "约35%"}
      },
      "products": [
        {"name": "商户经营贷生态", "fit": "中适配", "cls": "fit-medium", "reason": "本地商户经营资金需求可筛选"},
        {"name": "结算账户", "fit": "高适配", "cls": "fit-high", "reason": "商户回款和平台结算场景明确"},
        {"name": "薪福通代发", "fit": "中适配", "cls": "fit-medium", "reason": "平台服务商和配送生态可联动"}
      ],
      "actions": [
        "筛选本地优质商户和服务商名单。",
        "核实平台流水、经营场所和订单真实性。",
        "从结算账户和商户经营服务切入。"
      ],
      "sources": [
        {"name": "公司年报/公告公开披露", "type": "public_disclosure", "confidence": "high"},
        {"name": "港交所公开信息", "type": "exchange_public", "confidence": "high"}
      ],
      "manual_review_items": ["商户平台流水", "真实经营场所", "用工及合规材料"]
    },
    {
      "company_id": "baowu",
      "name": "中国宝武钢铁集团有限公司",
      "code": "央企集团公开主体",
      "aliases": ["中国宝武", "宝武", "Baowu", "钢铁", "制造", "央企"],
      "basic": {
        "legal": "央企集团公开主体",
        "date": "集团公开披露",
        "capital": "公开披露口径",
        "status": "正常经营",
        "scope": "钢铁制造、新材料、智慧服务和产业金融相关业务",
        "industry": "制造业 / 钢铁",
        "type": "中央企业集团",
        "term": "长期经营"
      },
      "shareholders": [
        {"name": "国务院国资委相关出资", "pct": 100, "color": "#C41230"}
      ],
      "risk": {
        "level": "medium",
        "lawsuit": "钢铁贸易、工程和环保事项需复核",
        "penalty": "环保、安全生产及监管处罚需复核",
        "abnormal": "公开集团主体持续经营",
        "dishonest": "需通过执行公开信息复核",
        "related": "下属上市公司、生产基地和贸易主体众多",
        "checks": [
          {"text": "央企钢铁龙头，产业链资源强", "status": "pass"},
          {"text": "钢价周期、环保安全和贸易真实性需关注", "status": "warn"}
        ]
      },
      "finance": {
        "revenueData": [
          {"year": "2021", "revenue": 9720, "profit": 380},
          {"year": "2022", "revenue": 11087, "profit": 300},
          {"year": "2023", "revenue": 11100, "profit": 170}
        ],
        "debtData": {"totalAssets": 13000, "totalDebt": 8000, "equity": 5000, "currentRatio": 1.0, "debtRatio": "约62%"}
      },
      "products": [
        {"name": "票据池", "fit": "高适配", "cls": "fit-high", "reason": "钢铁贸易结算和账期管理需求强"},
        {"name": "供应链金融", "fit": "高适配", "cls": "fit-high", "reason": "上游原料和下游贸易商链条完整"},
        {"name": "现金管理", "fit": "高适配", "cls": "fit-high", "reason": "集团多主体资金归集需求强"}
      ],
      "actions": [
        "识别本地钢贸商和配套服务商名单。",
        "核实交易背景、仓单、发票和物流单据一致性。",
        "围绕票据池和供应链金融设计方案。"
      ],
      "sources": [
        {"name": "集团公开披露/世界500强公开信息", "type": "public_disclosure", "confidence": "medium"},
        {"name": "公开新闻与官网", "type": "web_public", "confidence": "medium"}
      ],
      "manual_review_items": ["集团最新财务口径", "钢贸交易单据", "环保安全记录"]
    },
    {
      "company_id": "china_resources",
      "name": "华润股份有限公司",
      "code": "央企集团公开主体",
      "aliases": ["华润", "China Resources", "央企", "消费", "商贸"],
      "basic": {
        "legal": "央企集团公开主体",
        "date": "集团公开披露",
        "capital": "公开披露口径",
        "status": "正常经营",
        "scope": "消费品、医药、能源、城市建设运营、大健康等多元业务",
        "industry": "商贸 / 多元控股集团",
        "type": "中央企业集团",
        "term": "长期经营"
      },
      "shareholders": [
        {"name": "国务院国资委相关出资", "pct": 100, "color": "#C41230"}
      ],
      "risk": {
        "level": "low",
        "lawsuit": "多元集团各板块诉讼需按主体复核",
        "penalty": "医药、零售、能源等监管处罚需分板块复核",
        "abnormal": "公开集团主体持续经营",
        "dishonest": "需通过执行公开信息复核",
        "related": "下属上市平台和业务主体较多",
        "checks": [
          {"text": "央企多元集团，业务和资金基础较强", "status": "pass"},
          {"text": "不同板块监管要求差异大，需按主体穿透", "status": "warn"}
        ]
      },
      "finance": {
        "revenueData": [
          {"year": "2021", "revenue": 7700, "profit": 350},
          {"year": "2022", "revenue": 8200, "profit": 330},
          {"year": "2023", "revenue": 9000, "profit": 360}
        ],
        "debtData": {"totalAssets": 24000, "totalDebt": 15000, "equity": 9000, "currentRatio": 1.2, "debtRatio": "约63%"}
      },
      "products": [
        {"name": "现金管理", "fit": "高适配", "cls": "fit-high", "reason": "多板块、多主体资金管理需求强"},
        {"name": "对公存款", "fit": "高适配", "cls": "fit-high", "reason": "消费和零售板块资金沉淀空间大"},
        {"name": "供应链金融", "fit": "中适配", "cls": "fit-medium", "reason": "零售、医药和能源供应链可筛选"}
      ],
      "actions": [
        "按板块识别本地经营主体和结算场景。",
        "优先从资金归集、对公存款和财资管理切入。",
        "对医药、能源、零售板块分别做合规清单。"
      ],
      "sources": [
        {"name": "集团公开披露/世界500强公开信息", "type": "public_disclosure", "confidence": "medium"},
        {"name": "公开新闻与官网", "type": "web_public", "confidence": "medium"}
      ],
      "manual_review_items": ["本地子公司清单", "板块监管要求", "真实结算流水"]
    },
    {
      "company_id": "xiamen_cd",
      "name": "厦门建发集团有限公司",
      "code": "地方国企集团公开主体",
      "aliases": ["厦门建发", "建发集团", "C&D", "供应链", "商贸", "国企"],
      "basic": {
        "legal": "地方国企集团公开主体",
        "date": "集团公开披露",
        "capital": "公开披露口径",
        "status": "正常经营",
        "scope": "供应链运营、城市建设与运营、旅游会展、医疗健康等",
        "industry": "商贸 / 供应链运营",
        "type": "地方国有企业集团",
        "term": "长期经营"
      },
      "shareholders": [
        {"name": "厦门市国资相关出资", "pct": 100, "color": "#C41230"}
      ],
      "risk": {
        "level": "medium",
        "lawsuit": "贸易、供应链和地产相关风险需复核",
        "penalty": "需按监管处罚库复核",
        "abnormal": "公开集团主体持续经营",
        "dishonest": "需通过执行公开信息复核",
        "related": "供应链贸易、地产和子公司主体较多",
        "checks": [
          {"text": "供应链运营规模较大", "status": "pass"},
          {"text": "贸易背景真实性、货权和应收账款需重点核验", "status": "warn"}
        ]
      },
      "finance": {
        "revenueData": [
          {"year": "2021", "revenue": 7200, "profit": 80},
          {"year": "2022", "revenue": 8300, "profit": 75},
          {"year": "2023", "revenue": 9000, "profit": 65}
        ],
        "debtData": {"totalAssets": 7500, "totalDebt": 5600, "equity": 1900, "currentRatio": 1.1, "debtRatio": "约75%"}
      },
      "products": [
        {"name": "贸易融资", "fit": "高适配", "cls": "fit-high", "reason": "供应链运营和大宗贸易场景明确"},
        {"name": "票据池", "fit": "高适配", "cls": "fit-high", "reason": "上下游账期和结算需求强"},
        {"name": "现金管理", "fit": "中适配", "cls": "fit-medium", "reason": "多主体资金归集适配"}
      ],
      "actions": [
        "重点核实贸易背景、货权凭证和物流单据。",
        "梳理本地上下游客户和票据使用情况。",
        "对地产相关敞口保持谨慎评估。"
      ],
      "sources": [
        {"name": "集团公开披露/世界500强公开信息", "type": "public_disclosure", "confidence": "medium"},
        {"name": "公开新闻与官网", "type": "web_public", "confidence": "medium"}
      ],
      "manual_review_items": ["贸易合同", "仓单/物流单据", "应收账款明细", "地产敞口"]
    },
    {
      "company_id": "china_tower",
      "name": "中国铁塔股份有限公司",
      "code": "0788.HK",
      "aliases": ["中国铁塔", "China Tower", "0788", "通信基础设施", "央企"],
      "basic": {
        "legal": "上市公司公开披露主体",
        "date": "2014年",
        "capital": "公开披露口径",
        "status": "正常经营",
        "scope": "通信铁塔、室分系统、能源和数字化应用服务",
        "industry": "通信 / 基础设施运营",
        "type": "央企控股港股上市公司",
        "term": "长期经营"
      },
      "shareholders": [
        {"name": "三大电信运营商及国资相关股东", "pct": 74, "color": "#C41230"},
        {"name": "公众股东", "pct": 26, "color": "#2B6CB0"}
      ],
      "risk": {
        "level": "low",
        "lawsuit": "工程建设和租赁纠纷需复核",
        "penalty": "需按监管处罚库复核",
        "abnormal": "公开披露主体持续经营",
        "dishonest": "需通过执行公开信息复核",
        "related": "地市分公司、建设服务商和能源合作方较多",
        "checks": [
          {"text": "通信基础设施运营现金流相对稳定", "status": "pass"},
          {"text": "资本开支、工程服务商和站址租赁合规需关注", "status": "warn"}
        ]
      },
      "finance": {
        "revenueData": [
          {"year": "2022", "revenue": 922, "profit": 88},
          {"year": "2023", "revenue": 940, "profit": 98},
          {"year": "2024", "revenue": 976, "profit": 105}
        ],
        "debtData": {"totalAssets": 3400, "totalDebt": 1650, "equity": 1750, "currentRatio": 1.0, "debtRatio": "约49%"}
      },
      "products": [
        {"name": "现金管理", "fit": "高适配", "cls": "fit-high", "reason": "地市分支和建设项目资金管理需求明确"},
        {"name": "保函业务", "fit": "中适配", "cls": "fit-medium", "reason": "工程建设和服务商合同场景适配"},
        {"name": "供应链金融", "fit": "中适配", "cls": "fit-medium", "reason": "工程服务商和设备供应商可筛选"}
      ],
      "actions": [
        "识别本地分公司、工程服务商和站址租赁场景。",
        "了解保证金、保函和资金归集需求。",
        "围绕工程服务商做供应链客户筛选。"
      ],
      "sources": [
        {"name": "公司年报/公告公开披露", "type": "public_disclosure", "confidence": "high"},
        {"name": "港交所公开信息", "type": "exchange_public", "confidence": "high"}
      ],
      "manual_review_items": ["本地工程合同", "服务商名单", "站址租赁合规材料"]
    },
    {
      "company_id": "china_resources_land",
      "name": "华润置地有限公司",
      "code": "1109.HK",
      "aliases": ["华润置地", "CR Land", "1109", "地产", "城市运营", "国企"],
      "basic": {
        "legal": "上市公司公开披露主体",
        "date": "上市主体公开披露",
        "capital": "公开披露口径",
        "status": "正常经营",
        "scope": "房地产开发、商业地产运营、城市更新和物业服务",
        "industry": "政府平台 / 城市建设运营",
        "type": "央企背景港股上市公司",
        "term": "长期经营"
      },
      "shareholders": [
        {"name": "华润集团相关股东", "pct": 59, "color": "#C41230"},
        {"name": "公众股东", "pct": 41, "color": "#2B6CB0"}
      ],
      "risk": {
        "level": "medium",
        "lawsuit": "房地产销售、工程和租赁纠纷需复核",
        "penalty": "需按监管处罚库复核",
        "abnormal": "公开披露主体持续经营",
        "dishonest": "需通过执行公开信息复核",
        "related": "项目公司、商业运营和物业主体较多",
        "checks": [
          {"text": "央企背景和商业运营资产质量较好", "status": "pass"},
          {"text": "地产行业周期、项目去化和债务结构需关注", "status": "warn"}
        ]
      },
      "finance": {
        "revenueData": [
          {"year": "2022", "revenue": 2070, "profit": 280},
          {"year": "2023", "revenue": 2511, "profit": 314},
          {"year": "2024", "revenue": 2460, "profit": 230}
        ],
        "debtData": {"totalAssets": 12000, "totalDebt": 8200, "equity": 3800, "currentRatio": 1.2, "debtRatio": "约68%"}
      },
      "products": [
        {"name": "项目资金监管", "fit": "中适配", "cls": "fit-medium", "reason": "项目公司和销售回款管理场景适配"},
        {"name": "保函业务", "fit": "中适配", "cls": "fit-medium", "reason": "工程建设和租赁保证金需求存在"},
        {"name": "对公存款", "fit": "中适配", "cls": "fit-medium", "reason": "商业物业租金回款可形成沉淀"}
      ],
      "actions": [
        "核实本地项目公司、销售回款和租金流水。",
        "关注项目去化、工程付款和债务到期安排。",
        "从商业物业租金归集和项目监管切入。"
      ],
      "sources": [
        {"name": "公司年报/公告公开披露", "type": "public_disclosure", "confidence": "high"},
        {"name": "港交所公开信息", "type": "exchange_public", "confidence": "high"}
      ],
      "manual_review_items": ["本地项目清单", "销售回款流水", "债务到期安排", "工程合同"]
    }
  ]
}
;
