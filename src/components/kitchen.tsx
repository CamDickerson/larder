import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ArrowLeft, Bookmark, Check, Clock } from "lucide-react";
import {
  BASICS,
  DEFAULT_KITCHEN,
  DIET_OPTIONS,
  GROUPS,
  TIME_OPTIONS,
  type Diet,
  type KitchenState,
  type Ranked,
  type Use,
  formatUse,
  ingredientsIn,
  loadKitchen,
  missingLabel,
  rankRecipes,
  saveKitchen,
  scaleFor,
  shoppingList,
} from "@/lib/larder";

function useKitchen() {
  const [state, setState] = useState<KitchenState>(DEFAULT_KITCHEN);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const loaded = loadKitchen();
    if (loaded) setState(loaded);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    saveKitchen(state);
  }, [state, ready]);

  return { state, setState };
}

export function Kitchen() {
  const { state, setState } = useKitchen();
  const [openId, setOpenId] = useState<string | null>(null);
  const [onlySaved, setOnlySaved] = useState(false);

  const have = useMemo(() => new Set(state.have), [state.have]);
  const ranked = useMemo(
    () => rankRecipes(have, state.minutes, state.diet),
    [have, state.minutes, state.diet],
  );
  const visible = onlySaved ? ranked.filter((item) => state.saved.includes(item.recipe.id)) : ranked;
  const readyCount = ranked.filter((item) => item.ready).length;
  const open = ranked.find((item) => item.recipe.id === openId) ?? null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [openId]);

  function patch(partial: Partial<KitchenState>) {
    setState((current) => ({ ...current, ...partial }));
  }

  function toggleIngredient(id: string) {
    setState((current) => ({
      ...current,
      have: current.have.includes(id)
        ? current.have.filter((item) => item !== id)
        : [...current.have, id],
    }));
  }

  function addBasics() {
    setState((current) => ({
      ...current,
      have: Array.from(new Set([...current.have, ...BASICS])),
    }));
  }

  function toggleSaved(id: string) {
    setState((current) => ({
      ...current,
      saved: current.saved.includes(id)
        ? current.saved.filter((item) => item !== id)
        : [...current.saved, id],
    }));
  }

  if (open) {
    return (
      <RecipeView
        ranked={open}
        servings={state.servings}
        saved={state.saved.includes(open.recipe.id)}
        pantryMarked={state.have.length > 0}
        onBack={() => setOpenId(null)}
        onServings={(servings) => patch({ servings })}
        onToggleSaved={() => toggleSaved(open.recipe.id)}
      />
    );
  }

  const timeLabel = TIME_OPTIONS.find((option) => option.minutes === state.minutes)?.label ?? "";
  const dietLabel = DIET_OPTIONS.find((option) => option.diet === state.diet)?.label ?? "";

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-line bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <p className="font-display text-xl tracking-tight text-ink">Larder</p>
          <div className="flex items-center gap-4">
            <a href="#kitchen" className="text-sm font-medium text-muted">
              Kitchen
            </a>
            <a href="#dinners" className="text-sm font-medium text-clay">
              {state.have.length > 0 && readyCount > 0
                ? `${readyCount} ready`
                : `${ranked.length} dinners`}
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <p className="text-sm font-medium text-clay">Tonight, from the shelf</p>
        <h1 className="mt-2 max-w-xl font-display text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
          Cook what you already bought.
        </h1>
        <p className="mt-3 max-w-xl text-base text-muted">
          Mark what’s in the kitchen. Larder ranks real dinners by how close you already are,
          and writes down only what you’re missing.
        </p>
        <span className="mt-4 block h-0.5 w-8 bg-clay" aria-hidden="true" />

        <section className="mt-8" aria-label="Filters">
          <div className="flex flex-col gap-5">
            <FilterRow label="I have about">
              {TIME_OPTIONS.map((option) => (
                <Pill
                  key={option.minutes}
                  pressed={state.minutes === option.minutes}
                  onClick={() => patch({ minutes: option.minutes })}
                >
                  {option.label}
                </Pill>
              ))}
            </FilterRow>
            <FilterRow label="Eating">
              {DIET_OPTIONS.map((option) => (
                <Pill
                  key={option.diet}
                  pressed={state.diet === option.diet}
                  onClick={() => patch({ diet: option.diet as Diet })}
                >
                  {option.label}
                </Pill>
              ))}
            </FilterRow>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Servings
                servings={state.servings}
                onChange={(servings) => patch({ servings })}
              />
              <p className="text-sm text-muted">
                Salt, pepper, and oil are assumed.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-2">
          <section id="dinners" className="scroll-mt-20 lg:order-2">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="font-display text-3xl tracking-tight text-ink">Dinners</h2>
                <p className="mt-1 text-sm text-muted">
                  {timeLabel} · {dietLabel.toLowerCase()}
                  {state.have.length > 0
                    ? ` · using ${state.have.length} you marked`
                    : " · add ingredients to rank these"}
                </p>
              </div>
              <button
                type="button"
                className="larder-press min-h-11 rounded-full border border-line bg-card px-4 text-sm font-medium text-ink"
                aria-pressed={onlySaved}
                onClick={() => setOnlySaved((value) => !value)}
              >
                {onlySaved ? "Showing saved" : "Show saved"}
              </button>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              {visible.length === 0 ? (
                <p className="rounded-2xl border border-line bg-card px-4 py-6 text-sm text-muted">
                  {onlySaved
                    ? "Nothing saved in this filter. Open a dinner and tap Save."
                    : "Nothing fits that time and diet. Try Unhurried, or switch back to Anything."}
                </p>
              ) : (
                visible.map((item) => (
                  <DinnerCard
                    key={item.recipe.id}
                    item={item}
                    showMatch={state.have.length > 0}
                    onOpen={() => setOpenId(item.recipe.id)}
                  />
                ))
              )}
            </div>
          </section>

          <section id="kitchen" className="scroll-mt-20 lg:order-1" aria-label="Ingredients you have">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="font-display text-3xl tracking-tight text-ink">In the kitchen</h2>
                <p className="mt-1 text-sm text-muted">Tap anything you could cook with tonight.</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="larder-press min-h-11 rounded-full px-3 text-sm font-medium text-clay"
                  onClick={addBasics}
                >
                  Add the basics
                </button>
                <button
                  type="button"
                  className="larder-press min-h-11 rounded-full px-3 text-sm font-medium text-muted"
                  onClick={() => patch({ have: [] })}
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-5">
              {GROUPS.map((group) => (
                <div key={group.id}>
                  <h3 className="text-xs font-semibold tracking-wide text-muted uppercase">
                    {group.label}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {ingredientsIn(group.id).map((item) => {
                      const on = state.have.includes(item.id);
                      return (
                        <button
                          key={item.id}
                          type="button"
                          aria-pressed={on}
                          onClick={() => toggleIngredient(item.id)}
                          className={
                            "larder-press inline-flex min-h-11 items-center rounded-full border px-3 text-sm font-medium " +
                            (on
                              ? "border-clay bg-clay text-clay-ink"
                              : "border-line bg-card text-ink")
                          }
                        >
                          {item.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function FilterRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold tracking-wide text-muted uppercase">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Pill({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={
        "larder-press inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium " +
        (pressed ? "border-ink bg-ink text-paper" : "border-line bg-card text-ink")
      }
    >
      {children}
    </button>
  );
}

function Servings({
  servings,
  onChange,
}: {
  servings: number;
  onChange: (servings: number) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <p className="text-xs font-semibold tracking-wide text-muted uppercase">Cooking for</p>
      <div className="flex items-center gap-1">
        <button
          type="button"
          className="larder-press inline-flex size-11 items-center justify-center rounded-full border border-line bg-card text-lg text-ink"
          onClick={() => onChange(Math.max(1, servings - 1))}
          aria-label="Fewer people"
        >
          −
        </button>
        <span className="w-8 text-center font-medium text-ink">{servings}</span>
        <button
          type="button"
          className="larder-press inline-flex size-11 items-center justify-center rounded-full border border-line bg-card text-lg text-ink"
          onClick={() => onChange(Math.min(8, servings + 1))}
          aria-label="More people"
        >
          +
        </button>
      </div>
    </div>
  );
}

function DinnerCard({
  item,
  showMatch,
  onOpen,
}: {
  item: Ranked;
  showMatch: boolean;
  onOpen: () => void;
}) {
  const diets = item.recipe.diets.filter((diet) => diet !== "vegetarian" || !item.recipe.diets.includes("vegan"));
  return (
    <button
      type="button"
      onClick={onOpen}
      className="larder-press w-full rounded-2xl border border-line bg-card p-4 text-left"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-2xl leading-tight tracking-tight text-ink">
          {item.recipe.name}
        </h3>
        <span className="inline-flex shrink-0 items-center gap-1 pt-1 text-sm text-muted">
          <Clock className="size-4" aria-hidden="true" />
          {item.recipe.minutes} min
        </span>
      </div>
      <p className="mt-1 text-sm text-muted">{item.recipe.blurb}</p>
      {diets.length > 0 ? (
        <p className="mt-2 text-xs font-medium tracking-wide text-muted uppercase">
          {diets.join(" · ")}
        </p>
      ) : null}
      {showMatch ? (
        <p className="mt-3 text-sm text-ink">
          {item.ready ? (
            <span className="inline-flex items-center gap-1 font-medium text-clay">
              <Check className="size-4" aria-hidden="true" />
              Ready now
            </span>
          ) : (
            <>
              <span className="font-medium">
                {item.haveCount} of {item.requiredCount} on hand.
              </span>{" "}
              <span className="text-muted">Missing {missingLabel(item.missing)}.</span>
            </>
          )}
        </p>
      ) : null}
    </button>
  );
}

function RecipeView({
  ranked,
  servings,
  saved,
  pantryMarked,
  onBack,
  onServings,
  onToggleSaved,
}: {
  ranked: Ranked;
  servings: number;
  saved: boolean;
  pantryMarked: boolean;
  onBack: () => void;
  onServings: (servings: number) => void;
  onToggleSaved: () => void;
}) {
  const { recipe, missing } = ranked;
  const scale = scaleFor(recipe, servings);
  const [copied, setCopied] = useState(false);
  const optional = recipe.uses.filter((use) => use.optional);
  const needed = pantryMarked ? missing : recipe.uses.filter((use) => !use.optional);
  const owned = pantryMarked
    ? recipe.uses.filter((use) => !use.optional && !missing.includes(use))
    : [];

  async function copyList() {
    const text = shoppingList(recipe, pantryMarked ? missing : [], servings);
    const ok = await writeClipboard(text);
    if (!ok) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-line bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={onBack}
            className="larder-press inline-flex min-h-11 items-center gap-1 text-sm font-medium text-ink"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Kitchen
          </button>
          <button
            type="button"
            aria-pressed={saved}
            onClick={onToggleSaved}
            className="larder-press inline-flex min-h-11 items-center gap-2 text-sm font-medium text-ink"
          >
            <Bookmark className={saved ? "size-4 fill-current text-clay" : "size-4"} aria-hidden="true" />
            {saved ? "Saved" : "Save"}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <p className="inline-flex items-center gap-1 text-sm text-muted">
          <Clock className="size-4" aria-hidden="true" />
          {recipe.minutes} min
        </p>
        <h1 className="mt-2 font-display text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
          {recipe.name}
        </h1>
        <p className="mt-3 max-w-xl text-base text-muted">{recipe.blurb}</p>

        <div className="mt-6">
          <Servings servings={servings} onChange={onServings} />
        </div>

        <section className="mt-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="font-display text-2xl text-ink">You need</h2>
            <button
              type="button"
              onClick={() => void copyList()}
              className="larder-press min-h-11 rounded-full border border-line bg-card px-4 text-sm font-medium text-ink"
            >
              {copied ? "Copied" : pantryMarked && missing.length > 0 ? "Copy shopping list" : "Copy ingredient list"}
            </button>
          </div>

          {pantryMarked && missing.length === 0 ? (
            <p className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-clay">
              <Check className="size-4" aria-hidden="true" />
              You can cook this with what you marked.
            </p>
          ) : null}

          {needed.length > 0 ? (
            <IngredientList title={pantryMarked ? "Still to buy" : "Ingredients"} uses={needed} scale={scale} tone="need" />
          ) : null}
          {pantryMarked && owned.length > 0 ? (
            <IngredientList title="Already in the kitchen" uses={owned} scale={scale} tone="have" />
          ) : null}
          {optional.length > 0 ? (
            <IngredientList title="Nice if you have it" uses={optional} scale={scale} tone="have" />
          ) : null}
          <p className="mt-3 text-sm text-muted">Salt, pepper, and cooking oil are not on the list.</p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl text-ink">Method</h2>
          <ol className="mt-4 flex flex-col gap-4">
            {recipe.steps.map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="font-display text-xl text-clay">{index + 1}</span>
                <p className="pt-0.5 text-base text-ink">{step}</p>
              </li>
            ))}
          </ol>
        </section>
      </main>
    </div>
  );
}

function IngredientList({
  title,
  uses,
  scale,
  tone,
}: {
  title: string;
  uses: Use[];
  scale: number;
  tone: "need" | "have";
}) {
  return (
    <div className="mt-4">
      <h3 className="text-xs font-semibold tracking-wide text-muted uppercase">{title}</h3>
      <ul className="mt-2 flex flex-col gap-2">
        {uses.map((use) => (
          <li
            key={`${use.id}-${use.optional ? "opt" : "req"}`}
            className={
              "rounded-xl border border-line bg-card px-3 py-3 text-sm " +
              (tone === "need" ? "text-ink" : "text-muted")
            }
          >
            {formatUse(use, scale)}
          </li>
        ))}
      </ul>
    </div>
  );
}

async function writeClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.left = "-9999px";
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(area);
      return ok;
    } catch {
      return false;
    }
  }
}
