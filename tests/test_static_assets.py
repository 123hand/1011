import unittest

from kyc_server import resolve_static_asset


class StaticAssetTest(unittest.TestCase):
    def test_company_records_script_is_served_as_javascript(self):
        asset = resolve_static_asset("/file_store/company_records.js")

        self.assertIsNotNone(asset)
        path, content_type = asset
        self.assertEqual(path.name, "company_records.js")
        self.assertEqual(content_type, "text/javascript; charset=utf-8")

    def test_path_traversal_is_not_served(self):
        self.assertIsNone(resolve_static_asset("/file_store/../AGENTS.md"))


if __name__ == "__main__":
    unittest.main()
