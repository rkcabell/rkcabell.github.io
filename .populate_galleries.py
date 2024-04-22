# import os
# import shutil
# from datetime import datetime
# import random


# def format_date(date):
#     return date.strftime("%#d %b %Y") if os.name == "nt" else date.strftime("%-d %b %Y")


# def get_earliest_date(file_path):
#     stats = os.stat(file_path)
#     return min(
#         datetime.fromtimestamp(stats.st_ctime),
#         datetime.fromtimestamp(stats.st_mtime),
#         datetime.fromtimestamp(stats.st_atime),
#     )


# def generate_document(directory, mode):
#     entries = []
#     base_title = mode.capitalize()
#     tags = ["outdoor", "summer", "night", "portrait", "nature"]  # Example tags
#     file_path = f"assets/images/{directory}/"

#     # Ensure script is in the right directory (add your project root path if needed)
#     os.chdir("C:\\Users\\Rynan\\Documents\\Github\\rkcabell\\rkcabell.github.io")

#     # Count files and prepare to zero-pad titles
#     files = [f for f in os.listdir(file_path) if f.lower().endswith((".png", ".jpg"))]
#     max_index_length = len(str(len(files)))  # Length of the largest index

#     for index, file in enumerate(sorted(files), 1):
#         if file.lower().endswith(".png") or file.lower().endswith(".jpg"):
#             date = get_earliest_date(os.path.join(file_path, file))
#             formatted_date = format_date(date)
#             title = f"{base_title}{str(index).zfill(max_index_length)}"
#             tag = random.choice(tags)
#             entry = f"""
# - title: "{title}"
#   imgSrc: "{file_path}{file}"
#   date: "{formatted_date}"
#   views: "{tag}"
#   link: "photo-detail.html?v={file}"
#             """
#             entries.append(entry)

#     gallery_file = f"{mode}-gallery.yml"
#     with open(gallery_file, "w") as f:
#         f.writelines(entries)

#     target_dir = "_data"
#     if not os.path.exists(target_dir):
#         os.makedirs(target_dir)

#     # Move the file to the /_data/ directory and print the new location
#     shutil.move(gallery_file, os.path.join(target_dir, gallery_file))
#     print(f"File moved to: {os.path.join(os.getcwd(), target_dir, gallery_file)}")


# if __name__ == "__main__":
#     directories = {"cat_img": "cat", "art_img": "art"}

#     for directory, mode in directories.items():
#         generate_document(directory, mode)


import os
import shutil
from datetime import datetime
import random
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
    # Extracts numbers from filename and sorts by converting them to integers
    return [
        int(text) if text.isdigit() else text.lower() for text in re.split(r"(\d+)", s)
    ]


def generate_document(directory, mode):
    entries = []
    base_title = mode.capitalize()
    tags = ["outdoor", "summer", "night", "portrait", "nature"]  # Example tags
    file_path = f"assets/images/{directory}/"

    # Ensure script is in the right directory (add your project root path if needed)
    os.chdir("C:\\Users\\Rynan\\Documents\\Github\\rkcabell\\rkcabell.github.io")

    # Sorting files numerically based on embedded numbers
    files = sorted(os.listdir(file_path), key=numeric_sort_key)

    for index, file in enumerate(files, 1):
        if file.lower().endswith((".png", ".jpg", ".jpeg")):
            date = get_earliest_date(os.path.join(file_path, file))
            formatted_date = format_date(date)
            title = f"{base_title}{index:02}"  # Pad with zero for consistent file name length
            # tag = random.choice(tags)
            entry = f"""
- title: "{title}"
  imgSrc: "{file_path}{file}"
  date: "{formatted_date}"
  link: "photo-detail.html?v={file}"
            """
            entries.append(entry)

    gallery_file = f"{mode}-gallery.yml"
    with open(gallery_file, "w") as f:
        f.writelines(entries)

    target_dir = "_data"
    if not os.path.exists(target_dir):
        os.makedirs(target_dir)

    # Move the file to the /_data/ directory and print the new location
    shutil.move(gallery_file, os.path.join(target_dir, gallery_file))
    print(f"File moved to: {os.path.join(os.getcwd(), target_dir, gallery_file)}")


if __name__ == "__main__":
    directories = {"cat_img": "cat", "art_img": "art"}

    for directory, mode in directories.items():
        generate_document(directory, mode)
