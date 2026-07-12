import json
import os
from pathlib import Path
from typing import Dict, Iterable, List

from .models import CompanyRecord


def _record_from_dict(payload: Dict[str, object], provider_source: str) -> CompanyRecord:
    return CompanyRecord(
        company_id=str(payload["company_id"]),
        name=str(payload["name"]),
        code=str(payload.get("code", "")),
        aliases=list(payload.get("aliases", [])),
        basic=dict(payload.get("basic", {})),
        shareholders=list(payload.get("shareholders", [])),
        risk=dict(payload.get("risk", {})),
        finance=dict(payload.get("finance", {})),
        products=list(payload.get("products", [])),
        actions=list(payload.get("actions", [])),
        sources=list(payload.get("sources", [])),
        manual_review_items=list(payload.get("manual_review_items", [])),
        provider_source=provider_source,
    )


class MockCompanyProvider:
    """Local provider that mirrors the real provider contract.

    Replace this adapter with Tianyancha, Qichacha, or bank-internal providers
    without changing the service or frontend payload shape.
    """

    def __init__(self):
        self._records = {
            "popmart": CompanyRecord(
                company_id="popmart",
                name="泡泡玛特国际集团有限公司",
                code="9992.HK",
                aliases=["泡泡玛特", "POP MART", "9992"],
                basic={
                    "legal": "上市公司公开披露主体",
                    "date": "2010年",
                    "capital": "公开披露口径",
                    "status": "正常经营",
                    "scope": "潮流文化娱乐、IP孵化、零售及跨境业务",
                    "industry": "消费零售 / 潮玩IP",
                    "type": "港股上市公司",
                    "term": "长期经营",
                },
                shareholders=[
                    {"name": "创始人及一致行动人", "pct": 47, "color": "#C41230"},
                    {"name": "公众股东", "pct": 53, "color": "#2B6CB0"},
                ],
                risk={
                    "level": "low",
                    "lawsuit": "公开信息未见重大异常",
                    "penalty": "待通过商业风控接口复核",
                    "abnormal": "未见经营异常公开提示",
                    "dishonest": "待通过执行公开信息复核",
                    "related": "存在境内外经营主体及供应链关联方",
                    "checks": [
                        {"text": "上市公司公开披露较完整，主体识别基础较好", "status": "pass"},
                        {"text": "跨境收入和海外门店扩张需关注汇率及合规风险", "status": "warn"},
                        {"text": "IP热度变化可能影响收入波动", "status": "warn"},
                    ],
                },
                finance={
                    "revenueData": [
                        {"year": "2022", "revenue": 462000, "profit": 47600},
                        {"year": "2023", "revenue": 630000, "profit": 108200},
                        {"year": "2024", "revenue": 850000, "profit": 165000},
                        {"year": "2025E", "revenue": 1050000, "profit": 220000},
                    ],
                    "debtData": {
                        "totalAssets": 1200000,
                        "totalDebt": 240000,
                        "equity": 960000,
                        "currentRatio": 2.4,
                        "debtRatio": "约20%",
                    },
                },
                products=[
                    {"name": "对公存款", "fit": "高适配", "cls": "fit-high", "reason": "现金储备和门店回款沉淀空间较大"},
                    {"name": "薪福通代发", "fit": "高适配", "cls": "fit-high", "reason": "员工规模较大，适合公私联动"},
                    {"name": "跨境结算", "fit": "高适配", "cls": "fit-high", "reason": "海外业务扩张带来结算与汇率管理需求"},
                    {"name": "供应链金融", "fit": "中适配", "cls": "fit-medium", "reason": "可围绕上游生产和物流链条设计方案"},
                ],
                actions=[
                    "优先核实集团主要结算银行、门店回款路径和资金沉淀规模。",
                    "围绕海外业务了解跨境收付、汇率避险和资金归集需求。",
                    "梳理上游供应商账期和票据使用情况，评估供应链金融切入点。",
                    "准备薪福通与员工个人金融联动方案，提升综合贡献。",
                ],
                sources=[
                    {"name": "上市公司公告", "type": "public_disclosure", "confidence": "high"},
                    {"name": "公开新闻与官网", "type": "web_public", "confidence": "medium"},
                    {"name": "商业风控接口", "type": "commercial_api_pending", "confidence": "pending"},
                ],
                manual_review_items=[
                    "最新商业风控接口司法/失信结果",
                    "企业真实结算流水及主要开户行",
                    "海外主体和跨境收付合规材料",
                ],
            )
        }

    def provider_meta(self) -> Dict[str, object]:
        return {
            "provider": "mock_provider",
            "mode": "demo",
            "record_count": len(self._records),
            "real_data_ready": False,
            "source_path": "",
        }

    def search(self, query: str) -> List[CompanyRecord]:
        return [record for record in self._records.values() if record.matches(query)]

    def get(self, company_id: str) -> CompanyRecord:
        try:
            return self._records[company_id]
        except KeyError as exc:
            raise KeyError(f"company not found: {company_id}") from exc


