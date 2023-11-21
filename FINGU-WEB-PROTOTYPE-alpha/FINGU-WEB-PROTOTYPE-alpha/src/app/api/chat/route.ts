import { chatbotServer } from "@/libs/openapi";
import { supabase } from "@/libs/supabase";

function iteratorToStream(iterator: any) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();

      if (done) {
        controller.close();
      } else {
        controller.enqueue(value);
      }
    },
  });
}

export async function POST(req: Request) {
  // extract auth token
  const authToken = req.headers.get("Authorization") ?? "";

  // form the message to send
  const { messages } = await req.json();
  const newMessage = messages[messages.length - 1];
  // getUserId
  const { data, error } = await supabase.auth.getUser(authToken.split(" ")[1]);
  if (error) {
    throw new Error("Failed to get user");
  }
  const userId = data.user.id;
  // send the message
  const res = await chatbotServer.POST("/api/users/{user_id}/messages", {
    params: {
      header: {
        authorization: `Bearer ${authToken}`,
      },
      path: {
        user_id: userId,
      },
    },
    body: {
      content: newMessage.content,
      contentType: newMessage.contentType,
      isLiked: newMessage.isLiked,
      isDisliked: newMessage.isDisliked,
      isResponse: newMessage.isResponse,
      status: newMessage.status,
    },
  });
  if (res.error) {
    throw new Error("Failed to send message");
  }
  // retrieve the message
  const aiResponse =
    res?.data?.data?.content?.[0]?.text?.value ?? "fingu is away ...";
  // return the response
  return new Response(aiResponse);
}
