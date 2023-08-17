# A chromium extension for sorting YouTube Music playlists locally

## How to use
1. Load the extension in your chromium-based browser (Chrome, Edge, etc.)
2. Go to your target YouTube Music playlist page, scroll down the page until all the songs are rendered in HTML
4. Click on the extension icon to select sorting options: Sort by artist or song name, Ascending or descending
5. The playlist should be sorted pretty quickly

Note that the sorting is done by modifying the HTML code in your playlist page and ***it doesn't change anything server-side***, so if you refresh the page the playlist data will be re-retrived in its original order.

Why not sorting them for real?
1. Sorting the server-side data requires invoking Google Play API, which runs a lot slower and could introduce security risks, and it might cost money
3. I just need a way to find duplicated songs in my playlists, and sorting them locally is good enough.
