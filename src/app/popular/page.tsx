"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "@/lib/api/api";
import Image from "next/image";
import FloatingHomeButton from "@/components/FloatingHomeButton";

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
      <h1 className="text-3xl font-bold mb-8 text-center">🔥 인기 있는 책 20선 🔥</h1>
      <p className="text-sm text-gray-500 text-center mb-4">
        인기도 점수는 알라딘에서 제공하는 지표들을 이용하여 계산되었습니다
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book, idx) => (
          <a
            key={idx}
            href={book.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 overflow-hidden p-4 flex gap-4"
          >
            {book.cover && (
              <div className="flex-shrink-0">
                <Image
                  src={book.cover ?? "/placeholder.jpg"}
                  alt={book.title}
                  width={80}
                  height={110}
                  className="w-20 h-28 object-cover rounded"
                  unoptimized
                />
              </div>
            )}
            <div className="flex flex-col flex-grow min-w-0">
              <h2 className="text-base font-semibold line-clamp-2">{book.title}</h2>
              {book.author && (
                <p className="text-sm text-gray-700 truncate">{book.author}</p>
              )}
              {book.categoryName && (
                <p className="text-xs text-gray-500 truncate">{book.categoryName}</p>
              )}
              {book.priceStandard && (
                <p className="text-sm font-medium text-gray-900 mt-1">
                  정가: {book.priceStandard.toLocaleString()}원
                </p>
              )}
              <div className="mt-auto pt-2 text-right">
                <span className="text-xs text-gray-400 block">인기도 점수</span>
                <p className="text-base font-bold text-orange-600">
                  {book.popularityScore.toFixed(3)}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
      <FloatingHomeButton />
    </div>
  );
};

export default PopularBooksList;
