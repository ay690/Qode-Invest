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
import { motion, type Variants } from "framer-motion";

const topCards = [
  {
    title: "Get started",
    description:
      "Read our getting started guide to get the most out of your Capitalmind subscription.",
  },
  {
    title: "Community",
    description:
      "Join the conversation on our exclusive community on Slack for Capitalmind Premium subscribers",
  },
  {
    title: "Visit website",
    description: "Keep up with our latest content on our website",
  },
];

const itemVariants = (index: number): Variants => ({
  hidden: {
    x: index % 2 === 0 ? -40 : 40,
    opacity: 0,
    scale: 0.98,
  },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: "easeOut",
      delay: index * 0.06,
    },
  },
});

const Home = () => {
  const posts = useSelector((state: RootState) => state.blog.posts);
  // console.log(posts);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-7xl">
        <h1 className="text-4xl font-bold mb-8">Home</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {topCards?.map((card, idx) => (
            <motion.div
              key={card.title}
              initial="hidden"
              animate="visible"
              variants={itemVariants(idx)}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    {card.title}
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{card.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Latest Posts */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Latest Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts?.map((post, index) => (
              <motion.div
                key={post.id}
                initial="hidden"
                animate="visible"
                variants={itemVariants(index)}
                whileHover={{ scale: 1.01 }}
              >
                <Card className="hover:shadow-md transition-shadow h-full">
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
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
