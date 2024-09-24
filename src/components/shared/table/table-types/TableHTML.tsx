interface TableHTMLProps {
  val: string;
}
export const TableHTML = ({ val }: TableHTMLProps) => {
  const theObj = { __html: val };
  return <div dangerouslySetInnerHTML={theObj} />;
};
