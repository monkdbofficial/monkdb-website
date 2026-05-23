#!/usr/bin/env python3
"""Inject a translated namespace into a locale JSON file.

Usage: python inject_namespace.py <locale_json_path> <namespace_key> <payload_json_path>

The payload JSON file must contain the dict that should be set under the given namespace key.
If the namespace key already exists in the locale file, it is replaced. Insertion preserves
existing top-level key order, appending the new namespace at the end if it is missing.
"""
import json
import sys
from collections import OrderedDict

if len(sys.argv) != 4:
    print("Usage: inject_namespace.py <locale_json> <namespace_key> <payload_json>")
    sys.exit(1)

locale_path, namespace_key, payload_path = sys.argv[1], sys.argv[2], sys.argv[3]

with open(locale_path, "r", encoding="utf-8") as f:
    data = json.load(f, object_pairs_hook=OrderedDict)

with open(payload_path, "r", encoding="utf-8") as f:
    payload = json.load(f, object_pairs_hook=OrderedDict)

data[namespace_key] = payload

with open(locale_path, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
    f.write("\n")

print(f"Injected '{namespace_key}' into {locale_path}")
