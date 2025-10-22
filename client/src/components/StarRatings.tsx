import { Star } from "lucide-react";
import type { JSX } from "react";

const StarRatings = ({ rating }: { rating: number }): JSX.Element => {
  const fullStars: number = Math.floor(rating);
  const hasHalfStar: boolean = rating % 1 > 0;
  const emptyStars: number = 5 - fullStars - (hasHalfStar ? 1 : 0);
  const percentage: number = parseInt(rating.toString().slice(-1)) * 10;

  return (
    <div className="flex items-center">
      {/* Full Stars */}
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star
          key={`full-${i}`}
          className="size-5 fill-yellow-400 text-yellow-500"
        />
      ))}

      {/* Half Star */}
      {hasHalfStar && (
        <div className="relative">
          <Star className="size-5 text-gray-300 dark:text-slate-600" />
          <div className="absolute inset-0 overflow-hidden" style={{ width: `${percentage}%` }}>
            <Star className="size-5 fill-yellow-400 text-yellow-500" />
          </div>
        </div>
      )}

      {/* Empty Stars */}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star
          key={`empty-${i}`}
          className="size-5 text-gray-300 dark:text-slate-600"
        />
      ))}
    </div>
  );
}

export default StarRatings;
