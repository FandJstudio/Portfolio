import Image from "next/image";

/** Intrinsic size of /public/fj-logo.png after trimming the transparent margin. */
const WIDTH = 828;
const HEIGHT = 420;

type Props = {
  /** Height and any spacing. Width follows the aspect ratio. */
  className?: string;
  /**
   * Accessible name. Pass an empty string when adjacent text already names
   * the brand, so screen readers do not hear it twice.
   */
  alt?: string;
  priority?: boolean;
};

export function LogoMark({ className, alt = "F&J", priority = false }: Props) {
  return (
    <Image
      src="/fj-logo.png"
      alt={alt}
      width={WIDTH}
      height={HEIGHT}
      priority={priority}
      className={className}
    />
  );
}
