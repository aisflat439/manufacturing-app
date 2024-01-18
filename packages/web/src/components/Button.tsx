import { motion } from "framer-motion";

type Variant = "create" | "update" | "delete" | "inform" | "select" | "action";

type Modification = "contained" | "outlined" | "text";

interface IButton {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  modification?: Modification;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  size?: "small" | "medium" | "large";
  variant?: Variant;
}

export const Button = ({
  children,
  className,
  disabled = false,
  type,
  variant = "create",
  modification = "contained",
  onClick,
  size = "medium",
}: IButton) => {
  const variantStyles = {
    create: {
      base: "green-500",
      hover: "green-600",
      text: "white",
      hoverText: "white",
    },
    update: {
      base: "yellow-500",
      hover: "yellow-600",
      text: "white",
      hoverText: "white",
    },
    delete: {
      base: "red-500",
      hover: "red-600",
      text: "white",
      hoverText: "white",
    },
    inform: {
      base: "gray-500",
      hover: "gray-600",
      text: "white",
      hoverText: "white",
    },
    select: {
      base: "blue-500",
      hover: "blue-600",
      text: "blue-500",
      hoverText: "white",
    },
    action: {
      base: "blue-500",
      hover: "blue-600",
      text: "white",
      hoverText: "white",
    },
  } as const;

  // prettier-ignore
  const modificationStyles = {
    contained: `bg-${variantStyles[variant].base} 
                hover:bg-${variantStyles[variant].hover} 
                text-${variantStyles[variant].text}
                hover:text-${variantStyles[variant].hoverText}`,
    outlined:  `border-2 rounded border-${variantStyles[variant].base} 
                hover:bg-${variantStyles[variant].hover} 
                text-${variantStyles[variant].text}
                hover:text-${variantStyles[variant].hoverText}`,
    text:      `text-${variantStyles[variant].base} 
                hover:bg-${variantStyles[variant].hover} 
                text-${variantStyles[variant].text}
                hover:text-${variantStyles[variant].hoverText}`,
  };

  const sizeStyles = {
    small: "px-2 py-1 text-xs",
    medium: "px-4 py-2 text-sm",
    large: "px-6 py-3 text-base",
  };

  const classes = `${sizeStyles[size]} ${modificationStyles[modification]} ${className} ${
    disabled && " opacity-60"
  }`;

  return (
    <motion.button
      onClick={onClick}
      whileHover={
        disabled
          ? {}
          : { scale: 0.98, backgroundColor: variantStyles[variant].hover }
      }
      className={classes}
      type={type}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};
