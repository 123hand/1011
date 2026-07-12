from typing import Dict, List


INDUSTRY_CHANNELS = {
    "制造": ["产业园区走访", "上下游核心企业转介绍", "工信/规上企业名录筛选"],
    "商贸": ["专业市场管委会", "老客户转介绍", "进出口服务机构协同"],
    "建筑": ["政府招投标平台", "住建/工程项目信息", "保函业务存量名单回访"],
    "物流": ["园区仓储企业清单", "供应链核心企业推荐", "冷链/城配协会渠道"],
    "政府": ["财政及国资平台公开名录", "重大项目公示", "区域平台招商协同"],
    "科技": ["科技园区", "高新技术企业名录", "软件行业协会"],
}


BASE_MATERIALS = [
    "营业执照及公司章程",
    "近两年财务报表或纳税申报资料",
    "主要结算账户流水摘要",
    "实际控制人与受益所有人识别材料",
    "主要合同、发票或订单等经营真实性材料",
]


def build_client_development_plan(profile: Dict[str, object]) -> Dict[str, object]:
    basic = profile.get("basic", {})
    risk = profile.get("risk", {})
    products = profile.get("products", [])
    actions = profile.get("actions", [])
    review_items = profile.get("manual_review_items", [])
    industry = str(basic.get("industry", "企业客户"))
    risk_level = str(risk.get("level", "medium"))

    return {
        "company_id": profile["id"],
        "company_name": profile["name"],
        "positioning": _positioning(industry, risk_level),
        "existing_client_deepening": {
            "title": "存量客户深耕",
            "opportunity_map": _opportunity_map(products),
            "visit_questions": _visit_questions(industry, products),
            "relationship_actions": _relationship_actions(actions),
        },
        "new_client_acquisition": {
            "title": "增量新客户拓展",
            "target_channels": _target_channels(industry),
            "screening_criteria": _screening_criteria(industry),
            "first_contact_pitch": _first_contact_pitch(profile["name"], industry),
        },
        "entry_due_diligence": {
            "title": "客户准入尽调前置",
            "required_materials": _required_materials(industry),
            "risk_focus": _risk_focus(risk, review_items),
            "red_flags": _red_flags(risk_level),
        },
        "next_actions": _next_actions(actions, review_items, risk_level),
    }


def _positioning(industry: str, risk_level: str) -> str:
    risk_text = {
        "low": "风险相对可控",
        "medium": "风险中等，需补充核验",
        "high": "风险偏高，先尽调后营销",
    }.get(risk_level, "风险需复核")
    return f"客户经理可将该客户定位为{industry}方向的可跟进企业，当前判断为{risk_text}。"


def _opportunity_map(products: List[Dict[str, str]]) -> List[Dict[str, str]]:
    if not products:
        return [{"area": "基础结算", "priority": "中", "reason": "产品需求尚未明确，先从账户和结算触点切入"}]

    return [
        {
            "area": item.get("name", "综合金融服务"),
            "priority": _priority_from_fit(item.get("fit", "")),
            "reason": item.get("reason", "基于客户画像匹配"),
        }
        for item in products[:5]
    ]


def _visit_questions(industry: str, products: List[Dict[str, str]]) -> List[str]:
    product_names = "、".join(item.get("name", "") for item in products[:3] if item.get("name"))
    questions = [
        "目前主要结算银行、回款路径和资金沉淀规模如何？",
        "近一年订单、应收账款、库存或项目回款是否有明显变化？",
        "是否存在新增贷款、票据、保函、跨境结算或代发需求？",
    ]
    if product_names:
        questions.append(f"围绕{product_names}，客户当前使用哪家机构服务，痛点是什么？")
    if "跨境" in product_names or "出口" in industry:
        questions.append("跨境收付、汇率避险和海外主体合规材料是否完整？")
    return questions


def _relationship_actions(actions: List[str]) -> List[str]:
    if actions:
        return actions[:5]
    return [
        "先建立财务负责人和实际控制人双触点。",
        "完成基础资料收集后再判断授信或产品方案深度。",
        "将客户需求、风险疑点和下一次拜访时间同步留痕。",
    ]


def _target_channels(industry: str) -> List[str]:
    for key, channels in INDUSTRY_CHANNELS.items():
        if key in industry:
            return channels
    return ["产业园区", "商会协会", "上下游客户转介绍"]


def _screening_criteria(industry: str) -> List[str]:
    criteria = [
        "主营业务清晰，经营场所和交易背景可核实",
        "近一年无重大负面舆情、失信或经营异常",
        "具备稳定结算、代发、票据、融资或供应链场景",
    ]
    if "建筑" in industry:
        criteria.append("重点核查在建项目、回款来源、保函需求和涉诉情况")
    if "物流" in industry:
        criteria.append("重点核查车辆/仓储资产、核心客户和运单真实性")
    return criteria


def _first_contact_pitch(company_name: str, industry: str) -> str:
    return (
        f"建议以{industry}企业经营效率和资金周转为切入点，与{company_name}沟通结算、"
        "代发、票据、融资和供应链协同机会，先做需求摸排，不承诺授信审批结果。"
    )


def _required_materials(industry: str) -> List[str]:
    materials = list(BASE_MATERIALS)
    if "建筑" in industry:
        materials.extend(["在建项目合同及中标通知", "工程回款安排及保函需求清单"])
    elif "物流" in industry:
        materials.extend(["主要运输合同或运单样本", "车辆/仓储资产清单"])
    elif "跨境" in industry or "出口" in industry:
        materials.extend(["进出口报关或收付汇资料", "跨境交易对手与贸易背景材料"])
    return materials


def _risk_focus(risk: Dict[str, object], review_items: List[str]) -> List[str]:
    focus = [
        f"司法诉讼：{risk.get('lawsuit', '待核实')}",
        f"行政处罚：{risk.get('penalty', '待核实')}",
        f"经营异常：{risk.get('abnormal', '待核实')}",
        f"失信记录：{risk.get('dishonest', '待核实')}",
    ]
    focus.extend(f"待人工复核：{item}" for item in review_items[:4])
    return focus


def _red_flags(risk_level: str) -> List[str]:
    flags = [
        "要求包装材料、放松尽调或绕开审批流程",
        "交易背景、合同、发票、流水之间无法相互印证",
        "实控人、受益所有人或关联企业结构不清晰",
    ]
    if risk_level == "high":
        flags.append("存在重大失信、涉诉或经营异常时，应先完成合规复核")
    return flags


def _next_actions(actions: List[str], review_items: List[str], risk_level: str) -> List[str]:
    next_actions = list(actions[:3])
    next_actions.extend(f"补充复核：{item}" for item in review_items[:3])
    if risk_level in {"medium", "high"}:
        next_actions.append("暂不作授信承诺，先完成客户准入尽调和合规复核。")
    while len(next_actions) < 3:
        next_actions.append("安排一次上门或视频访谈，核实经营场景和真实需求。")
    return next_actions[:6]


def _priority_from_fit(fit: str) -> str:
    if "高" in fit:
        return "高"
    if "中" in fit:
        return "中"
    return "观察"
