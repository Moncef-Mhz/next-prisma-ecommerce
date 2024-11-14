type Props = {
  color: "white" | "black";
};
const HR = ({ color }: Props) => {
  const className = `w-full h-.5 bg-${color}`;
  return <hr className={className} />;
};
export default HR;
