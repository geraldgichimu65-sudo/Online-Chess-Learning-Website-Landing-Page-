from pathlib import Path
import re
path = Path('siterev.html')
text = path.read_text(encoding='utf-8')
blocks = re.findall(r'<style>(.*?)</style>', text, re.S)
print('blocks=', len(blocks))
for i,b in enumerate(blocks, 1):
    lines = b.strip().splitlines()
    print(f'--- block {i} len {len(lines)}')
    for line in lines[:30]:
        print(line)
    if len(lines) > 30:
        print('...')
