"""Static site generator — parses Markdown posts into HTML pages."""

import base64
import email.utils
import os
import re
from datetime import date, datetime, timezone
from xml.sax.saxutils import escape

import yaml
from jinja2 import Environment, FileSystemLoader
from pygments import highlight
from pygments.formatters import HtmlFormatter
from pygments.lexers import TextLexer, get_lexer_by_name
from markdown_it import MarkdownIt

POSTS_DIR = "posts"
BUILD_DIR = "build"
TEMPLATES_DIR = "templates"
SITE_URL = "https://1matin.com"
DELIMITER = "---"
SIDENOTE_RE = re.compile(r"%%(.+?):::(.+?)%%")
PROFANITY_RE = re.compile(r"\{\{([^{}|]*)\|([^{}|]*)\}\}")

html_formatter = HtmlFormatter(nowrap=True)


def highlight_code(code: str, name: str, _attrs: str) -> str:
    try:
        lexer = get_lexer_by_name(name or "text")
    except Exception:
        lexer = TextLexer()
    return highlight(code, lexer, html_formatter).rstrip()

md = MarkdownIt("gfm-like", {"linkify": False, "highlight": highlight_code})
md.enable(["table", "strikethrough"])
env = Environment(loader=FileSystemLoader(TEMPLATES_DIR))


def process_profanity(html: str) -> str:
    """Wrap {{nsfw_text|sfw_text}} alternations in span tags."""
    return PROFANITY_RE.sub(
        r'<span class="nsfw">\1</span><span class="sfw">\2</span>', html
    )


def process_sidenotes(html: str) -> str:
    """Replace %%text:::note%% with <span class="sidenote" data-note="...">."""

    def replace(m):
        text = process_profanity(m.group(1))
        note = process_profanity(m.group(2))
        encoded = base64.b64encode(note.encode()).decode()
        return f'<span class="sidenote" data-note="{encoded}">{text}</span>'

    return SIDENOTE_RE.sub(replace, html)


def parse_post(filepath: str) -> dict:
    """Read a .md file, extract frontmatter and HTML body."""
    with open(filepath) as f:
        raw = f.read()

    _, fm_text, body_md = raw.split(DELIMITER, 2)
    # BaseLoader keeps all values as strings — matching Go's lenient parsing
    fm = yaml.load(fm_text.strip(), Loader=yaml.BaseLoader) or {}
    body_html = md.render(body_md.strip())
    body_html = process_sidenotes(body_html)
    body_html = process_profanity(body_html)

    slug = os.path.splitext(os.path.basename(filepath))[0]
    return {"frontmatter": fm, "content": body_html, "permalink": slug}


def build_post(post: dict):
    """Render a single post page."""
    tmpl = env.get_template("post.html")
    out_dir = os.path.join(BUILD_DIR, post["permalink"])
    os.makedirs(out_dir, exist_ok=True)
    with open(os.path.join(out_dir, "index.html"), "w") as f:
        f.write(tmpl.render(**post))
    print(f"  Built /{post['permalink']}/")


def build_index(posts: list):
    """Render the index listing all posts."""
    tmpl = env.get_template("index.html")
    with open(os.path.join(BUILD_DIR, "index.html"), "w") as f:
        f.write(tmpl.render(posts=posts))
    print("  Built /index.html")


def build_feed(posts: list):
    """Generate the RSS feed."""
    items = []
    for post in reversed(posts):
        fm = post["frontmatter"]
        link = f"{SITE_URL}/{post['permalink']}/"
        item = f"<item><title>{escape(fm['title'])}</title><link>{link}</link>"
        if fm.get("description"):
            item += f"<description>{escape(fm['description'])}</description>"
        if fm.get("date"):
            pub_date = datetime.combine(date.fromisoformat(fm["date"]), datetime.min.time(), tzinfo=timezone.utc)
            item += f"<pubDate>{email.utils.format_datetime(pub_date)}</pubDate>"
        item += f"<guid>{link}</guid></item>"
        items.append(item)
    rss = (
        '<?xml version="1.0" encoding="UTF-8"?>'
        '<rss version="2.0"><channel>'
        f"<title>Matin's Blog</title>"
        f"<link>{SITE_URL}</link>"
        f"<description>Matin's Blog</description>"
        + "".join(items)
        + "</channel></rss>"
    )
    with open(os.path.join(BUILD_DIR, "feed.xml"), "w") as f:
        f.write(rss)
    print("  Built /feed.xml")


def main():
    os.makedirs(BUILD_DIR, exist_ok=True)

    posts = []
    for fname in sorted(os.listdir(POSTS_DIR)):
        if fname.endswith(".md"):
            path = os.path.join(POSTS_DIR, fname)
            try:
                post = parse_post(path)
                posts.append(post)
            except Exception as e:
                print(f"  Skipping {fname}: {e}")

    by_date = sorted(posts, key=lambda p: p["frontmatter"].get("date", ""))
    for i, post in enumerate(by_date):
        prev_post = by_date[i - 1] if i > 0 else None
        next_post = by_date[i + 1] if i < len(by_date) - 1 else None
        post["prev_post"] = (
            {"permalink": prev_post["permalink"], "title": prev_post["frontmatter"]["title"]}
            if prev_post else None
        )
        post["next_post"] = (
            {"permalink": next_post["permalink"], "title": next_post["frontmatter"]["title"]}
            if next_post else None
        )

    for post in posts:
        build_post(post)
    build_index(posts)
    build_feed(posts)
    print("Done.")


if __name__ == "__main__":
    main()
