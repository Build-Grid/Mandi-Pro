import { Search } from "lucide-react";

type Props = {
    sidebarCollapsed: boolean;
    sidebarSearch: string;
    setSidebarSearch: (search: string) => void;
};

export default function SidebarSearch({
    sidebarCollapsed,
    sidebarSearch,
    setSidebarSearch,
}: Props) {
    if (sidebarCollapsed) return null;

    return (
        <div className="mb-4 rounded-[1.25rem] border border-stone-200 bg-stone-50 px-3 py-2">
            <div className="flex items-center gap-2">
                <Search className="h-4 w-4 shrink-0 text-stone-500" />
                <input
                    value={sidebarSearch}
                    onChange={(event) => setSidebarSearch(event.target.value)}
                    placeholder="Search modules and subfeatures"
                    className="w-full bg-transparent text-sm outline-none"
                />
            </div>
        </div>
    );
}
