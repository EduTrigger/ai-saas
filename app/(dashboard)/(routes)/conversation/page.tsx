"use client";

import * as z from "zod";
import axios from "axios";
import { ArrowUpCircle, MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";

import { BotAvatar } from "@/components/bot-avatar";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";
import { Empty } from "@/components/ui/empty";
import { useProModal } from "@/hooks/use-pro-modal";

import { formSchema } from "./constants";

const ConversationPage = () => {
  const router = useRouter();
  const proModal = useProModal();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });
      setMessages((current) => [...current, userMessage, response.data]);

      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 50px)" }}>
      <div className="px-2">
        <Heading
          title="Chat"
          description="Start by chatting with the AI"
          icon={MessageSquare}
          iconColor="text-violet-500"
          bgColor="bg-violet-500/10"
        />
      </div>
      <div className="overflow-auto px-4 lg:px-8 flex-grow">
        <div className="space-y-2 mt-4">
          {messages.length === 0 && !isLoading && (
            <Empty label="No conversation started." />
          )}
          <div className="flex flex-col gap-y-1">
            {messages.map((message) => (
              <div
                key={message.content}
                className={cn("p-8 w-full flex items-start gap-x-4 rounded-lg")}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <p
                  className="text-sm leading-relaxed"
                  style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
                >
                  {message.content}
                </p>
              </div>
            ))}
          </div>
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
        </div>
      </div>
      <div className="px-4 lg:px-8 pb-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-end w-full p-2 md:px-2 focus-within:shadow-sm border border-1 rounded rounded-lg "
          >
            <div className="flex w-full outline-none focus-visible:ring-0 focus-visible:ring-transparent">
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormControl className="flex-grow m-0 p-0">
                    <textarea
                      className="resize-none w-full focus:outline-none focus:ring-0"
                      disabled={isLoading}
                      placeholder="What is 3 + 3?"
                      {...field}
                    />
                  </FormControl>
                )}
              />
              <Button
                className="m-2 self-stretch"
                type="submit"
                disabled={isLoading}
                size="icon"
              >
                <ArrowUpCircle className="h-6 w-6" />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ConversationPage;
