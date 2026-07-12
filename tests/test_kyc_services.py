import unittest
from pathlib import Path
from tempfile import TemporaryDirectory

from kyc_app.providers import JsonCompanyProvider, MockCompanyProvider
from kyc_app.services import KycService


class KycServiceTest(unittest.TestCase):
    def setUp(self):
        self.service = KycService(provider=MockCompanyProvider())

    def test_search_returns_ranked_company_candidates(self):
        results = self.service.search_companies("泡泡玛特")

        self.assertGreaterEqual(len(results), 1)
        self.assertEqual(results[0]["name"], "泡泡玛特国际集团有限公司")
        self.assertIn("source", results[0])

    def test_profile_contains_required_workbench_sections(self):
        profile = self.service.get_company_profile("popmart")

        self.assertEqual(profile["name"], "泡泡玛特国际集团有限公司")
        self.assertIn("basic", profile)
        self.assertIn("risk", profile)
        self.assertIn("products", profile)
        self.assertIn("data_quality", profile)
        self.assertIn("development_plan", profile)
        self.assertGreaterEqual(profile["data_quality"]["coverage_rate"], 80)

    def test_data_status_exposes_provider_metadata(self):
        status = self.service.get_data_status()

        self.assertEqual(status["provider"], "mock_provider")
        self.assertEqual(status["mode"], "demo")
        self.assertGreaterEqual(status["record_count"], 1)

    def test_json_provider_loads_real_data_ready_company_records(self):
        with TemporaryDirectory() as tmp_dir:
            data_file = Path(tmp_dir) / "company_records.json"
            data_file.write_text(
                """
{
  "companies": [
    {
      "company_id": "real_supplier",
      "name": "真实样本供应链有限公司",
      "code": "91310000REALREADY",
      "aliases": ["真实样本", "供应链样本"],
      "basic": {
        "legal": "王某",
        "date": "2018-05-16",
        "capital": "千万级",
        "status": "正常经营",
        "scope": "供应链管理、仓储服务、货物运输代理",
        "industry": "物流 / 供应链",
        "type": "有限责任公司",
        "term": "长期"
      },
      "shareholders": [{"name": "控股股东", "pct": 70, "color": "#C41230"}],
      "risk": {
        "level": "medium",
        "lawsuit": "待核实",
        "penalty": "待核实",
        "abnormal": "未见公开异常",
        "dishonest": "待核实",
        "related": "存在上下游关联交易",
        "checks": [{"text": "需核实运输合同与结算流水", "status": "warn"}]
      },
      "finance": {
        "revenueData": [{"year": "2024", "revenue": 80000, "profit": 4200}],
        "debtData": {"totalAssets": 120000, "totalDebt": 52000, "equity": 68000, "currentRatio": 1.3, "debtRatio": "约43%"}
      },
      "products": [{"name": "供应链金融", "fit": "高适配", "cls": "fit-high", "reason": "上下游账期管理需求明确"}],
      "actions": ["核实核心客户回款周期和运输合同真实性。"],
      "sources": [{"name": "用户导入资料", "type": "manual_import", "confidence": "medium"}],
      "manual_review_items": ["征信记录", "运输合同"]
    }
  ]
}
""",
                encoding="utf-8",
            )

            service = KycService(provider=JsonCompanyProvider(data_file))
            results = service.search_companies("真实样本")
            profile = service.get_company_profile("real_supplier")

        self.assertEqual(results[0]["source"], "json_provider")
        self.assertEqual(profile["name"], "真实样本供应链有限公司")
        self.assertEqual(profile["data_quality"]["source_count"], 1)
        self.assertIn("entry_due_diligence", profile["development_plan"])

    def test_workspace_company_records_contains_twenty_public_disclosure_records(self):
        data_file = Path("file_store/company_records.json")
        service = KycService(provider=JsonCompanyProvider(data_file))
        status = service.get_data_status()
        results = service.search_companies("制造")

        self.assertGreaterEqual(status["record_count"], 20)
        self.assertEqual(status["provider"], "json_provider")
        self.assertTrue(results)

    def test_report_generation_includes_dashboard_and_review_items(self):
        report = self.service.generate_report("popmart")

        self.assertEqual(report["company_id"], "popmart")
        self.assertIn("markdown", report)
        self.assertIn("效率价值看板", report["markdown"])
        self.assertIn("注：本分析基于提供的信息辅助生成", report["markdown"])
        self.assertIn("efficiency_dashboard", report)
        self.assertIn("manual_review_items", report)

    def test_efficiency_dashboard_uses_expected_thresholds(self):
        dashboard = self.service.generate_report("popmart")["efficiency_dashboard"]

        self.assertGreaterEqual(dashboard["saved_minutes"], 180)
        self.assertGreaterEqual(dashboard["report_completeness"], 95)
        self.assertLessEqual(dashboard["manual_review_count"], 3)

    def test_development_plan_covers_three_client_manager_workflows(self):
        plan = self.service.get_client_development_plan("popmart")

        self.assertEqual(plan["company_id"], "popmart")
        self.assertIn("existing_client_deepening", plan)
        self.assertIn("new_client_acquisition", plan)
        self.assertIn("entry_due_diligence", plan)
        self.assertGreaterEqual(len(plan["next_actions"]), 3)
        self.assertIn("客户经理", plan["positioning"])


if __name__ == "__main__":
    unittest.main()
