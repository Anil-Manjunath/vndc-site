import zipfile
import sys
import os
import xml.etree.ElementTree as ET

def docx_to_text(docx_path):
    with zipfile.ZipFile(docx_path) as z:
        with z.open('word/document.xml') as f:
            tree = ET.parse(f)
            root = tree.getroot()
            # Namespaces
            ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
            texts = []
            for elem in root.findall('.//w:t', ns):
                texts.append(elem.text or '')
            return '\n'.join(''.join(texts).splitlines())

if __name__ == '__main__':
    base_dir = os.path.join(os.path.dirname(__file__), '..', 'Dance', 'assets')
    base_dir = os.path.abspath(base_dir)
    for fname in os.listdir(base_dir):
        if fname.lower().endswith('.docx'):
            path = os.path.join(base_dir, fname)
            try:
                txt = docx_to_text(path)
                out = os.path.join(base_dir, os.path.splitext(fname)[0] + '.txt')
                with open(out, 'w', encoding='utf-8') as f:
                    f.write(txt)
                print(f'Wrote: {out}')
            except Exception as e:
                print(f'Error processing {path}: {e}')
