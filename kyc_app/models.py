from dataclasses import dataclass, field
from typing import Dict, List


@dataclass(frozen=True)
class CompanyRecord:
    company_id: str
    name: str
    code: str
    aliases: List[str]
    basic: Dict[str, str]
    shareholders: List[Dict[str, object]]
    risk: Dict[str, object]
    finance: Dict[str, object]
    products: List[Dict[str, str]]
    actions: List[str]
    sources: List[Dict[str, str]]
    manual_review_items: List[str] = field(default_factory=list)
    provider_source: str = "mock_provider"

    def matches(self, query: str) -> bool:
        normalized = query.strip().lower()
        if not normalized:
            return False
        candidates = [self.name, self.code, *self.aliases]
        return any(normalized in item.lower() or item.lower() in normalized for item in candidates)

    def candidate(self) -> Dict[str, str]:
        return {
            "id": self.company_id,
            "name": self.name,
            "code": self.code,
            "industry": self.basic.get("industry", ""),
            "source": self.provider_source,
        }
