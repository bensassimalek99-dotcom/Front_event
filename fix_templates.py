import os
import re

ANGULAR_DIR = r"c:\Users\LENOVO\Downloads\bizmap-business-directory-listing-html-template-7F5NG9W\bizmap-angular\src\app"

def read_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

# All HTML template files to fix
html_files = []
for root, dirs, files in os.walk(ANGULAR_DIR):
    for f in files:
        if f.endswith('.component.html'):
            html_files.append(os.path.join(root, f))

for filepath in html_files:
    content = read_file(filepath)
    original = content
    
    # 1. Fix @ in email addresses - replace @word with &#64;word in text content
    # But NOT in Angular directives like *ngIf, (click), etc.
    # Match @ followed by word characters (email pattern) but not Angular syntax
    content = re.sub(r'(?<=[a-zA-Z0-9.])@(?=[a-zA-Z])', '&#64;', content)
    
    # 2. Remove </body> and </html> closing tags
    content = re.sub(r'\s*</body>\s*', '\n', content)
    content = re.sub(r'\s*</html>\s*', '\n', content)
    
    # 3. Fix <h3 ...>...</h2> tag mismatch -> <h3 ...>...</h3>
    content = re.sub(r'(<h3[^>]*>.*?)</h2>', r'\1</h3>', content, flags=re.DOTALL)
    
    # 4. Remove any remaining <script> tags that we might have missed
    content = re.sub(r'<script[^>]*>.*?</script>', '', content, flags=re.DOTALL)
    
    if content != original:
        write_file(filepath, content)
        print(f"Fixed: {os.path.relpath(filepath, ANGULAR_DIR)}")

# Also fix the footer component
footer_path = os.path.join(ANGULAR_DIR, "shared", "footer.component.html")
content = read_file(footer_path)
if '&#64;' not in content and '@example' in content:
    content = content.replace('@example', '&#64;example')
    write_file(footer_path, content)
    print("Fixed footer")

print("\nAll fixes applied!")
