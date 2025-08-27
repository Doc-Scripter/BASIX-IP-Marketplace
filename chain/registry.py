# chain/registry.py
import os
import json
import uuid
from dataclasses import dataclass, asdict
from typing import Dict, List, Optional

from .cardano_integration import (
    build_admin_native_script,
    native_script_to_cbor_hex,
    script_address,
)

DATA_FILE = os.getenv("PROJECTS_FILE", "projects.json")


@dataclass
class Project:
    id: str
    name: str
    threshold_lovelace: int
    vault_script_cbor: str
    vault_address: str
    policy_script_cbor: str
    policy_id: str
    total_supply: int


class Registry:
    def __init__(self, path: str = DATA_FILE):
        self.path = path
        self._data: Dict[str, Project] = {}
        self._load()

    def _load(self):
        if os.path.exists(self.path):
            with open(self.path, "r", encoding="utf8") as f:
                raw = json.load(f)
            for pid, p in raw.items():
                self._data[pid] = Project(**p)

    def _save(self):
        serial = {pid: asdict(p) for pid, p in self._data.items()}
        with open(self.path, "w", encoding="utf8") as f:
            json.dump(serial, f, indent=2)

    def add(self, p: Project):
        self._data[p.id] = p
        self._save()

    def get(self, pid: str) -> Optional[Project]:
        return self._data.get(pid)

    def all(self) -> List[Project]:
        return list(self._data.values())

    def create_project(
        self,
        name: str,
        threshold_lovelace: int,
        total_supply: int = 100,
        ttl_in_slots: Optional[int] = None,
    ) -> Project:
        """
        Build native scripts and create a Project entry.
        Uses admin keyhash to create scripts (so admin can later spend/mint).
        """
        # Build vault & policy native scripts (require admin signature, optional expiry)
        vault_script = build_admin_native_script(ttl_slot=ttl_in_slots)
        policy_script = build_admin_native_script(ttl_slot=ttl_in_slots)

        proj = Project(
            id=str(uuid.uuid4())[:8],
            name=name,
            threshold_lovelace=int(threshold_lovelace),
            vault_script_cbor=native_script_to_cbor_hex(vault_script),
            vault_address=str(script_address(vault_script)),
            policy_script_cbor=native_script_to_cbor_hex(policy_script),
            policy_id=policy_script.hash().payload.hex(),
            total_supply=int(total_supply),
        )

        self.add(proj)
        return proj


# single global registry instance
registry = Registry()
