import json
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Dict, Tuple
from urllib.parse import parse_qs, unquote, urlparse

from kyc_app import KycService


ROOT = Path(__file__).resolve().parent
SERVICE = KycService()
JSON_HEADERS = {"Content-Type": "application/json; charset=utf-8"}
STATIC_CONTENT_TYPES = {
    ".js": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".png": "image/png",
}
STATIC_ROOTS = {
    "/file_store/": ROOT / "file_store",
    "/media/": ROOT / "media",
}


def json_response(status: int, payload: Dict[str, object]) -> Tuple[int, Dict[str, str], str]:
    return status, JSON_HEADERS, json.dumps(payload, ensure_ascii=False)


def resolve_static_asset(raw_path: str):
    parsed = urlparse(raw_path)
    path = unquote(parsed.path)

    for prefix, root in STATIC_ROOTS.items():
        if not path.startswith(prefix):
            continue

        relative = path[len(prefix):]
        if not relative:
            return None

        file_path = (root / relative).resolve()
        root_path = root.resolve()
        if root_path != file_path and root_path not in file_path.parents:
            return None

        content_type = STATIC_CONTENT_TYPES.get(file_path.suffix.lower())
        if not content_type:
            return None
        return file_path, content_type

    return None


def handle_request(method: str, raw_path: str, body=None) -> Tuple[int, Dict[str, str], str]:
    parsed = urlparse(raw_path)
    path = parsed.path
    query = parse_qs(parsed.query)

    try:
        if method == "GET" and path == "/api/status":
            return json_response(200, {"status": "ok", "data_source": SERVICE.get_data_status()})

        if method == "GET" and path == "/api/search/company":
            keyword = query.get("query", [""])[0]
            return json_response(200, {"results": SERVICE.search_companies(keyword)})

        if method == "GET" and path.startswith("/api/company/") and path.endswith("/development-plan"):
            company_id = unquote(path.split("/")[3])
            return json_response(200, SERVICE.get_client_development_plan(company_id))

        if method == "GET" and path.startswith("/api/company/") and path.endswith("/profile"):
            company_id = unquote(path.split("/")[3])
            return json_response(200, SERVICE.get_company_profile(company_id))

        if method == "POST" and path == "/api/report/generate":
            payload = body or {}
            company_id = payload.get("company_id", "")
            return json_response(200, SERVICE.generate_report(company_id))

        return json_response(404, {"error": "not found"})
    except KeyError as exc:
        return json_response(404, {"error": str(exc)})
    except ValueError as exc:
        return json_response(400, {"error": str(exc)})


class KycRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/" or self.path == "/kyc_platform.html":
            self._send_file(ROOT / "kyc_platform.html", "text/html; charset=utf-8")
            return

        static_asset = resolve_static_asset(self.path)
        if static_asset:
            path, content_type = static_asset
            self._send_file(path, content_type)
            return

        self._send_api_response(*handle_request("GET", self.path))

    def do_POST(self):
        length = int(self.headers.get("Content-Length", "0"))
        raw = self.rfile.read(length).decode("utf-8") if length else "{}"
        payload = json.loads(raw or "{}")
        self._send_api_response(*handle_request("POST", self.path, payload))

    def log_message(self, format, *args):
        return

    def _send_api_response(self, status: int, headers: Dict[str, str], body: str):
        encoded = body.encode("utf-8")
        self.send_response(status)
        for name, value in headers.items():
            self.send_header(name, value)
        self.send_header("Content-Length", str(len(encoded)))
        self.end_headers()
        self.wfile.write(encoded)

    def _send_file(self, path: Path, content_type: str):
        if not path.exists():
            self._send_api_response(*json_response(404, {"error": "file not found"}))
            return
        data = path.read_bytes()
        self.send_response(200)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)


def run(host: str = "127.0.0.1", port: int = 8000):
    server = ThreadingHTTPServer((host, port), KycRequestHandler)
    print(f"KYC workbench running at http://{host}:{port}/")
    server.serve_forever()


if __name__ == "__main__":
    run()
