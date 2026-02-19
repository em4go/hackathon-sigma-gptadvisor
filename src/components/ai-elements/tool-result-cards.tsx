"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  MapPin,
  Star,
  DollarSign,
  Utensils,
  ShoppingBag,
  Beer,
  Clock,
  Sparkles,
} from "lucide-react";

// Types matching the data structures from agent.ts
interface Restaurant {
  name: string;
  distance: string;
  average_price: string;
  category: string;
  rating: number;
  address: string;
  is_open_today: boolean;
  signature_dish: string;
}

interface Store {
  name: string;
  distance: string;
  price_range: string;
  category: string;
  rating: number;
  address: string;
  is_open_today: boolean;
  popular_item: string;
}

interface DrinkPlace {
  name: string;
  distance: string;
  average_price: string;
  category: string;
  rating: number;
  address: string;
  is_open_today: boolean;
  signature_drink: string;
}

// Helper to render stars
const RatingStars = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  return (
    <div className="flex items-center gap-1">
      <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
      <span className="text-sm font-medium">{rating.toFixed(1)}</span>
    </div>
  );
};

// Helper to render price level
const PriceLevel = ({ price }: { price: string }) => (
  <div className="flex items-center gap-0.5 text-muted-foreground">
    <DollarSign className="h-3 w-3" />
    <span className="text-xs">{price}</span>
  </div>
);

// Helper to render distance
const Distance = ({ distance }: { distance: string }) => (
  <div className="flex items-center gap-1 text-muted-foreground">
    <MapPin className="h-3 w-3" />
    <span className="text-xs">{distance}</span>
  </div>
);

// Open now badge
const OpenBadge = ({ isOpen }: { isOpen: boolean }) => (
  <Badge 
    variant={isOpen ? "default" : "secondary"}
    className={cn(
      "text-xs",
      isOpen && "bg-green-500/10 text-green-600 hover:bg-green-500/20"
    )}
  >
    <Clock className="mr-1 h-3 w-3" />
    {isOpen ? "Open" : "Closed"}
  </Badge>
);

// Restaurant Card Component
interface RestaurantCardProps {
  restaurant: Restaurant;
  className?: string;
}

export const RestaurantCard = ({ restaurant, className }: RestaurantCardProps) => {
  return (
    <Card className={cn("group overflow-hidden transition-all hover:shadow-md", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Utensils className="h-4 w-4 text-primary" />
              <h3 className="font-semibold text-base leading-tight truncate">
                {restaurant.name}
              </h3>
            </div>
            <Badge variant="outline" className="text-xs">
              {restaurant.category}
            </Badge>
          </div>
          <OpenBadge isOpen={restaurant.is_open_today} />
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        <div className="flex items-center gap-4 text-sm">
          <RatingStars rating={restaurant.rating} />
          <PriceLevel price={restaurant.average_price} />
          <Distance distance={restaurant.distance} />
        </div>
        
        <div className="flex items-start gap-2 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0" />
          <span className="line-clamp-2">{restaurant.address}</span>
        </div>
        
        {restaurant.signature_dish && (
          <div className="flex items-center gap-2 text-xs bg-muted/50 rounded-md px-2 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span className="text-muted-foreground">Signature:</span>
            <span className="font-medium truncate">{restaurant.signature_dish}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Store Card Component
interface StoreCardProps {
  store: Store;
  className?: string;
}

export const StoreCard = ({ store, className }: StoreCardProps) => {
  return (
    <Card className={cn("group overflow-hidden transition-all hover:shadow-md", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <ShoppingBag className="h-4 w-4 text-primary" />
              <h3 className="font-semibold text-base leading-tight truncate">
                {store.name}
              </h3>
            </div>
            <Badge variant="outline" className="text-xs">
              {store.category}
            </Badge>
          </div>
          <OpenBadge isOpen={store.is_open_today} />
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        <div className="flex items-center gap-4 text-sm">
          <RatingStars rating={store.rating} />
          <PriceLevel price={store.price_range} />
          <Distance distance={store.distance} />
        </div>
        
        <div className="flex items-start gap-2 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0" />
          <span className="line-clamp-2">{store.address}</span>
        </div>
        
        {store.popular_item && (
          <div className="flex items-center gap-2 text-xs bg-muted/50 rounded-md px-2 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span className="text-muted-foreground">Popular:</span>
            <span className="font-medium truncate">{store.popular_item}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Drink Place Card Component
interface DrinkCardProps {
  place: DrinkPlace;
  className?: string;
}

export const DrinkCard = ({ place, className }: DrinkCardProps) => {
  return (
    <Card className={cn("group overflow-hidden transition-all hover:shadow-md", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Beer className="h-4 w-4 text-primary" />
              <h3 className="font-semibold text-base leading-tight truncate">
                {place.name}
              </h3>
            </div>
            <Badge variant="outline" className="text-xs">
              {place.category}
            </Badge>
          </div>
          <OpenBadge isOpen={place.is_open_today} />
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        <div className="flex items-center gap-4 text-sm">
          <RatingStars rating={place.rating} />
          <PriceLevel price={place.average_price} />
          <Distance distance={place.distance} />
        </div>
        
        <div className="flex items-start gap-2 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0" />
          <span className="line-clamp-2">{place.address}</span>
        </div>
        
        {place.signature_drink && (
          <div className="flex items-center gap-2 text-xs bg-muted/50 rounded-md px-2 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span className="text-muted-foreground">Signature:</span>
            <span className="font-medium truncate">{place.signature_drink}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Grid component for displaying multiple cards
interface CardGridProps {
  children: React.ReactNode;
  className?: string;
}

export const CardGrid = ({ children, className }: CardGridProps) => (
  <div className={cn(
    "grid gap-3",
    "grid-cols-1",
    "sm:grid-cols-2",
    className
  )}>
    {children}
  </div>
);

// Re-export types
export type { Restaurant, Store, DrinkPlace };