class JsonCompanyProvider:
    """Loads normalized company records from a local JSON file.

    This is the first production-ready seam: a scheduled ETL, bank-internal
    export, or licensed data API can write the same normalized schema here.
    """

    def __init__(self, path):
        self.path = Path(path)
        self._records = self._load_records(self.path)

    def provider_meta(self) -> Dict[str, object]:
        return {
            "provider": "json_provider",
            "mode": "local_real_data",
            "record_count": len(self._records),
            "real_data_ready": True,
            "source_path": str(self.path),
        }

    def search(self, query: str) -> List[CompanyRecord]:
        return [record for record in self._records.values() if record.matches(query)]

    def get(self, company_id: str) -> CompanyRecord:
        try:
            return self._records[company_id]
        except KeyError as exc:
            raise KeyError(f"company not found: {company_id}") from exc

    def _load_records(self, path: Path) -> Dict[str, CompanyRecord]:
        if not path.exists():
            raise FileNotFoundError(f"company data file not found: {path}")
        payload = json.loads(path.read_text(encoding="utf-8"))
        if isinstance(payload, dict):
            raw_records = payload.get("companies", [])
        elif isinstance(payload, list):
            raw_records = payload
        else:
            raw_records = []
        records = [_record_from_dict(item, "json_provider") for item in raw_records]
        return {record.company_id: record for record in records}


class CompositeCompanyProvider:
    """Queries providers in order while exposing a single provider contract."""

    def __init__(self, providers: Iterable[object]):
        self.providers = list(providers)

    def provider_meta(self) -> Dict[str, object]:
        metas = [
            provider.provider_meta()
            for provider in self.providers
            if hasattr(provider, "provider_meta")
        ]
        return {
            "provider": "composite_provider",
            "mode": "hybrid",
            "record_count": sum(int(meta.get("record_count", 0)) for meta in metas),
            "real_data_ready": any(bool(meta.get("real_data_ready")) for meta in metas),
            "providers": metas,
        }

    def search(self, query: str) -> List[CompanyRecord]:
        results = []
        seen = set()
        for provider in self.providers:
            for record in provider.search(query):
                if record.company_id not in seen:
                    results.append(record)
                    seen.add(record.company_id)
        return results

    def get(self, company_id: str) -> CompanyRecord:
        last_error = None
        for provider in self.providers:
            try:
                return provider.get(company_id)
            except KeyError as exc:
                last_error = exc
        raise KeyError(f"company not found: {company_id}") from last_error


def build_default_provider():
    configured_path = os.environ.get("KYC_COMPANY_DATA")
    default_path = Path(__file__).resolve().parent.parent / "file_store" / "company_records.json"
    data_path = Path(configured_path) if configured_path else default_path

    if data_path.exists():
        return CompositeCompanyProvider([JsonCompanyProvider(data_path), MockCompanyProvider()])
    return MockCompanyProvider()
