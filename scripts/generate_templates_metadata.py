import os
import json


def get_class_label_by_name(name):
    classlist = [
        {"id": 'RK', "label": 'RuneKnight / DragonKnight'},
        {"id": 'GX', "label": 'GuillotineCross / ShadowCross'},
        {"id": 'AB', "label": 'ArchBishop / Cardinal'},
        {"id": 'RA', "label": 'Ranger / WindHawk'},
        {"id": 'WL', "label": 'Warlock / ArchMage'},
        {"id": 'ME', "label": 'Mechanic / Meister'},
        {"id": 'RG', "label": 'RoyalGuard / ImperialGuard'},
        {"id": 'SC', "label": 'ShadowChaser / AbyssChaser'},
        {"id": 'SU', "label": 'Sura / Inquisitor'},
        {"id": 'MI', "label": 'Maestro / Troubadour'},
        {"id": 'WA', "label": 'Wanderer / Trouvere'},
        {"id": 'SO', "label": 'Sorcerer / ElementalMaster'},
        {"id": 'GE', "label": 'Geneticist / Biolo'},
        {"id": 'KO', "label": 'Kagerou'},
        {"id": 'OB', "label": 'Oboro'},
        {"id": 'RE', "label": 'Rebel'},
        {"id": 'SE', "label": 'StarEmperor'},
        {"id": 'SL', "label": 'SoulReaper'},
        {"id": 'SUM', "label": 'Summoner'},
        {"id": 'SN', "label": 'SuperNovice'}
    ]

    if not name:
        return "Unknown"

    for val in classlist:
        if val["id"] == name:
            return val["label"]
    return "Unknown"


def list_all_files_in_folder(folder):
    output = []
    for root, dirs, files in os.walk(folder):
        for file in files:
            if "metadata" in file:
                continue
            output.append({
                "file": os.path.join(root, file),
                "name": file
            })
    return output


def read_metadata_from_files(files):
    output = []
    for f in files:
        with open(f["file"], "r+") as read:
            data = json.load(read)
            output.append({
                "filename": f["name"],
                "name": data["Name"],
                "class": get_class_label_by_name(data["Status"]["classid"]),
                "skill": data["SkillName"],
                "enemy": data["EnemyName"],
                "damage": data["Damage"],
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
