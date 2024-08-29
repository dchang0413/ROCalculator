import os
import json


def get_class_label_by_name(name):
    classlist = [
        {"id": 'RK', "label": 'Rune Knight / Dragon Knight'},
        {"id": 'GX', "label": 'Guillotine Cross / Shadow Cross'},
        {"id": 'AB', "label": 'Arch Bishop / Cardinal'},
        {"id": 'RA', "label": 'Ranger / Wind Hawk'},
        {"id": 'WL', "label": 'Warlock / Arch Mage'},
        {"id": 'ME', "label": 'Mechanic / Meister'},
        {"id": 'RG', "label": 'Royal Guard / Imperial Guard'},
        {"id": 'SC', "label": 'Shadow Chaser / Abyss Chaser'},
        {"id": 'SU', "label": 'Sura / Inquisitor'},
        {"id": 'MI', "label": 'Maestro / Troubadour'},
        {"id": 'WA', "label": 'Wanderer / Trouvere'},
        {"id": 'SO', "label": 'Sorcerer / Elemental Master'},
        {"id": 'GE', "label": 'Geneticist / Biolo'},
        {"id": 'KO', "label": 'Kagerou'},
        {"id": 'OB', "label": 'Oboro'},
        {"id": 'RE', "label": 'Rebel'},
        {"id": 'SE', "label": 'Star Emperor'},
        {"id": 'SL', "label": 'Soul Reaper'},
        {"id": 'SUM', "label": 'Summoner'},
        {"id": 'SN', "label": 'Super Novice'}
    ]

    if not name:
        return "Unknown"

    for val in classlist:
        if val["id"] == name:
            return val["label"]
    return "Unknown"


def list_all_files_in_folder(folder):
    output = []
    for root, _, files in os.walk(folder):
        for filename in files:
            if "metadata.json" in filename:
                continue
            file_path = os.path.join(root, filename)
            relative_path = os.path.relpath(file_path, folder)
            output.append({"path": file_path, "relative_path": relative_path})
    return output


def read_metadata_from_files(files):
    output = []
    for f in files:
        try:
            with open(f["path"], "r+", encoding="utf-8") as read:
                data = json.load(read)
                output.append({
                    "filename": f["relative_path"],
                    "name": data["Name"],
                    "level": data["Status"]["Level"],
                    "class": get_class_label_by_name(data["Status"]["classid"]),
                    "skill": data["SkillName"],
                    "enemy": data["EnemyName"],
                    "damage": data["SkillDamageAvg"] if "SkillDamageAvg" in data else data["Damage"],
                })
        except Exception:
            continue
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
