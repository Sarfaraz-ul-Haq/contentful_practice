import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import dayjs from "dayjs";

const getBlogs = async () => {
  try {
    const response = await fetch(
      `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/entries?access_token=${process.env.CONTENTFUL_ACCESS_KEY}&content_type=blog`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!!!");
    }

    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function Home() {
  const blogs = await getBlogs();
  console.log(blogs);

  return (
    <main className="min-h-screen flex flex-col items-center gap-5">
      {blogs.items.map((item: any, i: number) => {
        const authorImage = "https:" + blogs.includes.Asset[i].fields.file.url;

        return (
          <div key={item.sys.space.sys.id}>
            <Card>
              <CardHeader>
                <CardTitle>
                  {documentToReactComponents(item.fields.blogTitle)}
                  <Avatar>
                    <AvatarImage src={authorImage} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {documentToReactComponents(item.fields.content)}
              </CardContent>
              <CardFooter>
                {dayjs(item.fields.createdAt).format("ddd, MMM D, YYYY h:mm A")}
              </CardFooter>
            </Card>
          </div>
        );
      })}
    </main>
  );
}
