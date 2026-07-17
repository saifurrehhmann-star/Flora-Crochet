import { Star, StarHalf } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  size?: number;
}

export default function RatingStars({ rating, size = 16 }: RatingStarsProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.4;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5 text-amber-400" id={`rating-${rating}`}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`full-${i}`} size={size} fill="currentColor" strokeWidth={1.5} />
      ))}
      {hasHalfStar && <StarHalf size={size} fill="currentColor" strokeWidth={1.5} />}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`empty-${i}`} size={size} className="text-stone-200" strokeWidth={1.5} />
      ))}
    </div>
  );
}
