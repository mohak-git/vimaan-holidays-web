import type { HelpArticle } from "@/types/account";
import Link from "next/link";

interface Props {
    articles: HelpArticle[];
}

export default function HelpArticles({ articles }: Props) {
    return (
        <section>
            <h2 className="font-serif text-2xl font-medium text-ink">Help Articles</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {articles.map((a) => (
                    <Link
                        key={a.id}
                        href="#"
                        className="group cursor-pointer rounded-xl border border-sand-dark bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-coral/40 hover:shadow-md"
                    >
                        <h3 className="font-medium text-ink transition-colors group-hover:text-coral">
                            {a.title}
                        </h3>
                        <p className="mt-1 text-sm text-ink/50">{a.excerpt}</p>
                    </Link>
                ))}
            </div>
        </section>
    );
}
