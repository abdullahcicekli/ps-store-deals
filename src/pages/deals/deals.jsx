import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Drawer from "../../components/drawer/drawer";
import GameCard from "../../components/card/card";

function Deals() {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, [searchTerm]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    handleSort(sortOption);
  }, [sortOption]);

  const fetchData = async () => {
    const response = await axios.get(`http://localhost:3000/games`);
    setGames(response.data);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (option) => {
    setSortOption(option);
    let sortedGames = [...games];
    if (option === "discountAsc") {
      sortedGames.sort((a, b) => {
        if (a.price.discountText === null) return 1;
        if (b.price.discountText === null) return -1;
        let adiscount = a.price.discountText.replace("%", "");
        let bdiscount = b.price.discountText.replace("%", "");
        return parseFloat(adiscount) - parseFloat(bdiscount);
      });
    } else if (option === "discountDesc") {
      sortedGames.sort((a, b) => {
        if (a.price.discountText === null) return 1;
        if (b.price.discountText === null) return -1;
        let adiscount = a.price.discountText.replace("%", "");
        let bdiscount = b.price.discountText.replace("%", "");
        return parseFloat(bdiscount) - parseFloat(adiscount);
      });
    } else if (option === "amountAsc") {
      sortedGames.sort((a, b) => {
        let oldPrice = a.price.basePrice
          .replace(" TL", "")
          .replace(/\./g, "")
          .replace(",", ".");
        let newPrice = b.price.basePrice
          .replace(" TL", "")
          .replace(/\./g, "")
          .replace(",", ".");
        return parseFloat(oldPrice) - parseFloat(newPrice);
      });
    } else if (option === "amountDesc") {
      sortedGames.sort((a, b) => {
        let oldPrice = a.price.basePrice
          .replace(" TL", "")
          .replace(/\./g, "")
          .replace(",", ".");
        let newPrice = b.price.basePrice
          .replace(" TL", "")
          .replace(/\./g, "")
          .replace(",", ".");
        return parseFloat(newPrice) - parseFloat(oldPrice);
      });
    }
    setGames(sortedGames);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (!isDropdownOpen) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div>
      <Drawer />
      <div className="sm:ml-64">
        <div className="p-20 mt-0 flex">
          <input
            type="text"
            placeholder="Ara..."
            value={searchTerm}
            onChange={handleSearch}
            className="border rounded px-2 py-1 mr-4"
          />
          <div className="relative" ref={dropdownRef}>
            <button
              className="border rounded px-2 py-1 z-100"
              onClick={handleDropdownToggle}
            >
              Sırala
            </button>
            {isDropdownOpen && (
              <div className="absolute mt-2 w-48 bg-white border rounded shadow-lg z-10">
                <div
                  onClick={() => handleSort("discountAsc")}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  İndirim Oranı: Yüksekten Düşüğe
                </div>
                <div
                  onClick={() => handleSort("discountDesc")}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  İndirim Oranı: Düşükten Yükseğe
                </div>
                <div
                  onClick={() => handleSort("amountAsc")}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  İndirim Miktarı: Düşükten Yükseğe
                </div>
                <div
                  onClick={() => handleSort("amountDesc")}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  İndirim Miktarı: Yüksekten Düşüğe
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {games.map((game) => (
            <div key={game.id}>
              <GameCard game={game} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Deals;
