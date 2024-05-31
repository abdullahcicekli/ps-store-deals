import React from "react";

const Card = ({ game }) => {
  const masterMedia = game.media.find((media) => media.role === "MASTER").url;

  function parsePrice(price) {
    if (price == "Dahil" || price == "Ücretsiz") return 0;
    let cleanPrice = price.replace(" TL", "");
    cleanPrice = cleanPrice.replace(/\./g, "").replace(",", ".");
    return parseFloat(cleanPrice);
  }

  const oldPrice = parsePrice(game.price.basePrice);
  const newPrice = parsePrice(game.price.discountedPrice);

  return (
    <div class="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <div class="relative mx-3 mt-3 flex  overflow-hidden rounded-xl" href="#">
        <img class="object-cover" src={masterMedia} alt="product image" />

        <span class="absolute top-0 left-0 m-2 p-2 rounded-lg bg-primary px-2 text-center text-sm font-medium text-white">
          {game.price.discountText} İndirim
        </span>
        <span class="absolute top-10 p-2 left-0 m-2 rounded-lg bg-accent px-2 text-center text-sm font-medium text-white">
          {(oldPrice - newPrice).toFixed(2)} TL İndirim
        </span>
      </div>
      <div class="mt-4 px-5 pb-5">
        <a
          href={"https://store.playstation.com/tr-tr/product/" + game.id}
          target="_blank"
        >
          <h5 class="text-xl font-bold tracking-tight text-slate-900 line-clamp-1">
            {game.name}
          </h5>
        </a>
        <div class="mt-2 flex items-center justify-between">
          <p>
            <span class="text-3xl mr-1 font-bold text-slate-900 text-primary">{newPrice}₺</span>
            <span class="text-sm text-slate-900 line-through">{oldPrice}₺</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
