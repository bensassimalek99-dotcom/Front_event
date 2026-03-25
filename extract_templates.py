import re
import os

XHTML_DIR = r"c:\Users\LENOVO\Downloads\bizmap-business-directory-listing-html-template-7F5NG9W\xhtml"
ANGULAR_DIR = r"c:\Users\LENOVO\Downloads\bizmap-business-directory-listing-html-template-7F5NG9W\bizmap-angular\src\app"

def read_file(path):
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        return f.read()

def write_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

def fix_asset_paths(html):
    """Replace relative asset paths with Angular assets paths"""
    html = re.sub(r'(src|href)="images/', r'\1="assets/images/', html)
    html = re.sub(r'(src|href)="css/', r'\1="assets/css/', html)
    html = re.sub(r'(src|href)="js/', r'\1="assets/js/', html)
    html = re.sub(r'(src|href)="plugins/', r'\1="assets/plugins/', html)
    html = re.sub(r'(src|href)="script/', r'\1="assets/script/', html)
    # Fix background-image urls
    html = re.sub(r'url\(images/', r'url(assets/images/', html)
    # Fix href links to other pages -> Angular routes
    html = re.sub(r'href="index\.html"', r'routerLink="/"', html)
    html = re.sub(r'href="index-2\.html"', r'routerLink="/index-2"', html)
    html = re.sub(r'href="index-3\.html"', r'routerLink="/index-3"', html)
    html = re.sub(r'href="listing\.html"', r'routerLink="/listing"', html)
    html = re.sub(r'href="listing-left-sidebar\.html"', r'routerLink="/listing-left-sidebar"', html)
    html = re.sub(r'href="listing-right-sidebar\.html"', r'routerLink="/listing-right-sidebar"', html)
    html = re.sub(r'href="listing-grid-left-sidebar\.html"', r'routerLink="/listing-grid-left-sidebar"', html)
    html = re.sub(r'href="listing-grid-right-sidebar\.html"', r'routerLink="/listing-grid-right-sidebar"', html)
    html = re.sub(r'href="listing-grid-map-left-sidebar\.html"', r'routerLink="/listing-grid-map-left-sidebar"', html)
    html = re.sub(r'href="listing-grid-map-right-sidebar\.html"', r'routerLink="/listing-grid-map-right-sidebar"', html)
    html = re.sub(r'href="listing-details\.html"', r'routerLink="/listing-details"', html)
    html = re.sub(r'href="listing-details-2\.html"', r'routerLink="/listing-details-2"', html)
    html = re.sub(r'href="listing-details-3\.html"', r'routerLink="/listing-details-3"', html)
    html = re.sub(r'href="blog-standard\.html"', r'routerLink="/blog-standard"', html)
    html = re.sub(r'href="blog-details\.html"', r'routerLink="/blog-details"', html)
    html = re.sub(r'href="add-listing\.html"', r'routerLink="/add-listing"', html)
    html = re.sub(r'href="contact-us\.html"', r'routerLink="/contact-us"', html)
    html = re.sub(r'href="register\.html"', r'routerLink="/register"', html)
    html = re.sub(r'href="coming-soon\.html"', r'routerLink="/coming-soon"', html)
    html = re.sub(r'href="error-404\.html"', r'routerLink="/error-404"', html)
    return html

def extract_header(html):
    """Extract header section"""
    match = re.search(r'(<header.*?</header>)', html, re.DOTALL)
    return match.group(1) if match else ""

def extract_footer(html):
    """Extract footer section"""
    match = re.search(r'(<footer.*?</footer>)', html, re.DOTALL)
    return match.group(1) if match else ""

def extract_page_content(html):
    """Extract content between header closing and footer opening"""
    # Remove everything before </header>
    parts = re.split(r'</header>\s*(?:<!-- header END-->)?', html, maxsplit=1)
    if len(parts) < 2:
        # For pages without standard header (register, coming-soon)
        parts = re.split(r'<body[^>]*>', html, maxsplit=1)
        if len(parts) < 2:
            return html
        content = parts[1]
    else:
        content = parts[1]
    
    # Remove footer and everything after
    content = re.split(r'<footer', content, maxsplit=1)[0]
    
    # Remove ending scroll button and page-wraper closing if present
    content = re.sub(r'\s*<button class="scroltop.*?</button>\s*', '', content, flags=re.DOTALL)
    content = re.sub(r'\s*</div>\s*$', '', content)  # Close page-wraper
    
    # Remove script tags that might be in the content
    content = re.sub(r'<script.*?</script>', '', content, flags=re.DOTALL)
    
    return content.strip()

# Process header from index.html 
index_html = read_file(os.path.join(XHTML_DIR, "index.html"))
header_html = extract_header(index_html)
header_html = fix_asset_paths(header_html)
write_file(os.path.join(ANGULAR_DIR, "shared", "header.component.html"), header_html)

# Process footer from index.html
footer_html = extract_footer(index_html)
footer_html = fix_asset_paths(footer_html)
write_file(os.path.join(ANGULAR_DIR, "shared", "footer.component.html"), footer_html)

# Page mapping: (html_file, angular_component_html_file)
pages = [
    ("index.html", "pages/home.component.html"),
    ("index-2.html", "pages/home2.component.html"),
    ("index-3.html", "pages/home3.component.html"),
    ("listing.html", "pages/listing.component.html"),
    ("listing-left-sidebar.html", "pages/listing-left-sidebar.component.html"),
    ("listing-right-sidebar.html", "pages/listing-right-sidebar.component.html"),
    ("listing-grid-left-sidebar.html", "pages/listing-grid-left-sidebar.component.html"),
    ("listing-grid-right-sidebar.html", "pages/listing-grid-right-sidebar.component.html"),
    ("listing-grid-map-left-sidebar.html", "pages/listing-grid-map-left-sidebar.component.html"),
    ("listing-grid-map-right-sidebar.html", "pages/listing-grid-map-right-sidebar.component.html"),
    ("listing-details.html", "pages/listing-details.component.html"),
    ("listing-details-2.html", "pages/listing-details2.component.html"),
    ("listing-details-3.html", "pages/listing-details3.component.html"),
    ("blog-standard.html", "pages/blog-standard.component.html"),
    ("blog-details.html", "pages/blog-details.component.html"),
    ("add-listing.html", "pages/add-listing.component.html"),
    ("contact-us.html", "pages/contact-us.component.html"),
    ("register.html", "pages/register.component.html"),
    ("coming-soon.html", "pages/coming-soon.component.html"),
    ("error-404.html", "pages/error404.component.html"),
]

for html_file, component_html in pages:
    src_path = os.path.join(XHTML_DIR, html_file)
    dest_path = os.path.join(ANGULAR_DIR, component_html)
    
    html = read_file(src_path)
    content = extract_page_content(html)
    content = fix_asset_paths(content)
    
    write_file(dest_path, content)
    print(f"Processed: {html_file} -> {component_html}")

print("\nAll pages processed!")
