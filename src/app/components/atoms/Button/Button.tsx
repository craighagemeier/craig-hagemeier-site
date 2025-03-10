import "./button.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

export default function Button({ isActive, ...props }: ButtonProps) {
  return (
    <button
    className={`button${isActive ? ' button--active' : ''}`}
      {...props}
    />
  );
}
