"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "@/lib/api/api";
import Image from "next/image";


interface Book {
  title: string;
  author?: string;
  categoryName?: string;
  cover?: string;
  priceStandard?: number;
  popularityScore: number;
  link?: string;
}

const PopularBooksList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await api.get("/popular?limit=20");
        setBooks(res.data.results);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError("서버 오류: " + (err.response?.data?.message || err.message));
        } else {
          setError("알 수 없는 오류가 발생했습니다.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-lg font-semibold">📚 인기 도서를 불러오는 중...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-20">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">🔥 인기 있는 책 20선 🔥 THX TO 알라딘</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {books.map((book, idx) => (
          <a
            key={idx}
            href={book.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-2xl shadow hover:shadow-xl transition duration-300 overflow-hidden flex flex-col"
          >
            {book.cover && (
              <Image
                src={book.cover ?? "/placeholder.jpg"} // fallback 처리 추천
                alt={book.title}
                width={300}
                height={200}
                className="w-full h-48 object-contain bg-white"
                unoptimized // 원본 URL이 외부일 경우 추가 (중요)
                />         
            )}
            <div className="p-4 flex-1 flex flex-col">
              <h2 className="text-lg font-semibold mb-1 line-clamp-2">{book.title}</h2>
              {book.author && <p className="text-sm text-gray-700 mb-1">{book.author}</p>}
              {book.categoryName && (
                <p className="text-xs text-gray-500 mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
                  {book.categoryName}
                </p>
              )}
              {book.priceStandard && (
                <p className="text-sm font-medium text-gray-900">
                  정가: {book.priceStandard.toLocaleString()}원
                </p>
              )}
              <div className="mt-auto pt-3 text-right">
                <span className="text-xs text-gray-400 block">인기도 점수</span>
                <p className="text-lg font-bold text-orange-600">
                  {book.popularityScore.toFixed(3)}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default PopularBooksList;
