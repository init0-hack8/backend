from playwright.sync_api import sync_playwright

def scrape_hashtag_search(hashtag="#nvidia", limit=10):
    _xhr_calls = []

    def capture_xhr(response):
        if response.request.resource_type == "xhr" and "TweetSearchTimeline" in response.url:
            _xhr_calls.append(response)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()
        page.on("response", capture_xhr)

        page.goto(f"https://x.com/search?q={hashtag}&src=typed_query&f=live")
        page.wait_for_timeout(8000)

        tweets = []
        for r in _xhr_calls:
            try:
                data = r.json()
                for tweet_entry in data["data"]["search_by_raw_query"]["search_timeline"]["timeline"]["instructions"]:
                    if "entries" in tweet_entry:
                        for entry in tweet_entry["entries"]:
                            if "content" in entry and "itemContent" in entry["content"]:
                                tweet = entry["content"]["itemContent"]["tweet_results"]["result"]
                                tweets.append(tweet)
                            if len(tweets) >= limit:
                                break
            except Exception:
                continue

        browser.close()
        return tweets[:limit]

print(scrape_hashtag_search())