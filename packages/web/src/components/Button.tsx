type Variant = "create" | "update" | "delete" | "inform" | "select" | "action";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  modification?: "contained" | "outlined" | "text";
  size?: "small" | "medium" | "large";
  type?: "button" | "submit" | "reset";
  variant?: Variant;
} & (
  | {
      as?: "button";
      href?: never;
      onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    }
  | {
      as: "link";
      href: string;
      onClick?: undefined;
    }
  | {
      as?: "button";
      href?: never;
      type: "submit";
      onClick?: never;
    }
);

export const Button = ({
  as = "button",
  children,
  className,
  disabled = false,
  type,
  href,
  variant = "create",
  modification = "contained",
  onClick = () => {},
  size = "medium",
}: ButtonProps) => {
  const variantStyles = {
    action: {
      contained: "bg-purple-500 hover:bg-purple-600 text-white",
      outlined:
        "border-2 border-purple-500 bg-white text-purple-500 hover:bg-purple-600 text-white",
      text: "text-purple-500 hover:text-purple-600",
    },
    create: {
      contained: `
        bg-green-500 hover:bg-green-600 
        text-white
      `,
      outlined: `
        border-2 
        border-green-500 hover:border-green-600
        bg-white hover:bg-green-600 
        text-green-500 hover:text-white
      `,
      text: `
        text-green-500 hover:text-green-600
      `,
    },
    delete: {
      contained: "bg-red-500 hover:bg-red-600 text-white",
      outlined:
        "border-2 border-red-500 bg-white text-red-500 hover:bg-red-600 text-white",
      text: "text-red-500 hover:text-red-600",
    },
    inform: {
      contained: "bg-gray-500 hover:bg-gray-600 text-white",
      outlined:
        "border-2 border-gray-500 bg-white text-gray-500 hover:bg-gray-600 text-white",
      text: "text-gray-500 hover:text-gray-600",
    },
    select: {
      contained: `
        bg-blue-500 hover:bg-blue-600 
        text-white
      `,
      outlined: `
        border-2
        border-blue-500 
        bg-white hover:bg-blue-600
        text-blue-500 hover:text-white
      `,
      text: `
        text-blue-500 hover:text-blue-600
      `,
    },
    update: {
      contained: "bg-yellow-500 hover:bg-yellow-600 text-white",
      outlined:
        "border-2 border-yellow-500 bg-white text yellow-500 hover:bg-yellow-600 text-white",
      text: "text-yellow-500 hover:text-yellow-600",
    },
  } as const;

  const sizeStyles = {
    large: "px-6 py-3 text-base",
    medium: "px-4 py-2 text-sm",
    small: "px-2 py-1 text-xs",
  };

  const classes = `${sizeStyles[size]} ${variantStyles[variant][modification]} ${className} ${
    disabled && " opacity-60"
  }`;
  // [--color-from:theme(colors.green.800)]
  // [--color-to:theme(colors.green.300)]
  // bg-green-300

  return as === "button" ? (
    <button
      onClick={onClick}
      className={classes}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  ) : (
    <a className={classes} href={href} rel="noreferrer">
      {children}
    </a>
  );
};
