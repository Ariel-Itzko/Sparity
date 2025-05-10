export default function SBtn1({
    label = 'Get Started',
    onClick = () => { },
    width = 'w-full',
    height = '',
    fontSize = 'text-base',
    color = 'btn-primary',
    className = ''
}) {
    return (
        <button
            onClick={onClick}
            className={`btn ${color} ${width} ${height} ${fontSize} ${className}`}
        >
            {label}
        </button>
    );
}
