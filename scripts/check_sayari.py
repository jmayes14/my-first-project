"""Check that Sayari API credentials in .env work.

Requests an OAuth token, then calls the usage endpoint. Prints only
status information; never prints the secret or the token.

Usage: python3 scripts/check_sayari.py
"""

import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path

ENV_PATH = Path(__file__).resolve().parent.parent / ".env"


def load_env(path):
    if not path.exists():
        return
    for line in path.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip().strip("'\""))


def request(url, data=None, token=None):
    headers = {"accept": "application/json"}
    body = None
    if data is not None:
        headers["content-type"] = "application/json"
        body = json.dumps(data).encode()
    if token:
        headers["authorization"] = f"Bearer {token}"
    req = urllib.request.Request(url, data=body, headers=headers)
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.load(resp)


def main():
    load_env(ENV_PATH)
    client_id = os.environ.get("SAYARI_CLIENT_ID")
    client_secret = os.environ.get("SAYARI_CLIENT_SECRET")
    base_url = os.environ.get("SAYARI_BASE_URL") or "https://api.sayari.com"
    if not client_id or not client_secret:
        sys.exit("Missing SAYARI_CLIENT_ID or SAYARI_CLIENT_SECRET. "
                 "Copy .env.example to .env and fill them in.")

    try:
        token = request(f"{base_url}/oauth/token", {
            "client_id": client_id,
            "client_secret": client_secret,
            "audience": "sayari.com",
            "grant_type": "client_credentials",
        })
        print(f"Token OK (expires in {token.get('expires_in')} seconds).")
        usage = request(f"{base_url}/v1/usage", token=token["access_token"])
    except urllib.error.HTTPError as err:
        sys.exit(f"Sayari returned HTTP {err.code} for {err.url}. "
                 "Check your credentials and region.")
    except urllib.error.URLError as err:
        sys.exit(f"Could not reach Sayari: {err.reason}")

    print(f"Usage endpoint OK ({usage.get('from')} to {usage.get('to')}):")
    for path, count in sorted(usage.get("usage", {}).items()):
        print(f"  {path}: {count}")


if __name__ == "__main__":
    main()
