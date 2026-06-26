'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type Suit = 'spades' | 'hearts' | 'clubs' | 'diamonds';
type Rank = 'A' | 'K' | 'Q';

type PlayingCard = {
  id: string;
  rank: Rank;
  suit: Suit;
  label: string;
};

const SHUFFLE_DURATION_MS = 650;

const initialCards: PlayingCard[] = [
  {
    id: 'ace-spades',
    rank: 'A',
    suit: 'spades',
    label: 'Ace of Spades',
  },
  {
    id: 'king-hearts',
    rank: 'K',
    suit: 'hearts',
    label: 'King of Hearts',
  },
  {
    id: 'queen-clubs',
    rank: 'Q',
    suit: 'clubs',
    label: 'Queen of Clubs',
  },
];

const suitSymbols: Record<Suit, string> = {
  spades: '♠',
  hearts: '♥',
  clubs: '♣',
  diamonds: '♦',
};

const suitClassNames: Record<Suit, string> = {
  spades: 'text-[#142E38]',
  hearts: 'text-[#F04F64]',
  clubs: 'text-[#142E38]',
  diamonds: 'text-[#F04F64]',
};

function shuffleCards(cards: PlayingCard[]) {
  const shuffled = [...cards];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));

    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }

  return shuffled;
}

export function RoundCardShowcase() {
  const shuffleTimer = useRef<number | null>(null);
  const [cards, setCards] = useState(initialCards);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  const winner = useMemo(() => {
    return cards.find((card) => card.rank === 'A') ?? cards[0];
  }, [cards]);

  const statusMessage = useMemo(() => {
    if (isShuffling) {
      return 'Shuffling cards.';
    }

    if (isRevealed && isLocked) {
      return `${winner.label} wins this reveal.`;
    }

    if (isLocked) {
      return 'Arrangement locked. Reveal the result when ready.';
    }

    if (selectedCardId) {
      return 'Select another card to swap positions.';
    }

    return 'Select two cards to rearrange your hand.';
  }, [isLocked, isRevealed, isShuffling, selectedCardId, winner.label]);

  useEffect(() => {
    return () => {
      if (shuffleTimer.current) {
        window.clearTimeout(shuffleTimer.current);
      }
    };
  }, []);

  function handleCardSelect(cardId: string) {
    if (isLocked || isShuffling) {
      return;
    }

    if (!selectedCardId) {
      setSelectedCardId(cardId);
      return;
    }

    if (selectedCardId === cardId) {
      setSelectedCardId(null);
      return;
    }

    setCards((currentCards) => {
      const firstIndex = currentCards.findIndex(
        (card) => card.id === selectedCardId,
      );
      const secondIndex = currentCards.findIndex((card) => card.id === cardId);

      if (firstIndex === -1 || secondIndex === -1) {
        return currentCards;
      }

      const reorderedCards = [...currentCards];

      [reorderedCards[firstIndex], reorderedCards[secondIndex]] = [
        reorderedCards[secondIndex],
        reorderedCards[firstIndex],
      ];

      return reorderedCards;
    });

    setSelectedCardId(null);
  }

  function handleShuffle() {
    if (isLocked || isShuffling) {
      return;
    }

    setSelectedCardId(null);
    setIsRevealed(false);
    setIsShuffling(true);

    shuffleTimer.current = window.setTimeout(() => {
      setCards((currentCards) => shuffleCards(currentCards));
      setIsShuffling(false);
      shuffleTimer.current = null;
    }, SHUFFLE_DURATION_MS);
  }

  function handleLock() {
    if (isShuffling) {
      return;
    }

    setSelectedCardId(null);
    setIsLocked((currentState) => {
      if (currentState) {
        setIsRevealed(false);
      }

      return !currentState;
    });
  }

  function handleReveal() {
    if (!isLocked || isShuffling) {
      return;
    }

    setIsRevealed((currentState) => !currentState);
  }

  function handleReset() {
    if (shuffleTimer.current) {
      window.clearTimeout(shuffleTimer.current);
      shuffleTimer.current = null;
    }

    setCards(initialCards);
    setSelectedCardId(null);
    setIsLocked(false);
    setIsRevealed(false);
    setIsShuffling(false);
  }

  return (
    <section
      aria-labelledby="round-card-title"
      className="relative isolate overflow-hidden rounded-[2rem] border border-[#CBEDEF] bg-[#E9FAFB] p-3 shadow-[0_24px_70px_rgb(20_46_56_/_12%)] sm:p-4 lg:p-5"
    >
      <div
        aria-hidden="true"
        className="absolute -left-8 -top-8 h-24 w-24 rounded-full bg-[#FFCA00]"
      />

      <div
        aria-hidden="true"
        className="absolute -right-14 bottom-20 h-36 w-36 rounded-full bg-[#2DCCD3]/10 blur-3xl"
      />

      <div className="relative rounded-[1.6rem] border border-white/80 bg-white/[0.88] px-4 py-5 shadow-[inset_0_1px_0_rgb(255_255_255_/_85%),0_18px_45px_rgb(20_71_78_/_8%)] backdrop-blur-xl sm:px-6 sm:py-6 lg:px-8 lg:py-7">
        <header className="mx-auto max-w-md text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#168B91]">
            Arrange your hand
          </p>

          <h2
            id="round-card-title"
            className="mt-2 font-[family-name:var(--font-sora)] text-xl font-black tracking-[-0.035em] text-[#142E38] sm:text-2xl"
          >
            Build the strongest round
          </h2>

          <p className="mt-2 text-xs leading-5 text-[#58717A] sm:text-sm">
            Select two cards to swap positions, then lock your arrangement
            before revealing the result.
          </p>
        </header>

        <p className="sr-only" aria-live="polite">
          {statusMessage}
        </p>

        <div className="mx-auto mt-6 flex min-h-[210px] max-w-[500px] items-center justify-center gap-2 sm:min-h-[238px] sm:gap-4">
          {cards.map((card, index) => {
            const isSelected = selectedCardId === card.id;
            const isWinner = isRevealed && isLocked && winner.id === card.id;

            return (
              <button
                key={card.id}
                type="button"
                aria-label={`${card.label}, position ${index + 1}`}
                aria-pressed={isSelected}
                disabled={isLocked || isShuffling}
                onClick={() => handleCardSelect(card.id)}
                style={{ animationDelay: `${index * 90}ms` }}
                className={[
                  'group relative h-[174px] w-[108px] shrink-0 rounded-[1.35rem] text-left',
                  'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2DCCD3]/25',
                  'disabled:cursor-default sm:h-[214px] sm:w-[136px]',
                  isShuffling ? 'animate-card-shuffle' : 'animate-card-enter',
                  isSelected ? '-translate-y-4 rotate-[-1deg]' : '',
                ].join(' ')}
              >
                <div
                  className={[
                    'absolute inset-0 rounded-[inherit] transition-all duration-300',
                    isSelected
                      ? 'bg-[#2DCCD3] shadow-[0_22px_45px_rgb(45_204_211_/_28%)]'
                      : isWinner
                        ? 'bg-[#FFCA00] shadow-[0_22px_45px_rgb(255_202_0_/_25%)]'
                        : 'bg-gradient-to-br from-[#B7EEF1] via-[#D9F8F9] to-[#FFEEAA]',
                  ].join(' ')}
                />

                <div
                  className={[
                    'absolute inset-[2px] overflow-hidden rounded-[calc(1.35rem-2px)] bg-white',
                    'transition-transform duration-500 [transform-style:preserve-3d]',
                    isRevealed
                      ? '[transform:rotateY(180deg)]'
                      : '[transform:rotateY(0deg)]',
                  ].join(' ')}
                >
                  <CardFront card={card} position={index + 1} />
                  <CardBack isWinner={isWinner} />
                </div>

                {isSelected ? (
                  <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#142E38] px-3 py-1.5 text-[11px] font-bold text-white shadow-lg">
                    Selected
                  </span>
                ) : null}

                {isWinner ? (
                  <span className="absolute -top-4 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#FFCA00] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-[#142E38] shadow-lg">
                    Winner
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
          <button
            type="button"
            onClick={handleShuffle}
            disabled={isLocked || isShuffling}
            className="clay-button clay-button--secondary clay-button--compact inline-flex min-h-10 transform-gpu items-center justify-center px-4 text-xs font-bold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
          >
            {isShuffling ? 'Shuffling...' : 'Shuffle'}
          </button>

          <button
            type="button"
            onClick={handleLock}
            disabled={isShuffling}
            className={[
              'clay-button clay-button--compact inline-flex min-h-10 transform-gpu items-center justify-center px-4 text-xs font-black transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 sm:px-5 sm:text-sm',
              isLocked
                ? 'clay-button--dark'
                : 'clay-button--primary',
            ].join(' ')}
          >
            {isLocked ? 'Unlock' : 'Lock'}
          </button>

          <button
            type="button"
            onClick={handleReveal}
            disabled={!isLocked || isShuffling}
            className="clay-button clay-button--yellow clay-button--compact inline-flex min-h-10 transform-gpu items-center justify-center px-4 text-xs font-black transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-45 sm:px-5 sm:text-sm"
          >
            {isRevealed ? 'Hide' : 'Reveal'}
          </button>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="mx-auto mt-3 block text-xs font-bold text-[#58717A] underline-offset-4 transition hover:text-[#142E38] hover:underline"
        >
          Reset round
        </button>
      </div>

      <aside className="relative ml-auto -mt-2 w-fit max-w-[190px] rounded-[1.5rem] bg-[#FFCA00] px-5 py-3.5 shadow-[0_18px_40px_rgb(255_202_0_/_25%)] sm:-mt-6">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#625100]">
          Three rounds
        </p>

        <p className="mt-1 font-[family-name:var(--font-sora)] text-lg font-black tracking-[-0.04em] text-[#142E38]">
          One winner
        </p>

        <div
          aria-hidden="true"
          className="absolute right-5 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full border border-[#142E38]/10"
        />
      </aside>
    </section>
  );
}

function CardFront({
  card,
  position,
}: {
  card: PlayingCard;
  position: number;
}) {
  const symbol = suitSymbols[card.suit];
  const suitColor = suitClassNames[card.suit];

  return (
    <div className="absolute inset-0 [backface-visibility:hidden]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgb(45_204_211_/_8%),transparent_42%)]" />

      <div className="absolute inset-[8px] rounded-[1rem] border border-[#D7ECEE] sm:inset-[10px]" />

      <div className="absolute inset-[13px] rounded-[0.8rem] border border-dashed border-[#DDEBEC] sm:inset-[15px]" />

      <div className={`absolute left-4 top-4 ${suitColor}`}>
        <span className="block text-xl font-black leading-none sm:text-2xl">
          {card.rank}
        </span>
        <span className="mt-0.5 block text-base leading-none sm:text-lg">
          {symbol}
        </span>
      </div>

      <div className={`absolute bottom-4 right-4 rotate-180 ${suitColor}`}>
        <span className="block text-xl font-black leading-none sm:text-2xl">
          {card.rank}
        </span>
        <span className="mt-0.5 block text-base leading-none sm:text-lg">
          {symbol}
        </span>
      </div>

      <div
        className={`absolute inset-0 flex items-center justify-center ${suitColor}`}
      >
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-current/10 bg-current/[0.035] sm:h-20 sm:w-20">
          <span className="absolute inset-2 rounded-full border border-current/10" />

          <span className="relative text-4xl drop-shadow-sm sm:text-5xl">
            {symbol}
          </span>
        </div>
      </div>

      <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-[#F2FAFA] px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-[#58717A]">
        Round {position}
      </span>
    </div>
  );
}

function CardBack({ isWinner }: { isWinner: boolean }) {
  return (
    <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
      <div className="absolute inset-0 bg-[#142E38]" />

      <div
        className="absolute inset-[8px] rounded-[1rem] border border-white/15"
        style={{
          backgroundImage:
            'linear-gradient(45deg, rgb(45 204 211 / 18%) 25%, transparent 25%), linear-gradient(-45deg, rgb(45 204 211 / 18%) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgb(255 202 0 / 14%) 75%), linear-gradient(-45deg, transparent 75%, rgb(255 202 0 / 14%) 75%)',
          backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0',
          backgroundSize: '16px 16px',
        }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <div
          className={[
            'flex h-14 w-14 items-center justify-center rounded-full sm:h-16 sm:w-16',
            isWinner
              ? 'bg-[#FFCA00] text-[#142E38]'
              : 'bg-[#2DCCD3] text-white',
          ].join(' ')}
        >
          <span className="text-2xl font-black">{isWinner ? '★' : 'K'}</span>
        </div>

        <span className="mt-3 text-xs font-black uppercase tracking-[0.18em] text-white">
          {isWinner ? 'Winner' : 'Kitti'}
        </span>
      </div>
    </div>
  );
}
