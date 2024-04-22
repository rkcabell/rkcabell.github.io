import os
import shutil
from datetime import datetime
import re


def format_date(date):
    return date.strftime("%#d %b %Y") if os.name == "nt" else date.strftime("%-d %b %Y")


def get_earliest_date(file_path):
    stats = os.stat(file_path)
    return min(
        datetime.fromtimestamp(stats.st_ctime),
        datetime.fromtimestamp(stats.st_mtime),
        datetime.fromtimestamp(stats.st_atime),
    )


def numeric_sort_key(s):
    return [
        int(text) if text.isdigit() else text.lower() for text in re.split(r"(\d+)", s)
    ]


def extract_number(filename):
    match = re.search(r"(\d+)", filename)
    return int(match.group(1)) if match else 0


def generate_document(directory, mode):
    entries = []
    base_title = mode.capitalize()
    file_path = f"C:/Users/Rynan/Documents/Github/rkcabell/rkcabell.github.io/assets/images/{directory}/"

    # Ensure script is in the right directory (adjust if necessary)
    os.chdir("C:/Users/Rynan/Documents/Github/rkcabell/rkcabell.github.io")

    # Sorting files numerically based on embedded numbers
    files = sorted(os.listdir(file_path), key=numeric_sort_key)
    print("Sorted files:", files)

    for file in files:
        if file.lower().endswith((".png", ".jpg", ".jpeg")):
            if mode in file.lower():
                number = extract_number(file)
                date = get_earliest_date(os.path.join(file_path, file))
                formatted_date = format_date(date)
                title = f"{base_title}{number:02}"
                entry = f"""
- title: "{title}"
  imgSrc: "/assets/images/{directory}/{file}"
  date: "{formatted_date}"
  link: "photo-detail.html?v={file}"
                """
                entries.append(entry)
                print(f"Processed: {title}")
            else:
                print(f"Skipped (mode not found): {file}")
        else:
            print(f"Skipped (wrong extension): {file}")

    gallery_file = f"{mode}-gallery.yml"
    with open(gallery_file, "w") as f:
        f.writelines(entries)

    target_dir = "_data"
    if not os.path.exists(target_dir):
        os.makedirs(target_dir)
    shutil.move(gallery_file, os.path.join(target_dir, gallery_file))
    print(f"File moved to: {os.path.join(os.getcwd(), target_dir, gallery_file)}")


if __name__ == "__main__":
    modes = ["cat", "art"]
    directory = "thumbnails"
    for mode in modes:
        generate_document(directory, mode)
