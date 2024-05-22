const SeparatingLine = ({ className }: { className?: string }) => {
  return (
    <hr
      className={`w-4/5 border-1/2 border-gray-400/50 rounded-md ${className}`}
    />
  );
};

export default SeparatingLine;
