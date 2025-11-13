"use client";

import { useState } from "react";
import { Heart, X, Zap, MessageCircle, User, Settings, Flame, Star, Trophy, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Dados de exemplo dos perfis
const profiles = [
  {
    id: 1,
    name: "Ana Silva",
    age: 25,
    bio: "Amo viajar e conhecer novas culturas 🌍✈️",
    distance: "2 km de distância",
    images: ["https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop"],
    interests: ["Viagens", "Fotografia", "Yoga"],
    personality: ["Aventureira", "Criativa"]
  },
  {
    id: 2,
    name: "Beatriz Costa",
    age: 28,
    bio: "Apaixonada por música e arte 🎨🎵",
    distance: "5 km de distância",
    images: ["https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop"],
    interests: ["Música", "Arte", "Cinema"],
    personality: ["Romântica", "Sonhadora"]
  },
  {
    id: 3,
    name: "Carolina Mendes",
    age: 26,
    bio: "Foodie e amante de café ☕🍕",
    distance: "3 km de distância",
    images: ["https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop"],
    interests: ["Gastronomia", "Café", "Livros"],
    personality: ["Criativa", "Intelectual"]
  },
  {
    id: 4,
    name: "Diana Oliveira",
    age: 24,
    bio: "Aventureira e esportista 🏃‍♀️⛰️",
    distance: "7 km de distância",
    images: ["https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop"],
    interests: ["Esportes", "Natureza", "Aventura"],
    personality: ["Aventureira", "Energética"]
  },
  {
    id: 5,
    name: "Elena Santos",
    age: 27,
    bio: "Designer criativa e sonhadora 💭✨",
    distance: "4 km de distância",
    images: ["https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop"],
    interests: ["Design", "Moda", "Tecnologia"],
    personality: ["Criativa", "Inovadora"]
  }
];

type View = "discover" | "matches" | "profile" | "premium";

export default function FilntUp() {
  const [currentView, setCurrentView] = useState<View>("discover");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState<number[]>([]);
  const [showMatch, setShowMatch] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [sparkPoints, setSparkPoints] = useState(150);
  const [swipesLeft, setSwipesLeft] = useState(30);
  const [isPremium, setIsPremium] = useState(false);

  const currentProfile = profiles[currentIndex];
  const hasMoreProfiles = currentIndex < profiles.length;

  const handleLike = () => {
    if (!hasMoreProfiles || (!isPremium && swipesLeft <= 0)) return;
    
    if (!isPremium) setSwipesLeft(swipesLeft - 1);
    setSparkPoints(sparkPoints + 10);
    setMatches([...matches, currentProfile.id]);
    setShowMatch(true);
    
    setTimeout(() => {
      setShowMatch(false);
      setCurrentIndex(currentIndex + 1);
    }, 2000);
  };

  const handlePass = () => {
    if (!hasMoreProfiles || (!isPremium && swipesLeft <= 0)) return;
    if (!isPremium) setSwipesLeft(swipesLeft - 1);
    setCurrentIndex(currentIndex + 1);
  };

  const handleGameChallenge = () => {
    if (!hasMoreProfiles) return;
    // Simula iniciar um minigame
    alert("🎮 Minigame em breve! Jogue para descobrir afinidade antes do match.");
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    setDragStart({ x: clientX, y: clientY });
    setIsDragging(true);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    setDragOffset({
      x: clientX - dragStart.x,
      y: clientY - dragStart.y
    });
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    if (dragOffset.x > 100) {
      handleLike();
    } else if (dragOffset.x < -100) {
      handlePass();
    }
    
    setDragOffset({ x: 0, y: 0 });
  };

  const rotation = isDragging ? dragOffset.x / 20 : 0;
  const opacity = isDragging ? 1 - Math.abs(dragOffset.x) / 300 : 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-pink-900">
      {/* Header */}
      <header className="bg-black/40 backdrop-blur-md border-b border-purple-500/20 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-purple-500/20"
            onClick={() => setCurrentView("profile")}
          >
            <User className="w-6 h-6" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Zap className="w-8 h-8 text-purple-400 fill-purple-400 animate-pulse" />
              <Zap className="w-8 h-8 text-pink-500 fill-pink-500 absolute top-0 left-0 animate-ping opacity-50" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent">
              FilntUp
            </h1>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-purple-500/20"
            onClick={() => setCurrentView("premium")}
          >
            <Crown className="w-6 h-6 text-yellow-400" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6">
        {currentView === "discover" && (
          <>
            {/* Stats Bar */}
            <div className="flex items-center justify-between mb-4 bg-black/40 backdrop-blur-sm rounded-2xl p-4 border border-purple-500/20">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-400 fill-purple-400" />
                <span className="text-white font-bold">{sparkPoints}</span>
                <span className="text-purple-300 text-sm">faíscas</span>
              </div>
              {!isPremium && (
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-pink-500" />
                  <span className="text-white font-bold">{swipesLeft}/30</span>
                  <span className="text-pink-300 text-sm">swipes</span>
                </div>
              )}
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                onClick={() => setCurrentView("premium")}
              >
                {isPremium ? "Premium ✨" : "Upgrade"}
              </Button>
            </div>

            {/* Card Stack */}
            <div className="relative h-[600px] mb-6">
              {!hasMoreProfiles || (!isPremium && swipesLeft <= 0) ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-purple-900/80 to-pink-900/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-purple-500/30">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                    <Zap className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {!isPremium && swipesLeft <= 0 ? "Swipes esgotados!" : "Você viu todos!"}
                  </h2>
                  <p className="text-purple-200 mb-6">
                    {!isPremium && swipesLeft <= 0 
                      ? "Volte amanhã ou faça upgrade para Premium" 
                      : "Volte mais tarde para ver novos perfis"}
                  </p>
                  <Button 
                    onClick={() => {
                      setCurrentIndex(0);
                      if (!isPremium) setSwipesLeft(30);
                    }}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    {!isPremium && swipesLeft <= 0 ? "Ver Premium" : "Recomeçar"}
                  </Button>
                </div>
              ) : (
                <>
                  {/* Next Card (background) */}
                  {currentIndex + 1 < profiles.length && (
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-3xl shadow-xl scale-95 opacity-50 border border-purple-500/20" />
                  )}

                  {/* Current Card */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-purple-900/80 to-pink-900/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing transition-all border border-purple-500/30"
                    style={{
                      transform: `translateX(${dragOffset.x}px) translateY(${dragOffset.y}px) rotate(${rotation}deg)`,
                      opacity: opacity,
                      transition: isDragging ? 'none' : 'all 0.3s ease-out'
                    }}
                    onMouseDown={handleDragStart}
                    onMouseMove={handleDragMove}
                    onMouseUp={handleDragEnd}
                    onMouseLeave={handleDragEnd}
                    onTouchStart={handleDragStart}
                    onTouchMove={handleDragMove}
                    onTouchEnd={handleDragEnd}
                  >
                    {/* Image */}
                    <div className="relative h-[450px]">
                      <img
                        src={currentProfile.images[0]}
                        alt={currentProfile.name}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Like/Nope Indicators */}
                      {isDragging && (
                        <>
                          {dragOffset.x > 50 && (
                            <div className="absolute top-8 right-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-bold text-2xl rotate-12 border-4 border-purple-400 shadow-2xl">
                              FAÍSCA ⚡
                            </div>
                          )}
                          {dragOffset.x < -50 && (
                            <div className="absolute top-8 left-8 bg-gradient-to-r from-gray-700 to-gray-900 text-white px-6 py-3 rounded-lg font-bold text-2xl -rotate-12 border-4 border-gray-600 shadow-2xl">
                              PASSAR
                            </div>
                          )}
                        </>
                      )}

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    </div>

                    {/* Profile Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="flex items-end justify-between mb-3">
                        <div>
                          <h2 className="text-3xl font-bold mb-1 flex items-center gap-2">
                            {currentProfile.name}, {currentProfile.age}
                            <Badge className="bg-purple-500/80 text-white border-purple-400">
                              <Zap className="w-3 h-3 mr-1" />
                              Verificado
                            </Badge>
                          </h2>
                          <p className="text-sm text-purple-200">{currentProfile.distance}</p>
                        </div>
                      </div>
                      
                      <p className="text-white/90 mb-3 text-sm leading-relaxed">
                        {currentProfile.bio}
                      </p>

                      {/* Personality Cards */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {currentProfile.personality.map((trait, idx) => (
                          <Badge 
                            key={idx} 
                            className="bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-sm text-white border border-purple-400/50"
                          >
                            ✨ {trait}
                          </Badge>
                        ))}
                      </div>

                      {/* Interests */}
                      <div className="flex flex-wrap gap-2">
                        {currentProfile.interests.map((interest, idx) => (
                          <Badge 
                            key={idx} 
                            variant="secondary" 
                            className="bg-white/20 backdrop-blur-sm text-white border-white/30"
                          >
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Action Buttons */}
            {hasMoreProfiles && (isPremium || swipesLeft > 0) && (
              <div className="flex items-center justify-center gap-4">
                <Button
                  onClick={handlePass}
                  size="icon"
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-white shadow-lg hover:shadow-xl transition-all hover:scale-110 border-2 border-gray-600"
                >
                  <X className="w-8 h-8" />
                </Button>

                <Button
                  onClick={handleGameChallenge}
                  size="icon"
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all hover:scale-110 border-2 border-blue-400"
                >
                  <Zap className="w-6 h-6" />
                </Button>

                <Button
                  onClick={handleLike}
                  size="icon"
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all hover:scale-110 border-2 border-purple-400"
                >
                  <Heart className="w-8 h-8 fill-current" />
                </Button>
              </div>
            )}
          </>
        )}

        {currentView === "matches" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white mb-4">Seus Matches ⚡</h2>
            {matches.length === 0 ? (
              <div className="text-center py-12 bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-3xl border border-purple-500/30">
                <Zap className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <p className="text-purple-200">Nenhum match ainda. Continue jogando!</p>
              </div>
            ) : (
              matches.map((matchId) => {
                const matchProfile = profiles.find(p => p.id === matchId);
                if (!matchProfile) return null;
                return (
                  <div key={matchId} className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-2xl p-4 border border-purple-500/30 flex items-center gap-4">
                    <Avatar className="w-16 h-16 border-2 border-purple-400">
                      <AvatarImage src={matchProfile.images[0]} />
                      <AvatarFallback>{matchProfile.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-white font-bold">{matchProfile.name}, {matchProfile.age}</h3>
                      <p className="text-purple-300 text-sm">Match recente</p>
                    </div>
                    <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </div>
                );
              })
            )}
          </div>
        )}

        {currentView === "profile" && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-3xl p-6 border border-purple-500/30 text-center">
              <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-purple-400">
                <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop" />
                <AvatarFallback>Você</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold text-white mb-2">Seu Perfil</h2>
              <p className="text-purple-300 mb-4">Complete seu perfil para mais matches!</p>
              
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{sparkPoints}</div>
                  <div className="text-purple-300 text-sm">Faíscas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{matches.length}</div>
                  <div className="text-purple-300 text-sm">Matches</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">85%</div>
                  <div className="text-purple-300 text-sm">Afinidade</div>
                </div>
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              <Settings className="w-4 h-4 mr-2" />
              Editar Perfil
            </Button>
          </div>
        )}

        {currentView === "premium" && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-3xl p-8 border-2 border-yellow-400/50 text-center">
              <Crown className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">FilntUp Premium</h2>
              <p className="text-yellow-200 mb-6">Desbloqueie todo o potencial do app</p>
              
              <div className="space-y-3 text-left mb-6">
                <div className="flex items-center gap-3 text-white">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">✓</div>
                  <span>Swipes ilimitados</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">✓</div>
                  <span>Todos os minigames liberados</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">✓</div>
                  <span>Ver quem te curtiu</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">✓</div>
                  <span>Boost semanal grátis</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">✓</div>
                  <span>Chat com áudio e imagens</span>
                </div>
              </div>

              <div className="bg-black/40 rounded-2xl p-4 mb-6">
                <div className="text-4xl font-bold text-white mb-1">$5.00/mês</div>
                <div className="text-purple-300 text-sm">€4.50 • R$28.00</div>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold text-lg py-6"
                onClick={() => {
                  setIsPremium(true);
                  alert("🎉 Bem-vindo ao Premium! Todos os recursos desbloqueados.");
                }}
              >
                <Crown className="w-5 h-5 mr-2" />
                Assinar Premium
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md border-t border-purple-500/20">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-around">
          <Button 
            variant="ghost" 
            size="icon" 
            className={currentView === "discover" ? "text-purple-400" : "text-gray-400"}
            onClick={() => setCurrentView("discover")}
          >
            <Flame className="w-6 h-6" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className={currentView === "matches" ? "text-purple-400" : "text-gray-400"}
            onClick={() => setCurrentView("matches")}
          >
            <div className="relative">
              <MessageCircle className="w-6 h-6" />
              {matches.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center">
                  {matches.length}
                </span>
              )}
            </div>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-400"
          >
            <Trophy className="w-6 h-6" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className={currentView === "profile" ? "text-purple-400" : "text-gray-400"}
            onClick={() => setCurrentView("profile")}
          >
            <User className="w-6 h-6" />
          </Button>
        </div>
      </nav>

      {/* Match Modal */}
      {showMatch && (
        <div className="fixed inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-600 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="text-center">
            <div className="relative mb-6">
              <Zap className="w-32 h-32 text-yellow-300 fill-yellow-300 mx-auto animate-pulse" />
              <Zap className="w-32 h-32 text-white fill-white absolute top-0 left-1/2 -translate-x-1/2 animate-ping" />
            </div>
            <h2 className="text-6xl font-bold text-white mb-4 animate-in zoom-in duration-500">
              É uma Faísca! ⚡
            </h2>
            <p className="text-white text-xl mb-8">
              Você e {currentProfile.name} sentiram a conexão!
            </p>
            <div className="flex items-center justify-center gap-8 mb-8">
              <Avatar className="w-32 h-32 border-4 border-white shadow-2xl">
                <AvatarImage src={currentProfile.images[0]} />
                <AvatarFallback>{currentProfile.name[0]}</AvatarFallback>
              </Avatar>
              <div className="text-6xl animate-bounce">⚡</div>
              <Avatar className="w-32 h-32 border-4 border-white shadow-2xl">
                <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop" />
                <AvatarFallback>Você</AvatarFallback>
              </Avatar>
            </div>
            <Button 
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-8"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Enviar Mensagem
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
