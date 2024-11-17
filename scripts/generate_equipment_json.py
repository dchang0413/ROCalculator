import os
import json


def list_all_files_in_folder(folder):
    output = []
    for root, _, files in os.walk(folder):
        for filename in files:
            file_path = os.path.join(root, filename)
            relative_path = os.path.relpath(file_path, folder)
            output.append({"path": file_path, "relative_path": relative_path})
    return output


def fetch_all_data(files):
    output = []
    seen_ids = set()
    for f in files:
        try:
            with open(f["path"], "r+", encoding="utf-8") as read:
                data = json.load(read)
                for item in data:
                    item_id = item.get("itemid")
                    if item_id not in seen_ids:
                        seen_ids.add(item_id)
                        output.append(item)

        except Exception:
            continue

    output.sort(key=lambda x: x["itemid"])
    return output


def generate_equipment_file(data):
    script_dir = os.path.dirname(os.path.realpath(__file__))
    folder_path = os.path.join(script_dir, '..', 'default_equip')
    output = json.dumps(data, indent=3)
    with open(os.path.join(folder_path, 'equipment.json'), mode="w+", encoding="utf-8") as f:
        f.write(output)


if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.realpath(__file__))
    folder_path = os.path.join(script_dir, '..', 'default_equip')
    files_in_path = list_all_files_in_folder(folder_path)
    all_data = fetch_all_data(files_in_path)
    generate_equipment_file(all_data)
