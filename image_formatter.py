"""
Uses imagemagick to convert all the files to web ready format.

 * Main image becomes progressive jpg
 * @1x and @2x thumbnails (also progressive) saved.
 * YAML file for liquid template
"""
import subprocess
import sys
import os
import yaml

from PIL import Image

thumb_size = 300
directory = sys.argv[-1]
data = []

i = 1

for f in os.listdir(directory):
    if not (f.lower().endswith('.jpg') or f.lower().endswith('.jpeg')):
        continue
    path = os.path.join(directory, f)
    escaped_path = path.replace(' ', '\ ')

    prog = ("convert -auto-orient -strip -interlace Plane -quality 80 "
            "{input} {output}"
            ).format(input=escaped_path, output='full/{}.jpg'.format(i))
    thumb = ("convert -resize {s}x{s}^ -gravity Center -crop {s}x{s}+0+0 "
             "+repage -auto-orient -strip -interlace Plane -quality 80 "
             "{input} {output}"
             ).format(s=thumb_size, input=escaped_path,
                      output='thumb/{}.jpg'.format(i))
    thumb_2x = ("convert -resize {s}x{s}^ -gravity Center -crop {s}x{s}+0+0 "
                "+repage -auto-orient -strip -interlace Plane -quality 80 "
                "{input} {output}"
                ).format(s=thumb_size * 2, input=escaped_path,
                         output='thumb/{}@2x.jpg'.format(i))

    print("Processing {}".format(f))
    subprocess.Popen(thumb, shell=True)
    subprocess.Popen(thumb_2x, shell=True)
    subprocess.Popen(prog, shell=True).wait()

    img = Image.open(path)
    w, h = img.size
    data.append({'width': w, 'height': h, 'name': i})
    i += 1

with open('gallery.yml', 'w') as out_file:
    yaml.dump({'images': data}, out_file, default_flow_style=False)
