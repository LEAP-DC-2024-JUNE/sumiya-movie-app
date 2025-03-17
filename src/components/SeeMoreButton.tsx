"use client";
import { useRouter } from "next/navigation";
import { SeeMore } from "./svg/Seemore";
interface SeeMoreButtonProps {
  category: string;
}
export const SeeMoreButton: React.FC<SeeMoreButtonProps> = ({ category }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/detailedMovie/${category}/1`);
  };
  return (
    <div>
      <button onClick={handleClick}>
        <SeeMore />
      </button>
    </div>
  );
};
export default SeeMoreButton;
