#!/usr/bin/env python3
"""Migrate articles from smartfactory.ie to Hygraph CMS."""

import json
import time
import urllib.request

API = "https://api-eu-west-2.hygraph.com/v2/cmm5zcb9t026p07vwurtar58j/master"
TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3NzI1NDEwNDUsImF1ZCI6WyJodHRwczovL2FwaS1ldS13ZXN0LTIuaHlncmFwaC5jb20vdjIvY21tNXpjYjl0MDI2cDA3dnd1cnRhcjU4ai9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC1ldS13ZXN0LTIuaHlncmFwaC5jb20vIiwic3ViIjoiMmVmZmYzNTYtZWQ2Mi00NGNkLTkyYzUtMWJlMTNmMWE4ZTE0IiwianRpIjoiY21tYWw2N200MHZlNDA3bW9kOWIwZmc0aCJ9.MTeMx_zYrZU4twMo7KP3-hBk3dbLYFckFNn69FYlNO2LHqYHxYU0qrsqL8BiVUXhOXxH8kl-fDDJbjYxdWupCFdrrBF2q8oeVJ88qDea-kDmLIyB8UsBfXWqy_hSiffBJCx6aG9jVtpCYlOoGm5PTCpYGOipnUxirJ3jaYTNHKZOXyKUzNiB78D5BCOIUbrD5ha-n-lVk_JXT9kQsWZ8aqwkNAcV1hFMXlMXukcg7rRWmknToudZ60wJnrYh_Wq-GSWE8BNqY4u8gEc7ESiUnSCCG1-k9c8rSQuBchqqyu-DwdV0R-uWJzSQpIvQ62GtqziZ2YP_1IN0YaF9LF7eH6Xm2Ob--LZYw_GocAzI2rC7IA0KHU2arfPtAZ13sxqCYlXlucE9ebcqhcZ4hVQghFEAs3c9pfwc6rm-mAbWwl-m0a1zQqodMeWJBh3o-D7UGn6qwIx3P-HfdHCvfDB02LPt7jqPAcbQHG1SWmphA34GG9HdUrA31AJMdDI7J22aMJY3zrB6hlAqy-M4Ucxu7-Au5dsDsHb1nBC7zKB4orP7zyu_B1h80vJSURGfwLSGo_1okkvA6tEtLWsCKqHGkJIccqSvJud1jGX2_0k-iudVS40frZMEAAJG28HktkmcCfOsaNaPp24OgPFXuNLZjDkBdNw6qyyFt3vyA1YKILg"


def gql(query, variables=None):
    payload = {"query": query}
    if variables:
        payload["variables"] = variables
    data = json.dumps(payload).encode()
    req = urllib.request.Request(API, data=data, headers={
        "Content-Type": "application/json",
        "Authorization": f"Bearer {TOKEN}",
    })
    with urllib.request.urlopen(req) as resp:
        result = json.loads(resp.read())
    if "errors" in result:
        print(f"  ERROR: {json.dumps(result['errors'], indent=2)}")
        return None
    return result["data"]


def p(text):
    """Paragraph node."""
    return {"type": "paragraph", "children": [{"text": text}]}


def h3(text):
    """Heading 3 node."""
    return {"type": "heading-three", "children": [{"text": text}]}


def bold_p(label, rest):
    """Paragraph with bold prefix."""
    return {"type": "paragraph", "children": [
        {"text": label, "bold": True},
        {"text": f" {rest}"}
    ]}


def bullet_list(items):
    """Bulleted list from list of strings."""
    return {
        "type": "bulleted-list",
        "children": [
            {"type": "list-item", "children": [
                {"type": "list-item-child", "children": [{"text": item}]}
            ]}
            for item in items
        ]
    }


def bold_bullet_list(items):
    """Bulleted list where each item has a bold prefix and description."""
    list_items = []
    for label, desc in items:
        list_items.append({
            "type": "list-item",
            "children": [{
                "type": "list-item-child",
                "children": [
                    {"text": label, "bold": True},
                    {"text": f" {desc}"}
                ]
            }]
        })
    return {"type": "bulleted-list", "children": list_items}


# --- Asset upload ---

def create_asset(url, filename):
    """Create and publish an asset from URL."""
    print(f"  Uploading asset: {filename}")
    data = gql("""
        mutation CreateAsset($url: String!, $filename: String!) {
            createAsset(data: { uploadUrl: $url, fileName: $filename }) {
                id
                url
            }
        }
    """, {"url": url, "filename": filename})
    if not data:
        return None
    asset_id = data["createAsset"]["id"]
    time.sleep(2)  # wait for asset processing
    gql("""
        mutation PublishAsset($id: ID!) {
            publishAsset(where: { id: $id }, to: PUBLISHED) { id }
        }
    """, {"id": asset_id})
    print(f"  Asset published: {asset_id}")
    return asset_id


