import json
import unittest

from kyc_server import handle_request


class KycApiTest(unittest.TestCase):
    def test_search_endpoint_returns_json_candidates(self):
        status, headers, body = handle_request("GET", "/api/search/company?query=泡泡玛特")

        payload = json.loads(body)
        self.assertEqual(status, 200)
        self.assertEqual(headers["Content-Type"], "application/json; charset=utf-8")
        self.assertEqual(payload["results"][0]["name"], "泡泡玛特国际集团有限公司")

    def test_status_endpoint_returns_data_source_metadata(self):
        status, _headers, body = handle_request("GET", "/api/status")

        payload = json.loads(body)
        self.assertEqual(status, 200)
        self.assertEqual(payload["status"], "ok")
        self.assertIn("data_source", payload)
        self.assertIn("provider", payload["data_source"])

    def test_profile_endpoint_returns_company_workbench_payload(self):
        status, _headers, body = handle_request("GET", "/api/company/popmart/profile")

        payload = json.loads(body)
        self.assertEqual(status, 200)
        self.assertEqual(payload["id"], "popmart")
        self.assertIn("data_quality", payload)
        self.assertIn("development_plan", payload)

    def test_development_plan_endpoint_returns_client_manager_workflow(self):
        status, _headers, body = handle_request("GET", "/api/company/popmart/development-plan")

        payload = json.loads(body)
        self.assertEqual(status, 200)
        self.assertEqual(payload["company_id"], "popmart")
        self.assertIn("existing_client_deepening", payload)
        self.assertIn("new_client_acquisition", payload)
        self.assertIn("entry_due_diligence", payload)

    def test_report_endpoint_returns_markdown_report(self):
        status, _headers, body = handle_request("POST", "/api/report/generate", {"company_id": "popmart"})

        payload = json.loads(body)
        self.assertEqual(status, 200)
        self.assertIn("效率价值看板", payload["markdown"])

    def test_unknown_route_returns_404(self):
        status, _headers, body = handle_request("GET", "/api/missing")

        self.assertEqual(status, 404)
        self.assertIn("not found", body)


if __name__ == "__main__":
    unittest.main()
