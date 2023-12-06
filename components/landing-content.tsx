"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
  {
    name: "Julia",
    avatar: "J",
    title: "Parent of Grade 7 Student",
    description:
      "The AI-generated videos make learning so engaging for my child. It's amazing to see her so excited about education!",
  },
  {
    name: "Ethan",
    avatar: "E",
    title: "Grade 8 Student",
    description:
      "The AI courses are mind-blowing! I never knew learning could be this interactive and fun.",
  },
  {
    name: "Sophia",
    avatar: "S",
    title: "Parent of Grade 9 Student",
    description:
      "This platform's innovative educational content has dramatically improved my son's academic performance.",
  },
  {
    name: "Liam",
    avatar: "L",
    title: "Grade 10 Student",
    description:
      "The AI features are incredible! Generating custom code for projects has never been easier.",
  },
  {
    name: "Emma",
    avatar: "E",
    title: "Grade 11 Student",
    description:
      "Generating images for my projects brings my ideas to life like never before. This tool is essential for creative learning.",
  },
  {
    name: "Oliver",
    avatar: "O",
    title: "Parent of Grade 12 Student",
    description:
      "Seeing my daughter use the AI to enhance her learning experience has been a revelation. It's a game-changer in education!",
  },
  {
    name: "Ava",
    avatar: "A",
    title: "Grade 7 Student",
    description:
      "I love how the platform makes learning personalized. The AI really understands what I need!",
  },
  {
    name: "Noah",
    avatar: "N",
    title: "Grade 12 Student",
    description:
      "The way this platform integrates AI into our coursework is outstanding. It's preparing us for the future in the best way possible!",
  },
];

export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((item) => (
          <Card
            key={item.description}
            className="bg-[#192339] border-none text-white"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{item.name}</p>
                  <p className="text-zinc-400 text-sm">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