# --- Article creation ---

def create_article(title, slug, summary, content_ast, author, tags, published, cover_image_id=None, created_at=None):
    """Create and publish an article."""
    print(f"Creating article: {title}")

    cover_input = ""
    variables = {
        "title": title,
        "slug": slug,
        "summary": summary,
        "content": {"children": content_ast},
        "author": author,
        "tags": tags,
        "published": published,
    }

    if created_at:
        variables["createdAt"] = created_at

    if cover_image_id:
        variables["coverImageId"] = cover_image_id
        cover_input = ", coverImage: { connect: { id: $coverImageId } }"
        mutation = """
            mutation CreateArticle(
                $title: String!, $slug: String!, $summary: String!,
                $content: RichTextAST!, $author: String!, $tags: [String!]!,
                $published: Boolean!, $coverImageId: ID!, $createdAt: DateTime
            ) {
                createArticle(data: {
                    title: $title, slug: $slug, summary: $summary,
                    content: $content, author: $author, tags: $tags,
                    published: $published, createdAt: $createdAt""" + cover_input + """
                }) { id title }
            }
        """
    else:
        mutation = """
            mutation CreateArticle(
                $title: String!, $slug: String!, $summary: String!,
                $content: RichTextAST!, $author: String!, $tags: [String!]!,
                $published: Boolean!, $createdAt: DateTime
            ) {
                createArticle(data: {
                    title: $title, slug: $slug, summary: $summary,
                    content: $content, author: $author, tags: $tags,
                    published: $published, createdAt: $createdAt
                }) { id title }
            }
        """

    data = gql(mutation, variables)
    if not data:
        return None

    article_id = data["createArticle"]["id"]
    gql("""
        mutation PublishArticle($id: ID!) {
            publishArticle(where: { id: $id }, to: PUBLISHED) { id }
        }
    """, {"id": article_id})
    print(f"  Published: {article_id}\n")
    return article_id


# ============================================================
# ARTICLES DATA
# ============================================================

