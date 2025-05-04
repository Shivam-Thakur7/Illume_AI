import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaHeart, FaShare, FaInfoCircle, FaStar, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';

function Explore() {
  const [showFavorites, setShowFavorites] = useState(false);
  const [visibleCount, setVisibleCount] = useState(21); // Initial number of visible images
  const [favorites, setFavorites] = useState([]); // Store favorites separately

  // Add to the top of your component
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Add more images to your existing images array
  const [images] = useState([
    {
      id: 1,
      url: "https://i.pinimg.com/474x/a7/c9/0f/a7c90ff08b97074a4bb3bcff61279d96.jpg",
      prompt: "A futuristic anime-style scientist with robotic enhancements...",
      user: "LunaDreamer",
      liked: false
    },
    {
      id: 2,
      url: "https://i.pinimg.com/736x/fb/a0/b7/fba0b7bd5717ddcda122079c86f0c014.jpg",
      prompt: "Ethereal fantasy landscape with floating islands...",
      user: "SkyDreamer",
      liked: false
    },
    {
      id: 3,
      url: "https://i.pinimg.com/736x/5c/93/c5/5c93c5ea84981ccdf3000a7e1367d273.jpg",
      prompt: "Cyberpunk city streets at night...",
      user: "NeonVisions",
      liked: false
    },
    {
      id: 4,
      url: "https://i.pinimg.com/736x/b7/2a/6b/b72a6b8e623aeacecf4deb13fdb73528.jpg",
      prompt: "Magical forest with glowing butterflies...",
      user: "NatureMage",
      liked: false
    },
    {
      id: 5,
      url: "https://i.pinimg.com/736x/a1/63/f7/a163f7168fa776c897907828b55334c0.jpg",
      prompt: "Steampunk mechanical dragon...",
      user: "GearMaster",
      liked: false
    },
    {
      id: 6,
      url: "https://i.pinimg.com/736x/56/66/f7/5666f7028ce923fc05513cbeb25ea322.jpg",
      prompt: "Ethereal mermaid in bioluminescent ocean depths...",
      user: "OceanDreams",
      liked: false
    },
    {
      id: 7,
      url: "https://i.pinimg.com/736x/d7/44/38/d74438ee85b471d44d99754e693c91c9.jpg",
      prompt: "Crystal palace in northern lights, aurora reflections...",
      user: "ArcticArtist",
      liked: false
    },
    {
      id: 8,
      url: "https://i.pinimg.com/736x/cc/e2/55/cce2550e8aa84efc222041f05df1b3ec.jpg",
      prompt: "Mechanical butterfly with clockwork wings...",
      user: "TimePiece",
      liked: false
    },
    {
      id: 9,
      url: "https://i.pinimg.com/736x/19/b1/f0/19b1f0f36879423be35f20ac46461bc3.jpg",
      prompt: "Pixelated Mona Lisa holding bitcoin...",
      user: "RichMonaLisa",
      liked: false
    },
    {
      id: 10,
      url: "https://i.pinimg.com/736x/fd/f4/1a/fdf41ab8c1517889bb021c9c91fa8172.jpg",
      prompt: "Neon samurai in rainy cyberpunk alley...",
      user: "NeonBlade",
      liked: false
    },
    {
      id: 11,
      url: "https://i.pinimg.com/736x/fe/51/66/fe516675736b44935d45151d91d36fad.jpg",
      prompt: "Space whale migration through nebula clouds...",
      user: "CosmicTales",
      liked: false
    },
    {
      id: 12,
      url: "https://i.pinimg.com/736x/eb/ee/16/ebee163ba3198eca691e8db4f2d157e9.jpg",
      prompt: "A dragon bowing down to his master...",
      user: "Dragon'sMaster",
      liked: false
    },
    {
      id: 13,
      url: "https://i.pinimg.com/736x/a6/0f/aa/a60faa38133aedc5915510c5cf2a2eb9.jpg",
      prompt: "Crystal dragon emerging from geode cave...",
      user: "GemSeeker",
      liked: false
    },
    {
      id: 14,
      url: "https://i.pinimg.com/736x/e5/f3/49/e5f349114c6f6758e9441767df1b9643.jpg",
      prompt: "Time-traveling train through quantum tunnel...",
      user: "QuantumRider",
      liked: false
    },
    {
      id: 15,
      url: "https://i.pinimg.com/736x/65/3d/a1/653da16e60d970a72193781e9352d5d1.jpg",
      prompt: "Floating Japanese garden in cherry blossom storm...",
      user: "ZenGarden",
      liked: false
    },
    {
      id: 16,
      url: "https://i.pinimg.com/736x/ec/f5/c9/ecf5c9e8009ad580a2f1477a50704038.jpg",
      prompt: "Mechanical phoenix rising from digital ashes...",
      user: "TechPhoenix",
      liked: false
    },
    {
      id: 17,
      url: "https://i.pinimg.com/736x/7c/be/c0/7cbec0bc70938a6ee56866278df296c0.jpg",
      prompt: "Northern lights dance over ice castle...",
      user: "FrostMage",
      liked: false
    },
    {
      id: 18,
      url: "https://i.pinimg.com/736x/83/9d/99/839d998c7816c6ce27e3d945adc006ec.jpg",
      prompt: "Steampunk airship fleet through storm clouds...",
      user: "SkyCaptain",
      liked: false
    },
    {
      id: 19,
      url: "https://i.pinimg.com/736x/d6/29/72/d6297270ab25a388d83cf5e3aede3253.jpg",
      prompt: "Digital forest with binary tree leaves...",
      user: "CodeNature",
      liked: false
    },
    {
      id: 20,
      url: "https://i.pinimg.com/736x/50/b5/7c/50b57c0cc09add95448a271c5e75e076.jpg",
      prompt: "Mechanical Squirrel with screws ...",
      user: "MechanicalSquirrel",
      liked: false
    },
    {
      id: 21,
      url: "https://i.pinimg.com/736x/cb/7b/3c/cb7b3cf229992e32b6bc01476c78c144.jpg",
      prompt: "Underwater city in giant bubble...",
      user: "BubbleArch",
      liked: false
    },
    {
      id: 22,
      url: "https://i.pinimg.com/736x/0b/ef/a4/0befa496fc4304342ea9814327cde964.jpg", // Add actual URLs
      prompt: "Desert oasis with floating waterfalls...",
      user: "OasisDreams",
      liked: false
    },
    {
      id: 23,
      url: "https://i.pinimg.com/736x/d7/2f/ca/d72fcabe64a2fbc805cd75cec570439b.jpg",
      prompt: "Crystalline city at sunset with floating gardens...",
      user: "CrystalArchitect",
      liked: false
    },
    {
      id: 24,
      url: "https://i.pinimg.com/736x/c1/a6/45/c1a64510ad5f4680c74b12e26fabe383.jpg",
      prompt: "Ancient tree spirit awakening in mystical forest...",
      user: "ForestWhisperer",
      liked: false
    },
    {
      id: 25,
      url: "https://i.pinimg.com/736x/53/23/c7/5323c728e70947f7f1f5795a3dd141fd.jpg",
      prompt: "Quantum computer core visualized as infinite mirrors...",
      user: "QuantumDreamer",
      liked: false
    },
    {
      id: 26,
      url: "https://i.pinimg.com/736x/eb/14/f2/eb14f2b3c21a0354ae5facea15f5daa1.jpg",
      prompt: "Dragon made of pure starlight soaring through nebula...",
      user: "StarWeaver",
      liked: false
    },
    {
      id: 27,
      url: "https://i.pinimg.com/736x/37/7d/80/377d80e94ca79097558e22545fc0d907.jpg",
      prompt: "Steampunk butterfly garden with clockwork flowers...",
      user: "TimeTinker",
      liked: false
    },
    {
      id: 28,
      url: "https://i.pinimg.com/736x/c1/7c/ed/c17cedfa49070ce11fea3689c07d0708.jpg",
      prompt: "Ice phoenix rising from aurora borealis...",
      user: "AuroraPhoenix",
      liked: false
    },
    {
      id: 29,
      url: "https://i.pinimg.com/736x/0e/7b/80/0e7b803defcf77c4fd7752b289f23762.jpg",
      prompt: "Bioluminescent coral reef city at night...",
      user: "DeepSeaDreams",
      liked: false
    },
    {
      id: 30,
      url: "https://i.pinimg.com/736x/e3/ef/4f/e3ef4f048819ef9c795259bce807e649.jpg",
      prompt: "Time-traveling train through quantum dimensions...",
      user: "DimensionHopper",
      liked: false
    },
    {
      id: 31,
      url: "https://i.pinimg.com/736x/35/cb/7b/35cb7b33fb32ad9caee7dbc0a3002c0d.jpg",
      prompt: "Mechanical hummingbird in crystal garden...",
      user: "CrystalMechanic",
      liked: false
    },
    {
      id: 32,
      url: "https://i.pinimg.com/736x/fb/a0/b7/fba0b7bd5717ddcda122079c86f0c014.jpg",
      prompt: "Floating islands with waterfalls of light...",
      user: "LightWeaver",
      liked: false
    },
    {
      id: 33,
      url: "https://i.pinimg.com/736x/d7/a1/b4/d7a1b465d81fc551907a2b105b985fd9.jpg",
      prompt: "Digital forest with data stream leaves...",
      user: "DataForester",
      liked: false
    },
    {
      id: 34,
      url: "https://i.pinimg.com/736x/6e/9d/98/6e9d98c2953192514a975ae5f83db3ad.jpg",
      prompt: "Mythical phoenix rising from digital flames...",
      user: "PixelPhoenix",
      liked: false
    },
    {
      id: 35,
      url: "https://i.pinimg.com/736x/44/57/bd/4457bdf3da53895008e86f9ed0ba9cc4.jpg",
      prompt: "Ancient temple floating in cosmic void...",
      user: "CosmicArchitect",
      liked: false
    },
    {
      id: 36,
      url: "https://i.pinimg.com/736x/20/a4/7c/20a47cc3e32d37339ff06af7e02c8e10.jpg",
      prompt: "Crystal dragon guarding quantum gate...",
      user: "QuantumGuardian",
      liked: false
    },
    {
      id: 37,
      url: "https://i.pinimg.com/736x/d2/5f/db/d25fdb568662cd7e49949f37ed6a10bb.jpg",
      prompt: "Steampunk city in perpetual sunset...",
      user: "SunsetEngineer",
      liked: false
    },
    {
      id: 38,
      url: "https://i.pinimg.com/736x/19/59/c6/1959c682f02c5655590791e7258e4732.jpg",
      prompt: "Cyberpunk samurai in neon rain...",
      user: "NeonBlade",
      liked: false
    },
    {
      id: 39,
      url: "https://i.pinimg.com/736x/f9/42/5f/f9425fca800093c31eafb4b59961c1b6.jpg",
      prompt: "Galactic whale migration through star fields...",
      user: "StarWhale",
      liked: false
    },
    {
      id: 40,
      url: "https://i.pinimg.com/736x/5f/6b/78/5f6b780a3b1cb54eaefe379d389bdd29.jpg",
      prompt: "Mechanical butterfly in quantum garden...",
      user: "QuantumGardener",
      liked: false
    },
    {
      id: 41,
      url: "https://i.pinimg.com/736x/22/45/72/2245724559f7daa510ea9bfd47ab40d2.jpg",
      prompt: "Half human and half robot...",
      user: "RoboticHuman",
      liked: false
    },
    {
      id: 42,
      url: "https://i.pinimg.com/736x/c2/1b/d7/c21bd73b8b3dc4e5bc872b56865e4d50.jpg",
      prompt: "Silver unicorn with...",
      user: "UnicornDreamer",
      liked: false
    },
    {
      id: 43,
      url: "https://i.pinimg.com/736x/85/ca/3e/85ca3e2d76a54811c5f570665f3c2361.jpg",
      prompt: "Time-traveling library with infinite books...",
      user: "TimeLorekeeper",
      liked: false
    },
    {
      id: 44,
      url: "https://i.pinimg.com/736x/e7/a7/c9/e7a7c9f0c1900346917ad240c653b040.jpg",
      prompt: "Green Luminescent caterpillar ...",
      user: "CuteLuminesccentCaterpillar",
      liked: false
    },
    {
      id: 45,
      url: "https://i.pinimg.com/736x/0d/ca/a6/0dcaa6a6fdcf2c6c6e54e08b6df440f0.jpg",
      prompt: "Quantum phoenix in data stream...",
      user: "StreamWeaver",
      liked: false
    },
    {
      id: 46,
      url: "https://i.pinimg.com/736x/1c/0b/54/1c0b54be78c1c00101bb32c4cb03176f.jpg",
      prompt: "Crystal city under northern lights...",
      user: "AuroraBuilder",
      liked: false
    },
    {
      id: 47,
      url: "https://i.pinimg.com/736x/fb/c2/db/fbc2dbbb8a41dc57c6eddcf353bab7d2.jpg",
      prompt: "Digital forest with binary butterflies...",
      user: "BinaryNature",
      liked: false
    },
    {
      id: 48,
      url: "https://i.pinimg.com/736x/d1/10/22/d1102238bcd76ec39df9aa7f39307ec1.jpg",
      prompt: "Steampunk phoenix in clockwork sky...",
      user: "ClockworkMage",
      liked: false
    },
    {
      id: 49,
      url: "https://i.pinimg.com/736x/71/eb/04/71eb04fe5e977990a5389870548b7c56.jpg",
      prompt: "Quantum garden with probability flowers...",
      user: "QuantumFlorist",
      liked: false
    },
    {
      id: 50,
      url: "https://i.pinimg.com/736x/6e/17/12/6e17121216ddff3631b584978cc9ee0e.jpg",
      prompt: "Crystal dragon in aurora dance...",
      user: "AuroraDragon",
      liked: false
    },
    {
      id: 51,
      url: "https://i.pinimg.com/736x/bd/11/93/bd11935e87e04051d42c087695a052db.jpg",
      prompt: "Time-traveling phoenix through ages...",
      user: "ChronosPhoenix",
      liked: false
    },
    {
      id: 52,
      url: "https://cdn.vectorstock.com/i/1000v/54/04/whale-and-container-computer-docker-developer-app-vector-39285404.jpg",
      prompt: "Digital whale in data ocean...",
      user: "DataWhale",
      liked: false
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredImages, setFilteredImages] = useState(images);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredImages(
      images.filter(img => 
        img.prompt.toLowerCase().includes(term) || 
        img.user.toLowerCase().includes(term)
      )
    );
  };

  // Modified toggleLike function
  const toggleLike = (id) => {
    const image = images.find(img => img.id === id);
    if (!image) return;

    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
      toast.info('Removed from favorites');
    } else {
      setFavorites([...favorites, id]);
      toast.success('Added to favorites! 💜');
    }
  };

  // Modified getFavorites function
  const getFavorites = () => {
    return filteredImages.filter(img => favorites.includes(img.id));
  };

  // Load more images function
  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 6, images.length));
  };

  // Get current visible images
  const getCurrentImages = () => {
    const currentImages = showFavorites ? getFavorites() : filteredImages;
    return currentImages.slice(0, visibleCount);
  };

  const openModal = (image) => {
    setModalImage(image);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900 to-black pt-24 pb-10">
      {/* Header with Favorites Toggle */}
      <div className="container mx-auto px-4 mb-10 mt-16"> {/* Added mt-16 for spacing */}
        <div className="flex flex-col md:flex-row text-white justify-between items-center gap-6">
          <h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-glow">
            {showFavorites ? 'Your Favorites ✨' : 'Explore Gallery ✨'}
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFavorites(!showFavorites)}
            className={`px-6 py-3 rounded-full flex items-center gap-2 ${
              showFavorites ? 'bg-pink-500' : 'bg-white/10'
            }`}
          >
            <FaStar /> {showFavorites ? 'Show All' : 'View Favorites'}
          </motion.button>
        </div>
      </div>

      {/* Search Bar */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 mb-10"
      >
        <div className="max-w-2xl mx-auto relative">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300" />
          <input
            type="text"
            placeholder="Search by prompts or creators..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full py-4 px-12 rounded-full bg-white/10 backdrop-blur-md border border-purple-500/30 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </motion.div>

      {/* Gallery Grid */}
      <div className="container mx-auto px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={showFavorites ? 'favorites' : 'all'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {getCurrentImages().map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-md rounded-xl overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.prompt.substring(0, 50) + "..."}
                    className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-110"
                    onClick={() => openModal(image)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                      <span className="text-white text-sm truncate">{image.user}</span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(image.id);
                        }}
                        className={`p-2 rounded-full ${
                          favorites.includes(image.id) ? 'bg-pink-500' : 'bg-white/20'
                        }`}
                      >
                        <FaHeart className={`${
                          favorites.includes(image.id) ? 'text-white' : 'text-white/70'
                        }`} />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Load More Button */}
        {!showFavorites && visibleCount < filteredImages.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center mt-10"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={loadMore}
              className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 rounded-full text-white font-semibold flex items-center gap-2 hover:from-purple-600 hover:to-pink-600 transition-all"
            >
              <FaPlus /> Load More
            </motion.button>
          </motion.div>
        )}

        {showFavorites && getFavorites().length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-white/70 text-xl">
              No favorites yet. Start exploring and like some images! ✨
            </p>
          </motion.div>
        )}
      </div>

      {/* Modal */}
      {showModal && modalImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-4 max-w-4xl w-full"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={modalImage.url}
              alt={modalImage.prompt}
              className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
            />
            <div className="mt-4 text-white space-y-2">
              <p className="text-lg font-semibold">By: {modalImage.user}</p>
              <p className="text-sm opacity-80">{modalImage.prompt}</p>
              <div className="flex gap-4 mt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleLike(modalImage.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                    modalImage.liked ? 'bg-pink-500' : 'bg-white/20'
                  }`}
                >
                  <FaHeart /> {modalImage.liked ? 'Liked' : 'Like'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20"
                  onClick={() => {
                    navigator.clipboard.writeText(modalImage.url);
                    toast.success('Link copied to clipboard!');
                  }}
                >
                  <FaShare /> Share
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default Explore;