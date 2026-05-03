import type { NavSection } from "../../constants";

type Props = {
    sidebarCollapsed: boolean;
    sidebarGroups: NavSection[];
    activeNavId: string;
    setActiveNavId: (id: string) => void;
};

function classNames(...values: Array<string | false | null | undefined>) {
    return values.filter(Boolean).join(" ");
}

export default function SidebarNavigation({
    sidebarCollapsed,
    sidebarGroups,
    activeNavId,
    setActiveNavId,
}: Props) {
    return (
        <nav className="flex flex-1 flex-col gap-3 overflow-y-auto pr-1">
            {sidebarGroups.map((section) => (
                <div key={section.title} className="space-y-2">
                    {!sidebarCollapsed ? (
                        <p className="px-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-400">
                            {section.title}
                        </p>
                    ) : null}

                    <div className="space-y-2">
                        {section.items.map((item) => {
                            const Icon = item.icon;
                            const itemActive =
                                activeNavId === item.id ||
                                item.children?.some(
                                    (child) => child.id === activeNavId,
                                );

                            return (
                                <div key={item.id} className="space-y-2">
                                    <button
                                        title={item.label}
                                        onClick={() => setActiveNavId(item.id)}
                                        className={classNames(
                                            "flex items-center text-left text-sm font-medium transition-all duration-200",
                                            sidebarCollapsed
                                                ? "h-11 w-11 justify-center"
                                                : "w-full gap-3 px-3 py-2.5",
                                            itemActive
                                                ? "rounded-lg border-0 bg-emerald-100 text-emerald-800 shadow-sm"
                                                : "rounded-lg text-stone-700 hover:bg-stone-100",
                                        )}
                                    >
                                        <Icon
                                            className={classNames(
                                                "shrink-0",
                                                sidebarCollapsed
                                                    ? "h-5 w-5"
                                                    : "h-4 w-4",
                                            )}
                                        />

                                        {!sidebarCollapsed ? (
                                            <div className="flex flex-1 items-center justify-between gap-3 min-w-0">
                                                <div className="min-w-0">
                                                    <p className="truncate font-medium leading-tight">
                                                        {item.label}
                                                    </p>
                                                    <p className="text-[11px] text-stone-500 truncate">
                                                        {item.description}
                                                    </p>
                                                </div>
                                                {!item.children?.length ? (
                                                    <span className="shrink-0 rounded-full border border-stone-200 bg-white px-2 py-0.5 text-[10px] text-stone-500">
                                                        Open
                                                    </span>
                                                ) : null}
                                            </div>
                                        ) : null}
                                    </button>

                                    {!sidebarCollapsed &&
                                    item.children?.length ? (
                                        <div className="ml-3 space-y-1 border-l border-stone-200 pl-3">
                                            {item.children.map((child) => {
                                                const ChildIcon = child.icon;
                                                const childActive =
                                                    activeNavId === child.id;

                                                return (
                                                    <button
                                                        key={child.id}
                                                        title={child.label}
                                                        onClick={() =>
                                                            setActiveNavId(
                                                                child.id,
                                                            )
                                                        }
                                                        className={classNames(
                                                            "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition-all duration-200",
                                                            childActive
                                                                ? "bg-emerald-100 text-emerald-800"
                                                                : "text-stone-600 hover:bg-stone-100",
                                                        )}
                                                    >
                                                        <ChildIcon className="h-4 w-4 shrink-0" />
                                                        <span className="flex-1 truncate">
                                                            {child.label}
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    ) : null}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </nav>
    );
}
