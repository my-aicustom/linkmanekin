from pathlib import Path
import re
import tree_sitter
import tree_sitter_typescript
import tree_sitter_javascript
import tree_sitter_python
from defusedxml import ElementTree as ET

root = Path(__file__).resolve().parents[1]
ts = tree_sitter.Parser(tree_sitter.Language(tree_sitter_typescript.language_typescript()))
js = tree_sitter.Parser(tree_sitter.Language(tree_sitter_javascript.language()))
py = tree_sitter.Parser(tree_sitter.Language(tree_sitter_python.language()))
errors, count = [], 0
for folder in ('src', 'scripts', 'tests'):
    for path in (root / folder).rglob('*'):
        if not path.is_file():
            continue
        text = path.read_text(encoding='utf-8')
        chunks = []
        if path.suffix == '.astro':
            match = re.match(r'^---\s*\n(.*?)\n---', text, re.S)
            if match:
                chunks.append((ts, match.group(1)))
            chunks.extend((ts, x) for x in re.findall(r'<script[^>]*>(.*?)</script>', text, re.S))
        elif path.suffix == '.ts':
            chunks.append((ts, text))
        elif path.suffix == '.mjs':
            chunks.append((js, text))
        elif path.suffix == '.py':
            chunks.append((py, text))
        for parser, chunk in chunks:
            count += 1
            if parser.parse(chunk.encode()).root_node.has_error:
                errors.append(str(path.relative_to(root)))
for path in root.glob('*.mjs'):
    count += 1
    if js.parse(path.read_bytes()).root_node.has_error:
        errors.append(str(path.relative_to(root)))
for path in (root / 'public').rglob('*.svg'):
    ET.parse(path)
print(f'Tree-sitter: {count} code units checked; SVG XML: 11 assets checked.')
if errors:
    raise SystemExit('Syntax errors: ' + ', '.join(errors))
print('No syntax errors.')
