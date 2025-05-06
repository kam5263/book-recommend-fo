"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Book, WordCategory } from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, Leaf, Brain, Lightbulb, Sun, Sparkles, CloudRain, Moon } from "lucide-react";

export default function BookRecommendations() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("word") as WordCategory; // word=사랑 형태의 쿼리 파라미터

  const booksByCategory: Record<WordCategory, Book[]> = {
    "힐링": [
      {
        id: "1",
        title: "당신이 옳다",
        author: "정혜신",
        description: "마음에 상처가 있는 사람들을 위한 심리학적 치유의 방법을 담은 책",
        category: "힐링",
        imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05"
      },
      {
        id: "2",
        title: "나는 나로 살기로 했다",
        author: "김수현",
        description: "나답게 살기 위한 결심을 다룬 에세이",
        category: "힐링",
        imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9"
      },
      {
        id: "3",
        title: "여행의 이유",
        author: "김영하",
        description: "여행을 통한 자아 발견과 치유의 과정",
        category: "힐링",
        imageUrl: "https://images.unsplash.com/photo-1518495973542-4542c06a5843"
      },
    ],
    "도파민": [
      {
        id: "4",
        title: "도파민 네이션",
        author: "안나 렘키",
        description: "도파민이 우리 뇌에 미치는 영향과 습관에 대한 탐구",
        category: "도파민",
        imageUrl: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb"
      },
      {
        id: "5",
        title: "행복의 비밀",
        author: "앤드류 매슬로우",
        description: "인간의 행복에 대한 심리학적 접근",
        category: "도파민",
        imageUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22"
      },
    ],
    "사랑": [
      {
        id: "6",
        title: "사랑의 기술",
        author: "에리히 프롬",
        description: "사랑의 본질과 실천에 대한 깊은 통찰",
        category: "사랑",
        imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
      },
      {
        id: "7",
        title: "우리는 모두 빛나는 별이다",
        author: "정호승",
        description: "사랑과 위로에 대한 시적 표현",
        category: "사랑",
        imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05"
      },
    ],
    "동기부여": [
      {
        id: "8",
        title: "원칙",
        author: "레이 달리오",
        description: "성공적인 삶을 위한 원칙들",
        category: "동기부여",
        imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9"
      },
      {
        id: "9",
        title: "시작의 기술",
        author: "개리 비숍",
        description: "새로운 시작을 위한 실질적인 조언",
        category: "동기부여",
        imageUrl: "https://images.unsplash.com/photo-1518495973542-4542c06a5843"
      },
    ],
    "현실": [
      {
        id: "10",
        title: "사피엔스",
        author: "유발 하라리",
        description: "인류의 역사와 미래에 대한 통찰",
        category: "현실",
        imageUrl: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb"
      },
      {
        id: "11",
        title: "팩트풀니스",
        author: "한스 로슬링",
        description: "세상을 바라보는 올바른 시각에 대한 책",
        category: "현실",
        imageUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22"
      },
    ],
    "명상": [
      {
        id: "12",
        title: "마음챙김의 시작",
        author: "존 카밧진",
        description: "스트레스 감소를 위한 마음챙김 명상",
        category: "명상",
        imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
      },
      {
        id: "13",
        title: "하루 명상",
        author: "틱낫한",
        description: "일상 속에서의 마음챙김 실천 방법",
        category: "명상",
        imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05"
      },
    ],
    "외로움": [
      {
        id: "14",
        title: "마음챙김의 시작",
        author: "존 카밧진",
        description: "스트레스 감소를 위한 마음챙김 명상",
        category: "외로움",
        imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
      },
      {
        id: "15",
        title: "하루 명상",
        author: "틱낫한",
        description: "일상 속에서의 마음챙김 실천 방법",
        category: "외로움",
        imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05"
      },
    ],
    "슬픔": [
      {
        id: "16",
        title: "마음챙김의 시작",
        author: "존 카밧진",
        description: "스트레스 감소를 위한 마음챙김 명상",
        category: "슬픔",
        imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
      },
      {
        id: "17",
        title: "하루 명상",
        author: "틱낫한",
        description: "일상 속에서의 마음챙김 실천 방법",
        category: "슬픔",
        imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05"
      },
    ],
  };

  const getCategoryIcon = (category: WordCategory) => {
    switch (category) {
      case "힐링": return <Leaf className="h-6 w-6" />;
      case "도파민": return <Brain className="h-6 w-6" />;
      case "사랑": return <Heart className="h-6 w-6" />;
      case "동기부여": return <Lightbulb className="h-6 w-6" />;
      case "현실": return <Sun className="h-6 w-6" />;
      case "명상": return <Sparkles className="h-6 w-6" />;
      case "외로움": return <Moon className="h-6 w-6" />;
      case "슬픔": return <CloudRain className="h-6 w-6" />;
    }
  };

  const getCategoryColor = (category: WordCategory) => {
    switch (category) {
      case "힐링": return "text-green-700 bg-green-100";
      case "도파민": return "text-purple-700 bg-purple-100";
      case "사랑": return "text-pink-700 bg-pink-100";
      case "동기부여": return "text-yellow-700 bg-yellow-100";
      case "현실": return "text-blue-700 bg-blue-100";
      case "명상": return "text-indigo-700 bg-indigo-100";
      case "외로움": return "text-gray-700 bg-gray-100";
      case "슬픔": return "text-sky-700 bg-sky-100";
    }
  };

  const books = booksByCategory[category] || [];

  return (
    <div className="animate-fade-in w-full max-w-5xl mx-auto py-8 px-4">
      <div className="flex items-center mb-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mr-4"
          aria-label="Back to words"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> 돌아가기
        </Button>
        
        <div className={`flex items-center px-4 py-2 rounded-full ${getCategoryColor(category)}`}>
          {getCategoryIcon(category)}
          <h1 className="text-lg font-semibold ml-2">{category} 관련 추천 도서</h1>
        </div>
      </div>

      {books.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg text-gray-500">해당 카테고리의 책이 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="flex flex-col bg-white border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 animate-scale-up"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold mb-1">{book.title}</h3>
                <p className="text-gray-500 text-sm mb-2">{book.author}</p>
                <p className="text-gray-700 text-sm flex-1">{book.description}</p>
                <Button className="mt-4 w-full">자세히 보기</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
