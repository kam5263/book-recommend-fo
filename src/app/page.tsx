"use client";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const pages = [
  {
    title: "요즘 심리에 딱 맞는 책",
    description: "당신의 심리 상태에 꼭 맞는 도서를 추천받아보세요.",
    href: "/mymind",
    emoji: "🧠",
    disabled: true
  },
  {
    title: "10문10답 6가지 책 추천",
    description: "간단한 설문으로 6권의 책을 추천받으세요.",
    href: "/qna",
    emoji: "📋"
  },
  {
    title: "인기 순위",
    description: "알라딘에서 인기있는 책들을 한눈에!",
    href: "/popular",
    emoji: "🔥"
  },
  {
    title: "비싸고 두꺼운 책",
    description: "가치있는, 소장욕구 뿜뿜! 프리미엄 도서 모음.",
    href: "/expensive",
    emoji: "💎"
  }
];

export default function MainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-sky-50 to-white flex flex-col items-center justify-center p-4">
<h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-6 text-center text-neutral-800 leading-snug">
  <span role="img" aria-label="books">📚</span> 민음북클럽 677권 중<br /> 
  <span className="block text-[color:var(--tw-prose-invert)]">
    <span className="text-[color:#FF6363]">내 취향에 딱 맞는</span> AI 책 추천
  </span>
</h1>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
      {pages.map(({ title, description, href, emoji, disabled }) => {
        const cardClasses = `group transition-all duration-200 p-6 cursor-pointer rounded-2xl flex flex-col gap-3 items-start ${
          disabled
            ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white border-2 border-sky-100 hover:scale-105 hover:shadow-2xl"
        }`;

        const cardContentClasses = `p-0 ${
          disabled ? "text-gray-400" : "text-sky-900 group-hover:text-sky-600"
        }`;

        const cardInner = (
          <Card className={cardClasses}>
            <span className="text-4xl mb-2">{emoji}</span>
            <CardContent className={cardContentClasses}>
              <h2 className="text-xl font-bold">{title}</h2>
              <p className="text-sm mt-2">{description}</p>
            </CardContent>
          </Card>
        );

        return disabled ? (
          <div key={href} title="준비 중입니다...">{cardInner}</div>
        ) : (
          <Link href={href} key={href}>
            {cardInner}
          </Link>
        );
      })}
      </div>
    </div>
  );
}
