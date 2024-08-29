import os
import json


def list_all_files_in_folder(folder):
    output = []
    for root, dirs, files in os.walk(folder):
        for file in files:
            output.append(os.path.join(root, file))
    return output

def read_metadata_from_files(files):
    output = []
    for file in files:
        with open(file, "r+") as f:
            data = json.load(f)
            output.append({
                "name": data["Name"],
                "skill": data["SkillName"],
                "enemy": data["EnemyName"],
                "damage": data["Damage"]
            })
    return output

def create_metadata_file(data):
    script_dir = os.path.dirname(os.path.realpath(__file__))
    folder_path = os.path.join(script_dir, '..', 'template')
    output = json.dumps(data, indent=3)
    with open(os.path.join(folder_path, 'metadata.json'), mode="w+", encoding="utf-8") as f:
        f.write(output)



if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.realpath(__file__))
    folder_path = os.path.join(script_dir, '..', 'template')
    files_in_path = list_all_files_in_folder(folder_path)
    metadata = read_metadata_from_files(files_in_path)
    create_metadata_file(metadata)
