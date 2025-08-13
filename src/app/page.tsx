import Link from "next/link";

export default function Home() {
  return (
    <div className="window-body">
      <div>
        <ul className="tree-view" style={{ fontSize: "1.5rem" }}>
          <li>
            <strong style={{ color: "purple", fontSize: "2rem" }}>
              ✨98 Blog — Share Your Thoughts, 90s Style ✨{" "}
            </strong>
          </li>
          <br />
          <li>
            Welcome to 98 Blog, the coolest place on the internet (if it were
            still 1998). Post your thoughts, rants, or daily adventures just
            like tweeting — but with the charm of a Windows 98 desktop.
          </li>
          <br />
          <li>
            No algorithms. No ads. Just you, your words, and a bunch of other
            nostalgic netizens.
          </li>
          <br />
          <li>Features:</li>
          <ul>
            <li>📝 Write and share your own mini-blogs.</li>
            <li>💬 See what others are posting in real time.</li>
            <li>🎨 Enjoy the authentic 98.css retro look.</li>
            <li>✨ New features coming soon...</li>
          </ul>
          <br />
          <li
            style={{ display: "flex", gap: "1rem", justifyContent: "center" }}
          >
            <Link style={{ textDecoration: "underline" }} href="/publish">
              Get started
            </Link>
            <Link style={{ textDecoration: "underline" }} href="/blog">
              Visit blog
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
