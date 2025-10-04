import { useSelector } from "react-redux";
import { type RootState } from "@/store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const Home = () => {
  const posts = useSelector((state: RootState) => state.blog.posts);
  //   console.log(posts);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-7xl">
        <h1 className="text-4xl font-bold mb-8">Home</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Get started
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Read our getting started guide to get the most out of your
                Capitalmind subscription.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Community
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Join the conversation on our exclusive community on Slack for
                Capitalmind Premium subscribers
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Visit website
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Keep up with our latest content on our website
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Latest Posts */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Latest Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="text-sm text-muted-foreground mb-2">
                    {post.date}
                  </div>
                  <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    {post.excerpt}
                  </CardDescription>
                  <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm cursor-pointer">
                    Read full post
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
