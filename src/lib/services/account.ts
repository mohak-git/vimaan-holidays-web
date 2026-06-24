import { faqs as mockFaqs, helpArticles as mockHelpArticles } from "@/lib/mock/account";
import type { FAQItem, HelpArticle } from "@/types/account";

export function getHelpArticles(): HelpArticle[] {
    return mockHelpArticles;
}

export function getFAQs(): FAQItem[] {
    return mockFaqs;
}

export function searchHelpArticles(query: string): HelpArticle[] {
    const q = query.toLowerCase();
    return mockHelpArticles.filter(
        (a) =>
            a.title.toLowerCase().includes(q) ||
            a.excerpt.toLowerCase().includes(q) ||
            a.category.toLowerCase().includes(q),
    );
}

export function searchFAQs(query: string): FAQItem[] {
    const q = query.toLowerCase();
    return mockFaqs.filter(
        (f) =>
            f.question.toLowerCase().includes(q) ||
            f.answer.toLowerCase().includes(q) ||
            f.category.toLowerCase().includes(q),
    );
}
