import { getPosts } from "@/lib/actions";
import PostsView from "../../components/PostsView/PostsView";

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div>
      <PostsView posts={posts} />
    </div>
  );
}