articles = [
    {
        "title": "Announcing the Next Generation of SmartFactory Software: Empowering Your Digital Transformation",
        "slug": "next-generation-smartfactory-software",
        "summary": "We unveil the latest version of our SmartFactory software, designed to revolutionise manufacturing with rapid impact, seamless connectivity, actionable insights, and unmatched scalability.",
        "tags": ["product-update", "linkedin"],
        "created_at": "2024-11-01T10:00:00Z",
        "image_url": "https://smartfactory.ie/wp-content/uploads/2024/10/WAPS-Circle-Graphic.png",
        "image_name": "waps-circle-graphic.png",
        "content": [
            p("We're thrilled to unveil the latest version of our SmartFactory software, designed to revolutionise the way you operate and optimise your manufacturing processes. With a focus on delivering tangible results quickly, seamless connectivity, actionable insights, uncompromising security, and unmatched scalability, our software is the ideal solution for businesses seeking to thrive in the era of Industry 4.0."),
            h3("Rapid Impact: See Results in Weeks, Not Months"),
            p("Our software is engineered to deliver immediate value. Experience tangible improvements in your operations within just four weeks of implementation. From increased efficiency and reduced downtime to enhanced quality and cost savings, our solution empowers you to achieve your business goals faster than ever before."),
            h3("Seamless Connectivity: Bridge the Gap Between Systems"),
            p("Whether you're dealing with manual, semi-automated, or fully automated processes, our software integrates seamlessly with your existing infrastructure. We provide a unified platform that connects all aspects of your manufacturing operations, regardless of equipment age or database source, including MES/ERP (SAP) and WMS systems."),
            h3("Actionable Insights: Make Data-Driven Decisions"),
            p("Gain real-time visibility into critical KPIs such as OEE, sustainability, cost, and quality. Our intuitive dashboards and visualisations empower you to identify trends, bottlenecks, and opportunities for improvement. With actionable insights at your fingertips, you can make informed decisions that drive operational excellence."),
            h3("Uncompromising Security: Protect Your Data"),
            p("Data security is paramount in today's digital landscape. Our software is built on a proven platform that guarantees data integrity and adheres to the highest cybersecurity standards."),
            h3("Scalability: Grow with Your Business"),
            p("As your manufacturing needs evolve, our software adapts effortlessly. Whether you're expanding your operations or adopting new Industry 4.0 technologies, our scalable solution can handle your growing demands. From wired to wireless connectivity, we provide the flexibility you need to succeed."),
            h3("Your Operations: Transformed"),
            p("By leveraging our deep industry expertise and state-of-the-art analytics, we empower you to unlock the full potential of your manufacturing operations. From optimising production lines to improving product quality and reducing costs, our software is your partner in achieving operational excellence."),
            p("Ready to take your manufacturing to the next level? Contact us today to learn more about how our SmartFactory software can help you drive digital transformation and achieve sustainable business growth."),
        ],
    },
    {
        "title": "It's Time to Get Smart About Operational Excellence",
        "slug": "smart-about-operational-excellence",
        "summary": "Tired of poor performance and costly downtime? Discover how SmartFactory software helps identify root causes of inefficiencies with data-driven insights.",
        "tags": ["operational-excellence", "linkedin"],
        "created_at": "2024-11-05T10:00:00Z",
        "image_url": "https://smartfactory.ie/wp-content/uploads/2024/11/image-1-e1730794766373.png",
        "image_name": "operational-excellence.png",
        "content": [
            p("Are you tired of poor performance and costly downtime in your manufacturing operations? It's time to embrace the power of data-driven insights and achieve true Operational Excellence!"),
            p("Our SmartFactory software is designed to help you identify and address the root causes of inefficiencies, enabling you to maximise productivity and minimise waste."),
            p("With features such as:"),
            bold_bullet_list([
                ("Downtime Analysis:", "Gain a deep understanding of the factors contributing to equipment downtime, allowing you to take targeted corrective actions."),
                ("Day-by-the-Hour Target vs. Actual Analysis:", "Compare your actual performance against predefined targets, identifying areas where improvements can be made."),
                ("Alarm Code Integration:", "Connect to your PLC's alarm codes or manually enter downtime reasons for a comprehensive analysis of equipment issues."),
                ("Scrap and Rework Tracking:", "Monitor and analyse scrap and rework rates, identifying opportunities to reduce waste and improve product quality."),
                ("\"Stops Watcher\":", "Analyse the frequency and duration of equipment stops, helping you pinpoint the sources and profiles of production disruptions."),
            ]),
            p("By leveraging these powerful tools, you can implement a continuous improvement cycle, following the Plan-Do-Check-Act (PDCA) methodology. This approach enables you to systematically identify problems, implement solutions, measure results, and make necessary adjustments."),
            p("The results speak for themselves. Our customers have achieved up to a 40% increase in output by harnessing the power of our SmartFactory solution. It's time to get smart about operational excellence and unlock the full potential of your manufacturing operations."),
            p("Are you ready to take your business to the next level? Contact us today to learn more about how our software can help you achieve sustainable growth and operational excellence."),
        ],
    },
    {
        "title": "Elevate Your Quality Control with SmartFactory",
        "slug": "elevate-quality-control-smartfactory",
        "summary": "Maintaining high-quality standards is essential for success. SmartFactory provides the tools to ensure product excellence and optimize manufacturing processes.",
        "tags": ["quality", "linkedin"],
        "created_at": "2024-11-11T10:00:00Z",
        "image_url": "https://smartfactory.ie/wp-content/uploads/2024/11/Connect-Collect-Analyse-Insights-LinkedIn-1.png",
        "image_name": "quality-control.png",
        "content": [
            p("In today's competitive landscape, maintaining high-quality standards is essential for success. SmartFactory software provides the tools needed to ensure product excellence and optimize manufacturing processes."),
            p("Quality control is more than just ensuring products meet specifications. It's about building a reputation for excellence, minimizing waste, and reducing costs. The software empowers users to achieve these goals by providing real-time visibility into manufacturing operations."),
            p("Connect equipment to the software platform and uncover real manufacturing insights. By monitoring critical control parameters such as temperature, pressure, or flow, potential issues can be identified before they lead to defects or product recalls."),
            p("Set alerts for any monitored variable that falls outside its validated range. Receive notifications via pop-up, email, or text message, ensuring that potential problems are addressed promptly."),
            p("Data integrity is crucial for regulatory compliance and accurate decision-making. The software adheres to 21 CFR Part 11 standards, ensuring that data is secure, reliable, and audit-ready. It is built on a proven platform that adheres to the highest cybersecurity standards."),
            p("By implementing the software, users can improve product quality, identify and address quality issues before they become problems, reduce costs by minimizing waste and rework through process optimization, enhance compliance to ensure adherence to regulatory standards and maintain data integrity, and gain a competitive edge by delivering superior quality products."),
        ],
    },
    {
        "title": "Do Not Pass GO: Where to Begin Your Digital Transformation Journey",
        "slug": "begin-digital-transformation-journey",
        "summary": "Digital Transformation in manufacturing doesn't have to be daunting and it doesn't begin with technology. It starts with 3 simple questions.",
        "tags": ["digital-transformation", "linkedin"],
        "created_at": "2024-12-05T10:00:00Z",
        "image_url": None,
        "image_name": None,
        "content": [
            p("Digital Transformation in manufacturing doesn't have to be daunting \u2014 and it doesn't begin with technology."),
            p("It starts with 3 simple questions:"),
            bullet_list([
                "What problems are you trying to solve",
                "What business value will you create",
                "Is your organisation ready for change",
            ]),
            p("We've helped numerous companies in addressing these fundamental questions and in developing their digital transformation strategy. The outcomes have been truly transformative. One medical device manufacturer, for instance, boosted output by 40% \u2014 not with expensive new equipment, but by leveraging real-time process monitoring and data analytics to drive continuous improvement."),
            h3("Get Smart about Digital Transformation"),
            p("It's time to get smart about digital transformation and to unlock the full potential of your manufacturing operations."),
            p("Our SmartFactory software is designed to help you identify and address the root causes of inefficiencies, enabling you to maximise productivity and minimise waste."),
            p("Our No code/Low code platform features:"),
            bold_bullet_list([
                ("Downtime Analysis:", "Gain a deep understanding of the factors contributing to equipment downtime, allowing you to take targeted corrective actions."),
                ("Day-by-the-Hour Target vs. Actual Analysis:", "Compare your actual performance against predefined targets, identifying areas where improvements can be made."),
                ("Alarm Code Integration:", "Connect to your PLC's alarm codes or manually enter downtime reasons for a comprehensive analysis of equipment issues."),
                ("Scrap and Rework Tracking:", "Monitor and analyse scrap and rework rates, identifying opportunities to reduce waste and improve product quality."),
                ("\"Stops Watcher\":", "Analyse the frequency and duration of equipment stops, helping you pinpoint the sources and profiles of production disruptions."),
            ]),
            p("By leveraging these powerful tools, you can rapidly implement a continuous improvement cycle, following the Plan-Do-Check-Act (PDCA) methodology."),
            p("Ready to begin your digital journey? Book a demo today to see SmartFactory in action."),
        ],
    },
    {
        "title": "The Year 2024",
        "slug": "the-year-2024",
        "summary": "As we step into 2025, we look back at the progress we made including the development of our new Digital Daily Management System (DDMS) solution.",
        "tags": ["company-news", "linkedin"],
        "created_at": "2025-01-07T10:00:00Z",
        "image_url": "https://smartfactory.ie/wp-content/uploads/2025/01/l_photo-300x185.png",
        "image_name": "year-2024.png",
        "content": [
            p("As we step into 2025, we at SmartFactory are proud to look back at the progress we made last quarter. The key highlight has been the development of our new Digital Daily Management System (DDMS) solution."),
            p("Designed to align management and operations with the company's vision, the DDMS transforms traditional paper-based Daily Management Systems into a flexible, visually engaging management platform that integrates real-time sensor data, automated reports and analytics, and intuitive dashboards."),
            p("We're excited about the benefits that the DDMS can bring to the production floor. No worries, you'll be hearing much more about them in the near future! Stay tuned!"),
            p("At SmartFactory, we're optimistic that 2025 will be at least as productive as the past year and filled with as many smiles as those captured in our favorite moments!"),
        ],
    },
]


def main():
    print("=== Migrating articles to Hygraph ===\n")

    for article in articles:
        # Upload cover image if present
        cover_id = None
        if article["image_url"]:
            cover_id = create_asset(article["image_url"], article["image_name"])
            time.sleep(1)

        create_article(
            title=article["title"],
            slug=article["slug"],
            summary=article["summary"],
            content_ast=article["content"],
            author="Smart Factory Team",
            tags=article["tags"],
            published=True,
            cover_image_id=cover_id,
            created_at=article["created_at"],
        )
        time.sleep(1)

    # Verify
    print("=== Verifying ===")
    data = gql("""
        { articles(where: { published: true }, orderBy: createdAt_DESC) { id title slug tags createdAt coverImage { url } } }
    """)
    if data:
        for a in data["articles"]:
            img = "yes" if a.get("coverImage") else "no"
            print(f"  {a['title']} [{a['slug']}] cover={img}")

    print("\nDone!")


if __name__ == "__main__":
    main()
