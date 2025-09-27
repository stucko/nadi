import { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import {
  Trophy,
  Gift,
  Wallet,
  Coins,
  Leaf,
  TrendingUp,
  Calendar,
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  Minus,
  Star,
  Award,
  Target,
  Zap,
  Users,
  Globe,
  Recycle,
  TreePine,
  Filter,
  Search,
  ChevronRight,
  CreditCard,
  History,
} from "lucide-react";
import { Input } from "./ui/input";
import { toast } from "sonner";

// Import achievements and rewards data structures
import { Achievements } from "./Achievements";
import { Rewards } from "./Rewards";

interface Transaction {
  id: string;
  type: "nadi" | "carbon";
  action: "earned" | "spent" | "received" | "transferred";
  amount: number;
  description: string;
  date: string;
  source?: string;
  category?: string;
  status: "completed" | "pending" | "failed";
}

interface WalletBalance {
  nadiPoints: number;
  carbonCredits: number;
  totalEarned: {
    nadiPoints: number;
    carbonCredits: number;
  };
  totalSpent: {
    nadiPoints: number;
    carbonCredits: number;
  };
}

export function Me() {
  const [activeTab, setActiveTab] = useState<
    "achievements" | "rewards" | "wallet"
  >("achievements");
  const [transactionFilter, setTransactionFilter] = useState<
    "all" | "nadi" | "carbon"
  >("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Mock wallet data - in real app, this would come from backend
  const walletBalance: WalletBalance = {
    nadiPoints: 2750,
    carbonCredits: 15.5,
    totalEarned: {
      nadiPoints: 4200,
      carbonCredits: 22.0,
    },
    totalSpent: {
      nadiPoints: 1450,
      carbonCredits: 6.5,
    },
  };

  // Mock transaction history
  const transactions: Transaction[] = [
    {
      id: "tx_001",
      type: "carbon",
      action: "earned",
      amount: 5,
      description: "TMRND Forest Restoration Project",
      date: "2024-02-15",
      source: "Quest Completion",
      category: "CSR Verified",
      status: "completed",
    },
    {
      id: "tx_002",
      type: "nadi",
      action: "earned",
      amount: 300,
      description: "TMRND Forest Restoration Project",
      date: "2024-02-15",
      source: "Quest Completion",
      category: "CSR Verified",
      status: "completed",
    },
    {
      id: "tx_003",
      type: "carbon",
      action: "spent",
      amount: -2,
      description: "Eco-Friendly Water Bottle",
      date: "2024-02-14",
      source: "Rewards Store",
      category: "Eco Products",
      status: "completed",
    },
    {
      id: "tx_004",
      type: "nadi",
      action: "spent",
      amount: -500,
      description: "Plant-Based Meal Voucher",
      date: "2024-02-14",
      source: "Rewards Store",
      category: "Eco Products",
      status: "completed",
    },
    {
      id: "tx_005",
      type: "nadi",
      action: "earned",
      amount: 400,
      description: "Plastic-Free February Challenge",
      date: "2024-02-13",
      source: "Challenge Completion",
      category: "Personal Challenge",
      status: "completed",
    },
    {
      id: "tx_006",
      type: "carbon",
      action: "earned",
      amount: 2,
      description: "Plastic-Free February Challenge",
      date: "2024-02-13",
      source: "Challenge Completion",
      category: "Personal Challenge",
      status: "completed",
    },
    {
      id: "tx_007",
      type: "nadi",
      action: "earned",
      amount: 250,
      description: "PETRONAS Clean Energy Workshop",
      date: "2024-02-12",
      source: "Quest Completion",
      category: "CSR Verified",
      status: "completed",
    },
    {
      id: "tx_008",
      type: "carbon",
      action: "earned",
      amount: 3,
      description: "PETRONAS Clean Energy Workshop",
      date: "2024-02-12",
      source: "Quest Completion",
      category: "CSR Verified",
      status: "completed",
    },
    {
      id: "tx_009",
      type: "nadi",
      action: "earned",
      amount: 150,
      description: "Klang River Community Cleanup",
      date: "2024-02-11",
      source: "Community Activity",
      category: "Community",
      status: "completed",
    },
    {
      id: "tx_010",
      type: "nadi",
      action: "earned",
      amount: 100,
      description: "Daily Carbon Calculator Usage",
      date: "2024-02-11",
      source: "Daily Activity",
      category: "Tracking",
      status: "completed",
    },
  ];

  const getFilteredTransactions = () => {
    let filtered = transactions;

    // Filter by type
    if (transactionFilter !== "all") {
      filtered = filtered.filter(
        (tx) => tx.type === transactionFilter,
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (tx) =>
          tx.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          tx.source
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          tx.category
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()),
      );
    }

    // Sort by date (newest first)
    return filtered.sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getTransactionIcon = (transaction: Transaction) => {
    if (transaction.type === "nadi") {
      return transaction.action === "earned" ? (
        <div className="w-10 h-10 rounded-full bg-[#22C31B]/20 flex items-center justify-center">
          <Plus size={16} className="text-[#22C31B]" />
        </div>
      ) : (
        <div className="w-10 h-10 rounded-full bg-red-400/20 flex items-center justify-center">
          <Minus size={16} className="text-red-400" />
        </div>
      );
    } else {
      return transaction.action === "earned" ? (
        <div className="w-10 h-10 rounded-full bg-[#2AD5ED]/20 flex items-center justify-center">
          <Plus size={16} className="text-[#2AD5ED]" />
        </div>
      ) : (
        <div className="w-10 h-10 rounded-full bg-red-400/20 flex items-center justify-center">
          <Minus size={16} className="text-red-400" />
        </div>
      );
    }
  };

  const getAmountColor = (transaction: Transaction) => {
    if (transaction.action === "earned") {
      return transaction.type === "nadi"
        ? "text-[#22C31B]"
        : "text-[#2AD5ED]";
    } else {
      return "text-red-400";
    }
  };

  const formatAmount = (transaction: Transaction) => {
    const prefix = transaction.action === "earned" ? "+" : "";
    if (transaction.type === "nadi") {
      return `${prefix}${Math.abs(transaction.amount).toLocaleString()}`;
    } else {
      return `${prefix}${Math.abs(transaction.amount)}`;
    }
  };

  return (
    <div
      className="min-h-screen p-4 pb-24 relative overflow-hidden"
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1616712134411-6b6ae89bc3ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlYXJ0aCUyMHNwYWNlJTIwc3RhcnMlMjB1bml2ZXJzZXxlbnwxfHx8fDE3NTg5NjQ2NTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-white text-3xl mb-4">
            👤 My Profile
          </h1>
          <p className="text-white/80 mb-6">
            Track your achievements, rewards, and wallet balance
          </p>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as any)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 bg-white/10 backdrop-blur-sm border-white/20">
            <TabsTrigger
              value="wallet"
              className="flex items-center gap-2 text-white data-[state=active]:bg-[#22C31B] data-[state=active]:text-white"
            >
              <Wallet size={16} />
              <span className="hidden sm:inline">Wallet</span>
            </TabsTrigger>
            <TabsTrigger
              value="achievements"
              className="flex items-center gap-2 text-white data-[state=active]:bg-[#22C31B] data-[state=active]:text-white"
            >
              <Trophy size={16} />
              <span className="hidden sm:inline">
                Achievements
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="rewards"
              className="flex items-center gap-2 text-white data-[state=active]:bg-[#22C31B] data-[state=active]:text-white"
            >
              <Gift size={16} />
              <span className="hidden sm:inline">Rewards</span>
            </TabsTrigger>
          </TabsList>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <div className="mt-6">
              <Achievements />
            </div>
          </TabsContent>

          {/* Rewards Tab */}
          <TabsContent value="rewards">
            <div className="mt-6">
              <Rewards />
            </div>
          </TabsContent>

          {/* Wallet Tab */}
          <TabsContent value="wallet">
            <div className="mt-6 space-y-6">
              {/* Balance Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nadi Points Balance */}
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#22C31B]/30 to-[#26CC84]/30 flex items-center justify-center">
                        <Coins
                          size={24}
                          className="text-[#22C31B]"
                        />
                      </div>
                      <div>
                        <h3 className="text-white text-lg">
                          Nadi Points
                        </h3>
                        <p className="text-white/60 text-sm">
                          Available Balance
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center mb-4">
                    <div className="text-white text-3xl mb-2">
                      {walletBalance.nadiPoints.toLocaleString()}
                    </div>
                    <div className="text-white/60 text-sm">
                      Total Earned:{" "}
                      {walletBalance.totalEarned.nadiPoints.toLocaleString()}
                    </div>
                  </div>

                  {/* Progress to next milestone */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-white/80">
                      <span>Progress to 5,000 points</span>
                      <span>
                        {Math.round(
                          (walletBalance.nadiPoints / 5000) *
                            100,
                        )}
                        %
                      </span>
                    </div>
                    <Progress
                      value={
                        (walletBalance.nadiPoints / 5000) * 100
                      }
                      className="h-2 bg-white/20"
                    />
                  </div>
                </Card>

                {/* Carbon Credits Balance */}
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#2AD5ED]/30 to-[#26CC84]/30 flex items-center justify-center">
                        <Leaf
                          size={24}
                          className="text-[#2AD5ED]"
                        />
                      </div>
                      <div>
                        <h3 className="text-white text-lg">
                          Carbon Credits
                        </h3>
                        <p className="text-white/60 text-sm">
                          Verified Impact
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center mb-4">
                    <div className="text-white text-3xl mb-2">
                      {walletBalance.carbonCredits}
                    </div>
                    <div className="text-white/60 text-sm">
                      Total Earned:{" "}
                      {walletBalance.totalEarned.carbonCredits}
                    </div>
                  </div>

                  {/* Environmental Impact */}
                  <div className="space-y-2">
                    <div className="text-center text-sm text-white/80">
                      <TreePine
                        size={16}
                        className="inline mr-1"
                      />
                      Equivalent to{" "}
                      {Math.round(
                        walletBalance.carbonCredits * 2.2,
                      )}{" "}
                      trees planted
                    </div>
                  </div>
                </Card>
              </div>

              {/* Transaction History */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <History size={20} className="text-white" />
                    <h3 className="text-white text-xl">
                      Transaction History
                    </h3>
                  </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <div className="flex-1 relative">
                    <Search
                      size={16}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60"
                    />
                    <Input
                      placeholder="Search transactions..."
                      value={searchQuery}
                      onChange={(e) =>
                        setSearchQuery(e.target.value)
                      }
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() =>
                        setTransactionFilter("all")
                      }
                      variant={
                        transactionFilter === "all"
                          ? "default"
                          : "outline"
                      }
                      className={`transition-all ${
                        transactionFilter === "all"
                          ? "bg-[#22C31B] text-white"
                          : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                      }`}
                    >
                      All
                    </Button>
                    <Button
                      onClick={() =>
                        setTransactionFilter("nadi")
                      }
                      variant={
                        transactionFilter === "nadi"
                          ? "default"
                          : "outline"
                      }
                      className={`transition-all flex items-center gap-2 ${
                        transactionFilter === "nadi"
                          ? "bg-[#22C31B] text-white"
                          : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                      }`}
                    >
                      <Coins size={16} />
                      Points
                    </Button>
                    <Button
                      onClick={() =>
                        setTransactionFilter("carbon")
                      }
                      variant={
                        transactionFilter === "carbon"
                          ? "default"
                          : "outline"
                      }
                      className={`transition-all flex items-center gap-2 ${
                        transactionFilter === "carbon"
                          ? "bg-[#22C31B] text-white"
                          : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                      }`}
                    >
                      <Leaf size={16} />
                      Credits
                    </Button>
                  </div>
                </div>

                {/* Transaction List */}
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {getFilteredTransactions().map(
                    (transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          {getTransactionIcon(transaction)}
                          <div>
                            <h4 className="text-white text-sm mb-1">
                              {transaction.description}
                            </h4>
                            <div className="flex items-center gap-2 text-white/60 text-xs">
                              <span>
                                {formatDate(transaction.date)}
                              </span>
                              <span>•</span>
                              <span>{transaction.source}</span>
                              {transaction.category && (
                                <>
                                  <span>•</span>
                                  <Badge
                                    variant="outline"
                                    className="text-xs px-2 py-1 text-white/60 border-white/20"
                                  >
                                    {transaction.category}
                                  </Badge>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div
                            className={`text-sm ${getAmountColor(transaction)}`}
                          >
                            {formatAmount(transaction)}
                            {transaction.type === "nadi"
                              ? " points"
                              : " credits"}
                          </div>
                          <div className="text-xs text-white/60 capitalize">
                            {transaction.status}
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </div>

                {/* Empty State */}
                {getFilteredTransactions().length === 0 && (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-2">📊</div>
                    <h3 className="text-white mb-2">
                      No transactions found
                    </h3>
                    <p className="text-white/60 text-sm">
                      {searchQuery
                        ? "Try adjusting your search terms or filters"
                        : "Start completing quests to see your transaction history!"}
                    </p>
                  </div>
                )}
              </Card>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button
                  className="h-14 bg-gradient-to-r from-[#22C31B] to-[#26CC84] hover:from-[#105D0D] hover:to-[#22C31B] text-white flex items-center justify-center gap-2"
                  onClick={() =>
                    toast.info(
                      "Coming soon - View detailed wallet analytics!",
                    )
                  }
                >
                  <TrendingUp size={20} />
                  View Analytics
                </Button>

                <Button
                  variant="outline"
                  className="h-14 bg-white/10 text-white border-white/20 hover:bg-white/20 flex items-center justify-center gap-2"
                  onClick={() =>
                    toast.info(
                      "Coming soon - Export transaction history!",
                    )
                  }
                >
                  <ArrowUpRight size={20} />
                  Export History
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}